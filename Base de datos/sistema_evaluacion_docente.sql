-- Script de creación de base de datos para Sistema de Evaluación Docente
-- Creado para referencia y uso en MySQL Workbench

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_evaluacion_docente;
USE sistema_evaluacion_docente;

-- Tabla de roles
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    departamento VARCHAR(100),
    facultad VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- Tabla de estudiantes
CREATE TABLE estudiantes (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    codigo_estudiante VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    departamento VARCHAR(100),
    facultad VARCHAR(100),
    semestre INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de periodos de evaluación
CREATE TABLE periodos_evaluacion (
    id_periodo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('Activo', 'Inactivo', 'Finalizado') DEFAULT 'Inactivo',
    descripcion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de criterios de evaluación
CREATE TABLE criterios_evaluacion (
    id_criterio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    peso DECIMAL(5,2) NOT NULL, -- Porcentaje de peso en la evaluación total
    id_periodo INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_periodo) REFERENCES periodos_evaluacion(id_periodo)
);

-- Tabla de cursos
CREATE TABLE cursos (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    departamento VARCHAR(100),
    creditos INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de asignaciones docente-curso
CREATE TABLE asignaciones_curso (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL, -- Docente
    id_curso INT NOT NULL,
    id_periodo INT NOT NULL,
    grupo VARCHAR(10),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso),
    FOREIGN KEY (id_periodo) REFERENCES periodos_evaluacion(id_periodo),
    UNIQUE KEY (id_usuario, id_curso, id_periodo, grupo) -- Un docente no puede tener el mismo curso y grupo en el mismo periodo
);

-- Tabla de inscripciones de estudiantes a cursos
CREATE TABLE inscripciones_curso (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_asignacion INT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    estado ENUM('Activo', 'Retirado', 'Finalizado') DEFAULT 'Activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
    FOREIGN KEY (id_asignacion) REFERENCES asignaciones_curso(id_asignacion),
    UNIQUE KEY (id_estudiante, id_asignacion) -- Un estudiante no puede inscribirse dos veces al mismo curso-grupo
);

-- Tabla de calificaciones de estudiantes
CREATE TABLE calificaciones_estudiante (
    id_calificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_inscripcion INT NOT NULL,
    tipo_evaluacion VARCHAR(50) NOT NULL, -- Parcial 1, Parcial 2, Final, etc.
    calificacion DECIMAL(5,2) NOT NULL, -- Calificación de 0 a 5 o según escala
    porcentaje DECIMAL(5,2) NOT NULL, -- Porcentaje que representa en la nota final
    comentario TEXT,
    fecha_registro DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_inscripcion) REFERENCES inscripciones_curso(id_inscripcion)
);

-- Tabla de tipos de evaluación
CREATE TABLE tipos_evaluacion (
    id_tipo_evaluacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    porcentaje DECIMAL(5,2) NOT NULL, -- Porcentaje que representa en la evaluación total (20%, 50%, 30%)
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de evaluaciones de docentes
CREATE TABLE evaluaciones (
    id_evaluacion INT AUTO_INCREMENT PRIMARY KEY,
    id_asignacion INT NOT NULL,
    id_periodo INT NOT NULL,
    id_tipo_evaluacion INT NOT NULL, -- Tipo de evaluación (autoevaluación, estudiantes, coordinador/decano)
    fecha_evaluacion DATE NOT NULL,
    estado ENUM('Pendiente', 'En Proceso', 'Completada', 'Revisión') DEFAULT 'Pendiente',
    comentario_general TEXT,
    evaluador_id INT NOT NULL, -- Usuario que realiza la evaluación (puede ser docente, estudiante o coordinador/decano)
    calificacion_final DECIMAL(5,2), -- Calificación final de esta evaluación específica
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_asignacion) REFERENCES asignaciones_curso(id_asignacion),
    FOREIGN KEY (id_periodo) REFERENCES periodos_evaluacion(id_periodo),
    FOREIGN KEY (id_tipo_evaluacion) REFERENCES tipos_evaluacion(id_tipo_evaluacion),
    FOREIGN KEY (evaluador_id) REFERENCES usuarios(id_usuario)
);

-- Tabla para almacenar la calificación consolidada por asignación
CREATE TABLE evaluaciones_consolidadas (
    id_evaluacion_consolidada INT AUTO_INCREMENT PRIMARY KEY,
    id_asignacion INT NOT NULL,
    id_periodo INT NOT NULL,
    calificacion_autoevaluacion DECIMAL(5,2), -- 20%
    calificacion_estudiantes DECIMAL(5,2), -- 50%
    calificacion_coordinador DECIMAL(5,2), -- 30%
    calificacion_final DECIMAL(5,2), -- Calificación ponderada final
    observaciones TEXT,
    fecha_consolidacion DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_asignacion) REFERENCES asignaciones_curso(id_asignacion),
    FOREIGN KEY (id_periodo) REFERENCES periodos_evaluacion(id_periodo),
    UNIQUE KEY (id_asignacion, id_periodo) -- Solo una evaluación consolidada por asignación y periodo
);


-- Tabla de resultados por criterio
CREATE TABLE resultados_criterio (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_evaluacion INT NOT NULL,
    id_criterio INT NOT NULL,
    calificacion DECIMAL(5,2) NOT NULL, -- Calificación de 0 a 100
    comentario TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_evaluacion) REFERENCES evaluaciones(id_evaluacion),
    FOREIGN KEY (id_criterio) REFERENCES criterios_evaluacion(id_criterio),
    UNIQUE KEY (id_evaluacion, id_criterio) -- Solo un resultado por criterio por evaluación
);

-- Tabla de planes de mejora
CREATE TABLE planes_mejora (
    id_plan INT AUTO_INCREMENT PRIMARY KEY,
    id_evaluacion INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('Pendiente', 'En Proceso', 'Completado', 'Cancelado') DEFAULT 'Pendiente',
    id_usuario_creador INT NOT NULL, -- Usuario que crea el plan (coordinador/decano)
    id_usuario_responsable INT NOT NULL, -- Usuario responsable (docente)
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_evaluacion) REFERENCES evaluaciones(id_evaluacion),
    FOREIGN KEY (id_usuario_creador) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_usuario_responsable) REFERENCES usuarios(id_usuario)
);

-- Tabla de objetivos del plan de mejora
CREATE TABLE objetivos_plan (
    id_objetivo INT AUTO_INCREMENT PRIMARY KEY,
    id_plan INT NOT NULL,
    descripcion TEXT NOT NULL,
    indicador VARCHAR(255) NOT NULL, -- Cómo se medirá el éxito
    meta VARCHAR(255) NOT NULL, -- Qué se espera lograr
    fecha_limite DATE,
    estado ENUM('Pendiente', 'En Proceso', 'Completado', 'Cancelado') DEFAULT 'Pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_plan) REFERENCES planes_mejora(id_plan)
);

-- Tabla de seguimientos de planes de mejora
CREATE TABLE seguimientos_plan (
    id_seguimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_plan INT NOT NULL,
    fecha_seguimiento DATE NOT NULL,
    comentario TEXT NOT NULL,
    porcentaje_avance DECIMAL(5,2) NOT NULL, -- Porcentaje de 0 a 100
    id_usuario_evaluador INT NOT NULL, -- Usuario que realiza el seguimiento
    evidencia_url VARCHAR(255), -- URL o ruta a evidencia
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_plan) REFERENCES planes_mejora(id_plan),
    FOREIGN KEY (id_usuario_evaluador) REFERENCES usuarios(id_usuario)
);

-- Tabla de alertas
CREATE TABLE alertas (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_destino INT NOT NULL, -- Usuario al que va dirigida la alerta
    titulo VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo ENUM('Urgente', 'Importante', 'Moderado', 'Informativo') DEFAULT 'Informativo',
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario_destino) REFERENCES usuarios(id_usuario)
);

-- Tabla de notificaciones
CREATE TABLE notificaciones (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla de configuración del sistema
CREATE TABLE configuracion_sistema (
    id_configuracion INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(50) NOT NULL UNIQUE,
    valor TEXT NOT NULL,
    descripcion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de logs del sistema
CREATE TABLE logs_sistema (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    accion VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ip VARCHAR(45),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Insertar datos de ejemplo

-- Roles básicos
INSERT INTO roles (nombre_rol, descripcion) VALUES
('Administrador', 'Control total del sistema'),
('Decano', 'Gestión de facultad y evaluación de docentes'),
('Coordinador', 'Gestión de departamento y evaluación de docentes'),
('Docente', 'Usuario evaluado');

-- Usuarios de ejemplo
INSERT INTO usuarios (nombre, apellido, email, password, id_rol, departamento, facultad) VALUES
('Admin', 'Sistema', 'admin@universidad.edu', SHA2('admin123', 256), 1, NULL, NULL),
('Juan', 'Pérez', 'juan.perez@universidad.edu', SHA2('password123', 256), 2, NULL, 'Ingeniería'),
('María', 'Gómez', 'maria.gomez@universidad.edu', SHA2('password123', 256), 3, 'Sistemas', 'Ingeniería'),
('Carlos', 'Rodríguez', 'carlos.rodriguez@universidad.edu', SHA2('password123', 256), 4, 'Sistemas', 'Ingeniería'),
('Laura', 'Martínez', 'laura.martinez@universidad.edu', SHA2('password123', 256), 4, 'Matemáticas', 'Ciencias');

-- Estudiantes de ejemplo
INSERT INTO estudiantes (codigo_estudiante, nombre, apellido, email, departamento, facultad, semestre) VALUES
('EST001', 'Ana', 'García', 'ana.garcia@universidad.edu', 'Sistemas', 'Ingeniería', 5),
('EST002', 'Pedro', 'López', 'pedro.lopez@universidad.edu', 'Sistemas', 'Ingeniería', 3),
('EST003', 'Sofía', 'Ramírez', 'sofia.ramirez@universidad.edu', 'Matemáticas', 'Ciencias', 4),
('EST004', 'Miguel', 'Torres', 'miguel.torres@universidad.edu', 'Matemáticas', 'Ciencias', 2);