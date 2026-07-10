export function addFooter() {
    const footer = document.getElementsByTagName("footer")[0];

    footer.innerHTML =
        `<div class="container">
            <div class="row align-items-center justify-content-between gy-4">

                <div class="col-12 col-md-4 text-center text-md-start">
                    <h4 class="footer-logo mb-3">E-TECH MÉXICO</h4>
                </div>


                <div class="col-12 col-sm-6 col-md-4 text-center text-md-end">
                    <h5 class="footer-title mb-3">Soporte Legal</h5>
                    <ul class="list-unstyled footer-links">
                        <li><a href="#">Preguntas Frecuentes</a></li>
                        <li><a href="#">Aviso de Privacidad</a></li>
                        <li><a href="#">Términos y Condiciones</a></li>
                    </ul>
                </div>

            </div>

            <hr class="footer-divider my-4">

            <!-- Fila de Derechos de Autor -->
            <div class="row">
                <div class="col-12 text-center">
                    <p class="copyright-text mb-0">&copy; 2026 E-TECH MÉXICO - Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
        `

    footer.classList.add("footer-custom", "pt-5", "pb-3");
}