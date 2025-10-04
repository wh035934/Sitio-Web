
// Manejo del formulario de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Ocultar mensajes anteriores
    hideMessages();

    // Validaciones básicas
    if (!validateEmail(email)) {
        showError('Por favor, introduce un correo electrónico válido');
        return;
    }

    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    // Simular proceso de login (en un caso real, aquí iría una petición al servidor)
    simulateLogin(email, password, remember);
});

// Validación de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar mensaje de error
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    errorText.textContent = message;
    errorDiv.style.display = 'block';

    // Ocultar después de 5 segundos
    setTimeout(hideMessages, 5000);
}

// Mostrar mensaje de éxito
function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    const successText = document.getElementById('success-text');

    successText.textContent = message;
    successDiv.style.display = 'block';

    // Redirigir después de 2 segundos
    setTimeout(() => {
        window.location.href = 'inicio1.html';
    }, 2000);
}

// Ocultar todos los mensajes
function hideMessages() {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('success-message').style.display = 'none';
}

// Simular proceso de login
function simulateLogin(email, password, remember) {
    // Mostrar loading
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
    loginBtn.disabled = true;

    // Simular delay de red
    setTimeout(() => {
        // Aquí normalmente validarías con el servidor
        // Por ahora, simulamos un login exitoso con credenciales de ejemplo
        if (email === 'cliente@ejemplo.com' && password === '123456') {
            // Guardar en localStorage si seleccionó "Recordar sesión"
            if (remember) {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
            }

            showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');
        } else {
            showError('Correo electrónico o contraseña incorrectos');
            // Restaurar botón
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }
    }, 1500);
}

// Login con redes sociales (simulado)
function loginWithFacebook() {
    showSuccess('Redirigiendo a Facebook...');
    // En una implementación real, aquí iría la integración con Facebook API
}

function loginWithGoogle() {
    showSuccess('Redirigiendo a Google...');
    // En una implementación real, aquí iría la integración con Google API
}

// Verificar si ya hay una sesión activa al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const userLoggedIn = localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn');
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');

    if (userLoggedIn && userEmail) {
        document.getElementById('email').value = userEmail;
        document.getElementById('remember').checked = true;
    }
});
