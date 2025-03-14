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
- **Accede** a la documentacion completa mediante el pdf:  
  [Proyecto_de_Evaluación_Docente.pdf](Documentacion/Proyecto_de_Evaluación_Docente.pdf)

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

```plaintext
ProyectoEvaluacionDocente/
├─ .git/                 # Carpeta de Git (versionado)
├─ Base de datos/
│   └─ sistema_evaluacion_docente.sql  # Script SQL (estructura de tablas)
├─ Documentacion/
│   └─ casos_uso_historias_usuario.md  # Documentos de requerimientos
├─ images/
│   ├─ FondoUniversidad.jpg
│   ├─ FondoUniversidad.png
│   └─ Logo Uniautonoma.png
├─ PanelAdministrador/
│   ├─ panel-admin.html
│   ├─ admin-script.js
│   └─ ...
├─ PanelDocente/
│   ├─ panel-docente.html
│   ├─ script.js
│   └─ ...
├─ acta-compromiso.html
├─ acta-script.js
├─ alertas-bajo-desempeno.html
├─ alertas-script.js
├─ index.html
├─ login.html
├─ login.js
├─ script.js
├─ styles.css
└─ README.md  # Este archivo
```

- La carpeta **Base de datos** contiene el script SQL para crear la estructura de la base de datos.
- **Documentacion** incluye casos de uso e historias de usuario que sustentan los requisitos funcionales.
- Las carpetas **PanelAdministrador** y **PanelDocente** agrupan los módulos y vistas específicos para cada rol.
- Se incluyen recursos gráficos en la carpeta **images**, con el logo y fondos institucionales.

---

## Requisitos

### Para el Frontend
- **Navegador web moderno** (Chrome, Firefox, Edge, Safari) con JavaScript habilitado.
- Acceso a internet o un servidor local para cargar correctamente todos los recursos (imágenes, scripts, hojas de estilo).

### Para el Backend (Futuro)
- **PHP 8.x** y **Composer** (para gestionar dependencias en Laravel).
- **MySQL 5.7+** o **MariaDB** para la base de datos.
- **Servidor Web** (Apache o Nginx) configurado para correr aplicaciones PHP.

> Actualmente, la integración con el backend aún está pendiente; el enfoque actual es el desarrollo del frontend.

---

## Instalación y Ejecución

### Abrir las páginas HTML directamente en tu navegador

- **Abre** `index.html` o `login.html` para probar el flujo de autenticación simulado.
- **Explora** las demás páginas (como `panel-docente.html`, `panel-admin.html`, etc.) para ver los diferentes módulos de la aplicación.

### (Opcional) Configurar un Servidor Local

- **Copia** la carpeta `ProyectoEvaluacionDocente` en el directorio raíz de tu servidor local (por ejemplo, en `htdocs` si usas XAMPP).
- **Accede** a la aplicación mediante:  
  [https://slarkz01.github.io/Proyecto_Evaluacion_Docente/](https://slarkz01.github.io/Proyecto_Evaluacion_Docente/)

### (Fase Futura) Integración con Backend

- **Importa** el archivo `Base de datos/sistema_evaluacion_docente.sql` en tu servidor MySQL para crear la estructura de la base de datos.
- **Configura** el proyecto Laravel (cuando se integre) para conectarlo a la base de datos.
- **Ajusta** las rutas de API y endpoints para reemplazar los datos simulados con datos reales.

---

## Uso de la Aplicación

- **Inicio de Sesión:**  
  La página `login.html` permite ingresar un usuario y contraseña (roles simulados) para acceder al sistema.

- **Panel de Administrador/Decano:**  
  - Gestiona períodos de evaluación y administra roles.
  - Revisa estadísticas de rendimiento docente.
  - Emite alertas de bajo desempeño y genera reportes de evaluación.

- **Panel de Docente:**  
  - Consulta estadísticas y resultados de sus evaluaciones.
  - Revisa planes de mejora y actas de compromiso (cuando corresponda).
  - Permite la configuración de datos personales (pendiente de persistencia real).

- **Reportes y Actas:**  
  - Se genera un PDF para actas de compromiso en caso de calificaciones menores a 4.
  - Se visualizan reportes y gráficos basados en datos simulados hasta integrar el backend.

---

## Requisitos y Estado del Sistema

El proyecto ha sido definido con una serie de **Requisitos Funcionales (RF)** y **Requisitos No Funcionales (RNF)**, los cuales han sido documentados y analizados detalladamente. Entre ellos se destacan:

- **RF01 a RF017:** Desde la autenticación de usuarios hasta el proceso de sanciones y generación de reportes. Muchos módulos están implementados parcialmente en el frontend y dependen de la futura integración del backend.
- **RNF01 a RNF09:** Aspectos críticos como seguridad, rendimiento, usabilidad, mantenibilidad, escalabilidad, cumplimiento normativo, interoperabilidad, y aseguramiento de la calidad. Muchos de estos requisitos están en fase de desarrollo o pendientes de pruebas formales.

Para mayor detalle, se incluye documentación y tablas de requisitos en la carpeta **Documentacion**.

---

## Metodología de Desarrollo

El proyecto se desarrolla siguiendo una metodología ágil (por ejemplo, **Scrum**), que incluye:

- **Planificación de sprints:** Definición y priorización de funcionalidades.
- **Reuniones diarias de seguimiento:** Para coordinar avances y detectar impedimentos.
- **Revisión y retrospectiva:** Al finalizar cada sprint, se evalúa el progreso y se ajusta el plan de trabajo.
- **Integración Continua (CI/CD):** Se planifica implementar pipelines automatizados para pruebas y despliegue (especialmente para la futura fase de backend).

---

## Contribución

¡Las contribuciones son bienvenidas! Para contribuir al proyecto, sigue estos pasos:

1. **Haz un fork** del repositorio.
2. **Crea una rama** con el nombre de la funcionalidad o corrección:
   ```bash
   git checkout -b feature/nueva-funcionalidad

3. **Realiza tus cambios** y haz commits con mensajes descriptivos.  
4. **Envia un pull request** a la rama principal (main o master según corresponda).  

> Se **recomienda** seguir buenas prácticas de desarrollo, documentación y estilo de código. Para **cambios sustanciales**, abre primero un issue para **discutir lo que deseas modificar.**

---

## Autores

- **Thomas Montoya Magon** – Frontend  
- **Juan Daniel Bravo** – Frontend  
- **Alejandro Martínez Salazar** – Backend (futuro)  
- **Daniel Rivas Agredo** – Base de Datos  
- **Luisa Julieth Joaqui** – Backend y Base de Datos

---

## Licencia

Este proyecto se encuentra bajo la licencia de tu preferencia (MIT, GPL, etc.). Asegúrate de incluir un archivo `LICENSE` en la raíz del repositorio con los términos de la licencia que desees aplicar.

---

## Contacto

Para preguntas, sugerencias o reportar errores, puedes crear un [issue](https://github.com/usuario/ProyectoEvaluacionDocente/issues) en el repositorio o contactar directamente a alguno de los autores.

---

¡Gracias por tu interés en el **Proyecto Evaluación Docente**! Con tu colaboración, podremos integrar el backend y mejorar la calidad educativa a través de un sistema de evaluación transparente, robusto y eficaz.
