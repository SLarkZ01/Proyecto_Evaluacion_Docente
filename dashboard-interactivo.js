// Script para añadir interactividad al dashboard principal

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar componentes interactivos
    initializeCharts();
    setupFilterListeners();
    setupRealTimeUpdates();
    setupNotifications();
    setupExportFunctionality();
    setupCardInteractions();

    // Actualizar contador de días restantes
    updateRemainingDays();
});

// Función para inicializar gráficos interactivos
function initializeCharts() {
    // Actualizar gráfico de rendimiento por departamento con interactividad
    if (document.getElementById('departamentosChart')) {
        const ctxDepartamentos = document.getElementById('departamentosChart').getContext('2d');
        const departamentosChart = new Chart(ctxDepartamentos, {
            type: 'bar',
            data: {
                labels: ['Ingeniería', 'Ciencias', 'Humanidades', 'Artes', 'Economía'],
                datasets: [{
                    label: 'Promedio de Calificación',
                    data: [4.2, 4.0, 4.5, 4.3, 3.9],
                    backgroundColor: [
                        'rgba(13, 110, 253, 0.7)',
                        'rgba(25, 135, 84, 0.7)',
                        'rgba(111, 66, 193, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(255, 193, 7, 0.7)'
                    ],
                    borderColor: [
                        'rgba(13, 110, 253, 1)',
                        'rgba(25, 135, 84, 1)',
                        'rgba(111, 66, 193, 1)',
                        'rgba(220, 53, 69, 1)',
                        'rgba(255, 193, 7, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 3.0,
                        max: 5.0
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterLabel: function (context) {
                                const departamentos = ['Ingeniería', 'Ciencias', 'Humanidades', 'Artes', 'Economía'];
                                const docentes = [15, 10, 8, 7, 5];
                                return `Total docentes: ${docentes[context.dataIndex]}`;
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                onClick: function (e, elements) {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const departamento = this.data.labels[index];
                        showDepartmentDetails(departamento);
                    }
                }
            }
        });

        // Añadir botones para cambiar visualización
        const chartContainer = document.querySelector('#departamentosChart').closest('.chart-container');
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'chart-buttons mt-2 text-center';
        buttonContainer.innerHTML = `
            <button class="btn btn-sm btn-outline-primary me-2" data-chart-type="bar">Barras</button>
            <button class="btn btn-sm btn-outline-primary" data-chart-type="line">Líneas</button>
        `;
        chartContainer.after(buttonContainer);

        // Añadir event listeners a los botones
        buttonContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function () {
                const chartType = this.getAttribute('data-chart-type');
                departamentosChart.config.type = chartType;
                departamentosChart.update();

                // Actualizar estado de botones
                buttonContainer.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // Actualizar gráfico de distribución de calificaciones con interactividad
    if (document.getElementById('calificacionesChart')) {
        const ctxCalificaciones = document.getElementById('calificacionesChart').getContext('2d');
        const calificacionesChart = new Chart(ctxCalificaciones, {
            type: 'doughnut',
            data: {
                labels: ['Excelente (4.5-5.0)', 'Bueno (4.0-4.4)', 'Aceptable (3.5-3.9)', 'Regular (3.0-3.4)', 'Deficiente (<3.0)'],
                datasets: [{
                    data: [15, 18, 7, 3, 2],
                    backgroundColor: [
                        'rgba(25, 135, 84, 0.7)',
                        'rgba(13, 110, 253, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(255, 128, 0, 0.7)',
                        'rgba(220, 53, 69, 0.7)'
                    ],
                    borderColor: [
                        'rgba(25, 135, 84, 1)',
                        'rgba(13, 110, 253, 1)',
                        'rgba(255, 193, 7, 1)',
                        'rgba(255, 128, 0, 1)',
                        'rgba(220, 53, 69, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        onClick: function (e, legendItem, legend) {
                            // Implementación personalizada del clic en leyenda
                            const index = legendItem.index;
                            const ci = this.chart;

                            // Mostrar/ocultar segmento
                            const meta = ci.getDatasetMeta(0);
                            const alreadyHidden = meta.data[index].hidden || false;
                            meta.data[index].hidden = !alreadyHidden;

                            // Actualizar gráfico
                            ci.update();

                            // Mostrar detalles de la categoría
                            if (!alreadyHidden) {
                                showCategoryDetails(legendItem.text);
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} docentes (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        // Añadir botones para cambiar visualización
        const chartContainer = document.querySelector('#calificacionesChart').closest('.chart-container');
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'chart-buttons mt-2 text-center';
        buttonContainer.innerHTML = `
            <button class="btn btn-sm btn-outline-primary me-2" data-chart-type="doughnut">Dona</button>
            <button class="btn btn-sm btn-outline-primary" data-chart-type="pie">Pastel</button>
        `;
        chartContainer.after(buttonContainer);

        // Añadir event listeners a los botones
        buttonContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function () {
                const chartType = this.getAttribute('data-chart-type');
                calificacionesChart.config.type = chartType;
                calificacionesChart.update();

                // Actualizar estado de botones
                buttonContainer.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // Crear nuevo gráfico de tendencia histórica
    createHistoricalTrendChart();
}

// Función para crear gráfico de tendencia histórica
function createHistoricalTrendChart() {
    // Crear contenedor para el nuevo gráfico
    const dashboardContent = document.querySelector('.main-content .container');
    const chartRow = document.createElement('div');
    chartRow.className = 'row mb-4';
    chartRow.innerHTML = `
        <div class="col-12">
            <div class="card dashboard-card">
                <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Tendencia Histórica de Evaluaciones</h5>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-sm btn-outline-primary active" data-period="year">Último Año</button>
                        <button type="button" class="btn btn-sm btn-outline-primary" data-period="semester">Por Semestre</button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-container" style="height: 300px;">
                        <canvas id="historicalTrendChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insertar antes de la última fila
    const lastRow = dashboardContent.querySelector('.row:last-child');
    dashboardContent.insertBefore(chartRow, lastRow);

    // Inicializar el gráfico
    const ctxHistorical = document.getElementById('historicalTrendChart').getContext('2d');
    const historicalChart = new Chart(ctxHistorical, {
        type: 'line',
        data: {
            labels: ['2024-1', '2024-2', '2025-1'],
            datasets: [{
                label: 'Promedio General',
                data: [4.1, 4.2, 4.3],
                borderColor: 'rgba(13, 110, 253, 1)',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Evaluación Estudiantil',
                data: [4.0, 4.1, 4.2],
                borderColor: 'rgba(25, 135, 84, 1)',
                backgroundColor: 'transparent',
                tension: 0.4
            }, {
                label: 'Evaluación Administrativa',
                data: [4.2, 4.3, 4.4],
                borderColor: 'rgba(111, 66, 193, 1)',
                backgroundColor: 'transparent',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.5,
                    max: 5.0,
                    title: {
                        display: true,
                        text: 'Calificación Promedio'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Periodo Académico'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    // Añadir event listeners a los botones de periodo
    chartRow.querySelectorAll('[data-period]').forEach(button => {
        button.addEventListener('click', function () {
            const period = this.getAttribute('data-period');
            let labels, data1, data2, data3;

            if (period === 'year') {
                labels = ['2024-1', '2024-2', '2025-1'];
                data1 = [4.1, 4.2, 4.3];
                data2 = [4.0, 4.1, 4.2];
                data3 = [4.2, 4.3, 4.4];
            } else {
                labels = ['2023-1', '2023-2', '2024-1', '2024-2', '2025-1'];
                data1 = [3.9, 4.0, 4.1, 4.2, 4.3];
                data2 = [3.8, 3.9, 4.0, 4.1, 4.2];
                data3 = [4.0, 4.1, 4.2, 4.3, 4.4];
            }

            historicalChart.data.labels = labels;
            historicalChart.data.datasets[0].data = data1;
            historicalChart.data.datasets[1].data = data2;
            historicalChart.data.datasets[2].data = data3;
            historicalChart.update();

            // Actualizar estado de botones
            chartRow.querySelectorAll('[data-period]').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Función para configurar filtros interactivos
function setupFilterListeners() {
    // Añadir filtro de departamento
    const headerActions = document.querySelector('.d-flex.justify-content-between.align-items-center');
    if (headerActions) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'dropdown me-3';
        filterContainer.innerHTML = `
            <button class="btn btn-outline-primary dropdown-toggle" type="button" id="departamentoDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-filter me-2"></i> Departamento: Todos
            </button>
            <ul class="dropdown-menu" aria-labelledby="departamentoDropdown">
                <li><a class="dropdown-item active" href="#" data-dept="all">Todos los departamentos</a></li>
                <li><a class="dropdown-item" href="#" data-dept="ingenieria">Ingeniería</a></li>
                <li><a class="dropdown-item" href="#" data-dept="ciencias">Ciencias</a></li>
                <li><a class="dropdown-item" href="#" data-dept="humanidades">Humanidades</a></li>
                <li><a class="dropdown-item" href="#" data-dept="artes">Artes</a></li>
                <li><a class="dropdown-item" href="#" data-dept="economia">Economía</a></li>
            </ul>
        `;

        // Insertar antes del dropdown de periodo
        const periodoDropdown = headerActions.querySelector('.dropdown');
        if (periodoDropdown) {
            headerActions.querySelector('.d-flex.align-items-center').insertBefore(filterContainer, periodoDropdown);
        }

        // Añadir event listeners a los filtros
        filterContainer.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const dept = this.getAttribute('data-dept');

                // Actualizar texto del botón
                const btnText = dept === 'all' ? 'Todos' : this.textContent;
                filterContainer.querySelector('button').innerHTML = `<i class="fas fa-filter me-2"></i> Departamento: ${btnText}`;

                // Actualizar estado activo
                filterContainer.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                // Filtrar contenido del dashboard
                filterDashboardByDepartment(dept);
            });
        });
    }

    // Añadir buscador de docentes
    const alertaContainer = document.querySelector('.alert.alert-success').parentNode;
    const searchContainer = document.createElement('div');
    searchContainer.className = 'mb-4';
    searchContainer.innerHTML = `
        <div class="input-group">
            <span class="input-group-text bg-white"><i class="fas fa-search"></i></span>
            <input type="text" class="form-control" id="searchDocente" placeholder="Buscar docente por nombre...">
            <button class="btn btn-primary" type="button" id="btnSearch">Buscar</button>
        </div>
    `;
    alertaContainer.insertBefore(searchContainer, document.querySelector('.alert.alert-success').nextSibling);

    // Añadir event listener al buscador
    document.getElementById('searchDocente').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        searchDocentes(searchTerm);
    });

    document.getElementById('btnSearch').addEventListener('click', function () {
        const searchTerm = document.getElementById('searchDocente').value.toLowerCase();
        searchDocentes(searchTerm);
    });
}

// Función para filtrar el dashboard por departamento
function filterDashboardByDepartment(dept) {
    // Filtrar tarjetas de alertas
    const alertItems = document.querySelectorAll('.list-group-item');
    alertItems.forEach(item => {
        const deptBadge = item.querySelector('.badge');
        if (deptBadge) {
            const itemDept = deptBadge.textContent.toLowerCase();
            if (dept === 'all' || itemDept === dept) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        }
    });

    // Actualizar estadísticas y gráficos según el departamento
    updateStatsByDepartment(dept);
}

// Función para buscar docentes
function searchDocentes(term) {
    const docenteItems = document.querySelectorAll('.list-group-item h6');
    docenteItems.forEach(item => {
        const docenteName = item.textContent.toLowerCase();
        const listItem = item.closest('.list-group-item');

        if (docenteName.includes(term)) {
            listItem.style.display = '';
            // Resaltar el término buscado
            if (term) {
                const regex = new RegExp(`(${term})`, 'gi');
                item.innerHTML = item.textContent.replace(regex, '<span class="bg-warning">$1</span>');
            } else {
                // Restaurar texto original sin resaltado
                item.innerHTML = item.textContent;
            }
        } else {
            listItem.style.display = 'none';
        }
    });
}

// Función para actualizar estadísticas por departamento
function updateStatsByDepartment(dept) {
    // Datos simulados por departamento
    const deptStats = {
        'all': { total: 45, completas: 32, pendientes: 13, promedio: 4.2 },
        'ingenieria': { total: 15, completas: 12, pendientes: 3, promedio: 4.2 },
        'ciencias': { total: 10, completas: 7, pendientes: 3, promedio: 4.0 },
        'humanidades': { total: 8, completas: 6, pendientes: 2, promedio: 4.5 },
        'artes': { total: 7, completas: 4, pendientes: 3, promedio: 4.3 },
        'economia': { total: 5, completas: 3, pendientes: 2, promedio: 3.9 }
    };

    // Actualizar tarjetas de estadísticas
    const stats = deptStats[dept] || deptStats['all'];
    const statCards = document.querySelectorAll('.dashboard-card .card-body h2');

    if (statCards.length >= 4) {
        statCards[0].textContent = stats.total;
        statCards[1].textContent = stats.completas;
        statCards[2].textContent = stats.pendientes;
        statCards[3].textContent = stats.promedio;
    }

    // Actualizar porcentajes
    const percentCompleted = Math.round((stats.completas / stats.total) * 100);
    const percentPending = Math.round((stats.pendientes / stats.total) * 100);

    const statTexts = document.querySelectorAll('.dashboard-card .card-body p.card-text');
    if (statTexts.length >= 2) {
        statTexts[1].textContent = `${percentCompleted}% completado`;
        statTexts[2].textContent = `${percentPending}% pendiente`;
    }
}

// Función para configurar actualizaciones en tiempo real
function setupRealTimeUpdates() {
    // Simular actualizaciones periódicas
    setInterval(() => {
        // Actualizar contador de tiempo restante
        updateRemainingDays();

        // Simular actualización de datos aleatorios
        simulateDataUpdates();
    }, 60000); // Actualizar cada minuto
}

// Función para simular actualizaciones de datos
function simulateDataUpdates() {
    // Simular cambios en evaluaciones completadas
    const randomChange = Math.floor(Math.random() * 3);
    const evaluacionesCompletas = document.querySelectorAll('.dashboard-card .card-body h2')[1];
    const evaluacionesPendientes = document.querySelectorAll('.dashboard-card .card-body h2')[2];

    if (evaluacionesCompletas && evaluacionesPendientes) {
        let completas = parseInt(evaluacionesCompletas.textContent);
        let pendientes = parseInt(evaluacionesPendientes.textContent);

        // Asegurar que no se supere el total
        if (pendientes > 0 && randomChange > 0) {
            completas += randomChange;
            pendientes -= randomChange;

            evaluacionesCompletas.textContent = completas;
            evaluacionesPendientes.textContent = pendientes;

            // Actualizar porcentajes
            const total = completas + pendientes;
            const percentCompleted = Math.round((completas / total) * 100);
            const percentPending = Math.round((pendientes / total) * 100);

            const statTexts = document.querySelectorAll('.dashboard-card .card-body p.card-text');
            if (statTexts.length >= 2) {
                statTexts[1].textContent = `${percentCompleted}% completado`;
                statTexts[2].textContent = `${percentPending}% pendiente`;
            }

            // Mostrar notificación de actualización
            showNotification('Actualización', `Se han completado ${randomChange} nuevas evaluaciones.`);
        }
    }
}

// Función para actualizar contador de días restantes
function updateRemainingDays() {
    const fechaFin = new Date('2025-06-30');
    const hoy = new Date();
    const diferencia = fechaFin - hoy;
    const diasRestantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

    // Actualizar el mensaje en la alerta
    const alertaTexto = document.querySelector('.alert p.mb-0');
    if (alertaTexto) {
        alertaTexto.textContent = `El periodo de evaluación docente está activo hasta 2025-06-30. Quedan ${diasRestantes} días para completar todas las evaluaciones pendientes.`;
    }

    // Cambiar color de la alerta si quedan pocos días
    const alerta = document.querySelector('.alert');
    if (alerta) {
        if (diasRestantes <= 7) {
            alerta.classList.remove('alert-success');
            alerta.classList.add('alert-danger');
        } else if (diasRestantes <= 15) {
            alerta.classList.remove('alert-success');
            alerta.classList.add('alert-warning');
        }
    }
}

// Función para configurar sistema de notificaciones
function setupNotifications() {
    // Crear contenedor de notificaciones
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    notificationContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999;';
    document.body.appendChild(notificationContainer);

    // Añadir estilos para notificaciones
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            background-color: white;
            border-left: 4px solid #0d6efd;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin-bottom: 10px;
            padding: 15px 20px;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            width: 300px;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .notification-body {
            color: #666;
        }
        .notification-close {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            color: #999;
        }
    `;
    document.head.appendChild(style);

    // Simular notificaciones iniciales
    setTimeout(() => {
        showNotification('Bienvenido', 'Bienvenido al dashboard interactivo de evaluación docente.');
    }, 2000);

    setTimeout(() => {
        showNotification('Recordatorio', 'Tienes 13 evaluaciones pendientes por completar.');
    }, 5000);
}

// Función para mostrar notificaciones
function showNotification(title, message) {
    const notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-close">&times;</div>
        <div class="notification-title">${title}</div>
        <div class="notification-body">${message}</div>
    `;

    notificationContainer.appendChild(notification);

    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Configurar cierre de notificación
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Función para configurar funcionalidad de exportación
function setupExportFunctionality() {
    // Mejorar botón de exportar informe
    const exportBtn = document.querySelector('.btn-primary:not(.btn-sm)');
    if (exportBtn && exportBtn.textContent.includes('Exportar Informe')) {
        // Reemplazar con dropdown
        const exportContainer = document.createElement('div');
        exportContainer.className = 'dropdown';
        exportContainer.innerHTML = `
            <button class="btn btn-primary dropdown-toggle" type="button" id="exportDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-download me-2"></i> Exportar Informe
            </button>
            <ul class="dropdown-menu" aria-labelledby="exportDropdown">
                <li><a class="dropdown-item" href="#" data-format="pdf"><i class="far fa-file-pdf me-2"></i> Exportar como PDF</a></li>
                <li><a class="dropdown-item" href="#" data-format="excel"><i class="far fa-file-excel me-2"></i> Exportar como Excel</a></li>
                <li><a class="dropdown-item" href="#" data-format="csv"><i class="far fa-file-csv me-2"></i> Exportar como CSV</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" data-format="print"><i class="fas fa-print me-2"></i> Imprimir informe</a></li>
            </ul>
        `;

        // Reemplazar el botón original
        exportBtn.parentNode.replaceChild(exportContainer, exportBtn);

        // Añadir event listeners a las opciones de exportación
        exportContainer.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const format = this.getAttribute('data-format');
                exportDashboard(format);
            });
        });
    }
}

// Función para exportar el dashboard
function exportDashboard(format) {
    // Mostrar indicador de carga
    showNotification('Exportando', `Preparando exportación en formato ${format.toUpperCase()}...`);

    // Simular proceso de exportación
    setTimeout(() => {
        let message = '';
        switch (format) {
            case 'pdf':
                message = 'El informe ha sido exportado como PDF y está listo para descargar.';
                break;
            case 'excel':
                message = 'El informe ha sido exportado como Excel y está listo para descargar.';
                break;
            case 'csv':
                message = 'Los datos han sido exportados como CSV y están listos para descargar.';
                break;
            case 'print':
                message = 'El informe está listo para imprimir. Se abrirá la ventana de impresión.';
                // Simular apertura de ventana de impresión
                setTimeout(() => {
                    window.print();
                }, 500);
                break;
        }

        showNotification('Exportación completada', message);

        // Simular descarga para formatos de archivo
        if (format !== 'print') {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `informe-evaluacion-docente-${format}.${format}`;
            link.click();
        }
    }, 1500);
}

// Función para configurar interacciones de tarjetas
function setupCardInteractions() {
    // Añadir interactividad a las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.dashboard-card');
    statCards.forEach(card => {
        // Añadir efecto hover mejorado
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });

        // Añadir tooltip con información adicional
        const cardTitle = card.querySelector('.card-title');
        if (cardTitle) {
            const tooltipText = getTooltipText(cardTitle.textContent);
            if (tooltipText) {
                card.setAttribute('data-bs-toggle', 'tooltip');
                card.setAttribute('data-bs-placement', 'top');
                card.setAttribute('title', tooltipText);

                // Inicializar tooltip
                new bootstrap.Tooltip(card);
            }
        }
    });

    // Hacer que las tarjetas de docentes destacados sean expandibles
    const docentesItems = document.querySelectorAll('.list-group-item');
    docentesItems.forEach(item => {
        // Solo para tarjetas de docentes destacados
        if (item.querySelector('h6') && !item.classList.contains('alert-docente') &&
            !item.classList.contains('alert-warning-custom') && !item.classList.contains('alert-success-custom')) {

            // Añadir botón para expandir
            const detailsBtn = document.createElement('button');
            detailsBtn.className = 'btn btn-sm btn-outline-primary mt-2';
            detailsBtn.innerHTML = '<i class="fas fa-info-circle"></i> Ver detalles';
            item.querySelector('div > div:last-child').appendChild(detailsBtn);

            // Crear contenido expandible
            const expandableContent = document.createElement('div');
            expandableContent.className = 'expandable-content mt-3';
            expandableContent.style.display = 'none';
            expandableContent.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Asignaturas:</strong> 3 cursos asignados</p>
                        <p><strong>Experiencia:</strong> 5 años</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Evaluaciones:</strong> 45 completadas</p>
                        <p><strong>Tendencia:</strong> <i class="fas fa-arrow-up text-success"></i> +0.2 vs periodo anterior</p>
                    </div>
                </div>
                <div class="text-center mt-2">
                    <a href="#" class="btn btn-sm btn-primary">Ver perfil completo</a>
                </div>
            `;
            item.appendChild(expandableContent);

            // Añadir event listener
            detailsBtn.addEventListener('click', function () {
                const isVisible = expandableContent.style.display !== 'none';
                expandableContent.style.display = isVisible ? 'none' : 'block';
                this.innerHTML = isVisible ?
                    '<i class="fas fa-info-circle"></i> Ver detalles' :
                    '<i class="fas fa-times-circle"></i> Ocultar detalles';
            });
        }
    });
}

// Función para obtener texto de tooltip según el tipo de tarjeta
function getTooltipText(cardTitle) {
    const titleText = cardTitle.toLowerCase();
    if (titleText.includes('total docentes')) {
        return 'Número total de docentes activos en el departamento durante el periodo actual';
    } else if (titleText.includes('evaluaciones completas')) {
        return 'Evaluaciones que han sido completadas por estudiantes, administrativos y autoevaluaciones';
    } else if (titleText.includes('evaluaciones pendientes')) {
        return 'Evaluaciones que aún no han sido completadas y requieren seguimiento';
    } else if (titleText.includes('promedio')) {
        return 'Calificación promedio de todas las evaluaciones completadas en el departamento';
    }
    return '';
}

// Función para mostrar detalles de departamento
function showDepartmentDetails(departamento) {
    // Crear modal con detalles del departamento
    const modalHTML = `
        <div class="modal fade" id="departmentModal" tabindex="-1" aria-labelledby="departmentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="departmentModalLabel">Detalles del Departamento: ${departamento}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <h6>Estadísticas Generales</h6>
                                <p><strong>Total Docentes:</strong> ${getDepartmentStat(departamento, 'total')}</p>
                                <p><strong>Evaluaciones Completas:</strong> ${getDepartmentStat(departamento, 'completas')}</p>
                                <p><strong>Evaluaciones Pendientes:</strong> ${getDepartmentStat(departamento, 'pendientes')}</p>
                                <p><strong>Promedio Departamental:</strong> ${getDepartmentStat(departamento, 'promedio')}/5.0</p>
                            </div>
                            <div class="col-md-6">
                                <h6>Distribución de Calificaciones</h6>
                                <canvas id="deptDistributionChart" height="200"></canvas>
                            </div>
                        </div>
                        <h6>Docentes del Departamento</h6>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Asignatura</th>
                                        <th>Calificación</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${generateDepartmentTableRows(departamento)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Exportar Detalles</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Añadir modal al DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('departmentModal'));
    modal.show();

    // Inicializar gráfico de distribución
    setTimeout(() => {
        const ctx = document.getElementById('deptDistributionChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Excelente', 'Bueno', 'Aceptable', 'Regular', 'Deficiente'],
                datasets: [{
                    data: getDepartmentDistribution(departamento),
                    backgroundColor: [
                        'rgba(25, 135, 84, 0.7)',
                        'rgba(13, 110, 253, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(255, 128, 0, 0.7)',
                        'rgba(220, 53, 69, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }, 500);

    // Eliminar modal del DOM cuando se cierre
    document.getElementById('departmentModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Función para obtener estadísticas por departamento
function getDepartmentStat(departamento, stat) {
    // Datos simulados por departamento
    const deptStats = {
        'Ingeniería': { total: 15, completas: 12, pendientes: 3, promedio: 4.2 },
        'Ciencias': { total: 10, completas: 7, pendientes: 3, promedio: 4.0 },
        'Humanidades': { total: 8, completas: 6, pendientes: 2, promedio: 4.5 },
        'Artes': { total: 7, completas: 4, pendientes: 3, promedio: 4.3 },
        'Economía': { total: 5, completas: 3, pendientes: 2, promedio: 3.9 }
    };

    return deptStats[departamento][stat];
}

// Función para obtener distribución de calificaciones por departamento
function getDepartmentDistribution(departamento) {
    // Datos simulados de distribución por departamento
    const distributions = {
        'Ingeniería': [5, 6, 2, 1, 1],
        'Ciencias': [3, 4, 2, 1, 0],
        'Humanidades': [5, 2, 1, 0, 0],
        'Artes': [3, 3, 1, 0, 0],
        'Economía': [1, 2, 1, 0, 1]
    };

    return distributions[departamento];
}

// Función para generar filas de tabla de docentes por departamento
function generateDepartmentTableRows(departamento) {
    // Datos simulados de docentes por departamento
    const docentesPorDepartamento = {
        'Ingeniería': [
            { nombre: 'Roberto Álvarez', asignatura: 'Programación Avanzada', calificacion: 4.8, estado: 'Completado' },
            { nombre: 'Carlos Rodríguez', asignatura: 'Cálculo Diferencial', calificacion: 2.4, estado: 'Pendiente' },
            { nombre: 'Ana Martínez', asignatura: 'Estructuras de Datos', calificacion: 4.5, estado: 'Completado' }
        ],
        'Ciencias': [
            { nombre: 'María Gómez', asignatura: 'Física Mecánica', calificacion: 2.7, estado: 'Pendiente' },
            { nombre: 'Patricia Mendoza', asignatura: 'Biología Molecular', calificacion: 4.7, estado: 'Completado' },
            { nombre: 'Juan Pérez', asignatura: 'Física Cuántica', calificacion: 3.8, estado: 'En proceso' }
        ],
        'Humanidades': [
            { nombre: 'Laura Sánchez', asignatura: 'Literatura Contemporánea', calificacion: 4.9, estado: 'Completado' },
            { nombre: 'Fernando López', asignatura: 'Historia del Arte', calificacion: 4.6, estado: 'Completado' }
        ],
        'Artes': [
            { nombre: 'Carmen Díaz', asignatura: 'Diseño Gráfico', calificacion: 4.4, estado: 'Completado' },
            { nombre: 'Miguel Ángel Torres', asignatura: 'Fotografía Digital', calificacion: 4.2, estado: 'Completado' }
        ],
        'Economía': [
            { nombre: 'Javier Ruiz', asignatura: 'Macroeconomía', calificacion: 3.9, estado: 'Completado' },
            { nombre: 'Sofía Vargas', asignatura: 'Contabilidad Financiera', calificacion: 3.8, estado: 'Completado' }
        ]
    };

    // Generar filas HTML
    let rowsHTML = '';
    const docentes = docentesPorDepartamento[departamento] || [];

    docentes.forEach(docente => {
        const estadoClass = docente.estado === 'Completado' ? 'success' :
            docente.estado === 'Pendiente' ? 'danger' : 'warning';
        const calificacionClass = docente.calificacion >= 4.5 ? 'text-success' :
            docente.calificacion < 3.0 ? 'text-danger' : 'text-warning';

        rowsHTML += `
            <tr>
                <td>${docente.nombre}</td>
                <td>${docente.asignatura}</td>
                <td class="${calificacionClass} fw-bold">${docente.calificacion}/5.0</td>
                <td><span class="badge bg-${estadoClass}">${docente.estado}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-success ms-1"><i class="fas fa-file-signature"></i></button>
                </td>
            </tr>
        `;
    });

    return rowsHTML || '<tr><td colspan="5" class="text-center">No hay docentes registrados en este departamento</td></tr>';
}

// Función para mostrar detalles de categoría de calificación
function showCategoryDetails(category) {
    // Extraer rango de calificación de la categoría
    const categoryMatch = category.match(/([\w\s]+)\s*\(([^)]+)\)/);
    const categoryName = categoryMatch ? categoryMatch[1].trim() : category;
    const categoryRange = categoryMatch ? categoryMatch[2].trim() : '';

    // Crear modal con detalles de la categoría
    const modalHTML = `
        <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="categoryModalLabel">Docentes con calificación: ${categoryName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Mostrando docentes con calificación en el rango ${categoryRange || 'seleccionado'}
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Departamento</th>
                                        <th>Asignatura</th>
                                        <th>Calificación</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${generateCategoryTableRows(categoryName, categoryRange)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Exportar Lista</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Añadir modal al DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
    modal.show();

    // Eliminar modal del DOM cuando se cierre
    document.getElementById('categoryModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Función para generar filas de tabla por categoría de calificación
function generateCategoryTableRows(categoryName, categoryRange) {
    // Determinar rango de calificación según la categoría
    let minScore = 0, maxScore = 5;

    if (categoryRange) {
        const rangeParts = categoryRange.split('-');
        if (rangeParts.length === 2) {
            minScore = parseFloat(rangeParts[0]);
            maxScore = parseFloat(rangeParts[1]);
        } else if (categoryRange.includes('<')) {
            maxScore = parseFloat(categoryRange.replace('<', ''));
            minScore = 0;
        }
    } else {
        // Asignar rangos por nombre de categoría
        switch (categoryName.toLowerCase()) {
            case 'excelente':
                minScore = 4.5; maxScore = 5.0;
                break;
            case 'bueno':
                minScore = 4.0; maxScore = 4.4;
                break;
            case 'aceptable':
                minScore = 3.5; maxScore = 3.9;
                break;
            case 'regular':
                minScore = 3.0; maxScore = 3.4;
                break;
            case 'deficiente':
                minScore = 0; maxScore = 2.9;
                break;
        }
    }

    // Datos simulados de todos los docentes
    const todosDocentes = [
        { nombre: 'Roberto Álvarez', departamento: 'Ingeniería', asignatura: 'Programación Avanzada', calificacion: 4.8 },
        { nombre: 'Laura Sánchez', departamento: 'Humanidades', asignatura: 'Literatura Contemporánea', calificacion: 4.9 },
        { nombre: 'Patricia Mendoza', departamento: 'Ciencias', asignatura: 'Biología Molecular', calificacion: 4.7 },
        { nombre: 'Fernando López', departamento: 'Humanidades', asignatura: 'Historia del Arte', calificacion: 4.6 },
        { nombre: 'Ana Martínez', departamento: 'Ingeniería', asignatura: 'Estructuras de Datos', calificacion: 4.5 },
        { nombre: 'Carmen Díaz', departamento: 'Artes', asignatura: 'Diseño Gráfico', calificacion: 4.4 },
        { nombre: 'Miguel Ángel Torres', departamento: 'Artes', asignatura: 'Fotografía Digital', calificacion: 4.2 },
        { nombre: 'Javier Ruiz', departamento: 'Economía', asignatura: 'Macroeconomía', calificacion: 3.9 },
        { nombre: 'Sofía Vargas', departamento: 'Economía', asignatura: 'Contabilidad Financiera', calificacion: 3.8 },
        { nombre: 'Juan Pérez', departamento: 'Ciencias', asignatura: 'Física Cuántica', calificacion: 3.8 },
        { nombre: 'María Gómez', departamento: 'Ciencias', asignatura: 'Física Mecánica', calificacion: 2.7 },
        { nombre: 'Carlos Rodríguez', departamento: 'Ingeniería', asignatura: 'Cálculo Diferencial', calificacion: 2.4 }
    ];

    // Filtrar docentes por rango de calificación
    const docentesFiltrados = todosDocentes.filter(docente =>
        docente.calificacion >= minScore && docente.calificacion <= maxScore
    );

    // Generar filas HTML
    let rowsHTML = '';

    docentesFiltrados.forEach(docente => {
        const calificacionClass = docente.calificacion >= 4.5 ? 'text-success' :
            docente.calificacion < 3.0 ? 'text-danger' : 'text-warning';

        rowsHTML += `
            <tr>
                <td>${docente.nombre}</td>
                <td>${docente.departamento}</td>
                <td>${docente.asignatura}</td>
                <td class="${calificacionClass} fw-bold">${docente.calificacion}/5.0</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-sm btn-outline-success ms-1"><i class="fas fa-file-signature"></i></button>
                </td>
            </tr>
        `;
    });

    return rowsHTML || '<tr><td colspan="5" class="text-center">No hay docentes en esta categoría</td></tr>';
}