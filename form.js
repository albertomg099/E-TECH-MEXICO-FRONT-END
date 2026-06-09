document.getElementById("miForm").addEventListener("submit", function(e) {
    
    e.preventDefault(); // evita que se recargue la página

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;

    console.log("Nombre:", nombre);
    console.log("Correo:", correo);

    // Mostrar en pantalla (opcional)
    document.getElementById("resultado").innerHTML =
        "Hola " + nombre + ", tu correo es " + correo;
});