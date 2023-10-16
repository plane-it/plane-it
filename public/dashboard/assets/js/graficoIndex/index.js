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

buscarChamados()

var chamadosAnuais = [];

function buscarChamados() {
    fkEmpresa = sessionStorage.FK_EMPRESA;
    anoAtual = anoAtual;
    
    fetch("/registros/buscarChamados", {
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
                alert("Funcionou")

                chamadosAnuais[0] = parseInt(res[0].Janeiro)
                chamadosAnuais[1] = parseInt(res[0].Fevereiro)
                chamadosAnuais[2] = parseInt(res[0].Marco)
                chamadosAnuais[3] = parseInt(res[0].Abril)
                chamadosAnuais[4] = parseInt(res[0].Maio)
                chamadosAnuais[5] = parseInt(res[0].Junho)
                chamadosAnuais[6] = parseInt(res[0].Julho)
                chamadosAnuais[7] = parseInt(res[0].Agosto)
                chamadosAnuais[8] = parseInt(res[0].Setembro)
                chamadosAnuais[9] = parseInt(res[0].Outubro)
                chamadosAnuais[10] = parseInt(res[0].Novembro)
                chamadosAnuais[11] = parseInt(res[0].Dezembro)

                let qtdTotal = 0;

                for (i in chamadosAnuais) {
                    qtdTotal += chamadosAnuais[i]
                }

                qtdChamados.innerHTML = qtdTotal;
            }
        }).catch(function (resposta) {

        });
}
