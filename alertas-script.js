// Script específico para la página de Alertas de Bajo Desempeño

// Datos de ejemplo para docentes con desempeño bajo 3.0
// Utilizamos los mismos datos que en sancion-script.js y añadimos algunos más
const docentes = [
    { id: 1, nombre: 'Ana', apellido: 'Martínez', identificacion: '5678901234', asignatura: 'Historia', calificacion: 2.9, departamento: 'Humanidades' },
    { id: 2, nombre: 'Juan', apellido: 'Pérez', identificacion: '1234567890', asignatura: 'Física', calificacion: 2.7, departamento: 'Ciencias Exactas' },
    { id: 3, nombre: 'María', apellido: 'López', identificacion: '9876543210', asignatura: 'Matemáticas', calificacion: 2.8, departamento: 'Ciencias Exactas' },
    { id: 4, nombre: 'Pedro', apellido: 'González', identificacion: '4567890123', asignatura: 'Programación', calificacion: 2.5, departamento: 'Ingeniería' },
    { id: 5, nombre: 'Lucía', apellido: 'Ramírez', identificacion: '3456789012', asignatura: 'Estadística', calificacion: 2.4, departamento: 'Ciencias Exactas' },
    { id: 6, nombre: 'Javier', apellido: 'Torres', identificacion: '2345678901', asignatura: 'Bases de Datos', calificacion: 2.6, departamento: 'Ingeniería' }
];

// Función para generar las tarjetas de alerta
function generarTarjetasAlerta(docentesFiltrados) {
    const listaAlertas = document.getElementById('listaAlertas');
    const sinAlertas = document.getElementById('sinAlertas');
    
    // Limpiar el contenedor de alertas
    listaAlertas.innerHTML = '';
    
    // Actualizar contador de alertas
    document.getElementById('totalAlertas').textContent = docentesFiltrados.length;
    
    // Mostrar mensaje si no hay alertas
    if (docentesFiltrados.length === 0) {
        sinAlertas.classList.remove('d-none');
        return;
    } else {
        sinAlertas.classList.add('d-none');
    }
    
    // Generar tarjetas para cada docente
    docentesFiltrados.forEach(docente => {
        // Determinar clase CSS para el departamento
        let deptClass = '';
        switch (docente.departamento) {
            case 'Ingeniería':
                deptClass = 'dept-ingenieria';
                break;
            case 'Ciencias Exactas':
                deptClass = 'dept-ciencias';
                break;
            case 'Humanidades':
                deptClass = 'dept-humanidades';
                break;
            default:
                deptClass = 'bg-secondary';
        }
        
        // Crear elemento de tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'col-md-6 mb-4';
        tarjeta.innerHTML = `
            <div class="card alerta-card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2 text-center">
                            <i class="fas fa-exclamation-triangle alerta-icon"></i>
                        </div>
                        <div class="col-md-10">
                            <h5 class="card-title">${docente.nombre} ${docente.apellido}</h5>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge badge-departamento ${deptClass}">${docente.departamento}</span>
                                <span class="calificacion-critica">${docente.calificacion.toFixed(1)}</span>
                            </div>
                            <p class="mb-2"><strong>Asignatura:</strong> ${docente.asignatura}</p>
                            <p class="mb-3"><strong>Identificación:</strong> ${docente.identificacion}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-danger"><i class="fas fa-exclamation-circle me-1"></i>Requiere atención inmediata</span>
                                <button class="btn btn-sancion" onclick="redirigirAProceso(${docente.id})">
                                    <i class="fas fa-user-minus me-1"></i>Iniciar Proceso
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        listaAlertas.appendChild(tarjeta);
    });
}

// Función para filtrar docentes según criterios seleccionados
function filtrarDocentes() {
    const departamento = document.getElementById('departamentoSelect').value;
    const calificacionRango = document.getElementById('calificacionSelect').value;
    
    // Filtrar docentes por departamento
    let docentesFiltrados = [...docentes];
    
    if (departamento) {
        docentesFiltrados = docentesFiltrados.filter(d => d.departamento === departamento);
    }
    
    // Filtrar por rango de calificación
    if (calificacionRango) {
        switch (calificacionRango) {
            case '1': // Menor a 2.5
                docentesFiltrados = docentesFiltrados.filter(d => d.calificacion < 2.5);
                break;
            case '2': // Entre 2.5 y 2.8
                docentesFiltrados = docentesFiltrados.filter(d => d.calificacion >= 2.5 && d.calificacion < 2.8);
                break;
            case '3': // Entre 2.8 y 3.0
                docentesFiltrados = docentesFiltrados.filter(d => d.calificacion >= 2.8 && d.calificacion < 3.0);
                break;
        }
    }
    
    // Generar tarjetas con los docentes filtrados
    generarTarjetasAlerta(docentesFiltrados);
}

// Función para redirigir a la página de proceso de sanción con el ID del docente
function redirigirAProceso(docenteId) {
    // Guardar el ID del docente en localStorage para recuperarlo en la página de proceso
    localStorage.setItem('docenteProcesoId', docenteId);
    // Redirigir a la página de proceso de sanción
    window.location.href = 'proceso-sancion-retiro.html';
}

// Asignar la función al objeto window para que sea accesible desde el HTML
window.redirigirAProceso = redirigirAProceso;

document.addEventListener('DOMContentLoaded', function () {
    // Manejar clics en los elementos del menú
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevenir navegación por defecto
            e.preventDefault();

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
            } else if (linkText.includes('Alertas de bajo desempeño')) {
                window.location.href = 'alertas-bajo-desempeno.html';
            } else if (linkText.includes('Proceso de Sanciones/Retiro')) {
                window.location.href = 'proceso-sancion-retiro.html';
            } else if (linkText.includes('Salir')) {
                if (confirm('¿Está seguro que desea salir del sistema?')) {
                    alert('Sesión finalizada');
                    window.location.href = 'index.html';
                }
            }
        });
    });

    // Evento para el botón de aplicar filtros
    const aplicarFiltrosBtn = document.getElementById('aplicarFiltros');
    if (aplicarFiltrosBtn) {
        aplicarFiltrosBtn.addEventListener('click', filtrarDocentes);
    }

    // Cargar todas las alertas al iniciar la página
    generarTarjetasAlerta(docentes);
});