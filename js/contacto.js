document.addEventListener('DOMContentLoaded', function () {
    // 1.EmailJS Public Key
    emailjs.init({
        publicKey: "-KQzjIoCFvFUpywgm",
    });

    document.getElementById('contactForm').addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const feedbackMessageRequired = "Campo obligatorio";

        //Validar nombre
        const inputNombre = document.getElementById("inputNombre");
        const inputNombreValue = inputNombre.value.trim();
        const inputNombreFeedback = document.getElementById("invalidFeedbackNombre");

        if (inputNombreValue.length < 3) {
            const feedbackMessage = "El nombre debe ser de al menos de 3 caracteres de longitud.";
            inputNombre.setCustomValidity(feedbackMessage)
            inputNombreFeedback.textContent = feedbackMessage;
        } else {
            inputNombre.setCustomValidity("");
        }

        //Validaar correo
        const inputCorreo = document.getElementById("inputCorreo");
        const inputCorreoValue = inputCorreo.value.trim();
        const inputCorreoFeedback = document.getElementById("invalidFeedbackCorreo");
        const regexCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (inputCorreoValue.length === 0) {
            inputCorreo.setCustomValidity(feedbackMessageRequired)
            inputCorreoFeedback.textContent = feedbackMessageRequired;
            inputCorreo.setCustomValidity(feedbackMessageRequired);
        } else {
            if (!regexCorreo.test(inputCorreoValue)) {
                const feedbackMessage = "Ingresa un correo válido (Ejemplo: correo@dominio.com)."
                inputCorreoFeedback.textContent = feedbackMessage;
                inputCorreo.setCustomValidity(feedbackMessage);
            } else {
                inputCorreo.setCustomValidity("");
            }
        }

        //Validaar telefono
        const inputTelefono = document.getElementById("inputTelefono");
        const inputTelefonoValue = inputTelefono.value.trim();
        const inputTelefonoFeedback = document.getElementById("invalidFeedbackTelefono");
        const regexTelefono = /^[0-9]{10}$/;

        if (inputTelefonoValue.length === 0) {
            inputTelefono.setCustomValidity(feedbackMessageRequired)
            inputTelefonoFeedback.textContent = feedbackMessageRequired;
            inputTelefono.setCustomValidity(feedbackMessageRequired);
        } else {
            if (!regexTelefono.test(inputTelefonoValue)) {
                const feedbackMessage = "Ingresa un número telefónico válido, debe contener al menos 10 dígitos."
                inputTelefonoFeedback.textContent = feedbackMessage;
                inputTelefono.setCustomValidity(feedbackMessage);
            } else {
                inputTelefono.setCustomValidity("");
            }
        }

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            mostrarAlerta("Favor de revisar que todos los campos estén registrados correctamente.", "danger");
            return;
        }

        mostrarAlerta('Enviando mensaje...', 'info');
        enviarCorreo(nombre, correo, telefono, mensaje);
    })

    document.getElementById("inputTelefono").addEventListener("keypress", (event) => {
        if (event.key === " " || isNaN(event.key))
            event.preventDefault();
    })
});



function mostrarAlerta(mensaje, tipo) {
    const contenedorAlerta = document.getElementById('formAlert');
    contenedorAlerta.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show shadow-sm" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function enviarCorreo(nombre, correo, telefono, mensaje) {
    const templateParams = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        mensaje: mensaje
    };

    // 2.IDs de EmailJS ya configurados
    const serviceID = "service_karewji";
    const templateID = "template_t6azsoa";

    emailjs.send(serviceID, templateID, templateParams)
        .then(function (response) {
            console.log('Éxito!', response.status, response.text);
            mostrarAlerta('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.', 'success');
            document.getElementById('contactForm').reset();
        }, function (error) {
            console.log('Fallo...', error);
            mostrarAlerta('Hubo un error al enviar el mensaje. Intenta nuevamente.', 'danger');
        });
}