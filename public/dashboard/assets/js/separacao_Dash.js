if (sessionStorage.ADM == 0 || sessionStorage.ADM == false) {
    esconderElementosComClasseAdm()
} else {
    esconderElementosComClasseAnalista()
}


function esconderElementosComClasseAdm() {
    var elementos = document.getElementsByClassName('adm');
    for(var i = 0; i < elementos.length; i++) {
        elementos[i].style.display = 'none';
    }
}

function esconderElementosComClasseAnalista() {
    var elementos = document.getElementsByClassName('analista');
    for(var i = 0; i < elementos.length; i++) {
        elementos[i].style.display = 'none';
    }
}
