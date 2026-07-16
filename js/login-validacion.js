import { API_BASE_URL } from './constants.js';

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem('token')) {
        window.location.href = 'index.html';
        return;
    }

    const formulario = document.getElementById("loginForm");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const contenedorAlerta = document.getElementById("formAlerta");

    const usuariosDePrueba = [
        {
            "nombre": "José Alberto",
            "telefono": "8112345678",
            "email": "alberto@gmail.com",
            "password": "password123"
        },
        {
            "nombre": "Josué Vásquez",
            "telefono": "8119876543",
            "email": "josue@gmail.com",
            "password": "password456"
        },
        {
            "nombre": "Nathaly Alvarez",
            "telefono": "8115554433",
            "email": "nathaly@gmail.com",
            "password": "password789"
        }
    ];

    // console.log(JSON.stringify(usuariosDePrueba, null, 2));
    if (formulario) {

        formulario.reset();

        formulario.addEventListener("submit", async(event) => {

            event.preventDefault();
            event.stopPropagation();

            // Limpiar alertas previas
            contenedorAlerta.innerHTML = "";
            inputEmail.setCustomValidity("");
            inputPassword.setCustomValidity("");

            let formularioValido = true;

            // 1. VALIDACIÓN DE EMAIL
            const emailValor = inputEmail.value.trim();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailValor === "") {
                inputEmail.setCustomValidity("Obligatorio");
                inputEmail.nextElementSibling.innerText = "Correo electrónico incorrecto";
                formularioValido = false;
            } else if (!regexEmail.test(emailValor)) {
                inputEmail.setCustomValidity("Formato inválido");
                inputEmail.nextElementSibling.innerText = "Ingresa un correo electrónico inválido.";
                formularioValido = false;
            }

            // 2. VALIDACIÓN DE CONTRASEÑA
            const passwordValor = inputPassword.value.trim();

            if (passwordValor === "") {
                inputPassword.setCustomValidity("Obligatorio");
                inputPassword.nextElementSibling.innerText = "Contraseña Incorrecta";
                formularioValido = false;
            } else if (passwordValor.length < 8) {
                inputPassword.setCustomValidity("Corta");
                inputPassword.nextElementSibling.innerText = "La contraseña debe tener al menos 8 caracteres.";
                formularioValido = false;
            }

            // EVALUACIÓN FINAL
            if (!formulario.checkValidity() || !formularioValido) {
                formulario.classList.add("was-validated");
                contenedorAlerta.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show m-0" role="alert">
                        <strong>Correo electrónico o contraseña invalidos.</strong> Por favor, verifica tus datos
                    </div>`;
            } else {
                formulario.classList.remove("was-validated");

                const loginRequest = {
                    email: emailValor,
                    password: passwordValor,
                }

                try {
                    const response = await fetch(`${API_BASE_URL}/login/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(loginRequest)
                    });

                    if (!response.ok) {
                        Swal.fire({
                            title: 'Error de inicio de sesión',
                            text: 'El correo o la contraseña no son válidos.',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            customClass: {
                                confirmButton: 'swtalert-confirm-btn'
                            }
                        });
                        return;
                    }

                    const data = await response.json(); // TokenAcceso: { token: "..." }

                    if (!data.token) {
                        Swal.fire({
                            title: 'Error de inicio de sesión',
                            text: 'No se recibió un token válido. Intenta de nuevo.',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                            customClass: {
                                confirmButton: 'swtalert-confirm-btn'
                            }
                        });
                        return;
                    }

                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';

                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: 'Error de inicio de sesión',
                        text: 'No se puede conectar con el servidor, por favor, intenta mas tarde.',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'swtalert-confirm-btn'
                        }
                    });
                }

                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            }
        });

        formulario.addEventListener("reset", () => {
            formulario.classList.remove("was-validated");
            contenedorAlerta.innerHTML = "";
        });
    }
});