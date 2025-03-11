// Script para manejar la funcionalidad de login

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');
    
    // Credenciales válidas para diferentes perfiles
    const validCredentials = [
        {
            username: 'admin',
            password: '12345',
            role: 'admin',
            redirectUrl: 'PanelAdministrador/panel-admin.html'
        },
        {
            username: 'decano',
            password: '12345',
            role: 'decano',
            redirectUrl: 'index.html'
        },
        {
            username: 'docente',
            password: '12345',
            role: 'docente',
            redirectUrl: 'PanelDocente/panel-docente.html'
        }
    ];
    
    // Manejar el envío del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Validar credenciales
            const userCredential = validCredentials.find(cred => 
                cred.username === username && cred.password === password
            );
            
            if (userCredential) {
                // Guardar información de sesión
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userRole', userCredential.role);
                
                // Redirigir a la página correspondiente según el rol
                window.location.href = userCredential.redirectUrl;
            } else {
                // Mostrar mensaje de error
                loginAlert.textContent = 'Usuario o contraseña incorrectos';
                loginAlert.classList.remove('d-none');
                
                // Limpiar el campo de contraseña
                document.getElementById('password').value = '';
            }
        });
    }
});