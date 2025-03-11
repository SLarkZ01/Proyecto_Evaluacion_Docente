// PDF Generator for Seguimiento a Plan de Mejora

// Función para crear el encabezado del PDF
function crearEncabezadoPDFSeguimiento() {
    return `
        <div style="text-align: center; margin-bottom: 10px; padding-top: 0;">
            <img src="images/Logo Uniautonoma.png" alt="Logo CUAC" style="height: 110px; margin top: 15px;">
            <h2 style="margin: 5px 0; margin-top: 15px; color: #003366;">Corporación Universitaria Autónoma del Cauca</h2>
            <h3 style="margin: 3px 0; color: #666;">Informe de Seguimiento a Plan de Mejora</h3>
            <hr style="border-top: 2px solid #003366; margin: 5px 0;">
        </div>
    `;
}

// Función para crear el pie de página del PDF
function crearPiePaginaPDFSeguimiento() {
    return `
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc;">
            <p style="color: #666; font-size: 12px;">
                Corporación Universitaria Autónoma del Cauca<br>
                Calle 5 No. 3-85 - Popayán, Colombia<br>
                Tel: (602) 8213000<br>
                www.uniautonoma.edu.co
            </p>
        </div>
    `;
}

// Función para generar el contenido de las notas de seguimiento
function generarContenidoNotas(notas) {
    if (!notas || notas.length === 0) {
        return '<p><em>No hay notas de seguimiento registradas.</em></p>';
    }

    let notasHTML = '';
    notas.forEach(nota => {
        notasHTML += `
            <div style="margin-bottom: 10px; padding: 8px; border-left: 3px solid #003366; background-color: #f9f9f9;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                    <strong>Fecha:</strong> ${nota.fecha} | <strong>Por:</strong> ${nota.autor}
                </p>
                <p style="margin: 5px 0 0 0;">${nota.texto}</p>
            </div>
        `;
    });

    return notasHTML;
}

// Función para generar el contenido del PDF de seguimiento
function generarContenidoPDFSeguimiento(acta) {
    // Definir el color de la calificación
    let colorCalificacion = '#007bff'; // Azul por defecto
    if (acta.calificacion < 3.0) {
        colorCalificacion = '#dc3545'; // Rojo para calificaciones bajas
    } else if (acta.calificacion < 3.5) {
        colorCalificacion = '#ffc107'; // Amarillo para calificaciones medias
    }

    // Definir el estado con su color
    let colorEstado = '#28a745'; // Verde por defecto (activo)
    if (acta.estado === 'cerrado') {
        colorEstado = '#6c757d'; // Gris para cerrado
    } else if (acta.estado === 'pendiente') {
        colorEstado = '#ffc107'; // Amarillo para pendiente
    }

    return `
        <div style="font-family: Arial, sans-serif; padding: 0; margin: 0;">
            ${crearEncabezadoPDFSeguimiento()}
            
            <div style="margin: 0; padding: 0 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <div><strong>Número de Acta:</strong> ${acta.numeroActa}</div>
                    <div><strong>Fecha de Generación:</strong> ${acta.fechaActa}</div>
                </div>
                
                <div style="margin-bottom: 5px;">
                    <h4 style="color: #003366; margin-top: 0; margin-bottom: 3px;">Información del Docente</h4>
                    <p style="margin: 2px 0;"><strong>Nombre:</strong> ${acta.docente.nombre} ${acta.docente.apellido}</p>
                    <p style="margin: 2px 0;"><strong>Identificación:</strong> ${acta.docente.identificacion}</p>
                    <p style="margin: 2px 0;"><strong>Departamento:</strong> ${acta.departamento}</p>
                    <p style="margin: 2px 0;"><strong>Asignatura:</strong> ${acta.asignatura}</p>
                    <p style="margin: 2px 0;">
                        <strong>Calificación:</strong> 
                        <span style="color: ${colorCalificacion}; font-weight: bold;">${acta.calificacion.toFixed(1)}</span>
                    </p>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <h4 style="color: #003366; margin-top: 3px; margin-bottom: 3px;">Retroalimentación Original</h4>
                    <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; max-height: none; overflow: visible;">
                        ${acta.retroalimentacion}
                    </div>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <h4 style="color: #003366; margin-top: 3px; margin-bottom: 3px;">Estado del Plan de Mejora</h4>
                    <div style="display: flex; align-items: center; margin-bottom: 5px;">
                        <div style="flex-grow: 1; height: 20px; background-color: #e9ecef; border-radius: 4px; overflow: hidden; margin-right: 10px;">
                            <div style="height: 100%; width: ${acta.progreso}%; background-color: #28a745;"></div>
                        </div>
                        <span style="font-weight: bold;">${acta.progreso}%</span>
                    </div>
                    <p style="margin: 2px 0;">
                        <strong>Estado Actual:</strong> 
                        <span style="color: ${colorEstado}; font-weight: bold; text-transform: capitalize;">${acta.estado}</span>
                    </p>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <h4 style="color: #003366; margin-top: 3px; margin-bottom: 3px;">Historial de Seguimiento</h4>
                    <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9;">
                        ${generarContenidoNotas(acta.notas)}
                    </div>
                </div>
                
                <div style="margin-top: 15px; text-align: center;">
                    <p style="margin: 2px 0;"><strong>Fecha de generación del informe:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
            
            ${crearPiePaginaPDFSeguimiento()}
        </div>
    `;
}

// Función principal para generar el PDF de seguimiento
function generarPDFSeguimiento(actaId) {
    try {
        const acta = actasCompromiso.find(a => a.id === actaId);
        if (!acta) {
            alert('No se encontró el acta de compromiso.');
            return false;
        }

        const contenido = generarContenidoPDFSeguimiento(acta);
        const element = document.createElement('div');
        element.innerHTML = contenido;

        const opt = {
            margin: [5, 5, 5, 5],
            filename: `informe-seguimiento-${acta.docente.apellido}-${acta.docente.nombre}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: true, letterRendering: true, scrollY: 0, windowHeight: window.innerHeight },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
        };

        // Mostrar mensaje de generación
        const loadingMsg = document.createElement('div');
        loadingMsg.style.position = 'fixed';
        loadingMsg.style.top = '50%';
        loadingMsg.style.left = '50%';
        loadingMsg.style.transform = 'translate(-50%, -50%)';
        loadingMsg.style.padding = '20px';
        loadingMsg.style.background = 'rgba(0,0,0,0.7)';
        loadingMsg.style.color = 'white';
        loadingMsg.style.borderRadius = '5px';
        loadingMsg.style.zIndex = '9999';
        loadingMsg.textContent = 'Generando PDF, por favor espere...';
        document.body.appendChild(loadingMsg);

        html2pdf()
            .from(element)
            .set(opt)
            .save()
            .then(() => {
                document.body.removeChild(loadingMsg);
                console.log('PDF generado correctamente');
            })
            .catch(err => {
                document.body.removeChild(loadingMsg);
                console.error('Error al generar el PDF:', err);
                alert('Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.');
            });

        return true;
    } catch (error) {
        console.error('Error en la generación del PDF:', error);
        alert('Hubo un error al preparar el PDF. Por favor, inténtelo de nuevo.');
        return false;
    }
}

// Reemplazar la función existente de generarInformeSeguimiento
function generarInformeSeguimiento(actaId) {
    return generarPDFSeguimiento(actaId);
}

// Asignar la función al objeto window para que sea accesible desde el HTML
window.generarPDFSeguimiento = generarPDFSeguimiento;