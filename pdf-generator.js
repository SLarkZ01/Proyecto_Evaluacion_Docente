// PDF Generator for Acta de Compromiso

// Función para validar si la firma del decano está cargada
function validarFirmaDecano() {
    const firmaPreview = document.getElementById('firma-preview');
    if (firmaPreview.classList.contains('d-none')) {
        alert('Por favor, cargue la firma del decano antes de generar el PDF.');
        return false;
    }
    return true;
}

// Función para crear el encabezado del PDF
function crearEncabezadoPDF() {
    return `
        <div style="text-align: center; margin-bottom: 10px; padding-top: 0;">
            <img src="images/Logo Uniautonoma.png" alt="Logo CUAC" style="height: 110px; margin top: 15px;">
            <h2 style="margin: 5px 0; margin-top: 15px; color: #003366;">Corporación Universitaria Autónoma del Cauca</h2>
            <h3 style="margin: 3px 0; color: #666;">Acta de Compromiso Docente</h3>
            <hr style="border-top: 2px solid #003366; margin: 5px 0;">
        </div>
    `;
}

// Función para crear el pie de página del PDF
function crearPiePaginaPDF() {
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

// Función para generar el contenido del PDF
function generarContenidoPDF() {
    const formInputs = document.querySelectorAll('.form-acta .form-control');
    const summernoteContent = $('#summernote').summernote('code');
    const firmaImagen = document.getElementById('firma-imagen');

    return `
        <div style="font-family: Arial, sans-serif; padding: 0; margin: 0;">
            ${crearEncabezadoPDF()}
            
            <div style="margin: 0; padding: 0 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <div><strong>Número de Acta:</strong> ${formInputs[0].value}</div>
                    <div><strong>Fecha:</strong> ${formInputs[1].value}</div>
                </div>
                
                <div style="margin-bottom: 5px;">
                    <h4 style="color: #003366; margin-top: 0; margin-bottom: 3px;">Información del Docente</h4>
                    <p style="margin: 2px 0;"><strong>Nombre:</strong> ${formInputs[2].value} ${formInputs[3].value}</p>
                    <p style="margin: 2px 0;"><strong>Identificación:</strong> ${formInputs[4].value}</p>
                    <p style="margin: 2px 0;"><strong>Asignatura:</strong> ${formInputs[5].value}</p>
                    <p style="margin: 2px 0;"><strong>Calificación:</strong> ${formInputs[6].value}</p>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <h4 style="color: #003366; margin-top: 3px; margin-bottom: 3px;">Retroalimentación y Plan de Mejora</h4>
                    <div style="border: 1px solid #ccc; padding: 10px; background-color: #f9f9f9; max-height: none; overflow: visible;">
                        ${summernoteContent}
                    </div>
                </div>
                
                <div style="margin-top: 15px; text-align: center;">
                    <div style="margin-bottom: 3px;">
                        <img src="${firmaImagen.src}" alt="Firma del Decano" style="max-width: 180px; max-height: 140px; display: block; margin: 0 auto;">
                    </div>
                    <div style="border-top: 1px solid #000; padding-top: 3px; width: 250px; margin: 0 auto;">
                        <strong>Firma del Decano/Coordinador</strong>
                    </div>
                </div>
            </div>
            
            ${crearPiePaginaPDF()}
        </div>
    `;
}

// Función principal para generar el PDF
function generarPDFProfesional() {
    try {
        if (!validarFirmaDecano()) return;

        const contenido = generarContenidoPDF();
        const element = document.createElement('div');
        element.innerHTML = contenido;

        const opt = {
            margin: [5, 5, 5, 5],
            filename: 'acta-compromiso-docente.pdf',
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
    } catch (error) {
        console.error('Error en la generación del PDF:', error);
        alert('Hubo un error al preparar el PDF. Por favor, inténtelo de nuevo.');
    }
}

// Asignar la función al objeto window para que sea accesible desde el HTML
window.generarPDFProfesional = generarPDFProfesional;