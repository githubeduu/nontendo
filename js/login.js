document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        const username = document.getElementById('username');
        if (!username.value) {
            isValid = false;
            username.classList.add('is-invalid');
        } else {
            username.classList.remove('is-invalid');
        }

        const password = document.getElementById('password');
        if (!password.value) {
            isValid = false;
            password.classList.add('is-invalid');
        } else {
            password.classList.remove('is-invalid');
        }

        if (isValid) {
            alert('Inicio de sesión exitoso');
            // Aquí puedes redirigir al usuario o realizar alguna acción tras el login exitoso
        } else {
            alert('Por favor, corrige los errores en el formulario');
        }
    });
});
