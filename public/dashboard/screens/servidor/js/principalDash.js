
buscarEstadoServidor();

verifID_SOLICITACAO();
function verifID_SOLICITACAO() {
  if (localStorage.ID_SOLICITACAO != undefined) {
    var elementos = document.querySelectorAll('.respostaReq');
    elementos.forEach(function(elemento) {
      elemento.style.display = 'block';
    });
  }
}


function buscarEstadoServidor() {

  fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;

  if (fkServidor == "" || fkServidor == undefined) {
    alert("Servidor não encontrado!")
  } else {
    fetch("/servidor/buscarEstadoServidor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkServidor": fkServidor
      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log("Aconteceu algum erro (res.error = true)")
        }
        else {
          const resultado = res[0][0];
          if (resultado.qtsAlertasCpu > 20) {
            cpuEstado.innerHTML = "Risco";
          } else if (resultado.qtsAlertasCpu <= 20 && resultado.qtsAlertasCpu > 10) {
            cpuEstado.innerHTML = "Alerta";
          } else {
            cpuEstado.innerHTML = "Estável";
          }


          if (resultado.qtsAlertasRam > 20) {
            ramEstado.innerHTML = "Risco";
          } else if (resultado.qtsAlertasRam <= 20 && resultado.qtsAlertasRam > 10) {
            ramEstado.innerHTML = "Alerta";
          } else {
            ramEstado.innerHTML = "Estável";
          }


          if (resultado.qtsAlertasDisco > 20) {
            discoEstado.innerHTML = "Risco";
          } else if (resultado.qtsAlertasDisco <= 20 && resultado.qtsAlertasDisco > 10) {
            discoEstado.innerHTML = "Alerta";
          } else {
            discoEstado.innerHTML = "Estável";
          }

          buscarErrosMensais(1)

        }
      }).catch(function (res) {

      });
  }
}

var dataAtual = new Date();
var anoAtual = dataAtual.getFullYear();
var graficoAnual;

function buscarErrosMensais(fkComponente) {


  fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;
  mesLimite = dataAtual.getMonth() + 1;
  anoAtual = anoAtual;

  if (fkServidor == "" || fkServidor == undefined || fkComponente == undefined || fkComponente == "") {
    alert("Fk's faltando")
  } else if (mesLimite == "" || mesLimite == undefined || anoAtual == "" || anoAtual == undefined) {
    alert("Informe o mês e o ano!")
  } else {
    fetch("/servidor/buscarErrosMensais", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkServidor": fkServidor,
        "mesLimite": mesLimite,
        "anoAtual": anoAtual,
        "fkComponente": fkComponente
      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log("Aconteceu algum erro (res.error = true)")
        }
        else {
          todosMeses = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
          meses = []
          data = []
          for (let i = 0; i < todosMeses.length; i++) {
            if (i <= mesLimite - 1) {
              meses[i] = todosMeses[i]
              mesDaVez = meses[i]
              data[i] = res[0][mesDaVez]
            }
          }

          plotarGraficoAnual(meses, data)

        }
      }).catch(function (res) {

      });
  }
}

function plotarGraficoAnual(labels, data) {
  if (typeof graficoAnual !== 'undefined') {
    graficoAnual.destroy()
  }
  ctx = document.getElementById('chartHours').getContext("2d");

  graficoAnual = new Chart(ctx, {
    type: 'bar',

    data: {

      labels: labels,
      datasets: [{
        label: 'Número de vezes',
        borderColor: "#",
        // borderColor: '#3A7D44',
        backgroundColor: '#3A7D44',
        pointBorderColor: '#3A7D44',
        pointRadius: 4,
        pointHoverRadius: 5,
        pointBorderWidth: 8,
        data: data
      }
      ]
    },
    options: {
      legend: {
        display: false,
        position: 'top'
      },

      /*  tooltips: {
         enabled: false
       }, */

      scales: {
        yAxes: [{

          ticks: {
            fontColor: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 5,
            //padding: 20
          },
          gridLines: {
            drawBorder: true,
            // zeroLineColor: "#fff",
            // color: 'transparent'
          }

        }],

        xAxes: [{
          // barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,0,0)',
            zeroLineColor: "transparent",
            display: false,
          },
          ticks: {
            padding: 8,
            fontColor: "#9f9f9f"
          }
        }]
      },
    }
  });
}


var dadosObtidosHora = [];
var dadosObtidosValor = [];
var ultimoIdInserido;

var qtdAlertas = 0;
let interval;

buscarUltimosRegistrosLive(1)
function buscarUltimosRegistrosLive(tipo) {
    fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;
    fkTipoComponente = tipo;

    if (fkServidor == "" || fkServidor == undefined) {
        alert("Servidor não encontrado!")
    } else {
        if(interval != undefined) clearInterval(interval)
        interval = setInterval(() => {
          fetch("/registros/buscarUltimosRegistrosLive", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  "fkServidor": fkServidor,
                  "fkTipoComponente": fkTipoComponente
              })
          })
          .then((res) => res.json())
          .then((res) => {
              if (res.error) {
                  console.log("Aconteceu algum erro (res.error = true)")
              }
              else {
                  textMetrica.innerHTML = res[0].sinal
                  for (let i = 0; i < res.length; i++) {
                      hora = formataHora(res[i].dataHora)
                      dadosObtidosHora[i] = hora

                      valor = res[i].valor
                      dadosObtidosValor[i] = valor

                      if (res[i].alerta == 1) {
                          qtdAlertas += 1;
                      }

                      if (i == res.length - 1) {
                          ultimoCapturado = res[i].idRegst;
                      }
                  }

                  if (ultimoCapturado != ultimoIdInserido) {
                      plotarGrafico(dadosObtidosHora, dadosObtidosValor)
                      ultimoIdInserido = res[res.length - 1].idRegst
                  }
                  atualizarKPI()
              }
            })
            .catch(function (res) {
              console.log(res)
            });
        }, 1000)
    }
}

function atualizarKPI() {
    // Media 
    somaValoresRegistros = 0;

    for (let i = 0; i < dadosObtidosValor.length; i++) {
        if (!isNaN(parseFloat(dadosObtidosValor[i]))) {
            let numeroConvertido = parseFloat(dadosObtidosValor[i]);
            somaValoresRegistros += numeroConvertido;
        }
    }

    mediaRegistrosPlotados = (somaValoresRegistros / dadosObtidosValor.length).toFixed(2);
    kpiMedia.innerHTML = mediaRegistrosPlotados

    // Alertas
    kpiQtd.innerHTML = qtdAlertas
    qtdAlertas = 0;

}


buscarLimite(1)
function buscarLimite(tipo) {
    fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;
    if (fkServidor == "" || fkServidor == undefined) {
        alert("Servidor não encontrado!")
    } else {
        fetch("/componente/buscarEspecificacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fkServidor": fkServidor
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {
                    for(let i = 0; i < res.length; i++) {
                        if (res[i].tipo == tipo) {
                            console.log(res[i])
                            const limite = res[i].valor;
                            kpiLimite.innerHTML = limite + res[i].sinal
                        }
                    }
                }
            }).catch(function (res) {
                console.log(res)
                console.log("Aconteceu algum erro (res.error = false)")
            });
    }
}

function plotarGrafico(dadosObtidosHora, dadosObtidosValor) {
    var ctx = document.getElementById("chartVelocidadeDisco");

    var dataFirst = {
        data: dadosObtidosValor,
        fill: false,
        label: "Uso de disco",
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

    let hora = data.getUTCHours() - 3;
    let minuto = data.getUTCMinutes();
    let segundo = data.getUTCSeconds();

    if (hora < 10) hora = '0' + hora;
    if (minuto < 10) minuto = '0' + minuto;
    if (segundo < 10) segundo = '0' + segundo;

    return `${hora}:${minuto}:${segundo}`;
}

function selectUpdate(tipo){
  buscarErrosMensais(tipo)
  buscarUltimosRegistrosLive(tipo)
  buscarLimite(tipo)
}