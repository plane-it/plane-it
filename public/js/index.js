valor(0);

function valor(id){
    let texto = document.getElementById("textoValor");

    texto.style.animationName = "aparecer";
    setTimeout(()=>{
        texto.style = null;
    },500)

    switch(id){
        case 0:
            texto.innerText = "Passe o mouse por cima ou clique nos valores para saber mais."
            break;
        case 1:
            texto.innerText = "Comprometidos com a integridade em todas as operações, garantindo a confiabilidade e a honestidade em cada aspecto do monitoramento de  seus servidores.";
            break;
        case 2:
            texto.innerText = "Oferecendo total transparência nos processos de monitoramento, permitindo uma visão clara e acesso às informações críticas em tempo real.";
            break;
        case 3:
            texto.innerText = "Mantendo uma estrutura organizacional eficiente para otimizar a gestão dos servidores aeroportuários e garantir a eficácia das operações.";
            break;
    }
}