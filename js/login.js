const usuarioGuardado = 'edu';
const contraseñaGuardada = '1234';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            const username = document.getElementById('username');
            const password = document.getElementById('password');

            if (username.value !== usuarioGuardado || password.value !== contraseñaGuardada) {
                isValid = false;
                alert('Usuario o contraseña incorrectos');
            }

            if (isValid) {
                document.getElementById('loginNavItem').style.display = 'none';
                // Aquí se redirige a index.html si el usuario y la contraseña son correctos
                window.location.href = 'index.html';
                alert('usuario valido');
            } else {
                alert('Por favor, corrige los errores en el formulario');
            }
        });
    }
});
