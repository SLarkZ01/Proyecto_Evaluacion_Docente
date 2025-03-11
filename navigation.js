// Script para manejar la navegación entre páginas

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    
    // Si no está logueado y no estamos en la página de login, redirigir al login
    if (!userLoggedIn && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
        return;
    }
    
    // Manejar clics en los elementos del menú
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevenir navegación por defecto
            e.preventDefault();
            
            // Obtener el texto del enlace
            const linkText = this.textContent.trim();
            
            // Manejar el botón de salir
            if (linkText.includes('Salir')) {
                if (confirm('¿Está seguro que desea salir del sistema?')) {
                    // Limpiar información de sesión
                    localStorage.removeItem('userLoggedIn');
                    localStorage.removeItem('userRole');
                    
                    // Mostrar mensaje y redirigir al login
                    alert('Sesión finalizada');
                    window.location.href = 'login.html';
                }
                return;
            }
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase active al link actual
            this.classList.add('active');
            
            // Implementar navegación entre páginas según el texto del enlace
            if (linkText.includes('Generar Acta de compromiso')) {
                window.location.href = 'acta-compromiso.html';
            } else if (linkText.includes('Inicio')) {
                window.location.href = 'index.html';
            } else if (linkText.includes('Seguimiento a plan de mejora')) {
                window.location.href = 'seguimiento-plan-mejora.html';
            } else if (linkText.includes('Alertas de bajo desempeño')) {
                window.location.href = 'alertas-bajo-desempeno.html';
            } else if (linkText.includes('Proceso de Sanciones/Retiro')) {
                window.location.href = 'proceso-sancion-retiro.html';
            }
        });
    });
});