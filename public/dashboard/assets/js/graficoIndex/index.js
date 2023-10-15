var dataAtual = new Date();
var anoAtual = dataAtual.getFullYear();

buscarAlertas();

var alertasAnuais = [];

function buscarAlertas() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
    anoAtual = anoAtual;
    
    fetch("/registros/buscarAlertas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
            "anoAtual": anoAtual
        })
    }).then((res) => res.json())
        .then((res) => {
            if (res.error) {
                console.log("Aconteceu algum erro (res.error = true)")
            }
            else {
                alertasRegistrados.innerHTML = res[0].totalAlertas;
            }
        }).catch(function (resposta) {

        });
}

