// Script para el Panel de Administrador

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes interactivos
    initializeCharts();
    setupDataTables();
    setupEventListeners();
    checkUserSession();
    
    // Añadir tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});

// Verificar sesión de usuario
function checkUserSession() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    // Si no está logueado o no es admin, redirigir al login
    if (!userLoggedIn || userRole !== 'admin') {
        window.location.href = '../login.html';
        return;
    }
    
    // Configurar botón de salir
    setupLogoutButton();
}

// Configurar botón de salir
function setupLogoutButton() {
    const logoutButton = document.querySelector('.sidebar .nav-link:has(i.fas.fa-sign-out-alt)');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('¿Está seguro que desea salir del sistema?')) {
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userRole');
                
                alert('Sesión finalizada');
                window.location.href = '../login.html';
            }
        });
    }
}

// Inicializar gráficos
function initializeCharts() {
    // Gráfico de distribución de usuarios por rol
    if (document.getElementById('usuariosChart')) {
        const ctxUsuarios = document.getElementById('usuariosChart').getContext('2d');
        const usuariosChart = new Chart(ctxUsuarios, {
            type: 'doughnut',
            data: {
                labels: ['Docentes', 'Decanos/Coordinadores', 'Administradores'],
                datasets: [{
                    data: [45, 8, 5],
                    backgroundColor: [
                        'rgba(13, 110, 253, 0.7)',
                        'rgba(25, 135, 84, 0.7)',
                        'rgba(111, 66, 193, 0.7)'
                    ],
                    borderColor: [
                        'rgba(13, 110, 253, 1)',
                        'rgba(25, 135, 84, 1)',
                        'rgba(111, 66, 193, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} usuarios (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
        
        // Añadir botones para cambiar visualización
        const chartContainer = document.querySelector('#usuariosChart').closest('.chart-container');
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'chart-buttons mt-2 text-center';
        buttonContainer.innerHTML = `
            <button class="btn btn-sm btn-outline-primary me-2" data-chart-type="doughnut">Dona</button>
            <button class="btn btn-sm btn-outline-primary" data-chart-type="pie">Pastel</button>
        `;
        chartContainer.after(buttonContainer);
        
        // Añadir event listeners a los botones
        buttonContainer.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                const chartType = this.getAttribute('data-chart-type');
                usuariosChart.config.type = chartType;
                usuariosChart.update();
                
                // Actualizar estado de botones
                buttonContainer.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
    
    // Gráfico de evaluaciones por departamento
    if (document.getElementById('departamentosChart')) {
        const ctxDepartamentos = document.getElementById('departamentosChart').getContext('2d');
        const departamentosChart = new Chart(ctxDepartamentos, {
            type: 'bar',
            data: {
                labels: ['Ingeniería', 'Ciencias', 'Humanidades', 'Artes', 'Economía'],
                datasets: [{
                    label: 'Evaluaciones Completadas',
                    data: [32, 28, 15, 12, 18],
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
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const departamentos = ['Ingeniería', 'Ciencias', 'Humanidades', 'Artes', 'Economía'];
                                const docentes = [15, 10, 8, 7, 5];
                                return `Total docentes: ${docentes[context.dataIndex]}`;
                            }
                        }
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
            button.addEventListener('click', function() {
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
}

// Configurar DataTables para tablas
function setupDataTables() {
    // Si hay tablas con la clase datatable, inicializarlas
    if (document.querySelector('.datatable')) {
        // Verificar si la tabla ya ha sido inicializada para evitar reinicializaciones
        const tables = document.querySelectorAll('.datatable');
        tables.forEach(table => {
            // Comprobar si la tabla ya tiene DataTable inicializado
            if (!$.fn.DataTable.isDataTable(table)) {
                $(table).DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
                    },
                    responsive: true,
                    pageLength: 10
                });
            }
        });
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Manejar clics en los elementos del menú
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si es el botón de salir, no hacer nada (ya está manejado en setupLogoutButton)
            if (this.querySelector('i.fas.fa-sign-out-alt')) {
                return;
            }
            
            // Prevenir navegación por defecto
            e.preventDefault();
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase active al link actual
            this.classList.add('active');
            
            // Obtener el href y navegar
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
}