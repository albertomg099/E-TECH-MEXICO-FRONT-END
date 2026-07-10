export function addNavbar() {
    const navBar = document.getElementsByTagName("nav")[0];

    navBar.innerHTML =
        `<div class="d-flex align-items-center">
            <a href="index.html" class="hover-text-logo" style="text-decoration: none; display: inline-block;">
                <h1 class="text-logo" style="font-size: 2.5em; font-family: 'Montserrat', sans-serif; font-weight: bold; color: var(--color-azul-oscuro); margin-bottom: 0;">
                    E-TECH MÉXICO
                </h1>
            </a>
            <a href="index.html" class="hover-img-logo" style="display: inline-block; margin-left: 12px;">
                <img src="./assets/images/logo_e_tech_transparente.png" alt="logo tech"
                    style="height: 100px; width: auto; display: block;">
            </a>
        </div>
        <div class="navbar-links d-flex flex-wrap gap-2 gap-md-3 justify-content-center align-items-center">
            <a class="btn btn-nav" href="/" role="button">Inicio</a>
            <a class="btn btn-nav" href="nosotros.html" role="button">Nosotros</a>
            <a class="btn btn-nav" href="catalogo.html" role="button">Catálogo</a>
            <a class="btn btn-nav" href="contacto.html" role="button">Contacto</a>
            <a class="btn btn-nav" href="login-usuario.html" role="button">Iniciar Sesión</a>
        </div>
    `

    navBar.classList.add("navbar", "py-1", "px-3", "px-md-5", "d-flex", "justify-content-between", "align-items-center", "flex-wrap", "w-100");
}