<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Evaluación Docentes</title>
    <link rel="icon" href="images/Logo Uniautonoma.png">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Chart.js para gráficos -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="styles.css">
    <style>
        .dashboard-card {
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: all 0.3s;
            height: 100%;
        }
        
        .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
            font-size: 2.5rem;
            color: #0d6efd;
            opacity: 0.8;
        }
        
        .quick-access-card {
            border-radius: 12px;
            border-left: 4px solid #0d6efd;
            transition: all 0.3s;
        }
        
        .quick-access-card:hover {
            background-color: #f8f9fa;
            transform: translateX(5px);
        }
        
        .quick-access-icon {
            font-size: 1.8rem;
            color: #0d6efd;
            background-color: rgba(13, 110, 253, 0.1);
            padding: 15px;
            border-radius: 12px;
        }
        
        .alert-docente {
            border-left: 4px solid #dc3545;
        }
        
        .alert-warning-custom {
            border-left: 4px solid #ffc107;
        }
        
        .alert-success-custom {
            border-left: 4px solid #198754;
        }
        
        .badge-departamento {
            font-size: 0.75rem;
            padding: 0.25em 0.6em;
            border-radius: 10px;
        }
        
        .dept-ingenieria {
            background-color: #0d6efd;
            color: white;
        }
        
        .dept-ciencias {
            background-color: #198754;
            color: white;
        }
        
        .dept-humanidades {
            background-color: #6f42c1;
            color: white;
        }
        
        .chart-container {
            position: relative;
            height: 250px;
            width: 100%;
        }
    </style>
</head>

<body>
    <div class="container-fluid p-0">
        <div class="row g-0">
            <!-- Sidebar / Menú lateral -->
            <div class="col-md-2 sidebar">
                <div class="text-center py-4">
                    <div class="avatar-circle mx-auto">
                        <i class="fas fa-user fa-3x text-white"></i>
                    </div>
                    <p class="text-white mt-2">Perfil Decano/<br>Coordinador</p>
                </div>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">
                            <i class="fas fa-home"></i> Inicio
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="acta-compromiso.html">
                            <i class="fas fa-file-signature"></i> Generar Acta de compromiso
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="seguimiento-plan-mejora.html">
                            <i class="fas fa-tasks"></i> Seguimiento a plan de mejora
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="alertas-bajo-desempeno.html">
                            <i class="fas fa-exclamation-triangle"></i> Alertas de bajo desempeño
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="proceso-sancion-retiro.html">
                            <i class="fas fa-user-minus"></i> Proceso de Sanciones/Retiro
                        </a>
                    </li>
                    <li class="nav-item mt-5">
                        <a class="nav-link" href="#">
                            <i class="fas fa-sign-out-alt"></i> Salir
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Contenido principal -->
            <div class="col-md-10 main-content">
                <div class="container py-4">
                    <!-- Encabezado y bienvenida -->
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h1 class="mb-1">Dashboard del Panel Decano/Coordinador</h1>
                            <p class="text-muted">Bienvenido al sistema de Evaluación Docente</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="dropdown me-3">
                                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="periodoDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-calendar-alt me-2"></i> Periodo 2025-1
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="periodoDropdown">
                                    <li><a class="dropdown-item" href="#">Periodo 2025-1</a></li>
                                    <li><a class="dropdown-item" href="#">Periodo 2024-2</a></li>
                                    <li><a class="dropdown-item" href="#">Periodo 2024-1</a></li>
                                </ul>
                            </div>
                            <button class="btn btn-primary">
                                <i class="fas fa-download me-2"></i> Exportar Informe
                            </button>
                        </div>
                    </div>

                    <!-- Alerta de periodo activo -->
                    <div class="alert alert-success d-flex align-items-center mb-4" role="alert">
                        <i class="fas fa-check-circle me-2 fa-lg"></i>
                        <div>
                            <strong>Periodo de evaluación activo</strong>
                            <p class="mb-0">El periodo de evaluación docente está activo hasta 2025-06-30. Quedan 15 días para completar todas las evaluaciones pendientes.</p>
                        </div>
                    </div>

                    <!-- Tarjetas de estadísticas principales -->
                    <div class="row mb-4">
                        <div class="col-md-3 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-body d-flex align-items-center">
                                    <div class="me-3">
                                        <i class="fas fa-users card-icon"></i>
                                    </div>
                                    <div>
                                        <h6 class="card-title text-muted mb-1">Total Docentes</h6>
                                        <h2 class="display-5 fw-bold mb-0">45</h2>
                                        <p class="card-text text-muted small mb-0">Docentes en el departamento</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-body d-flex align-items-center">
                                    <div class="me-3">
                                        <i class="fas fa-clipboard-check card-icon"></i>
                                    </div>
                                    <div>
                                        <h6 class="card-title text-muted mb-1">Evaluaciones Completas</h6>
                                        <h2 class="display-5 fw-bold mb-0">32</h2>
                                        <p class="card-text text-muted small mb-0">71% completado</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-body d-flex align-items-center">
                                    <div class="me-3">
                                        <i class="fas fa-hourglass-half card-icon text-warning"></i>
                                    </div>
                                    <div>
                                        <h6 class="card-title text-muted mb-1">Evaluaciones Pendientes</h6>
                                        <h2 class="display-5 fw-bold mb-0">13</h2>
                                        <p class="card-text text-muted small mb-0">29% pendiente</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-body d-flex align-items-center">
                                    <div class="me-3">
                                        <i class="fas fa-chart-line card-icon text-success"></i>
                                    </div>
                                    <div>
                                        <h6 class="card-title text-muted mb-1">Promedio Departamental</h6>
                                        <h2 class="display-5 fw-bold mb-0">4.2</h2>
                                        <p class="card-text text-muted small mb-0">De 5.0 puntos posibles</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Gráficos de rendimiento -->
                    <div class="row mb-4">
                        <div class="col-md-6 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">Rendimiento por Departamento</h5>
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownPeriodo" data-bs-toggle="dropdown" aria-expanded="false">
                                            Último periodo
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownPeriodo">
                                            <li><a class="dropdown-item" href="#">Último periodo</a></li>
                                            <li><a class="dropdown-item" href="#">Últimos 3 periodos</a></li>
                                            <li><a class="dropdown-item" href="#">Último año</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="chart-container">
                                        <canvas id="departamentosChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">Distribución de Calificaciones</h5>
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownCalificaciones" data-bs-toggle="dropdown" aria-expanded="false">
                                            Periodo actual
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownCalificaciones">
                                            <li><a class="dropdown-item" href="#">Periodo actual</a></li>
                                            <li><a class="dropdown-item" href="#">Periodo anterior</a></li>
                                            <li><a class="dropdown-item" href="#">Comparativa</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="chart-container">
                                        <canvas id="calificacionesChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Accesos rápidos y alertas -->
                    <div class="row mb-4">
                        <!-- Accesos rápidos -->
                        <div class="col-md-4 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-header bg-white border-0">
                                    <h5 class="mb-0">Accesos Rápidos</h5>
                                </div>
                                <div class="card-body p-0">
                                    <div class="list-group list-group-flush">
                                        <a href="acta-compromiso.html" class="list-group-item list-group-item-action quick-access-card p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="me-3">
                                                    <i class="fas fa-file-signature quick-access-icon"></i>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1">Generar Acta de Compromiso</h6>
                                                    <p class="mb-0 text-muted small">Crear actas para docentes con bajo desempeño</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="seguimiento-plan-mejora.html" class="list-group-item list-group-item-action quick-access-card p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="me-3">
                                                    <i class="fas fa-tasks quick-access-icon"></i>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1">Seguimiento a Plan de Mejora</h6>
                                                    <p class="mb-0 text-muted small">Monitorear planes de mejora activos</p>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="alertas-bajo-desempeno.html" class="list-group-item list-group-item-action quick-access-card p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="me-3">
                                                    <i class="fas fa-exclamation-triangle quick-access-icon"></i>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1">Alertas de Bajo Desempeño</h6>
                                                    <p class="mb-0 text-muted small">Ver docentes con calificaciones críticas</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Alertas y notificaciones -->
                        <div class="col-md-8 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">Alertas y Notificaciones</h5>
                                    <a href="alertas-bajo-desempeno.html" class="btn btn-sm btn-outline-primary">Ver todas</a>
                                </div>
                                <div class="card-body p-0">
                                    <div class="list-group list-group-flush">
                                        <div class="list-group-item p-3 alert-docente">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 class="mb-1">Carlos Rodríguez - Calificación crítica</h6>
                                                    <p class="mb-0 text-muted small">Calificación: <span class="text-danger fw-bold">2.4/5.0</span> en Cálculo Diferencial</p>
                                                </div>
                                                <div>
                                                    <span class="badge dept-ingenieria">Ingeniería</span>
                                                    <a href="acta-compromiso.html" class="btn btn-sm btn-outline-danger ms-2">Generar Acta</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item p-3 alert-docente">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 class="mb-1">María Gómez - Calificación crítica</h6>
                                                    <p class="mb-0 text-muted small">Calificación: <span class="text-danger fw-bold">2.7/5.0</span> en Física Mecánica</p>
                                                </div>
                                                <div>
                                                    <span class="badge dept-ciencias">Ciencias</span>
                                                    <a href="acta-compromiso.html" class="btn btn-sm btn-outline-danger ms-2">Generar Acta</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item p-3 alert-warning-custom">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 class="mb-1">Plan de mejora pendiente</h6>
                                                    <p class="mb-0 text-muted small">El plan de mejora de Juan Pérez está pendiente de seguimiento desde hace 7 días</p>
                                                </div>
                                                <div>
                                                    <a href="seguimiento-plan-mejora.html" class="btn btn-sm btn-warning">Revisar</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item p-3 alert-success-custom">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 class="mb-1">Plan de mejora completado</h6>
                                                    <p class="mb-0 text-muted small">Ana Martínez ha completado su plan de mejora con éxito</p>
                                                </div>
                                                <div>
                                                    <a href="seguimiento-plan-mejora.html" class="btn btn-sm btn-success">Ver detalles</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Planes de mejora activos y docentes destacados -->
                    <div class="row mb-4">
                        <!-- Planes de mejora activos -->
                        <div class="col-md-6 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">Planes de Mejora Activos</h5>
                                    <a href="seguimiento-plan-mejora.html" class="btn btn-sm btn-outline-primary">Ver todos</a>
                                </div>
                                <div class="card-body">
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <h6 class="mb-0">Juan Pérez - Física Cuántica</h6>
                                                <small class="text-muted">Inicio: 15/05/2025 - Fin: 15/08/2025</small>
                                            </div>
                                            <span class="badge badge-estado badge-activo">Activo</span>
                                        </div>
                                        <div class="progress" style="height: 8px;">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div class="d-flex justify-content-between mt-1">
                                            <small class="text-muted">Progreso</small>
                                            <small class="text-muted">65%</small>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <h6 class="mb-0">María Gómez - Física Mecánica</h6>
                                                <small class="text-muted">Inicio: 01/06/2025 - Fin: 01/09/2025</small>
                                            </div>
                                            <span class="badge badge-estado badge-activo">Activo</span>
                                        </div>
                                        <div class="progress" style="height: 8px;">
                                            <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div class="d-flex justify-content-between mt-1">
                                            <small class="text-muted">Progreso</small>
                                            <small class="text-muted">30%</small>
                                        </div>
                                    </div>
                                    <div class="mb-0">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <h6 class="mb-0">Carlos Rodríguez - Cálculo Diferencial</h6>
                                                <small class="text-muted">Inicio: 10/06/2025 - Fin: 10/09/2025</small>
                                            </div>
                                            <span class="badge badge-estado badge-pendiente">Pendiente</span>
                                        </div>
                                        <div class="progress" style="height: 8px;">
                                            <div class="progress-bar bg-warning" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div class="d-flex justify-content-between mt-1">
                                            <small class="text-muted">Progreso</small>
                                            <small class="text-muted">10%</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Docentes destacados -->
                        <div class="col-md-6 mb-3">
                            <div class="card dashboard-card">
                                <div class="card-header bg-white border-0">
                                    <h5 class="mb-0">Docentes Destacados</h5>
                                </div>
                                <div class="card-body p-0">
                                    <div class="list-group list-group-flush">
                                        <div class="list-group-item p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="me-3">
                                                    <div class="avatar-circle" style="width: 50px; height: 50px; background-color: #0d6efd;">
                                                        <i class="fas fa-user fa-lg text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1">Laura Sánchez</h6>
                                                    <p class="mb-0 text-muted small">Calificación: <span class="text-success fw-bold">4.9/5.0</span></p>
                                                    <div class="d-flex align-items-center">
                                                        <span class="badge dept-humanidades me-2">Humanidades</span>
                                                        <small class="text-muted">Literatura Contemporánea</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="me-3">
                                                    <div class="avatar-circle" style="width: 50px; height: 50px; background-color: #198754;">
                                                        <i class="fas fa-user fa-lg text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1">Roberto Álvarez</h6>
                                                    <p class="mb-0 text-muted small">Calificación: <span class="text-success fw-bold">4.8/5.0</span></p>
                                                    <div class="d-flex align-items-center">
                                                        <span class="badge dept-ingenieria me-2">Ingeniería</span>
                                                        <small class="text-muted">Programación Avanzada</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-group-item p-3">
                                            <div class="d-flex align-items-center">
                                                <div class="me-3">
                                                    <div class="avatar-circle" style="width: 50px; height: 50px; background-color: #6f42c1;">
                                                        <i class="fas fa-user fa-lg text-white"></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1">Patricia Mendoza</h6>
                                                    <p class="mb-0 text-muted small">Calificación: <span class="text-success fw-bold">4.7/5.0</span></p>
                                                    <div class="d-flex align-items-center">
                                                        <span class="badge dept-ciencias me-2">Ciencias</span>
                                                        <small class="text-muted">Biología Molecular</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS y scripts personalizados -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
    <!-- Script para navegación -->
    <script src="navigation.js"></script>
    <!-- Script para dashboard interactivo -->
    <script src="dashboard-interactivo.js"></script>
    
    <!-- Scripts para los gráficos -->
    <script>
        // Gráfico de rendimiento por departamento
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
                }
            }
        });

        // Gráfico de distribución de calificaciones
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
                    }
                }
            }
        });
    </script>
</body>
</html>