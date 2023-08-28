const template = document.createElement("template");
template.innerHTML = `
    <footer class="col-12">
        <div class="col-5">
            <div>
                <img src="assets/logo.png">
                <h1>Plane-it</h1>
            </div>
            <p>Copyright © 2023. Todos os direitos reservados</p>
        </div>
        <div class="col-2">
            <a href="#cima"><button><img src="assets/seta.png" alt="Rolar a página para cima"></button></a>
        </div>
        <div class="col-5">
            <div>
                <a href="#sobre">Sobre</a>
                <a href="">Suporte</a>
                <a href="">Contato</a>
            </div>
            <a href="https://wa.me/551140028922" target="_blank"><img src="assets/whatsapp.png" alt="Whatsapp">+55 (11) 4002-8922</a>
        </div>
    </footer>
`;

const footer = document.getElementById("footer");
footer.appendChild(template.content);