document.addEventListener('DOMContentLoaded', function () {
    // 1.EmailJS Public Key
    emailjs.init({
        publicKey: "-KQzjIoCFvFUpywgm",
    });

    const formulario = document.getElementById('contactForm');
    const inputTelefono = document.getElementById("telefono");

    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const regexTelefono = /^[0-9]{10}$/;

            if (nombre === '' || correo === '' || telefono === '' || mensaje === '') {
                mostrarAlerta('Por favor, completa todos los campos requeridos.', 'danger');
                return;
            }

            if (!regexCorreo.test(correo)) {
                mostrarAlerta('El formato del correo electrónico no es válido.', 'warning');
                return;
            }

            if (!regexTelefono.test(telefono)) {
                mostrarAlerta('El número de teléfono debe contener exactamente 10 dígitos.', 'warning');
                return;
            }

            mostrarAlerta('Enviando mensaje...', 'info');
            enviarCorreo(nombre, correo, telefono, mensaje);
        });
    }

    if (inputTelefono) {
        inputTelefono.addEventListener("keypress", event => {
            if (event.key === " " || isNaN(event.key))
                event.preventDefault();
        })
    }
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