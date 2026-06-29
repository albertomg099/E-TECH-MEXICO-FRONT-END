document.addEventListener("DOMContentLoaded", () => {

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

    console.log(JSON.stringify(usuariosDePrueba, null, 2));

    if (formulario) {

        formulario.reset();

        formulario.addEventListener("submit", (event) => {

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
            const passwordValor = inputPassword.value;

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

                // Simulación exitosa (Aquí se conectará con el Backend posteriormente)
                console.log("Datos listos para enviar:", { email: emailValor, password: passwordValor });
            }
        });

        formulario.addEventListener("reset", () => {
            formulario.classList.remove("was-validated");
            contenedorAlerta.innerHTML = "";
        });

    }
});