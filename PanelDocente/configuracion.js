document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Validación del formulario de cambio de contraseña
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validar que la nueva contraseña y la confirmación coincidan
            if (newPassword !== confirmPassword) {
                showAlert('Las contraseñas no coinciden', 'danger');
                return;
            }
            
            // Simulación de cambio exitoso (en producción, esto sería una llamada a API)
            showAlert('Información de cuenta actualizada correctamente', 'success');
            
            // Limpiar campos de contraseña
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        });
    }

    // Validación del formulario de reporte de problemas
    const issueForm = document.getElementById('issueForm');
    if (issueForm) {
        issueForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const issueDescription = document.getElementById('issueDescription').value;
            
            if (!issueDescription.trim()) {
                showAlert('Por favor, describe el problema', 'warning');
                return;
            }
            
            // Simulación de envío exitoso
            showAlert('Reporte enviado correctamente. Te contactaremos pronto.', 'success');
            
            // Limpiar campo de descripción
            document.getElementById('issueDescription').value = '';
        });
    }

    // Validación del formulario de sugerencias
    const suggestionForm = document.getElementById('suggestionForm');
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const suggestionDescription = document.getElementById('suggestionDescription').value;
            
            if (!suggestionDescription.trim()) {
                showAlert('Por favor, describe tu sugerencia', 'warning');
                return;
            }
            
            // Simulación de envío exitoso
            showAlert('¡Gracias por tu sugerencia! La hemos recibido correctamente.', 'success');
            
            // Limpiar campo de descripción
            document.getElementById('suggestionDescription').value = '';
        });
    }

    // Función para mostrar alertas
    function showAlert(message, type) {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        alertPlaceholder.appendChild(wrapper);
        
        // Auto-cerrar la alerta después de 5 segundos
        setTimeout(() => {
            const alert = bootstrap.Alert.getOrCreateInstance(wrapper.firstElementChild);
            alert.close();
        }, 5000);
    }

    // Animación para las tarjetas de ayuda
    const helpCards = document.querySelectorAll('.help-card');
    helpCards.forEach(card => {
        card.addEventListener('click', function() {
            // Aquí se podría abrir un modal con el contenido de ayuda
            // Por ahora solo mostramos una alerta
            const title = this.querySelector('h6').textContent;
            showAlert(`Has seleccionado: ${title}. Contenido en desarrollo.`, 'info');
        });
    });

    // Efecto de animación para las secciones al hacer scroll
    const configSections = document.querySelectorAll('.config-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-visible');
            }
        });
    }, { threshold: 0.1 });
    
    configSections.forEach(section => {
        observer.observe(section);
    });
});