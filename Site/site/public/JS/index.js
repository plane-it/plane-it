valor(0);

function valor(id){
    let texto = document.getElementById("textoValor");

    texto.style.animationName = "aparecer";
    setTimeout(()=>{
        texto.style = null;
    },500)

    switch(id){
        case 0:
            texto.innerText = "Passe o mouse por cima ou clique nos valores para saber mais"
            break;
        case 1:
            texto.innerText = "Valor integridade";
            break;
        case 2:
            texto.innerText = "Valor transparência";
            break;
        case 3:
            texto.innerText = "Valor organização";
            break;
    }
}