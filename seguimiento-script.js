// Script específico para la página de Seguimiento a Plan de Mejora

// Datos de ejemplo para actas de compromiso
const actasCompromiso = [
    {
        id: 1,
        docente: { nombre: 'Jimena', apellido: 'Rodríguez', identificacion: '8765902345' },
        asignatura: 'Base de Datos',
        calificacion: 3.5,
        departamento: 'Ingeniería',
        numeroActa: '1234567890',
        fechaActa: '15/05/2023',
        progreso: 75,
        estado: 'activo',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Jimena Rodríguez</strong> de la asignatura <strong>Base de Datos</strong>.</p><p>La calificación obtenida fue de <strong>3.5</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Se recomienda mejorar la metodología de enseñanza y actualizar el material didáctico.</p>',
        notas: [
            { fecha: '20/05/2023', texto: 'Se realizó reunión inicial para discutir el plan de mejora. La docente se compromete a actualizar el material didáctico.', autor: 'Coordinador Ingeniería' },
            { fecha: '15/06/2023', texto: 'La docente ha mostrado avances significativos en la actualización del material didáctico. Se programará una nueva evaluación para el próximo mes.', autor: 'Decano Facultad' },
            { fecha: '10/07/2023', texto: 'Se realizó evaluación de seguimiento. La calificación ha mejorado a 3.8. Se continuará con el plan de mejora.', autor: 'Coordinador Ingeniería' }
        ]
    },
    {
        id: 2,
        docente: { nombre: 'Carlos', apellido: 'Mendoza', identificacion: '7654321098' },
        asignatura: 'Programación',
        calificacion: 3.8,
        departamento: 'Ingeniería',
        numeroActa: '2345678901',
        fechaActa: '20/05/2023',
        progreso: 50,
        estado: 'activo',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Carlos Mendoza</strong> de la asignatura <strong>Programación</strong>.</p><p>La calificación obtenida fue de <strong>3.8</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Se recomienda mejorar la interacción con los estudiantes y realizar más ejercicios prácticos.</p>',
        notas: [
            { fecha: '25/05/2023', texto: 'Se realizó reunión inicial para discutir el plan de mejora. El docente se compromete a implementar más ejercicios prácticos en clase.', autor: 'Coordinador Ingeniería' },
            { fecha: '20/06/2023', texto: 'El docente ha implementado más ejercicios prácticos. Los estudiantes reportan mayor satisfacción.', autor: 'Director Programa Ingeniería' }
        ]
    },
    {
        id: 3,
        docente: { nombre: 'Laura', apellido: 'Gómez', identificacion: '9876543210' },
        asignatura: 'Matemáticas',
        calificacion: 3.2,
        departamento: 'Ciencias Exactas',
        numeroActa: '3456789012',
        fechaActa: '10/05/2023',
        progreso: 30,
        estado: 'activo',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Laura Gómez</strong> de la asignatura <strong>Matemáticas</strong>.</p><p>La calificación obtenida fue de <strong>3.2</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Se recomienda simplificar la explicación de conceptos complejos y proporcionar más ejemplos.</p>',
        notas: [
            { fecha: '15/05/2023', texto: 'Se realizó reunión inicial para discutir el plan de mejora. La docente se compromete a simplificar sus explicaciones y proporcionar más ejemplos.', autor: 'Coordinador Ciencias Exactas' }
        ]
    },
    {
        id: 4,
        docente: { nombre: 'Fernando', apellido: 'Díaz', identificacion: '8901234567' },
        asignatura: 'Física',
        calificacion: 3.9,
        departamento: 'Ciencias Exactas',
        numeroActa: '4567890123',
        fechaActa: '05/05/2023',
        progreso: 90,
        estado: 'activo',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Fernando Díaz</strong> de la asignatura <strong>Física</strong>.</p><p>La calificación obtenida fue de <strong>3.9</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Se recomienda mejorar la puntualidad y la organización de las clases.</p>',
        notas: [
            { fecha: '10/05/2023', texto: 'Se realizó reunión inicial para discutir el plan de mejora. El docente se compromete a mejorar su puntualidad y organización.', autor: 'Coordinador Ciencias Exactas' },
            { fecha: '05/06/2023', texto: 'El docente ha mostrado una mejora significativa en su puntualidad. Las clases están mejor organizadas.', autor: 'Director Programa Ciencias' },
            { fecha: '01/07/2023', texto: 'Se realizó evaluación de seguimiento. La calificación ha mejorado a 4.1. Se cerrará el plan de mejora en la próxima reunión.', autor: 'Decano Facultad' }
        ]
    },
    {
        id: 5,
        docente: { nombre: 'Patricia', apellido: 'Vargas', identificacion: '7890123456' },
        asignatura: 'Química',
        calificacion: 3.7,
        departamento: 'Ciencias Exactas',
        numeroActa: '5678901234',
        fechaActa: '25/04/2023',
        progreso: 100,
        estado: 'cerrado',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Patricia Vargas</strong> de la asignatura <strong>Química</strong>.</p><p>La calificación obtenida fue de <strong>3.7</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Se recomienda mejorar la retroalimentación a los estudiantes y proporcionar más recursos de estudio.</p>',
        notas: [
            { fecha: '30/04/2023', texto: 'Se realizó reunión inicial para discutir el plan de mejora. La docente se compromete a mejorar la retroalimentación y proporcionar más recursos.', autor: 'Coordinador Ciencias Exactas' },
            { fecha: '25/05/2023', texto: 'La docente ha implementado un sistema de retroalimentación detallada para cada evaluación. Los estudiantes reportan mayor satisfacción.', autor: 'Director Programa Ciencias' },
            { fecha: '20/06/2023', texto: 'La docente ha creado un repositorio de recursos de estudio en línea. La participación de los estudiantes ha aumentado.', autor: 'Coordinador Ciencias Exactas' },
            { fecha: '15/07/2023', texto: 'Se realizó evaluación final. La calificación ha mejorado a 4.2. Se cierra el plan de mejora con éxito.', autor: 'Decano Facultad Ciencias' }
        ]
    },
    {
        id: 6,
        docente: { nombre: 'Roberto', apellido: 'Sánchez', identificacion: '6789012345' },
        asignatura: 'Literatura',
        calificacion: 3.4,
        departamento: 'Humanidades',
        numeroActa: '6789012345',
        fechaActa: '20/04/2023',
        progreso: 100,
        estado: 'cerrado',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Roberto Sánchez</strong> de la asignatura <strong>Literatura</strong>.</p><p>La calificación obtenida fue de <strong>3.4</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Se recomienda diversificar las lecturas y mejorar la participación en clase.</p>',
        notas: [
            { fecha: '25/04/2023', texto: 'Se realizó reunión inicial para discutir el plan de mejora. El docente se compromete a diversificar las lecturas y fomentar la participación.', autor: 'Coordinador Humanidades' },
            { fecha: '20/05/2023', texto: 'El docente ha implementado un nuevo sistema de participación en clase. Los estudiantes muestran mayor interés.', autor: 'Director Programa Humanidades' },
            { fecha: '15/06/2023', texto: 'El docente ha actualizado la lista de lecturas. Los estudiantes reportan mayor satisfacción con la diversidad de textos.', autor: 'Coordinador Humanidades' },
            { fecha: '10/07/2023', texto: 'Se realizó evaluación final. La calificación ha mejorado a 4.0. Se cierra el plan de mejora con éxito.', autor: 'Decano Facultad Humanidades' }
        ]
    },
    {
        id: 7,
        docente: { nombre: 'Ana', apellido: 'Martínez', identificacion: '5678901234' },
        asignatura: 'Historia',
        calificacion: 2.9,
        departamento: 'Humanidades',
        numeroActa: '7890123456',
        fechaActa: '15/04/2023',
        progreso: 40,
        estado: 'pendiente',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Ana Martínez</strong> de la asignatura <strong>Historia</strong>.</p><p>La calificación obtenida fue de <strong>2.9</strong>, lo cual está significativamente por debajo del umbral esperado de 4.0.</p><p>Se recomienda mejorar la metodología de enseñanza, actualizar el material didáctico y mejorar la interacción con los estudiantes.</p>',
        notas: [
            { fecha: '20/04/2023', texto: 'Se intentó realizar reunión inicial, pero la docente no asistió. Se reprogramará.', autor: 'Coordinador Humanidades' },
            { fecha: '25/04/2023', texto: 'Se realizó reunión inicial. La docente se muestra reticente a implementar cambios. Se programará seguimiento cercano.', autor: 'Director Programa Humanidades' },
            { fecha: '20/05/2023', texto: 'La docente ha mostrado poco avance en la implementación del plan de mejora. Se programará una reunión con el decano.', autor: 'Decano Facultad Humanidades' }
        ]
    },
    {
        id: 8,
        docente: { nombre: 'Miguel', apellido: 'López', identificacion: '4567890123' },
        asignatura: 'Algoritmos',
        calificacion: 3.6,
        departamento: 'Ingeniería',
        numeroActa: '8901234567',
        fechaActa: '10/04/2023',
        progreso: 100,
        estado: 'cerrado',
        retroalimentacion: '<p>Retroalimentación para el docente <strong>Miguel López</strong> de la asignatura <strong>Algoritmos</strong>.</p><p>La calificación obtenida fue de <strong>3.6</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Se recomienda mejorar la claridad en la explicación de algoritmos complejos y proporcionar más ejemplos prácticos.</p>',
        notas: [
            { fecha: '15/04/2023', texto: 'Se realizó reunión inicial para discutir el plan de mejora. El docente se compromete a mejorar la claridad de sus explicaciones y proporcionar más ejemplos.', autor: 'Coordinador Ingeniería' },
            { fecha: '10/05/2023', texto: 'El docente ha implementado nuevas técnicas de explicación. Los estudiantes reportan mayor comprensión de los temas.', autor: 'Director Programa Ingeniería' },
            { fecha: '05/06/2023', texto: 'El docente ha creado un repositorio de ejemplos prácticos. La participación de los estudiantes ha aumentado.', autor: 'Coordinador Ingeniería' },
            { fecha: '01/07/2023', texto: 'Se realizó evaluación final. La calificación ha mejorado a 4.1. Se cierra el plan de mejora con éxito.', autor: 'Decano Facultad Ingeniería' }
        ]
    }
];

// Función para cargar la tabla de seguimiento
function cargarTablaSeguimiento(actas = actasCompromiso) {
    const tabla = document.getElementById('tablaSeguimiento');
    const tbody = tabla.querySelector('tbody');

    // Limpiar tabla
    tbody.innerHTML = '';

    // Actualizar contadores
    document.getElementById('totalActas').textContent = actas.length;
    document.getElementById('actasActivas').textContent = actas.filter(a => a.estado === 'activo').length;
    document.getElementById('actasCerradas').textContent = actas.filter(a => a.estado === 'cerrado').length;

    // Agregar filas a la tabla
    actas.forEach(acta => {
        const tr = document.createElement('tr');

        // Definir el color de la calificación
        let colorCalificacion = '';
        if (acta.calificacion < 3.0) {
            colorCalificacion = 'text-danger fw-bold';
        } else if (acta.calificacion < 3.5) {
            colorCalificacion = 'text-warning fw-bold';
        } else {
            colorCalificacion = 'text-primary fw-bold';
        }

        // Definir la clase del badge de estado
        let estadoClass = '';
        switch (acta.estado) {
            case 'activo':
                estadoClass = 'badge-estado badge-activo';
                break;
            case 'cerrado':
                estadoClass = 'badge-estado badge-cerrado';
                break;
            case 'pendiente':
                estadoClass = 'badge-estado badge-pendiente';
                break;
            default:
                estadoClass = 'badge-estado badge-activo';
        }

        // Crear contenido de la fila
        tr.innerHTML = `
            <td>${acta.docente.nombre} ${acta.docente.apellido}</td>
            <td>${acta.departamento}</td>
            <td>${acta.asignatura}</td>
            <td class="${colorCalificacion}">${acta.calificacion.toFixed(1)}</td>
            <td>${acta.fechaActa}</td>
            <td>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${acta.progreso}%" 
                        aria-valuenow="${acta.progreso}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="ms-2">${acta.progreso}%</small>
            </td>
            <td><span class="badge ${estadoClass}">${acta.estado.charAt(0).toUpperCase() + acta.estado.slice(1)}</span></td>
            <td>
                <button class="btn btn-primary btn-sm btn-circle ver-detalles" data-id="${acta.id}" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // Agregar eventos a los botones de ver detalles
    document.querySelectorAll('.ver-detalles').forEach(btn => {
        btn.addEventListener('click', function () {
            const actaId = parseInt(this.getAttribute('data-id'));
            mostrarDetallesActa(actaId);
        });
    });
}

// Función para mostrar los detalles de un acta en el modal
function mostrarDetallesActa(id) {
    const acta = actasCompromiso.find(a => a.id === id);
    if (!acta) return;

    // Actualizar información del docente
    document.getElementById('modalNombreDocente').textContent = `${acta.docente.nombre} ${acta.docente.apellido}`;
    document.getElementById('modalDepartamento').textContent = acta.departamento;
    document.getElementById('modalAsignatura').textContent = acta.asignatura;

    // Actualizar información del acta
    document.getElementById('modalNumeroActa').textContent = acta.numeroActa;
    document.getElementById('modalFechaActa').textContent = acta.fechaActa;

    // Actualizar calificación con color
    const modalCalificacion = document.getElementById('modalCalificacion');
    modalCalificacion.textContent = acta.calificacion.toFixed(1);
    if (acta.calificacion < 3.0) {
        modalCalificacion.className = 'text-danger fw-bold';
    } else if (acta.calificacion < 3.5) {
        modalCalificacion.className = 'text-warning fw-bold';
    } else {
        modalCalificacion.className = 'text-primary fw-bold';
    }

    // Actualizar retroalimentación
    document.getElementById('modalRetroalimentacion').innerHTML = acta.retroalimentacion;

    // Actualizar historial de notas
    const historialNotas = document.getElementById('historialNotas');
    historialNotas.innerHTML = '';

    if (acta.notas && acta.notas.length > 0) {
        acta.notas.forEach(nota => {
            const notaElement = document.createElement('div');
            notaElement.className = 'nota-seguimiento';
            notaElement.innerHTML = `
                <div class="d-flex justify-content-between">
                    <span class="fw-bold">${nota.autor}</span>
                    <span class="nota-fecha">${nota.fecha}</span>
                </div>
                <p class="mb-0 mt-1">${nota.texto}</p>
            `;
            historialNotas.appendChild(notaElement);
        });
    } else {
        historialNotas.innerHTML = '<p class="text-muted">No hay notas de seguimiento registradas.</p>';
    }

    // Actualizar progreso
    document.getElementById('modalProgresoBar').style.width = `${acta.progreso}%`;
    document.getElementById('modalProgresoBar').setAttribute('aria-valuenow', acta.progreso);
    document.getElementById('modalProgresoTexto').textContent = `${acta.progreso}%`;

    // Actualizar estado
    const modalEstadoBadge = document.getElementById('modalEstadoBadge');
    modalEstadoBadge.textContent = acta.estado.charAt(0).toUpperCase() + acta.estado.slice(1);
    modalEstadoBadge.className = 'badge badge-estado';
    switch (acta.estado) {
        case 'activo':
            modalEstadoBadge.classList.add('badge-activo');
            break;
        case 'cerrado':
            modalEstadoBadge.classList.add('badge-cerrado');
            break;
        case 'pendiente':
            modalEstadoBadge.classList.add('badge-pendiente');
            break;
    }

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalDetallesSeguimiento'));
    modal.show();
}

// Función para filtrar actas según los criterios seleccionados
function filtrarActas() {
    const departamento = document.getElementById('departamentoFilter').value;
    const estado = document.getElementById('estadoFilter').value;
    const busqueda = document.getElementById('searchInput').value.toLowerCase();

    let actasFiltradas = [...actasCompromiso];

    // Filtrar por departamento
    if (departamento) {
        actasFiltradas = actasFiltradas.filter(acta => acta.departamento === departamento);
    }

    // Filtrar por estado
    if (estado) {
        actasFiltradas = actasFiltradas.filter(acta => acta.estado === estado);
    }

    // Filtrar por búsqueda
    if (busqueda) {
        actasFiltradas = actasFiltradas.filter(acta => {
            const nombreCompleto = `${acta.docente.nombre} ${acta.docente.apellido}`.toLowerCase();
            return nombreCompleto.includes(busqueda) ||
                acta.asignatura.toLowerCase().includes(busqueda) ||
                acta.departamento.toLowerCase().includes(busqueda);
        });
    }

    // Actualizar la tabla con los resultados filtrados
    cargarTablaSeguimiento(actasFiltradas);
}

// Función para agregar una nueva nota de seguimiento
function agregarNotaSeguimiento(actaId, texto) {
    const acta = actasCompromiso.find(a => a.id === actaId);
    if (!acta) return false;

    // Obtener fecha actual
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();
    const fechaActual = `${dia}/${mes}/${anio}`;

    // Crear nueva nota
    const nuevaNota = {
        fecha: fechaActual,
        texto: texto,
        autor: 'Coordinador ' + acta.departamento // Usar el departamento para personalizar el autor
    };

    // Agregar la nota al acta
    acta.notas.push(nuevaNota);

    return true;
}

// Función para actualizar el progreso de un plan de mejora
function actualizarProgreso(actaId, nuevoProgreso) {
    const acta = actasCompromiso.find(a => a.id === actaId);
    if (!acta) return false;

    // Actualizar el progreso
    acta.progreso = nuevoProgreso;

    // Si el progreso es 100%, preguntar si desea cerrar el acta
    if (nuevoProgreso === 100 && acta.estado !== 'cerrado') {
        if (confirm('El progreso ha llegado al 100%. ¿Desea cerrar el acta de compromiso?')) {
            acta.estado = 'cerrado';
        }
    }

    return true;
}

// Función para cambiar el estado de un acta
function cambiarEstadoActa(actaId, nuevoEstado) {
    const acta = actasCompromiso.find(a => a.id === actaId);
    if (!acta) return false;

    // Actualizar el estado
    acta.estado = nuevoEstado;

    return true;
}

// Función para generar un informe de seguimiento
function generarInformeSeguimiento(actaId) {
    const acta = actasCompromiso.find(a => a.id === actaId);
    if (!acta) return false;

    // Llamar a la función de generación de PDF implementada en seguimiento-pdf-generator.js
    if (typeof generarPDFSeguimiento === 'function') {
        return generarPDFSeguimiento(actaId);
    } else {
        alert('Error: No se pudo cargar el generador de PDF para el informe de seguimiento.');
        return false;
    }
}

// Inicializar la página cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Cargar la tabla de seguimiento
    cargarTablaSeguimiento();

    // Agregar eventos a los filtros
    document.getElementById('departamentoFilter').addEventListener('change', filtrarActas);
    document.getElementById('estadoFilter').addEventListener('change', filtrarActas);
    document.getElementById('searchInput').addEventListener('input', filtrarActas);

    // Evento para agregar nota
    document.getElementById('btnAgregarNota').addEventListener('click', function () {
        const actaId = parseInt(document.querySelector('.ver-detalles[data-id]').getAttribute('data-id'));
        const texto = prompt('Ingrese la nota de seguimiento:');
        if (texto) {
            if (agregarNotaSeguimiento(actaId, texto)) {
                mostrarDetallesActa(actaId); // Actualizar modal
                alert('Nota agregada correctamente.');
            }
        }
    });

    // Evento para actualizar progreso
    document.getElementById('btnActualizarProgreso').addEventListener('click', function () {
        const actaId = parseInt(document.querySelector('.ver-detalles[data-id]').getAttribute('data-id'));
        const nuevoProgreso = prompt('Ingrese el nuevo porcentaje de progreso (0-100):', '0');
        if (nuevoProgreso !== null) {
            const progreso = parseInt(nuevoProgreso);
            if (!isNaN(progreso) && progreso >= 0 && progreso <= 100) {
                if (actualizarProgreso(actaId, progreso)) {
                    mostrarDetallesActa(actaId); // Actualizar modal
                    cargarTablaSeguimiento(); // Actualizar tabla
                    alert('Progreso actualizado correctamente.');
                }
            } else {
                alert('Por favor, ingrese un número válido entre 0 y 100.');
            }
        }
    });

    // Evento para cambiar estado
    document.getElementById('btnCambiarEstado').addEventListener('click', function () {
        const actaId = parseInt(document.querySelector('.ver-detalles[data-id]').getAttribute('data-id'));
        const acta = actasCompromiso.find(a => a.id === actaId);
        if (!acta) return;

        let nuevoEstado = '';
        if (acta.estado === 'activo') {
            nuevoEstado = confirm('¿Desea cerrar el acta de compromiso?') ? 'cerrado' : 'activo';
        } else if (acta.estado === 'cerrado') {
            nuevoEstado = confirm('¿Desea reabrir el acta de compromiso?') ? 'activo' : 'cerrado';
        } else if (acta.estado === 'pendiente') {
            nuevoEstado = confirm('¿Desea activar el acta de compromiso?') ? 'activo' : 'pendiente';
        }

        if (nuevoEstado && nuevoEstado !== acta.estado) {
            if (cambiarEstadoActa(actaId, nuevoEstado)) {
                mostrarDetallesActa(actaId); // Actualizar modal
                cargarTablaSeguimiento(); // Actualizar tabla
                alert('Estado actualizado correctamente.');
            }
        }
    });

    // Evento para generar informe
    document.getElementById('btnGenerarInforme').addEventListener('click', function () {
        const actaId = parseInt(document.querySelector('.ver-detalles[data-id]').getAttribute('data-id'));
        generarInformeSeguimiento(actaId);
    });

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
            } else if (linkText.includes('Salir')) {
                if (confirm('¿Está seguro que desea salir del sistema?')) {
                    alert('Sesión finalizada');
                    window.location.href = 'index.html';
                }
            }
        });
    });
});