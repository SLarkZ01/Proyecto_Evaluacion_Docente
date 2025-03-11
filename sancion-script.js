// Script específico para la página de Proceso de Sanción o Retiro

// Datos de ejemplo para docentes con desempeño bajo 3.0
const docentes = [
    { id: 1, nombre: 'Ana', apellido: 'Martínez', identificacion: '5678901234', asignatura: 'Historia', calificacion: 2.9, departamento: 'Humanidades' },
    { id: 2, nombre: 'Juan', apellido: 'Pérez', identificacion: '1234567890', asignatura: 'Física', calificacion: 2.7, departamento: 'Ciencias Exactas' },
    { id: 3, nombre: 'María', apellido: 'López', identificacion: '9876543210', asignatura: 'Matemáticas', calificacion: 2.8, departamento: 'Ciencias Exactas' },
    { id: 4, nombre: 'Pedro', apellido: 'González', identificacion: '4567890123', asignatura: 'Programación', calificacion: 2.5, departamento: 'Ingeniería' },
    { id: 5, nombre: 'Lucía', apellido: 'Ramírez', identificacion: '3456789012', asignatura: 'Estadística', calificacion: 2.4, departamento: 'Ciencias Exactas' },
    { id: 6, nombre: 'Javier', apellido: 'Torres', identificacion: '2345678901', asignatura: 'Bases de Datos', calificacion: 2.6, departamento: 'Ingeniería' }
];

// Generar número de resolución aleatorio
function generarNumeroResolucion() {
    return 'RES-' + Math.floor(Math.random() * 9000) + 1000 + '-' + new Date().getFullYear();
}

// Establecer fecha actual
function establecerFechaActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

// Función global para cargar datos del docente
function cargarDatosDocente(id) {
    const docente = docentes.find(d => d.id === parseInt(id));
    if (docente) {
        // Actualizar número de resolución
        document.getElementById('numeroResolucion').value = generarNumeroResolucion();

        // Actualizar fecha de emisión
        document.getElementById('fechaEmision').value = establecerFechaActual();

        // Actualizar datos del docente
        document.getElementById('nombreDocente').value = docente.nombre;
        document.getElementById('apellidoDocente').value = docente.apellido;
        document.getElementById('identificacionDocente').value = docente.identificacion;
        document.getElementById('asignaturaDocente').value = docente.asignatura;

        // Actualizar calificación
        const calificacionInput = document.getElementById('calificacionDocente');
        calificacionInput.value = docente.calificacion.toFixed(1);

        // Aplicar estilo según calificación
        if (docente.calificacion < 3.0) {
            calificacionInput.style.color = '#dc3545'; // Rojo para calificaciones muy bajas
            calificacionInput.style.fontWeight = 'bold';
            // Preseleccionar sanción más severa para calificaciones muy bajas
            document.getElementById('tipoSancionSelect').value = 'retiro';
        } else if (docente.calificacion < 3.5) {
            calificacionInput.style.color = '#fd7e14'; // Naranja para calificaciones bajas
            calificacionInput.style.fontWeight = 'bold';
            // Preseleccionar sanción intermedia para calificaciones bajas
            document.getElementById('tipoSancionSelect').value = 'grave';
        } else {
            calificacionInput.style.color = '#ffc107'; // Amarillo para calificaciones cercanas a 3
            calificacionInput.style.fontWeight = 'bold';
            // Preseleccionar sanción leve para calificaciones cercanas al umbral
            document.getElementById('tipoSancionSelect').value = 'leve';
        }

        // Actualizar el contenido de los editores Summernote con mensajes personalizados
        actualizarContenidoEditores(docente);
    }
}

// Función para actualizar el contenido de los editores Summernote
function actualizarContenidoEditores(docente) {
    // Antecedentes
    const antecedentes = $('div#antecedentes');
    if (antecedentes.length) {
        let mensaje = `<p>El/La docente <strong>${docente.nombre} ${docente.apellido}</strong> de la asignatura <strong>${docente.asignatura}</strong> `;
        mensaje += `ha obtenido una calificación de <strong>${docente.calificacion.toFixed(1)}</strong> en su evaluación de desempeño, `;
        mensaje += `lo cual está por debajo del umbral mínimo aceptable de 3.0 establecido por la Corporación Universitaria Autónoma del Cauca.</p>`;
        
        if (docente.calificacion < 3.0) {
            mensaje += `<p>Se evidencia un desempeño crítico que requiere medidas inmediatas. El docente ha tenido oportunidades previas para mejorar su desempeño a través del plan de mejora, sin mostrar avances significativos.</p>`;
        } else if (docente.calificacion < 3.5) {
            mensaje += `<p>Se ha identificado un desempeño deficiente que afecta la calidad educativa. A pesar de las recomendaciones y planes de mejora implementados, no se han observado los avances esperados.</p>`;
        } else {
            mensaje += `<p>Se ha identificado un desempeño por debajo del estándar institucional. El docente ha participado en planes de mejora previos con resultados insuficientes.</p>`;
        }
        
        antecedentes.summernote('code', mensaje);
    }

    // Fundamentos Normativos
    const fundamentos = $('div#fundamentos');
    if (fundamentos.length) {
        let mensaje = `<p>La presente resolución se fundamenta en las siguientes normativas institucionales:</p>`;
        mensaje += `<ul>`;
        mensaje += `<li><strong>Estatuto Docente de la Corporación Universitaria Autónoma del Cauca</strong>, Capítulo IV, Artículos 45-52, que establecen el régimen disciplinario aplicable al personal docente.</li>`;
        mensaje += `<li><strong>Reglamento Interno de Trabajo</strong>, Título III, que regula las causales y procedimientos para sanciones y terminación de contratos.</li>`;
        mensaje += `<li><strong>Sistema de Evaluación Docente</strong>, que establece los criterios de calidad y desempeño esperados, así como las consecuencias de no alcanzar los estándares mínimos requeridos.</li>`;
        mensaje += `<li><strong>Acuerdo del Consejo Superior No. 023 de 2022</strong>, que establece el procedimiento para la aplicación de medidas disciplinarias en casos de bajo desempeño docente.</li>`;
        mensaje += `</ul>`;
        
        fundamentos.summernote('code', mensaje);
    }

    // Resolución
    const resolucion = $('div#resolucion');
    if (resolucion.length) {
        let mensaje = '';
        const tipoSancion = document.getElementById('tipoSancionSelect').value;
        
        if (docente.calificacion < 3.0) {
            mensaje = `<p><strong>RESUELVE:</strong></p>`;
            mensaje += `<p>PRIMERO: Dar por terminado el contrato laboral con el/la docente <strong>${docente.nombre} ${docente.apellido}</strong>, identificado(a) con documento número <strong>${docente.identificacion}</strong>, `;
            mensaje += `quien se desempeña como docente de la asignatura <strong>${docente.asignatura}</strong> en el departamento de <strong>${docente.departamento}</strong>, `;
            mensaje += `con efectividad a partir del día siguiente a la notificación de la presente resolución.</p>`;
            mensaje += `<p>SEGUNDO: Notificar personalmente al/la docente del contenido de esta resolución, informándole que contra la misma procede el recurso de reposición ante la Rectoría, `;
            mensaje += `dentro de los cinco (5) días hábiles siguientes a la notificación.</p>`;
            mensaje += `<p>TERCERO: Remitir copia de la presente resolución a la Oficina de Talento Humano para los trámites administrativos correspondientes.</p>`;
        } else if (docente.calificacion < 3.5) {
            mensaje = `<p><strong>RESUELVE:</strong></p>`;
            mensaje += `<p>PRIMERO: Imponer sanción disciplinaria de suspensión temporal por un período de un (1) mes al/la docente <strong>${docente.nombre} ${docente.apellido}</strong>, `;
            mensaje += `identificado(a) con documento número <strong>${docente.identificacion}</strong>, quien se desempeña como docente de la asignatura <strong>${docente.asignatura}</strong> `;
            mensaje += `en el departamento de <strong>${docente.departamento}</strong>.</p>`;
            mensaje += `<p>SEGUNDO: Durante el período de suspensión, el/la docente deberá participar en un programa intensivo de capacitación pedagógica diseñado por la Vicerrectoría Académica.</p>`;
            mensaje += `<p>TERCERO: Notificar personalmente al/la docente del contenido de esta resolución, informándole que contra la misma procede el recurso de reposición ante la Rectoría, `;
            mensaje += `dentro de los cinco (5) días hábiles siguientes a la notificación.</p>`;
        } else if (tipoSancion === 'leve') {
            mensaje = `<p><strong>RESUELVE:</strong></p>`;
            mensaje += `<p>PRIMERO: Imponer sanción disciplinaria de amonestación escrita al/la docente <strong>${docente.nombre} ${docente.apellido}</strong>, `;
            mensaje += `identificado(a) con documento número <strong>${docente.identificacion}</strong>, quien se desempeña como docente de la asignatura <strong>${docente.asignatura}</strong> `;
            mensaje += `en el departamento de <strong>${docente.departamento}</strong>.</p>`;
            mensaje += `<p>SEGUNDO: El/La docente deberá presentar un plan de mejoramiento detallado en un plazo no mayor a quince (15) días calendario, `;
            mensaje += `el cual será evaluado y monitoreado mensualmente por la coordinación académica correspondiente.</p>`;
            mensaje += `<p>TERCERO: Notificar personalmente al/la docente del contenido de esta resolución, informándole que contra la misma procede el recurso de reposición ante la Rectoría, `;
            mensaje += `dentro de los cinco (5) días hábiles siguientes a la notificación.</p>`;
        }
        
        resolucion.summernote('code', mensaje);
    }
}

// Asignar la función al objeto window para que sea accesible desde el HTML
window.cargarDatosDocente = cargarDatosDocente;

// Función para actualizar el contenido según el tipo de sanción seleccionado
function actualizarContenidoSegunSancion() {
    const tipoSancion = document.getElementById('tipoSancionSelect').value;
    const docente = docentes.find(d => d.id === parseInt($('#docenteSelect').val()));
    
    if (!docente) return;
    
    // Actualizar resolución según el tipo de sanción seleccionado
    const resolucion = $('div#resolucion');
    if (resolucion.length) {
        let mensaje = '';
        
        if (tipoSancion === 'retiro') {
            mensaje = `<p><strong>RESUELVE:</strong></p>`;
            mensaje += `<p>PRIMERO: Dar por terminado el contrato laboral con el/la docente <strong>${docente.nombre} ${docente.apellido}</strong>, identificado(a) con documento número <strong>${docente.identificacion}</strong>, `;
            mensaje += `quien se desempeña como docente de la asignatura <strong>${docente.asignatura}</strong> en el departamento de <strong>${docente.departamento}</strong>, `;
            mensaje += `con efectividad a partir del día siguiente a la notificación de la presente resolución.</p>`;
            mensaje += `<p>SEGUNDO: Notificar personalmente al/la docente del contenido de esta resolución, informándole que contra la misma procede el recurso de reposición ante la Rectoría, `;
            mensaje += `dentro de los cinco (5) días hábiles siguientes a la notificación.</p>`;
            mensaje += `<p>TERCERO: Remitir copia de la presente resolución a la Oficina de Talento Humano para los trámites administrativos correspondientes.</p>`;
        } else if (tipoSancion === 'grave') {
            mensaje = `<p><strong>RESUELVE:</strong></p>`;
            mensaje += `<p>PRIMERO: Imponer sanción disciplinaria de suspensión temporal por un período de un (1) mes al/la docente <strong>${docente.nombre} ${docente.apellido}</strong>, `;
            mensaje += `identificado(a) con documento número <strong>${docente.identificacion}</strong>, quien se desempeña como docente de la asignatura <strong>${docente.asignatura}</strong> `;
            mensaje += `en el departamento de <strong>${docente.departamento}</strong>.</p>`;
            mensaje += `<p>SEGUNDO: Durante el período de suspensión, el/la docente deberá participar en un programa intensivo de capacitación pedagógica diseñado por la Vicerrectoría Académica.</p>`;
            mensaje += `<p>TERCERO: Notificar personalmente al/la docente del contenido de esta resolución, informándole que contra la misma procede el recurso de reposición ante la Rectoría, `;
            mensaje += `dentro de los cinco (5) días hábiles siguientes a la notificación.</p>`;
        } else if (tipoSancion === 'leve') {
            mensaje = `<p><strong>RESUELVE:</strong></p>`;
            mensaje += `<p>PRIMERO: Imponer sanción disciplinaria de amonestación escrita al/la docente <strong>${docente.nombre} ${docente.apellido}</strong>, `;
            mensaje += `identificado(a) con documento número <strong>${docente.identificacion}</strong>, quien se desempeña como docente de la asignatura <strong>${docente.asignatura}</strong> `;
            mensaje += `en el departamento de <strong>${docente.departamento}</strong>.</p>`;
            mensaje += `<p>SEGUNDO: El/La docente deberá presentar un plan de mejoramiento detallado en un plazo no mayor a quince (15) días calendario, `;
            mensaje += `el cual será evaluado y monitoreado mensualmente por la coordinación académica correspondiente.</p>`;
            mensaje += `<p>TERCERO: Notificar personalmente al/la docente del contenido de esta resolución, informándole que contra la misma procede el recurso de reposición ante la Rectoría, `;
            mensaje += `dentro de los cinco (5) días hábiles siguientes a la notificación.</p>`;
        }
        
        resolucion.summernote('code', mensaje);
    }
}

// Asignar la función al objeto window para que sea accesible desde el HTML
window.actualizarContenidoSegunSancion = actualizarContenidoSegunSancion;

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar Select2 con datos dinámicos
    $('.select2-docentes').select2({
        placeholder: 'Buscar docente...',
        allowClear: true,
        data: docentes.map(d => ({
            id: d.id,
            text: `${d.nombre} ${d.apellido} - ${d.asignatura} (${d.calificacion})`
        })),
        matcher: function (params, data) {
            // Si no hay término de búsqueda, devolver todos los elementos
            if (!params.term) {
                return data;
            }

            // Convertir término de búsqueda a minúsculas para comparación insensible a mayúsculas
            const term = params.term.toLowerCase();

            // Verificar si el texto del elemento contiene el término de búsqueda
            if (data.text.toLowerCase().indexOf(term) > -1) {
                return data;
            }

            // Si no hay coincidencia, devolver null
            return null;
        }
    });

    // Evento para el cambio de docente en el selector
    $('#docenteSelect').on('change', function () {
        const docenteId = $(this).val();
        if (docenteId) {
            cargarDatosDocente(docenteId);
        } else {
            limpiarFormulario();
        }
    });

    // Función para filtrar docentes según departamento y rango de calificación
    function filtrarDocentes() {
        const departamento = document.getElementById('departamentoSelect').value;
        const calificacionRango = document.getElementById('calificacionSelect').value;

        // Filtrar docentes
        let docentesFiltrados = [...docentes];

        if (departamento) {
            const deptoMap = {
                '1': 'Ciencias Exactas',
                '2': 'Ingeniería',
                '3': 'Humanidades'
            };
            docentesFiltrados = docentesFiltrados.filter(d => d.departamento === deptoMap[departamento]);
        }

        if (calificacionRango) {
            const rangoMap = {
                '1': { min: 0, max: 3.0 },
                '2': { min: 3.0, max: 3.5 },
                '3': { min: 3.5, max: 4.0 }
            };
            const rango = rangoMap[calificacionRango];
            docentesFiltrados = docentesFiltrados.filter(d =>
                d.calificacion >= rango.min && d.calificacion < rango.max
            );
        }

        // Actualizar Select2 con los datos filtrados
        const $select = $('#docenteSelect');

        // Destruir la instancia anterior de Select2
        $select.select2('destroy');

        // Limpiar opciones existentes
        $select.empty();

        // Agregar opción por defecto
        $select.append('<option value="">Seleccione un docente</option>');

        // Reinicializar Select2 con los datos filtrados
        $select.select2({
            placeholder: 'Buscar docente...',
            allowClear: true,
            data: docentesFiltrados.map(d => ({
                id: d.id,
                text: `${d.nombre} ${d.apellido} - ${d.asignatura} (${d.calificacion})`
            })),
            matcher: function (params, data) {
                // Si no hay término de búsqueda, devolver todos los elementos
                if (!params.term) {
                    return data;
                }

                // Convertir término de búsqueda a minúsculas para comparación insensible a mayúsculas
                const term = params.term.toLowerCase();

                // Verificar si el texto del elemento contiene el término de búsqueda
                if (data.text.toLowerCase().indexOf(term) > -1) {
                    return data;
                }

                // Si no hay coincidencia, devolver null
                return null;
            }
        });

        // Si hay docentes filtrados, seleccionar automáticamente el primero y cargar sus datos
        if (docentesFiltrados.length > 0) {
            // Seleccionar el primer docente de la lista filtrada
            $select.val(docentesFiltrados[0].id).trigger('change');
            // Cargar los datos del docente seleccionado
            cargarDatosDocente(docentesFiltrados[0].id);
        } else {
            // Si no hay docentes que coincidan con los filtros, limpiar el formulario
            limpiarFormulario();
        }
    }

    // Función para limpiar el formulario cuando no hay docentes seleccionados
    function limpiarFormulario() {
        // Limpiar campos del formulario
        document.getElementById('numeroResolucion').value = '';
        document.getElementById('fechaEmision').value = '';
        document.getElementById('nombreDocente').value = '';
        document.getElementById('apellidoDocente').value = '';
        document.getElementById('identificacionDocente').value = '';
        document.getElementById('asignaturaDocente').value = '';
        document.getElementById('calificacionDocente').value = '';
        document.getElementById('tipoSancionSelect').value = '';

        // Limpiar calificación
        const calificacionInput = document.getElementById('calificacionDocente');
        if (calificacionInput) {
            calificacionInput.value = '';
            calificacionInput.style.color = '';
            calificacionInput.style.fontWeight = '';
        }

        // Limpiar los editores Summernote
        $('#antecedentes').summernote('code', 'Describa aquí los antecedentes y el historial de evaluaciones del docente que justifican esta sanción...');
        $('#fundamentos').summernote('code', 'Especifique aquí los reglamentos, estatutos y normativas institucionales que fundamentan esta decisión...');
        $('#resolucion').summernote('code', 'Detalle aquí la resolución específica y las medidas disciplinarias adoptadas...');
    }

    // Eventos para los filtros
    const departamentoSelect = document.getElementById('departamentoSelect');
    const calificacionSelect = document.getElementById('calificacionSelect');

    if (departamentoSelect && calificacionSelect) {
        departamentoSelect.addEventListener('change', filtrarDocentes);
        calificacionSelect.addEventListener('change', filtrarDocentes);
    }

    // Verificar si hay un ID de docente en localStorage (redirigido desde alertas)
    const docenteProcesoId = localStorage.getItem('docenteProcesoId');
    if (docenteProcesoId) {
        // Seleccionar el docente en el select
        $('#docenteSelect').val(docenteProcesoId).trigger('change');
        
        // Cargar los datos del docente
        cargarDatosDocente(docenteProcesoId);
        
        // Limpiar el localStorage para no cargar automáticamente en futuras visitas
        localStorage.removeItem('docenteProcesoId');
    }
});