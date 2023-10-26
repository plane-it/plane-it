nomeServ.innerHTML = sessionStorage.NOME_SERVIDOR + ' - Disco';

var dadosObtidosHora = [];
var dadosObtidosValor = [];
var ultimoIdInserido;

buscarUltimosRegistrosLive()
function buscarUltimosRegistrosLive() {
    fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;
    fkTipoComponente = 3;

    if (fkServidor == "" || fkServidor == undefined) {
        alert("Servidor não encontrado!")
    } else {
        fetch("/registros/buscarUltimosRegistrosLive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },  
            body: JSON.stringify({
                "fkServidor": fkServidor,
                "fkTipoComponente": fkTipoComponente
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {
                    console.log(res)
                    for (let i = 0; i < res.length; i++) {
                        hora = formataHora(res[i].dataHora)
                        dadosObtidosHora[i] = hora

                        valor = res[i].valor
                        dadosObtidosValor[i] = valor

                        if (i == res.length -1) {
                            ultimoCapturado = res[i].idRegst;
                        }
                    }

                    if (ultimoCapturado != ultimoIdInserido) {
                        plotarGraficoDisco(dadosObtidosHora, dadosObtidosValor)
                        ultimoIdInserido = res[res.length-1].idRegst
                    }
                    
                    setTimeout(() => {
                        buscarUltimosRegistrosLive()
                    }, 5000)

                }
            }).catch(function (res) {

            });
    }
}


function plotarGraficoDisco(dadosObtidosHora, dadosObtidosValor) {
    var ctx = document.getElementById("chartVelocidadeDisco");

    var dataFirst = {
        data: dadosObtidosValor,
        fill: false,
        label: "Atividade de leitura e gravações do disco",
        borderColor: "#3A7D44",
        backgroundColor: "transparent",
        pointBorderColor: "#3A7D44",
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
    };

    var speedData = {
        labels: dadosObtidosHora,
        datasets: [dataFirst],
    };

    var chartOptions = {
        legend: {
            display: false,
            position: "top",
        },
    };

    var lineChart = new Chart(ctx, {
        type: "line",
        hover: false,
        data: speedData,
        options: chartOptions,
    });

}

function formataData(dataISO) {
    let data = new Date(dataISO);

    let dia = data.getUTCDate();
    let mes = data.getUTCMonth() + 1;
    let ano = data.getUTCFullYear();

    if (dia < 10) dia = '0' + dia;
    if (mes < 10) mes = '0' + mes;

    return `${dia}/${mes}/${ano}`;
}

function formataHora(dataISO) {
    let data = new Date(dataISO);

    let hora = data.getUTCHours()-3;
    let minuto = data.getUTCMinutes();
    let segundo = data.getUTCSeconds();

    if (hora < 10) hora = '0' + hora;
    if (minuto < 10) minuto = '0' + minuto;
    if (segundo < 10) segundo = '0' + segundo;

    return `${hora}:${minuto}:${segundo}`;
}

