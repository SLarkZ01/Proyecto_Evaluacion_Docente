# Casos de Uso e Historias de Usuario - Sistema de Evaluación Docente

## Índice
1. [Introducción](#introducción)
2. [Actores del Sistema](#actores-del-sistema)
3. [Casos de Uso](#casos-de-uso)
4. [Historias de Usuario](#historias-de-usuario)

## Introducción

Este documento presenta los casos de uso e historias de usuario para el Sistema de Evaluación Docente. El propósito es documentar las funcionalidades del sistema desde la perspectiva de los diferentes usuarios y establecer los requisitos funcionales de manera clara y estructurada.

## Actores del Sistema

### Actores Principales
- **Administrador**: Gestiona la configuración global del sistema, usuarios, roles y permisos.
- **Decano/Coordinador**: Supervisa las evaluaciones a nivel de facultad y toma decisiones basadas en los resultados. Ademas gestiona las evaluaciones a nivel de departamento y realiza seguimiento a los planes de mejora.
- **Docente**: Usuario evaluado que también realiza autoevaluaciones.

## Casos de Uso

### 1. Gestión de Usuarios y Roles

#### CU-01: Administración de Usuarios
**Actor Principal**: Administrador

**Flujo Principal**:
1. El administrador accede al módulo de gestión de usuarios.
2. El sistema muestra la lista de usuarios registrados.
3. El administrador puede crear, editar, activar o desactivar usuarios.
4. El sistema valida y guarda los cambios.

**Flujos Alternativos**:
- Si los datos del usuario son inválidos, el sistema muestra un mensaje de error.
- Si el correo electrónico ya existe, el sistema notifica al administrador.

#### CU-02: Asignación de Roles y Permisos
**Actor Principal**: Administrador

**Flujo Principal**:
1. El administrador accede al módulo de roles y permisos.
2. El sistema muestra la lista de roles disponibles.
3. El administrador selecciona un rol para modificar sus permisos.
4. El administrador asigna o revoca permisos específicos.
5. El sistema guarda los cambios.

**Flujos Alternativos**:
- Si se intenta eliminar un rol en uso, el sistema muestra una advertencia.

### 2. Gestión de Planes de Mejora

#### CU-08: Creación de Plan de Mejora
**Actor Principal**: Coordinador/Decano

**Flujo Principal**:
1. El coordinador/decano accede a los resultados de evaluación de un docente.
2. El sistema muestra el desempeño del docente en diferentes criterios.
3. El coordinador/decano crea un plan de mejora especificando objetivos, indicadores y metas.
4. El sistema registra el plan y notifica al docente responsable.

**Flujos Alternativos**:
- Si no hay evaluaciones completadas para el docente, el sistema muestra un mensaje informativo.

#### CU-09: Seguimiento de Plan de Mejora
**Actor Principal**: Coordinador/Decano

**Flujo Principal**:
1. El coordinador/decano accede al módulo de seguimiento de planes.
2. El sistema muestra la lista de planes activos.
3. El coordinador/decano selecciona un plan y registra un seguimiento.
4. El coordinador/decano actualiza el porcentaje de avance y añade comentarios.
5. El sistema guarda el seguimiento y notifica al docente.

**Flujos Alternativos**:
- Si el plan ha sido completado, el sistema permite cerrarlo con observaciones finales.

#### CU-10: Actualización de Avances por Docente
**Actor Principal**: Docente

**Flujo Principal**:
1. El docente accede a sus planes de mejora asignados.
2. El sistema muestra los objetivos y metas pendientes.
3. El docente registra avances y carga evidencias.
4. El sistema actualiza el estado del plan.

### 3. Reportes y Estadísticas

#### CU-11: Generación de Reportes
**Actor Principal**: Administrador/Decano/Coordinador/Docente

**Flujo Principal**:
1. El usuario accede al módulo de reportes.
2. El sistema muestra las opciones de reportes disponibles.
3. El usuario selecciona el tipo de reporte y los filtros deseados.
4. El sistema genera y muestra el reporte.
5. El usuario puede exportar el reporte en diferentes formatos.

**Flujos Alternativos**:
- Si no hay datos suficientes, el sistema muestra un mensaje informativo.

#### CU-12: Visualización de Estadísticas
**Actor Principal**: Administrador/Decano/Coordinador

**Flujo Principal**:
1. El usuario accede al dashboard de estadísticas.
2. El sistema muestra gráficos y métricas clave sobre las evaluaciones.
3. El usuario puede filtrar por periodo, departamento o facultad.
4. El sistema actualiza las visualizaciones según los filtros aplicados.

### 4. Gestión de Alertas y Notificaciones

#### CU-13: Configuración de Alertas
**Actor Principal**: Administrador

**Flujo Principal**:
1. El administrador accede al módulo de configuración de alertas.
2. El sistema muestra los tipos de alertas disponibles.
3. El administrador configura los umbrales y destinatarios para cada tipo de alerta.
4. El sistema guarda la configuración.

#### CU-14: Gestión de Notificaciones
**Actor Principal**: Todos los usuarios

**Flujo Principal**:
1. El usuario accede a su bandeja de notificaciones.
2. El sistema muestra las notificaciones recibidas.
3. El usuario puede marcar notificaciones como leídas o eliminarlas.
4. El sistema actualiza el estado de las notificaciones.

### 5. Actas de Compromiso

#### CU-15: Generación de Acta de Compromiso
**Actor Principal**: Coordinador/Decano

**Flujo Principal**:
1. El coordinador/decano accede al módulo de actas de compromiso.
2. El sistema muestra la lista de docentes con evaluaciones bajas.
3. El coordinador/decano selecciona un docente y genera un acta de compromiso.
4. El sistema crea el documento con los compromisos y plazos.
5. El coordinador/decano y el docente firman el acta.

**Flujos Alternativos**:
- Si el docente rechaza firmar, el sistema registra la negativa y notifica a instancias superiores.

## Historias de Usuario

### Administrador

#### HU-01: Configuración del Sistema
**Como** administrador del sistema,  
**Quiero** poder configurar los parámetros globales del sistema,  
**Para** adaptar el funcionamiento a las necesidades institucionales.

**Criterios de Aceptación**:
- Puedo configurar los umbrales para alertas de bajo desempeño
- Puedo personalizar los mensajes automáticos del sistema

#### HU-02: Gestión de Usuarios
**Como** administrador del sistema,  
**Quiero** poder crear, editar y desactivar usuarios,  
**Para** mantener actualizada la base de usuarios del sistema.

**Criterios de Aceptación**:
- Puedo crear nuevos usuarios con información básica y asignarles roles
- Puedo editar la información de usuarios existentes
- Puedo desactivar usuarios sin eliminarlos permanentemente
- Puedo restablecer contraseñas de usuarios

#### HU-03: Reportes Institucionales
**Como** administrador del sistema,  
**Quiero** generar reportes consolidados del sistema evaluación docente,  
**Para** presentar informes a las directivas institucionales.

**Criterios de Aceptación**:
- Puedo generar reportes por facultad, departamento o programa
- Puedo filtrar reportes por periodo académico
- Puedo exportar los reportes en formatos PDF y Excel
- Los reportes incluyen gráficos comparativos y tendencias

### Coordinador/Decano

#### HU-04: Visión General de Facultad
**Como** Coordinador/Decano,  
**Quiero** ver un dashboard con indicadores clave de mi facultad,  
**Para** identificar rápidamente áreas de atención.

**Criterios de Aceptación**:
- Puedo ver el promedio de evaluación por departamento
- Puedo identificar los docentes con mejor y peor desempeño
- Puedo ver el porcentaje de evaluaciones completadas
- Puedo ver tendencias de evaluación entre periodos

#### HU-05: Gestión de Planes de Mejora
**Como** Coordinador/Decano,  
**Quiero** crear y dar seguimiento a planes de mejora para docentes con bajo desempeño,  
**Para** mejorar la calidad educativa de mi facultad.

**Criterios de Aceptación**:
- Puedo crear planes de mejora con objetivos específicos
- Puedo asignar fechas límite
- Puedo hacer seguimiento al avance de cada plan
- Recibo notificaciones sobre planes vencidos o en riesgo.

#### HU-07: Evaluación de Docentes
**Como** Coordinador/Decano de departamento,  
**Quiero** evaluar a los docentes bajo mi supervisión,  
**Para** contribuir a su evaluación integral de desempeño.

**Criterios de Aceptación**:
- Puedo ver la lista de docentes pendientes de evaluación
- Puedo completar formularios de evaluación con diferentes criterios
- Puedo adjuntar evidencias que respalden mi evaluación
- Puedo guardar borradores antes de enviar la evaluación final

#### HU-08: Seguimiento a Docentes
**Como** Coordinador/Decano de departamento,  
**Quiero** hacer seguimiento al desempeño de los docentes,  
**Para** identificar oportunidades de mejora y reconocer logros.

**Criterios de Aceptación**:
- Puedo ver el historial de evaluaciones de cada docente
- Puedo registrar observaciones periódicas sobre su desempeño
- Puedo programar reuniones de retroalimentación
- Recibo alertas sobre docentes con evaluaciones bajas

#### HU-09: Generación de Actas
**Como** Coordinador/Decano de departamento,  
**Quiero** generar actas de compromiso para docentes con bajo desempeño,  
**Para** formalizar acuerdos de mejora.

**Criterios de Aceptación**:
- Puedo seleccionar un docente y generar un acta personalizada
- El acta incluye compromisos específicos y plazos
- Puedo imprimir el acta para firmas físicas
- El sistema guarda una copia digital del acta firmada

### Docente

#### HU-11: Visualización de Resultados
**Como** docente,  
**Quiero** ver los resultados de mis evaluaciones,  
**Para** conocer mi desempeño y las áreas que debo mejorar.

**Criterios de Aceptación**:
- Puedo ver mis calificaciones por tipo de evaluación (estudiantes, administrativa, autoevaluación)
- Puedo ver comentarios y observaciones de las evaluaciones
- Puedo comparar mis resultados con periodos anteriores

#### HU-12: Gestión de Planes de Mejora
**Como** docente,  
**Quiero** gestionar mis planes de mejora asignados,  
**Para** cumplir con los compromisos adquiridos y mejorar mi desempeño.

**Criterios de Aceptación**:
- Puedo ver todos mis planes de mejora activos
- Puedo registrar avances en cada objetivo del plan
- Puedo cargar evidencias de las actividades realizadas
- Recibo recordatorios de fechas límite próximas