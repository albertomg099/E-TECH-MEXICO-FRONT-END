document.addEventListener("DOMContentLoaded", () => {

    // Selección del fromulario.
    const formulario = document.getElementById("usuarioForm");

    // Selección de los inputs de validacion.
    const inputNombre = document.getElementById("nombreUsuario");
    const inputTelefono = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const inputConfirmPassword = document.getElementById("confirmPassword");
    const contenedorAlerta = document.getElementById("formAlerta");

    if (formulario) {

        formulario.reset();

        formulario.addEventListener("submit", (event) => {

            // Detener el envío automático para realizar la lógica de validación.
            event.preventDefault();
            event.stopPropagation();

            // Limpiar alertas generales previas.
            contenedorAlerta.innerHTML = "";

            // Restablecer mensajes de error personalizados de Bootstrap.
            inputNombre.setCustomValidity("");
            inputTelefono.setCustomValidity("");
            inputEmail.setCustomValidity("");
            inputPassword.setCustomValidity("");
            inputConfirmPassword.setCustomValidity("");

            let formularioValido = true;

            // VALIDACIONES

            // NOMBRE (Validación del nombre.)
            const nombreValor = inputNombre.value.trim();
            const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
            if (!regexNombre.test(nombreValor)) {
                inputNombre.setCustomValidity("Nombre inválido");
                formularioValido = false;
            }// regexNombre

            // TELÉFONO (Debe contener al menos 10 digitos.)
            const regexTelefono = /^\d{10}$/;
            if (!regexTelefono.test(inputTelefono.value.trim())) {
                inputTelefono.setCustomValidity("Invalido");
                formularioValido = false;
            }// regexTelefono

            // E-MAIL (Debe ingresar un e-mail valido.)
            const emailValor = inputEmail.value.trim();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(emailValor)) {
                inputEmail.setCustomValidity("Correo inválido");
                formularioValido = false;
            }// regexEmail

            // CONTRASEÑA (Debe contener al menos 8 caracteres.)
            if (inputPassword.value.length < 8) {
                inputPassword.setCustomValidity("Corta");
                formularioValido = false;
            }// Contraseña

            // CONFIRMAR CONTRASEÑA (Debe coincidir con CONTRASEÑA.)
            if (inputPassword.value !== inputConfirmPassword.value) {
                inputConfirmPassword.setCustomValidity("No coincide");
                formularioValido = false;
            }// Confirmar contraseña.

            // EVALUACIÓN FINAL
            if (!formulario.checkValidity() || !formularioValido) {
                formulario.classList.add("was-validated");
                contenedorAlerta.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show m-0" role="alert">
                        <strong>Por favor, verifica los campos.</strong> Revisa que los datos cumplan con los formatos solicitados y/o que las contraseñas coincidan.
                    </div>`;
            } else {
                formulario.classList.remove("was-validated");

                const usuario = {
                    nombre: inputNombre.value.trim(),
                    telefono: inputTelefono.value.trim(),
                    email: inputEmail.value.trim(),
                    password: inputPassword.value.trim()
                };

                //Mostrar alerta de registro correcto
                //TODO agregar alerta de que usuario no pudo registrarse cuando se implemente el backend
                Swal.fire({
                    title: 'Usuario registrado',
                    text: 'Usuario registrado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    customClass: {
                        confirmButton: 'swtalert-confirm-btn'
                    }
                })
            }// Evaluación final.
        });// Función Flecha Submit.

        formulario.addEventListener("reset", () => {
            formulario.classList.remove("was-validated");
            contenedorAlerta.innerHTML = "";
        })// Función Flecha Reset

    }// if (Formulario)

    inputTelefono.addEventListener("keypress", () => {
        if (event.key === " " || isNaN(event.key))
            event.preventDefault();
    })

});// Función flecha DOMContentLoaded.