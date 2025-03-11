// Script para el Sistema de Evaluación Docentes

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Manejar clics en los elementos del menú
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior

            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));

            // Añadir clase active al link actual
            this.classList.add('active');

            // Implementar navegación entre páginas
            const linkText = this.textContent.trim();

            if (linkText.includes('Generar Acta de compromiso')) {
                window.location.href = 'acta-compromiso.html';
            } else if (linkText.includes('Inicio')) {
                window.location.href = 'index.html';
            } else if (linkText.includes('Seguimiento a plan de mejora')) {
                window.location.href = 'seguimiento-plan-mejora.html';
            } else if (linkText.includes('Salir')) {
                // Removing the duplicate confirmation dialog
                // The navigation.js file already handles the logout functionality
                return;
            }
        });
    });

    // Manejar clics en botones de evaluación
    const evaluarBtns = document.querySelectorAll('.btn-primary.btn-sm');
    evaluarBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const docenteInfo = this.closest('.list-group-item').querySelector('h6').textContent;
            alert(`Iniciando evaluación para: ${docenteInfo}`);
            // Aquí iría el código para abrir el formulario de evaluación
        });
    });

    // Manejar clics en botones "Ver todos"
    const verTodosBtns = document.querySelectorAll('.btn-light.btn-sm');
    verTodosBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const cardTitle = this.closest('.card-body').querySelector('.card-title').textContent;
            alert(`Mostrando lista completa de: ${cardTitle}`);
            // Aquí iría el código para mostrar la lista completa
        });
    });

    // Función para actualizar las estadísticas (simulación)
    function actualizarEstadisticas() {
        // En una aplicación real, estos datos vendrían de una API o base de datos
        const estadisticas = {
            totalDocentes: 45,
            evaluacionesCompletas: 32,
            evaluacionesPendientes: 13,
            promedioDepartamental: 4.2
        };

        // Actualizar los valores en la interfaz
        document.querySelector('.card-body h2:nth-of-type(1)').textContent = estadisticas.totalDocentes;
        document.querySelectorAll('.card-body h2')[1].textContent = estadisticas.evaluacionesCompletas;
        document.querySelectorAll('.card-body h2')[2].textContent = estadisticas.evaluacionesPendientes;
        document.querySelectorAll('.card-body h2')[3].textContent = `${estadisticas.promedioDepartamental}/5.0`;
    }

    // Simulación de actualización periódica de datos (cada 30 segundos)
    // setInterval(actualizarEstadisticas, 30000);

    // Función para calcular días restantes del periodo de evaluación
    function calcularDiasRestantes() {
        const fechaFin = new Date('2025-06-30');
        const hoy = new Date();
        const diferencia = fechaFin - hoy;
        const diasRestantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

        // Actualizar el mensaje en la alerta
        const alertaTexto = document.querySelector('.alert p.mb-0');
        alertaTexto.textContent = `El periodo de evaluación docente está activo hasta 2025-06-30. Te quedan ${diasRestantes} días para completar la autoevaluación`;
    }

    // Calcular días restantes al cargar la página
    calcularDiasRestantes();

    // Añadir funcionalidad de búsqueda (simulación)
    const buscarDocente = (nombre) => {
        console.log(`Buscando docente: ${nombre}`);
        // Aquí iría el código para filtrar la lista de docentes
    };

    // Ejemplo de cómo se podría implementar un buscador
    // const searchInput = document.querySelector('#search-docente');
    // if (searchInput) {
    //     searchInput.addEventListener('input', (e) => {
    //         buscarDocente(e.target.value);
    //     });
    // }
});

// Función para simular la generación de reportes
function generarReporte(tipo) {
    console.log(`Generando reporte de tipo: ${tipo}`);
    alert(`El reporte de ${tipo} se ha generado correctamente y está listo para descargar.`);
    // Aquí iría el código para generar y descargar reportes
}

// Función para simular la exportación de datos
function exportarDatos(formato) {
    console.log(`Exportando datos en formato: ${formato}`);
    alert(`Los datos han sido exportados en formato ${formato} correctamente.`);
    // Aquí iría el código para exportar datos
}