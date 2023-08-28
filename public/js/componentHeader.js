const template = document.createElement("template");
template.innerHTML = `
<header class="col-12">
<div class="col-6">
    <img src="assets/logo.png" alt="Logo">
    <h1>Plane-It</h1>
</div>
<nav class="col-6">
    <li><a href="#sobre">Sobre</a></li>
    <li><a href="">Suporte</a></li>
    <li><a href="">Cadastro</a></li>
    <li>
        <button>Entrar</button>
    </li>    
</nav>
</header>
`;

const cima = document.getElementById("cima");
cima.appendChild(template.content);