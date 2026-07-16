import { API_BASE_URL } from './constants.js';

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem('token')) {
        window.location.href = 'index.html';
        return;
    }

    // Selección del formulario.
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

        formulario.addEventListener("submit", async(event) => {

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

            // ==========================================
            // VALIDACIONES DINÁMICAS
            // ==========================================

            // NOMBRE (Validación del nombre)
            const nombreValor = inputNombre.value.trim();
            const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
            if (nombreValor !== "" && !regexNombre.test(nombreValor)) {
                inputNombre.setCustomValidity("Nombre inválido");
                inputNombre.nextElementSibling.innerText = "El nombre debe contener entre 3 y 60 caracteres (solo letras).";
                formularioValido = false;
            } else if (nombreValor === "") {
                inputNombre.nextElementSibling.innerText = "Por favor ingresa el nombre completo.";
            }

            // TELÉFONO (Debe contener exactamente 10 dígitos)
            const telefonoValor = inputTelefono.value.trim();
            const regexTelefono = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            if (telefonoValor !== "" && !regexTelefono.test(telefonoValor)) {
                inputTelefono.setCustomValidity("Invalido");
                inputTelefono.nextElementSibling.innerText = "El número telefónico debe contener exactamente 10 dígitos numéricos.";
                formularioValido = false;
            } else if (telefonoValor === "") {
                inputTelefono.nextElementSibling.innerText = "Ingresa un número telefónico válido, debe contener al menos 10 dígitos.";
            }

            // E-MAIL (Debe ingresar un e-mail valido)
            const emailValor = inputEmail.value.trim();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValor !== "" && !regexEmail.test(emailValor)) {
                inputEmail.setCustomValidity("Correo inválido");
                inputEmail.nextElementSibling.innerText = "El formato del correo no es válido (ejemplo: usuario@dominio.com).";
                formularioValido = false;
            } else if (emailValor === "") {
                inputEmail.nextElementSibling.innerText = "Ingresa un correo válido (Ejemplo: correo@dominio.com).";
            }

            // CONTRASEÑA (Debe contener al menos 8 caracteres)
            const passwordValor = inputPassword.value.trim();
            if (passwordValor !== "" && passwordValor.length < 8) {
                inputPassword.setCustomValidity("Corta");
                formularioValido = false;
            }

            // CONFIRMAR CONTRASEÑA (Debe coincidir con CONTRASEÑA)
            if (inputConfirmPassword.value !== "" && passwordValor !== inputConfirmPassword.value) {
                inputConfirmPassword.setCustomValidity("No coincide");
                formularioValido = false;
            }

            // ==========================================
            // EVALUACIÓN FINAL
            // ==========================================
            if (!formulario.checkValidity() || !formularioValido) {
                formulario.classList.add("was-validated");
                contenedorAlerta.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show m-0" role="alert">
                        <strong>Por favor, verifica los campos.</strong> Revisa que los datos cumplan con los formatos solicitados y/o que las contraseñas coincidan.
                    </div>`;
            } else {
                formulario.classList.remove("was-validated");

                const usuarioRequest = {
                    nombreCompleto: nombreValor,
                    telefono: telefonoValor,
                    correoElectronico: emailValor,
                    password: passwordValor,
                    direccionEntrega: ""
                };

                try {
                    const response = await fetch(`${API_BASE_URL}/usuarios/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(usuarioRequest)
                    });

                    if (!response.ok) {
                        Swal.fire({
                            title: 'Error de registro',
                            text: 'Verifica que los datos estén correctos',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            customClass: {
                                confirmButton: 'swtalert-confirm-btn'
                            }
                        });
                        console.log(response.body);
                        return;
                    }

                    // Mostrar alerta de registro correcto con SweetAlert2
                    Swal.fire({
                        title: 'Usuario registrado',
                        text: 'Usuario registrado correctamente. Ahora puedes iniciar sesión.',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'swtalert-confirm-btn'
                        }
                    }).then(result => {
                        if (result.isConfirmed) {
                            window.location.href = 'login-usuario.html';
                        }
                    });

                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: 'Error de registro',
                        text: 'No se puede conectar con el servidor, por favor, intenta mas tarde.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'swtalert-confirm-btn'
                        }
                    });
                }

                

                // Opcional: limpiar el formulario tras registrar con éxito
                // formulario.reset();
            }
        }); // Función Flecha Submit.

        formulario.addEventListener("reset", () => {
            formulario.classList.remove("was-validated");
            contenedorAlerta.innerHTML = "";
        }); // Función Flecha Reset

    } // if (Formulario)

    // Restricción en tiempo de ejecución para el input del teléfono (bloquear espacios y letras)
    if (inputTelefono) {
        inputTelefono.addEventListener("keypress", (event) => {
            if (event.key === " " || isNaN(event.key)) {
                event.preventDefault();
            }
        });
    }

}); // Función flecha DOMContentLoaded.