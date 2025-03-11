// Script para generación profesional de PDF para el proceso de sanción o retiro

// Función para crear el encabezado del PDF de sanción
function crearEncabezadoPDFSancion() {
    return `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="images/Logo Uniautonoma.png" alt="Logo Universidad" style="height: 80px;">
            <h2 style="margin-top: 10px;">Corporación Universitaria Autónoma del Cauca</h2>
            <h3>Resolución de Sanción o Retiro Docente</h3>
        </div>
    `;
}

// Función para crear el pie de página del PDF de sanción
function crearPiePaginaPDFSancion() {
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

// Función para validar si la firma del decano está cargada
function validarFirmaDecano() {
    const firmaPreview = document.getElementById('firma-preview');
    if (firmaPreview.classList.contains('d-none')) {
        alert('Por favor, cargue la firma del decano antes de generar el PDF.');
        return false;
    }
    return true;
}

// Función para generar el contenido del PDF de sanción
function generarContenidoPDFSancion() {
    // Obtener los datos del formulario
    const numeroResolucion = document.getElementById('numeroResolucion').value;
    const fechaEmision = document.getElementById('fechaEmision').value;
    const nombreDocente = document.getElementById('nombreDocente').value;
    const apellidoDocente = document.getElementById('apellidoDocente').value;
    const identificacionDocente = document.getElementById('identificacionDocente').value;
    const asignaturaDocente = document.getElementById('asignaturaDocente').value;
    const calificacionDocente = document.getElementById('calificacionDocente').value;
    
    // Obtener el contenido de los editores Summernote
    const antecedentesContent = $('#antecedentes').summernote('code');
    const fundamentosContent = $('#fundamentos').summernote('code');
    const resolucionContent = $('#resolucion').summernote('code');
    
    // Obtener la imagen de la firma
    const firmaImagen = document.getElementById('firma-imagen');
    
    // Obtener el tipo de sanción seleccionado
    const tipoSancion = document.getElementById('tipoSancionSelect').value;
    let tipoSancionTexto = '';
    let badgeClass = '';
    
    switch(tipoSancion) {
        case 'leve':
            tipoSancionTexto = 'Amonestación';
            badgeClass = 'sancion-leve';
            break;
        case 'grave':
            tipoSancionTexto = 'Suspensión';
            badgeClass = 'sancion-grave';
            break;
        case 'retiro':
            tipoSancionTexto = 'Retiro Definitivo';
            badgeClass = 'sancion-retiro';
            break;
        default:
            tipoSancionTexto = 'Sanción';
            badgeClass = '';
    }
    
    return `
        <div style="font-family: Arial, sans-serif; padding: 0; margin: 0;">
            ${crearEncabezadoPDFSancion()}
            
            <div style="margin: 0; padding: 0 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <div><strong>Número de Resolución:</strong> ${numeroResolucion}</div>
                    <div><strong>Fecha de Emisión:</strong> ${fechaEmision}</div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #dc3545; margin-top: 0; margin-bottom: 5px;">Información del Docente</h4>
                    <p style="margin: 3px 0;"><strong>Nombre:</strong> ${nombreDocente} ${apellidoDocente}</p>
                    <p style="margin: 3px 0;"><strong>Identificación:</strong> ${identificacionDocente}</p>
                    <p style="margin: 3px 0;"><strong>Asignatura:</strong> ${asignaturaDocente}</p>
                    <p style="margin: 3px 0;"><strong>Calificación Final:</strong> <span style="color: #dc3545; font-weight: bold;">${calificacionDocente}</span></p>
                    <p style="margin: 3px 0;"><strong>Tipo de Sanción:</strong> <span style="display: inline-block; padding: 3px 8px; border-radius: 10px; background-color: ${badgeClass === 'sancion-leve' ? '#ffc107' : badgeClass === 'sancion-grave' ? '#fd7e14' : '#dc3545'}; color: ${badgeClass === 'sancion-leve' ? '#212529' : 'white'}; font-size: 0.9rem;">${tipoSancionTexto}</span></p>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #dc3545; margin-top: 5px; margin-bottom: 5px;">Antecedentes y Justificación</h4>
                    <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; max-height: none; overflow: visible;">
                        ${antecedentesContent}
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #dc3545; margin-top: 5px; margin-bottom: 5px;">Fundamentos Normativos</h4>
                    <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; max-height: none; overflow: visible;">
                        ${fundamentosContent}
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #dc3545; margin-top: 5px; margin-bottom: 5px;">Resolución y Medidas Adoptadas</h4>
                    <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; max-height: none; overflow: visible;">
                        ${resolucionContent}
                    </div>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                    <div style="margin-bottom: 5px;">
                        <img src="${firmaImagen.src}" alt="Firma del Decano" style="max-width: 180px; max-height: 140px; display: block; margin: 0 auto;">
                    </div>
                    <div style="border-top: 1px solid #000; padding-top: 5px; width: 250px; margin: 0 auto;">
                        <strong>Firma del Decano/Coordinador</strong>
                    </div>
                </div>
            </div>
            
            ${crearPiePaginaPDFSancion()}
        </div>
    `;
}

// Función para generar el PDF de sanción
function generarPDFSancion() {
    try {
        // Verificar si se ha seleccionado un docente
        if (!document.getElementById('nombreDocente').value) {
            alert('Por favor, seleccione un docente antes de generar el PDF.');
            return;
        }

        // Verificar si se ha seleccionado un tipo de sanción
        if (!document.getElementById('tipoSancionSelect').value) {
            alert('Por favor, seleccione un tipo de sanción antes de generar el PDF.');
            return;
        }
        
        // Validar que se haya cargado la firma
        if (!validarFirmaDecano()) return;
        
        // Generar el contenido del PDF
        const contenido = generarContenidoPDFSancion();
        const element = document.createElement('div');
        element.innerHTML = contenido;
        
        // Obtener el tipo de sanción seleccionado para el nombre del archivo
        const tipoSancion = document.getElementById('tipoSancionSelect').value;
        let tipoSancionTexto = '';
        
        switch(tipoSancion) {
            case 'leve':
                tipoSancionTexto = 'Amonestacion';
                break;
            case 'grave':
                tipoSancionTexto = 'Suspension';
                break;
            case 'retiro':
                tipoSancionTexto = 'Retiro';
                break;
            default:
                tipoSancionTexto = 'Sancion';
        }
        
        // Configurar opciones de PDF
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `Resolucion_${tipoSancionTexto}_${document.getElementById('identificacionDocente').value}.pdf`,
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
        
        // Generar PDF
        html2pdf()
            .from(element)
            .set(opt)
            .save()
            .then(() => {
                document.body.removeChild(loadingMsg);
                console.log('PDF de sanción generado correctamente');
            })
            .catch(err => {
                document.body.removeChild(loadingMsg);
                console.error('Error al generar el PDF de sanción:', err);
                alert('Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.');
            });
    } catch (error) {
        console.error('Error en la generación del PDF de sanción:', error);
        alert('Hubo un error al preparar el PDF. Por favor, inténtelo de nuevo.');
    }
}

// Asignar la función al objeto window para que sea accesible desde el HTML
window.generarPDFSancion = generarPDFSancion;