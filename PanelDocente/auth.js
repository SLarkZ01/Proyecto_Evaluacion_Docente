// Script para verificar la autenticación en el Panel Docente

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const userRole = localStorage.getItem('userRole');
    
    // Si no está logueado o no es docente, redirigir al login
    if (!userLoggedIn || userRole !== 'docente') {
        window.location.href = '../login.html';
        return;
    }
    
    // Manejar clics en los elementos del menú
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevenir navegación por defecto
            e.preventDefault();
            
            // Obtener el href y el texto del enlace
            const href = this.getAttribute('href');
            const linkText = this.textContent.trim();
            
            // Manejar el botón de salir
            if (linkText.includes('Salir')) {
                if (confirm('¿Está seguro que desea salir del sistema?')) {
                    // Limpiar información de sesión
                    localStorage.removeItem('userLoggedIn');
                    localStorage.removeItem('userRole');
                    
                    // Mostrar mensaje y redirigir al login
                    alert('Sesión finalizada');
                    window.location.href = '../login.html';
                }
                return;
            }
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase active al link actual
            this.classList.add('active');
            
            // Navegación normal entre páginas del panel docente
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
    
    // Mostrar nombre del usuario (simulado)
    const userNameElement = document.querySelector('.sidebar p.text-white.mt-2');
    if (userNameElement) {
        userNameElement.textContent = 'Docente';
    }
});