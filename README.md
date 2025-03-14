# Proyecto Evaluación Docente

Este repositorio contiene la implementación parcial de una **aplicación web** para la evaluación del desempeño de los docentes en una institución educativa. Actualmente, se cuenta con un **frontend** que muestra la estructura y funcionalidad básica (con datos simulados), mientras que el **backend** (en PHP/Laravel con MySQL) se integrará en fases posteriores.

---

## Tabla de Contenidos

1. [Descripción General](#descripción-general)  
2. [Características Principales](#características-principales)  
3. [Estructura del Proyecto](#estructura-del-proyecto)  
4. [Requisitos](#requisitos)  
5. [Instalación y Ejecución](#instalación-y-ejecución)  
6. [Uso de la Aplicación](#uso-de-la-aplicación)  
7. [Contribución](#contribución)  
8. [Autores](#autores)  
9. [Licencia](#licencia)  
10. [Contacto](#contacto)

---

## Descripción General

El **Proyecto Evaluación Docente** busca optimizar el proceso de evaluación de los docentes a través de una plataforma que:

- Permita a los **estudiantes** evaluar de forma anónima.
- Brinde a los **coordinadores/decanos** la posibilidad de ingresar evaluaciones administrativas.
- Facilite a los **docentes** la autoevaluación de su desempeño.
- Genere **reportes**, **estadísticas** y **actas de compromiso** para el seguimiento y mejora continua.
- Emita **alertas** y **notificaciones** ante bajo rendimiento y posibles procesos de sanción o retiro.

> **Nota:** Actualmente, el repositorio contiene mayormente la capa de **frontend** (HTML, CSS y JavaScript) con datos simulados. La integración con un **backend** (PHP, Laravel y MySQL) se llevará a cabo en futuras iteraciones.

---

## Características Principales

- **Autenticación básica** con roles (docente, decano, etc.) – en desarrollo.
- **Captura de datos de evaluación** (estudiantil y administrativa) – pendiente de integración real con la base de datos.
- **Generación de actas de compromiso** en PDF para docentes con calificaciones por debajo de un umbral (por ejemplo, 4).
- **Seguimiento a planes de mejora** y registro de estatus (activo, cumplido, suspendido).
- **Alertas de bajo desempeño** (nota < 3) visibles en el panel del decano.
- **Paneles** diferenciados para cada rol (administrador, docente, etc.).
- **Reportes e informes** con gráficas y tablas simuladas, a la espera de datos reales.
- **Diseño modular** pensado para escalar e integrar con servicios de backend.

---

## Estructura del Proyecto

La estructura principal del repositorio incluye:

ProyectoEvaluacionDocente/ ├─ .git/ # Carpeta de Git (versionado) ├─ Base de datos/ │ └─ sistema_evaluacion_docente.sql # Script SQL (estructura de tablas) ├─ Documentacion/ │ └─ casos_uso_historias_usuario.md # Documentos de requerimientos ├─ images/ │ ├─ FondoUniversidad.jpg │ ├─ FondoUniversidad.png │ └─ Logo Uniautonoma.png ├─ PanelAdministrador/ │ ├─ panel-admin.html │ ├─ admin-script.js │ └─ ... ├─ PanelDocente/ │ ├─ panel-docente.html │ ├─ script.js │ └─ ... ├─ acta-compromiso.html ├─ acta-script.js ├─ alertas-bajo-desempeno.html ├─ alertas-script.js ├─ index.html ├─ login.html ├─ login.js ├─ script.js ├─ styles.css └─ README.md # Este archivo


- **`PanelAdministrador/`**: Contiene las vistas y scripts relacionados con el rol de administrador/decano (períodos de evaluación, reportes, roles, etc.).
- **`PanelDocente/`**: Contiene las vistas y scripts para la interfaz del docente (configuración, resultados, seguimiento, etc.).
- **`Base de datos/`**: Incluye el archivo `sistema_evaluacion_docente.sql` para crear la estructura de tablas en MySQL (a integrar en la fase backend).
- **`Documentacion/`**: Sección con documentación adicional, como casos de uso e historias de usuario.

---

## Requisitos

### Frontend
- **Navegador web moderno** (Chrome, Firefox, Edge, Safari) con soporte de JavaScript habilitado.
- Conexión a internet (o servidor local) para cargar las páginas HTML y los recursos.

### Backend (Futuro)
- **PHP 8.x** y **Composer** (para Laravel).
- **MySQL 5.7+** o **MariaDB** (para la base de datos).
- **Servidor Web** (Apache/Nginx) configurado para correr aplicaciones Laravel.

> Por ahora, el backend no está integrado. Se recomienda utilizar un servidor local (p. ej., XAMPP, Wamp, Laragon) si deseas hacer pruebas iniciales de HTML/JS.

---

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/usuario/ProyectoEvaluacionDocente.git
   cd ProyectoEvaluacionDocente

## Abrir las páginas HTML directamente en tu navegador

- **Abre** `index.html` o `login.html` para probar el flujo de autenticación simulado.
- **Explora** las demás páginas (`panel-docente.html`, `panel-admin.html`, etc.) para ver los módulos.

---

## (Opcional) Configurar un servidor local

- **Copia** la carpeta `ProyectoEvaluacionDocente` en tu directorio raíz de tu servidor local (por ejemplo, `htdocs` en XAMPP).
- **Accede** a la aplicación mediante [http://localhost/ProyectoEvaluacionDocente/index.html](http://localhost/ProyectoEvaluacionDocente/index.html).

---

## (Fase Futura) Integración con Backend

- **Importa** el archivo `Base de datos/sistema_evaluacion_docente.sql` en tu servidor MySQL.
- **Configura** el proyecto Laravel (cuando se integre) con la base de datos.
- **Ajusta** rutas de API y endpoints para reemplazar la data simulada por datos reales.

---

## Uso de la Aplicación

- **Inicio de sesión:**  
  En la página `login.html` se ingresa un usuario y contraseña (actualmente, roles simulados).

- **Panel de Administrador/Decano:**
  - Gestiona períodos de evaluación.
  - Revisa estadísticas de rendimiento docente.
  - Emite alertas de bajo desempeño y genera reportes.

- **Panel de Docente:**
  - Consulta estadísticas y resultados de sus evaluaciones.
  - Revisa planes de mejora y actas de compromiso (si aplica).
  - Configura datos personales (pendiente de persistencia real).

- **Reportes y Actas:**
  - Genera PDF para actas de compromiso (nota < 4).
  - Visualiza reportes y gráficas con datos de ejemplo (hasta integrar el backend).

---
