// Script específico para la página de Acta de Compromiso

// Datos de ejemplo para docentes con desempeño bajo 4.0
const docentes = [
    { id: 1, nombre: 'Jimena', apellido: 'Rodríguez', identificacion: '8765902345', asignatura: 'Base de Datos', calificacion: 3.5, departamento: 'Ingeniería' },
    { id: 2, nombre: 'Carlos', apellido: 'Mendoza', identificacion: '7654321098', asignatura: 'Programación', calificacion: 3.8, departamento: 'Ingeniería' },
    { id: 3, nombre: 'Laura', apellido: 'Gómez', identificacion: '9876543210', asignatura: 'Matemáticas', calificacion: 3.2, departamento: 'Ciencias Exactas' },
    { id: 4, nombre: 'Fernando', apellido: 'Díaz', identificacion: '8901234567', asignatura: 'Física', calificacion: 3.9, departamento: 'Ciencias Exactas' },
    { id: 5, nombre: 'Patricia', apellido: 'Vargas', identificacion: '7890123456', asignatura: 'Química', calificacion: 3.7, departamento: 'Ciencias Exactas' },
    { id: 6, nombre: 'Roberto', apellido: 'Sánchez', identificacion: '6789012345', asignatura: 'Literatura', calificacion: 3.4, departamento: 'Humanidades' },
    { id: 7, nombre: 'Ana', apellido: 'Martínez', identificacion: '5678901234', asignatura: 'Historia', calificacion: 2.9, departamento: 'Humanidades' },
    { id: 8, nombre: 'Miguel', apellido: 'López', identificacion: '4567890123', asignatura: 'Algoritmos', calificacion: 3.6, departamento: 'Ingeniería' }
];

// Generar número de acta aleatorio
function generarNumeroActa() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
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
        // Obtener todos los campos del formulario por su posición o etiqueta
        const formInputs = document.querySelectorAll('.form-acta .form-control');

        // Actualizar número de acta (índice 0)
        if (formInputs[0]) formInputs[0].value = generarNumeroActa();

        // Actualizar fecha de generación (índice 1)
        if (formInputs[1]) formInputs[1].value = establecerFechaActual();

        // Actualizar campos por su orden en el formulario
        // Actualizar nombre (índice 2)
        if (formInputs[2]) formInputs[2].value = docente.nombre;

        // Actualizar apellido (índice 3)
        if (formInputs[3]) formInputs[3].value = docente.apellido;

        // Actualizar identificación (índice 4)
        if (formInputs[4]) formInputs[4].value = docente.identificacion;

        // Actualizar asignatura (índice 5)
        if (formInputs[5]) formInputs[5].value = docente.asignatura;

        // Actualizar calificación (índice 6)
        const calificacionInput = document.querySelector('.calificacion-baja');
        if (calificacionInput) {
            calificacionInput.value = docente.calificacion.toFixed(1);

            // Aplicar estilo según calificación
            if (docente.calificacion < 3.0) {
                calificacionInput.style.color = '#dc3545'; // Rojo para calificaciones muy bajas
                calificacionInput.style.fontWeight = 'bold';
            } else if (docente.calificacion < 3.5) {
                calificacionInput.style.color = '#fd7e14'; // Naranja para calificaciones bajas
                calificacionInput.style.fontWeight = 'bold';
            } else {
                calificacionInput.style.color = '#ffc107'; // Amarillo para calificaciones cercanas a 4
                calificacionInput.style.fontWeight = 'bold';
            }
        }

        // Actualizar el contenido del editor Summernote con un mensaje personalizado
        const summernote = $('#summernote');
        if (summernote.length) {
            const mensaje = `<p>Retroalimentación para el docente <strong>${docente.nombre} ${docente.apellido}</strong> de la asignatura <strong>${docente.asignatura}</strong>.</p><p>La calificación obtenida fue de <strong>${docente.calificacion.toFixed(1)}</strong>, lo cual está por debajo del umbral esperado de 4.0.</p><p>Por favor, complete aquí las observaciones específicas y el plan de mejora para el docente...</p>`;
            summernote.summernote('code', mensaje);
        }
    }
}

// Asignar la función al objeto window para que sea accesible desde el HTML
window.cargarDatosDocente = cargarDatosDocente;

document.addEventListener('DOMContentLoaded', function () {
    // Evento para el cambio de docente en el selector
    const docenteSelect = document.getElementById('docenteSelect');
    if (docenteSelect) {
        docenteSelect.addEventListener('change', function () {
            const docenteId = this.value;
            if (docenteId) {
                cargarDatosDocente(docenteId);
            }
        });
    }

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
        const formInputs = document.querySelectorAll('.form-acta .form-control');

        // Limpiar todos los campos del formulario, incluyendo número de acta y fecha
        formInputs.forEach(input => {
            input.value = '';
        });

        // Limpiar calificación
        const calificacionInput = document.querySelector('.calificacion-baja');
        if (calificacionInput) {
            calificacionInput.value = '';
            calificacionInput.style.color = '';
            calificacionInput.style.fontWeight = '';
        }

        // Limpiar el editor Summernote
        const summernote = $('#summernote');
        if (summernote.length) {
            summernote.summernote('code', 'Seleccione un docente para generar la retroalimentación...');
        }
    }

    // Eventos para los filtros
    const departamentoSelect = document.getElementById('departamentoSelect');
    const calificacionSelect = document.getElementById('calificacionSelect');

    if (departamentoSelect && calificacionSelect) {
        departamentoSelect.addEventListener('change', filtrarDocentes);
        calificacionSelect.addEventListener('change', filtrarDocentes);
    }

    // Función para inicializar el formulario vacío al cargar la página
    function inicializarFormularioVacio() {
        const formInputs = document.querySelectorAll('.form-acta .form-control');

        // Limpiar todos los campos del formulario sin excepción
        formInputs.forEach(input => {
            input.value = '';
        });

        // Limpiar calificación y resetear estilos
        const calificacionInput = document.querySelector('.calificacion-baja');
        if (calificacionInput) {
            calificacionInput.value = '';
            calificacionInput.style.color = '';
            calificacionInput.style.fontWeight = '';
        }

        // Limpiar el editor Summernote
        const summernote = $('#summernote');
        if (summernote.length) {
            summernote.summernote('code', 'Aquí el decano hará sus comentarios hacia el respectivo docente...');
        }

        // No llamamos a trigger('change') aquí para evitar un bucle infinito
        // cuando esta función es llamada desde el evento change del select
    }

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

    // Agregar evento change para Select2
    $('#docenteSelect').on('change', function () {
        const docenteId = $(this).val();
        if (docenteId) {
            // Llamar a la función en acta-script.js
            if (typeof cargarDatosDocente === 'function') {
                cargarDatosDocente(docenteId);
            }
        } else {
            // Si no hay docente seleccionado, limpiar el formulario completamente
            inicializarFormularioVacio();
        }
    });

    // Inicializar el formulario vacío al cargar la página
    inicializarFormularioVacio();

    // Inicializar el manejo de la firma digital
    inicializarManejoDeFirma();

});

// Función para inicializar el manejo de la firma digital
function inicializarManejoDeFirma() {
    const seleccionarFirmaBtn = document.getElementById('seleccionar-firma');
    const eliminarFirmaBtn = document.getElementById('eliminar-firma');
    const firmaInput = document.getElementById('firma-input');
    const firmaPreview = document.getElementById('firma-preview');
    const firmaImagen = document.getElementById('firma-imagen');
    const firmaPlaceholder = document.getElementById('firma-placeholder');

    if (!seleccionarFirmaBtn || !firmaInput) return;

    // Evento para el botón de seleccionar firma
    seleccionarFirmaBtn.addEventListener('click', function () {
        firmaInput.click();
    });

    // Evento para cuando se selecciona un archivo
    firmaInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const file = this.files[0];

            // Verificar que sea una imagen PNG o JPG
            if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
                alert('Por favor, seleccione una imagen en formato PNG o JPG.');
                this.value = '';
                return;
            }

            // Mostrar vista previa de la imagen
            const reader = new FileReader();
            reader.onload = function (e) {
                firmaImagen.src = e.target.result;
                firmaPreview.classList.remove('d-none');
                firmaPlaceholder.classList.add('d-none');
                eliminarFirmaBtn.classList.remove('d-none');
            };
            reader.readAsDataURL(file);
        }
    });

    // Evento para el botón de eliminar firma
    if (eliminarFirmaBtn) {
        eliminarFirmaBtn.addEventListener('click', function () {
            firmaInput.value = '';
            firmaImagen.src = '#';
            firmaPreview.classList.add('d-none');
            firmaPlaceholder.classList.remove('d-none');
            eliminarFirmaBtn.classList.add('d-none');
        });
    }
}

// Función para enviar reporte
function enviarReporte() {
    // Verificar que haya un docente seleccionado
    const docenteId = document.getElementById('docenteSelect').value;
    if (!docenteId) {
        alert('Por favor, seleccione un docente antes de enviar el reporte.');
        return;
    }

    // Verificar que haya una firma cargada
    const firmaPreview = document.getElementById('firma-preview');
    if (firmaPreview.classList.contains('d-none')) {
        alert('Por favor, cargue la firma del decano antes de enviar el reporte.');
        return;
    }

    // Obtener datos del formulario
    const formInputs = document.querySelectorAll('.form-acta .form-control');
    const summernoteContent = $('#summernote').summernote('code');
    const docente = docentes.find(d => d.id === parseInt(docenteId));

    if (docente) {
        // Crear objeto de acta de compromiso para seguimiento
        const nuevaActa = {
            id: Date.now(), // Generar ID único basado en timestamp
            docente: {
                nombre: docente.nombre,
                apellido: docente.apellido,
                identificacion: docente.identificacion
            },
            asignatura: docente.asignatura,
            calificacion: docente.calificacion,
            departamento: docente.departamento,
            numeroActa: formInputs[0].value,
            fechaActa: formInputs[1].value,
            progreso: 0, // Inicia en 0%
            estado: 'activo',
            retroalimentacion: summernoteContent,
            notas: [
                {
                    fecha: formInputs[1].value, // Usar la misma fecha del acta
                    texto: 'Se generó acta de compromiso y se envió al docente.',
                    autor: 'Sistema'
                }
            ]
        };

        // En una aplicación real, aquí se guardaría en una base de datos
        // Para esta demostración, podríamos guardar en localStorage
        let actasCompromiso = JSON.parse(localStorage.getItem('actasCompromiso') || '[]');
        actasCompromiso.push(nuevaActa);
        localStorage.setItem('actasCompromiso', JSON.stringify(actasCompromiso));

        // Aquí iría la lógica para enviar el reporte por correo electrónico
        alert('El reporte ha sido enviado al docente exitosamente y se ha registrado para seguimiento.');

        // Opcionalmente, redirigir a la página de seguimiento
        if (confirm('¿Desea ir a la página de seguimiento de planes de mejora?')) {
            window.location.href = 'seguimiento-plan-mejora.html';
        }
    } else {
        alert('Error: No se pudo obtener la información del docente.');
    }
}