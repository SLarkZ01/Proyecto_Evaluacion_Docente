// Datos para el gráfico
let chartData = {
    labels: ['AÑO 2022', 'AÑO 2023', 'AÑO 2024', 'AÑO 2025'],
    datasets: [
        {
            label: 'Semestre 1',
            data: [4.2, 3.7, 3.2, 2.4],
            backgroundColor: '#2c7be5',
            borderColor: '#2c7be5',
            borderWidth: 1
        },
        {
            label: 'Semestre 2',
            data: [4.0, 3.5, 3.9, 4.4],
            backgroundColor: '#e6873c',
            borderColor: '#e6873c',
            borderWidth: 1
        }
    ]
};

// Configuración del panel docente

// Función para generar un número aleatorio entre min y max con decimales
function getRandomDecimal(min, max, decimals = 1) {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
}

// Función para generar datos aleatorios para el gráfico
function generarDatosAleatorios() {
    // Generar datos aleatorios para el gráfico
    chartData.datasets[0].data = [
        getRandomDecimal(2.0, 5.0),
        getRandomDecimal(2.0, 5.0),
        getRandomDecimal(2.0, 5.0),
        getRandomDecimal(2.0, 5.0)
    ];
    
    chartData.datasets[1].data = [
        getRandomDecimal(2.0, 5.0),
        getRandomDecimal(2.0, 5.0),
        getRandomDecimal(2.0, 5.0),
        getRandomDecimal(2.0, 5.0)
    ];
    
    // Actualizar el gráfico
    if (window.evaluacionChart) {
        window.evaluacionChart.data = chartData;
        window.evaluacionChart.update();
    }
    
    // Actualizar las evaluaciones semestrales
    document.getElementById('evaluacionS1').textContent = chartData.datasets[0].data[3].toFixed(1) + '/5.0';
    document.getElementById('evaluacionS2').textContent = chartData.datasets[1].data[3].toFixed(1) + '/5.0';
    
    // Generar datos para la tabla
    const tablaEvaluaciones = document.getElementById('tablaEvaluaciones');
    tablaEvaluaciones.innerHTML = '';
    
    for (let i = 0; i < 4; i++) {
        const year = 2022 + i;
        const sem1 = chartData.datasets[0].data[i];
        const sem2 = chartData.datasets[1].data[i];
        const promedio = ((sem1 + sem2) / 2).toFixed(1);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${year}</td>
            <td>${sem1.toFixed(1)}</td>
            <td>${sem2.toFixed(1)}</td>
            <td>${promedio}</td>
        `;
        tablaEvaluaciones.appendChild(row);
    }
    
    // Generar comentarios aleatorios si estamos en la página de resultados
    if (document.getElementById('comentariosContainer')) {
        generarComentariosAleatorios();
    }
    
    // Fin de la generación de datos aleatorios
}

// Función para inicializar el gráfico de evaluaciones por semestre
function inicializarGrafico() {
    const ctx = document.getElementById('evaluacionesChart').getContext('2d');
    
    // Destruir el gráfico existente si hay uno
    if (window.evaluacionChart) {
        window.evaluacionChart.destroy();
    }
    
    // Crear un nuevo gráfico
    window.evaluacionChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Evaluaciones por Semestre'
                }
            },
            barPercentage: 0.6,
            categoryPercentage: 0.7
        }
    });
}

// Variables para el gráfico principal
let chartType = 'bar';
let currentChart = null;

// Función para actualizar el gráfico principal según el tipo seleccionado
function updateChart() {
    const ctx = document.getElementById('mainChart');
    
    // Destruir el gráfico anterior si existe
    if (currentChart) {
        currentChart.destroy();
    }
    
    // Filtrar datos según año y semestre seleccionados
    const yearSelected = document.getElementById('yearFilter')?.value || document.getElementById('yearSelect')?.value || '2025';
    const semesterSelected = document.getElementById('semesterFilter')?.value || document.getElementById('semesterSelect')?.value || '1';
    
    // Preparar datos filtrados
    const yearIndex = chartData.labels.findIndex(label => label.includes(yearSelected)) || 0;
    const datasetIndex = semesterSelected === '1' ? 0 : 1;
    
    // Criterios de evaluación
    const criterios = ['Métodos de enseñanza', 'Conocimiento de contenido', 'Comunicación', 'Puntualidad', 'Material didáctico'];
    
    // Generar datos aleatorios para cada criterio
    const datosAleatorios = criterios.map(() => getRandomDecimal(3.0, 5.0));
    
    // Colores para los diferentes tipos de gráficos
    const backgroundColors = [
        'rgba(44, 123, 229, 0.7)',
        'rgba(230, 135, 60, 0.7)',
        'rgba(76, 175, 80, 0.7)',
        'rgba(156, 39, 176, 0.7)',
        'rgba(255, 152, 0, 0.7)'
    ];
    
    const borderColors = [
        'rgb(44, 123, 229)',
        'rgb(230, 135, 60)',
        'rgb(76, 175, 80)',
        'rgb(156, 39, 176)',
        'rgb(255, 152, 0)'
    ];
    
    // Configuración base del gráfico
    let chartConfig = {
        type: chartType,
        data: {
            labels: criterios,
            datasets: [{
                label: `${chartData.labels[yearIndex] || 'AÑO 2025'} - ${chartData.datasets[datasetIndex].label}`,
                data: datosAleatorios,
                backgroundColor: chartType === 'pie' || chartType === 'polarArea' ? backgroundColors : chartData.datasets[datasetIndex].backgroundColor,
                borderColor: chartType === 'pie' || chartType === 'polarArea' ? borderColors : chartData.datasets[datasetIndex].borderColor,
                borderWidth: 1,
                fill: chartType === 'line' ? false : true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.formattedValue}/5.0`;
                        }
                    }
                }
            }
        }
    };
    
    // Ajustes específicos según el tipo de gráfico
    switch(chartType) {
        case 'radar':
            chartConfig.options.scales = {};
            chartConfig.options.elements = {
                line: {
                    borderWidth: 2,
                    tension: 0.1
                },
                point: {
                    radius: 4,
                    hoverRadius: 6,
                    backgroundColor: chartData.datasets[datasetIndex].backgroundColor
                }
            };
            chartConfig.data.datasets[0].pointBackgroundColor = chartData.datasets[datasetIndex].backgroundColor;
            chartConfig.data.datasets[0].pointBorderColor = '#fff';
            break;
            
        case 'pie':
        case 'polarArea':
            chartConfig.options.scales = {};
            chartConfig.data.datasets[0].backgroundColor = backgroundColors;
            chartConfig.data.datasets[0].borderColor = borderColors;
            chartConfig.options.plugins.tooltip.callbacks.label = function(context) {
                return `${context.label}: ${context.formattedValue}/5.0`;
            };
            break;
            
        case 'line':
            chartConfig.options.scales = {
                y: {
                    beginAtZero: false,
                    min: 2.5,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            };
            chartConfig.data.datasets[0].tension = 0.3;
            chartConfig.data.datasets[0].pointRadius = 5;
            chartConfig.data.datasets[0].pointHoverRadius = 7;
            chartConfig.data.datasets[0].pointBackgroundColor = chartData.datasets[datasetIndex].backgroundColor;
            break;
            
        default: // bar
            chartConfig.options.scales = {
                y: {
                    beginAtZero: false,
                    min: 2.5,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            };
            chartConfig.options.plugins.tooltip.callbacks.label = function(context) {
                return `Calificación: ${context.formattedValue}/5.0`;
            };
            break;
    }
    
    // Crear el nuevo gráfico con animación
    currentChart = new Chart(ctx, chartConfig);
    
    // Actualizar la UI para mostrar el tipo de gráfico activo
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-type') === chartType) {
            btn.classList.add('active');
        }
    });
}

// Función para descargar resultados
function downloadResults(format) {
    const yearSelected = document.getElementById('yearSelect').value;
    const semesterSelected = document.getElementById('semesterSelect').value;
    const semesterText = semesterSelected === '1' ? 'Semestre 1' : 'Semestre 2';
    
    // Obtener datos del gráfico actual
    const chartCanvas = document.getElementById('mainChart');
    const chartInstance = Chart.getChart(chartCanvas);
    
    if (!chartInstance) {
        alert('Error: No se pudo obtener el gráfico actual');
        return;
    }
    
    // Obtener datos de la tabla
    const tablaEvaluaciones = document.getElementById('tablaEvaluaciones');
    const filas = tablaEvaluaciones.getElementsByTagName('tr');
    const datosTabla = [];
    
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const filaDatos = [];
        for (let j = 0; j < celdas.length; j++) {
            filaDatos.push(celdas[j].textContent);
        }
        if (filaDatos.length > 0) {
            datosTabla.push(filaDatos);
        }
    }
    
    // Obtener comentarios
    const comentariosContainer = document.getElementById('comentariosContainer');
    const comentariosElements = comentariosContainer.getElementsByClassName('comentario');
    const comentarios = [];
    
    for (let i = 0; i < comentariosElements.length; i++) {
        const comentarioEl = comentariosElements[i];
        const ratingEl = comentarioEl.querySelector('.rating');
        const textEl = comentarioEl.querySelector('.text');
        if (ratingEl && textEl) {
            comentarios.push({
                rating: parseFloat(ratingEl.textContent),
                text: textEl.textContent
            });
        }
    }
    
    // Generar nombre de archivo
    const fileName = `Evaluacion_${yearSelected}_${semesterText.replace(' ', '')}`;
    
    if (format === 'pdf') {
        try {
            console.log('Iniciando generación de PDF...');
            
            // Crear PDF usando la imagen del gráfico con mejor calidad y manejo de errores
            let chartImage;
            try {
                // Usar una mejor calidad para la imagen del gráfico
                chartImage = chartCanvas.toDataURL('image/png', 1.0);
                console.log('Imagen del gráfico generada correctamente');
            } catch (imgError) {
                console.error('Error al generar la imagen del gráfico:', imgError);
                // Usar una imagen alternativa o un mensaje
                chartImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jIDTWAAAAABJRU5ErkJggg==';
            }
            
            // Crear un elemento para el contenido del PDF (invisible)
            const pdfContainer = document.createElement('div');
            pdfContainer.id = 'pdfContainer';
            pdfContainer.style.position = 'absolute';
            pdfContainer.style.left = '-9999px';
            pdfContainer.style.width = '210mm'; // Ancho A4
            document.body.appendChild(pdfContainer); // Añadir al DOM inmediatamente
            
            // Obtener la ruta base para las imágenes
            const basePath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
            const logoPath = basePath + 'images/Logo Uniautonoma.png';
            
            // Estilos CSS inline para el PDF
            const styles = `
                <style>
                    * { box-sizing: border-box; }
                    body, html { margin: 0; padding: 0; width: 100%; }
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                    .header { background-color: #0d6efd; color: white; padding: 20px; text-align: center; margin-bottom: 20px; }
                    .header img { max-height: 60px; margin-bottom: 10px; }
                    h2 { color: #0d6efd; margin-bottom: 15px; }
                    h3 { color: #6c757d; margin-top: 20px; margin-bottom: 10px; }
                    .chart-container { background-color: #fff; border-radius: 10px; padding: 15px; margin-bottom: 20px; }
                    table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
                    th { background-color: #0d6efd; color: white; font-weight: 500; text-align: center; padding: 10px; }
                    td { text-align: center; padding: 8px; border: 1px solid #dee2e6; }
                    tr:nth-child(even) { background-color: #f8f9fa; }
                    .comentario { border-left: 4px solid #0d6efd; padding: 10px 15px; margin-bottom: 15px; background-color: #f8f9fa; border-radius: 0 5px 5px 0; }
                    .rating { font-size: 1.5rem; font-weight: bold; color: #0d6efd; }
                    .star-rating { color: #ffc107; }
                    .text { margin-top: 5px; font-style: italic; }
                    .comentarios-container { margin-top: 20px; }
                    img { max-width: 100%; height: auto; display: block; }
                    .footer { margin-top: 30px; text-align: center; font-size: 0.9rem; color: #6c757d; }
                    .container { padding: 20px; }
                    .card { margin-bottom: 20px; border: 1px solid #dee2e6; border-radius: 10px; padding: 15px; }
                </style>
            `;
            
            // Construir el contenido del PDF con formato mejorado para comentarios
            let comentariosHTML = '';
            comentarios.forEach(comentario => {
                const estrellas = '★'.repeat(Math.floor(comentario.rating)) + 
                                '☆'.repeat(5 - Math.floor(comentario.rating));
                
                comentariosHTML += `
                    <div class="comentario">
                        <div class="rating-container">
                            <span class="rating">${comentario.rating.toFixed(1)}</span>
                            <span class="star-rating">${estrellas}</span>
                        </div>
                        <div class="text">${comentario.text}</div>
                    </div>
                `;
            });
            
            // Si no hay comentarios, mostrar un mensaje
            if (comentarios.length === 0) {
                comentariosHTML = '<p>No hay comentarios disponibles.</p>';
            }
            
            // Crear contenido HTML completo - estructura simplificada y optimizada para PDF
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Evaluación Docente ${yearSelected} - ${semesterText}</title>
                    ${styles}
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Evaluación Docente ${yearSelected} - ${semesterText}</h2>
                        </div>
                        
                        <div class="card">
                            <h3>Visualización de Resultados</h3>
                            <div class="chart-container">
                                <img class="chart-img" src="${chartImage}" alt="Gráfico de evaluación" />
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>Datos de Evaluación</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Año</th>
                                        <th>Semestre 1</th>
                                        <th>Semestre 2</th>
                                        <th>Promedio Anual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${datosTabla.map(fila => `<tr>${fila.map(celda => `<td>${celda}</td>`).join('')}</tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="card">
                            <h3>Comentarios</h3>
                            <div class="comentarios-section">
                                ${comentariosHTML}
                            </div>
                        </div>
                        
                        <div class="footer">
                            Sistema de Evaluación Docente - Universidad Autónoma - ${new Date().toLocaleDateString()}
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            // Asignar el contenido HTML al contenedor
            pdfContainer.innerHTML = htmlContent;
            
            // Mostrar mensaje de carga
            const loadingMsg = document.createElement('div');
            loadingMsg.style.position = 'fixed';
            loadingMsg.style.top = '50%';
            loadingMsg.style.left = '50%';
            loadingMsg.style.transform = 'translate(-50%, -50%)';
            loadingMsg.style.padding = '20px';
            loadingMsg.style.background = 'rgba(0,0,0,0.7)';
            loadingMsg.style.color = 'white';
            loadingMsg.style.borderRadius = '10px';
            loadingMsg.style.zIndex = '9999';
            loadingMsg.style.fontFamily = 'Arial, sans-serif';
            loadingMsg.textContent = 'Generando PDF...';
            document.body.appendChild(loadingMsg);
            
            // Verificar que html2pdf está disponible
            if (typeof html2pdf === 'undefined') {
                throw new Error('La biblioteca html2pdf no está disponible');
            }
            
            // Configuración optimizada para html2pdf
            const opt = {
                margin: [10, 10, 10, 10],
                filename: fileName + '.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                    allowTaint: true,
                    imageTimeout: 5000
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: { mode: 'avoid-all' }
            };
            
            // Dar tiempo para que se carguen las imágenes y se renderice todo correctamente
            setTimeout(() => {
                console.log('Iniciando generación de PDF después del timeout...');
                
                // Asegurarse de que las imágenes estén cargadas
                const images = pdfContainer.querySelectorAll('img');
                let imagesLoaded = 0;
                const totalImages = images.length;
                
                // Si no hay imágenes, generar el PDF directamente
                if (totalImages === 0) {
                    generatePDF();
                    return;
                }
                
                // Esperar a que todas las imágenes estén cargadas
                images.forEach(img => {
                    if (img.complete) {
                        imagesLoaded++;
                        if (imagesLoaded === totalImages) {
                            generatePDF();
                        }
                    } else {
                        img.onload = () => {
                            imagesLoaded++;
                            if (imagesLoaded === totalImages) {
                                generatePDF();
                            }
                        };
                        img.onerror = () => {
                            console.error('Error al cargar imagen:', img.src);
                            imagesLoaded++;
                            if (imagesLoaded === totalImages) {
                                generatePDF();
                            }
                        };
                    }
                });
                
                // Función para generar el PDF
                function generatePDF() {
                    try {
                        html2pdf()
                            .from(pdfContainer)
                            .set(opt)
                            .save()
                            .then(() => {
                                console.log('PDF generado correctamente');
                                document.body.removeChild(pdfContainer);
                                document.body.removeChild(loadingMsg);
                            })
                            .catch(error => {
                                console.error('Error al generar el PDF:', error);
                                alert('Error al generar el PDF: ' + error.message);
                                document.body.removeChild(loadingMsg);
                                if (document.body.contains(pdfContainer)) {
                                    document.body.removeChild(pdfContainer);
                                }
                            });
                    } catch (error) {
                        console.error('Error al iniciar la generación del PDF:', error);
                        alert('Error al iniciar la generación del PDF: ' + error.message);
                        document.body.removeChild(loadingMsg);
                        if (document.body.contains(pdfContainer)) {
                            document.body.removeChild(pdfContainer);
                        }
                    }
                }
            }, 1000); // Dar tiempo para que se carguen las imágenes inicialmente
                
        } catch (error) {
            console.error('Error en el proceso de generación de PDF:', error);
            alert('Error en el proceso de generación de PDF: ' + error.message);
        }
    } else if (format === 'excel' || format === 'csv') {
        // Preparar datos para Excel/CSV con formato mejorado
        let csvContent = '';
        
        // Añadir título
        csvContent += `Evaluación Docente ${yearSelected} - ${semesterText}\n\n`;
        
        // Añadir datos de la tabla principal
        csvContent += 'DATOS DE EVALUACIÓN\n';
        csvContent += 'Año,Semestre 1,Semestre 2,Promedio Anual\n';
        datosTabla.forEach(fila => {
            csvContent += fila.join(',') + '\n';
        });
        
        // Añadir datos del gráfico actual
        csvContent += '\nDETALLES DE EVALUACIÓN - ' + chartInstance.data.datasets[0].label + '\n';
        csvContent += chartInstance.data.labels.join(',') + '\n';
        csvContent += chartInstance.data.datasets[0].data.map(val => val.toFixed(1)).join(',') + '\n';
        
        // Añadir comentarios
        csvContent += '\nCOMENTARIOS\n';
        csvContent += 'Calificación,Comentario\n';
        comentarios.forEach(comentario => {
            csvContent += `${comentario.rating.toFixed(1)},"${comentario.text}"\n`;
        });
        
        // Crear blob y descargar
        const blob = new Blob([csvContent], { type: format === 'excel' ? 'application/vnd.ms-excel' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + (format === 'excel' ? '.xls' : '.csv');
        document.body.appendChild(a);
        a.click();
        
        // Limpiar
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
}

// Función para generar comentarios aleatorios con estrellas
function generarComentariosAleatorios() {
    const comentariosContainer = document.getElementById('comentariosContainer');
    if (!comentariosContainer) return;
    
    // Limpiar comentarios existentes
    comentariosContainer.innerHTML = '';
    
    // Generar entre 5 y 10 comentarios aleatorios
    const numComentarios = Math.floor(Math.random() * 6) + 5;
    
    // Lista de posibles comentarios positivos
    const comentariosPositivos = [
        "Excelente profesor, explica con claridad y paciencia.",
        "Las clases son muy dinámicas y el material didáctico es de gran ayuda.",
        "Siempre está disponible para resolver dudas fuera de clase.",
        "Domina perfectamente la materia y sabe transmitir su conocimiento.",
        "Hace que temas complejos sean fáciles de entender.",
        "Muy buen manejo del tiempo en clase, aprovecha cada minuto.",
        "Sus evaluaciones son justas y acordes al contenido visto en clase.",
        "Excelente metodología de enseñanza, muy recomendado.",
        "Motiva a los estudiantes a participar y pensar críticamente.",
        "Siempre llega puntual y bien preparado para las clases."
    ];
    
    // Lista de posibles comentarios neutrales
    const comentariosNeutrales = [
        "Las clases son buenas pero a veces falta más ejemplos prácticos.",
        "Conoce bien la materia pero podría mejorar la forma de explicar.",
        "El material de estudio es adecuado pero podría actualizarse.",
        "Es puntual pero a veces termina la clase antes de tiempo.",
        "Las evaluaciones son justas pero muy extensas para el tiempo dado.",
        "Responde dudas pero a veces no con suficiente detalle.",
        "Buen profesor aunque podría ser más dinámico en sus clases.",
        "Cumple con el programa pero va muy rápido con algunos temas.",
        "Es accesible pero a veces tarda en responder correos.",
        "Explica bien aunque a veces usa términos muy técnicos sin aclarar."
    ];
    
    // Lista de posibles comentarios negativos
    const comentariosNegativos = [
        "Explica muy rápido y no se detiene a resolver dudas.",
        "Falta más organización en el contenido de las clases.",
        "Las evaluaciones no corresponden con lo visto en clase.",
        "Debería proporcionar más material de apoyo para estudiar.",
        "A veces llega tarde y no aprovecha bien el tiempo de clase.",
        "No responde correos ni está disponible en horarios de consulta.",
        "El método de evaluación no es claro desde el principio.",
        "Necesita mejorar la forma de explicar conceptos complejos.",
        "Falta más retroalimentación en los trabajos entregados.",
        "Las clases son monótonas y poco participativas."
    ];
    
    for (let i = 0; i < numComentarios; i++) {
        // Generar calificación aleatoria entre 1 y 5
        const rating = getRandomDecimal(1, 5, 1);
        let comentario;
        
        // Seleccionar tipo de comentario según la calificación
        if (rating >= 4) {
            comentario = comentariosPositivos[Math.floor(Math.random() * comentariosPositivos.length)];
        } else if (rating >= 2.5) {
            comentario = comentariosNeutrales[Math.floor(Math.random() * comentariosNeutrales.length)];
        } else {
            comentario = comentariosNegativos[Math.floor(Math.random() * comentariosNegativos.length)];
        }
        
        // Generar estrellas según la calificación
        const estrellas = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
        
        // Crear elemento de comentario
        const comentarioElement = document.createElement('div');
        comentarioElement.className = 'comentario';
        comentarioElement.innerHTML = `
            <div class="rating-container">
                <span class="rating">${rating.toFixed(1)}</span>
                <span class="star-rating">${estrellas}</span>
            </div>
            <div class="text">${comentario}</div>
        `;
        
        // Añadir al contenedor
        comentariosContainer.appendChild(comentarioElement);
    }
}

// Configurar los event listeners cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el selector de materias
    const materiaSelect = document.getElementById('materiaSelect');
    const visualizacionMateria = document.getElementById('visualizacionMateria');
    const nombreMateria = document.getElementById('nombreMateria');
    
    if (materiaSelect) {
        materiaSelect.addEventListener('change', function() {
            if (this.value) {
                visualizacionMateria.style.display = 'block';
                nombreMateria.textContent = this.options[this.selectedIndex].text;
                
                // Inicializar o actualizar el gráfico
                inicializarGrafico();
                
                // Generar datos aleatorios iniciales
                generarDatosAleatorios();
            } else {
                visualizacionMateria.style.display = 'none';
            }
        });
    }
    
    // Configurar el botón de generar datos aleatorios
    const generarDatosBtn = document.getElementById('generarDatosBtn');
    if (generarDatosBtn) {
        generarDatosBtn.addEventListener('click', function() {
            generarDatosAleatorios();
            if (document.getElementById('mainChart')) {
                updateChart();
            }
        });
    }
    
    // Inicializar el gráfico principal si estamos en la página de resultados o panel docente
    if (document.getElementById('mainChart')) {
        updateChart();
        
        // Generar comentarios aleatorios si estamos en la página de resultados
        if (document.getElementById('comentariosContainer')) {
            generarComentariosAleatorios();
        }
        
        // Configurar los botones de tipo de gráfico
        document.querySelectorAll('.chart-type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                chartType = this.getAttribute('data-type');
                updateChart();
                
                // Efecto visual de selección
                document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Event listeners para los selectores de filtro
    const yearFilter = document.getElementById('yearFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const updateChartBtn = document.getElementById('updateChartBtn');
    const yearSelect = document.getElementById('yearSelect');
    const semesterSelect = document.getElementById('semesterSelect');
    const chartTypeSelect = document.getElementById('chartType');
    
    if (yearFilter) {
        yearFilter.addEventListener('change', function() {
            if (updateChartBtn) {
                // Si hay botón de actualizar, no actualizamos automáticamente
            } else {
                updateChart();
            }
        });
    }
    
    if (semesterFilter) {
        semesterFilter.addEventListener('change', function() {
            if (updateChartBtn) {
                // Si hay botón de actualizar, no actualizamos automáticamente
            } else {
                updateChart();
            }
        });
    }
    
    if (updateChartBtn) {
        updateChartBtn.addEventListener('click', function() {
            // Añadir efecto de carga
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Actualizando...';
            this.disabled = true;
            
            // Simular tiempo de carga
            setTimeout(() => {
                updateChart();
                this.innerHTML = 'Actualizar';
                this.disabled = false;
            }, 800);
        });
    }
    
    if (yearSelect) {
        yearSelect.addEventListener('change', updateChart);
    }
    
    if (semesterSelect) {
        semesterSelect.addEventListener('change', updateChart);
    }
    
    if (chartTypeSelect) {
        chartTypeSelect.addEventListener('change', function() {
            chartType = this.value;
            updateChart();
        });
    }
    
    // Asignar la función downloadResults al objeto window para que sea accesible desde HTML
    window.downloadResults = downloadResults;
});

// Función para añadir efectos de hover a los elementos
function addHoverEffects() {
    // Añadir efectos de hover a las tarjetas de evaluación
    document.querySelectorAll('.card-evaluacion').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(13, 110, 253, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Añadir efectos de hover a los botones de tipo de gráfico
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '#f0f7ff';
                this.style.borderColor = '#0d6efd';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }
        });
    });
}

// Llamar a la función para añadir efectos de hover cuando se carga la página
document.addEventListener('DOMContentLoaded', addHoverEffects);
