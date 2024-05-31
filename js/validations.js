document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formularioRegistro').addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        const requiredFields = ['nombre', 'username', 'correo', 'contrasena', 'confirmoContrasena', 'fechaNacimiento'];
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        const correo = document.getElementById('correo');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo.value)) {
            isValid = false;
            correo.classList.add('is-invalid');
        } else {
            correo.classList.remove('is-invalid');
        }

        const contrasena = document.getElementById('contrasena');
        const confirmaContrasena = document.getElementById('confirmoContrasena');
        if (contrasena.value !== confirmaContrasena.value) {
            isValid = false;
            confirmaContrasena.classList.add('is-invalid');
            document.getElementById('confirmaContrasenaError').textContent = 'Las contraseñas no coinciden';
        } else {
            confirmaContrasena.classList.remove('is-invalid');
            document.getElementById('confirmaContrasenaError').textContent = '';
        }

        const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{6,18}$/;
        if (!passwordPattern.test(contrasena.value)) {
            isValid = false;
            contrasena.classList.add('is-invalid');
            document.getElementById('contrasenaError').textContent = 'La contraseña debe tener entre 6 y 18 caracteres, al menos un dígito y una letra mayúscula';
        } else {
            contrasena.classList.remove('is-invalid');
            document.getElementById('contrasenaError').textContent = '';
        }

        const fechaNacimiento = document.getElementById('fechaNacimiento');
        const fecha = new Date(fechaNacimiento.value);
        const dia = new Date();
        const anio = dia.getFullYear() - fecha.getFullYear();
        const diferenciaMeses = dia.getMonth() - fecha.getMonth();
        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && dia.getDate() < fecha.getDate())) {
            anio--;
        }
        if (anio < 13) {
            isValid = false;
            fechaNacimiento.classList.add('is-invalid');
            document.getElementById('fechaNacimientoError').textContent = 'No puede tener menos de 13 años para el registro';
        } else {
            fechaNacimiento.classList.remove('is-invalid');
            document.getElementById('fechaNacimientoError').textContent = '';
        }

        if (isValid) {
            alert('Formulario enviado con éxito');       
        } else {
            alert('Por favor, corrige los errores en el formulario');
        }
    });
});
