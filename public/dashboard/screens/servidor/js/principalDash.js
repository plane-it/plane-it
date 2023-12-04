var graficoPlotado;
var graficoAnual;

var dataAtual = new Date();
var anoAtual = dataAtual.getFullYear();

var ultimoIdInserido;

var qtdAlertas = 0;
let interval;

var limite;

var metrica;

var intervalId;


window.onload = function() {
  selectUpdate(1);
  verifID_SOLICITACAO();
};

function verifID_SOLICITACAO() {
  if (localStorage.ID_SOLICITACAO != undefined) {
    var elementos = document.querySelectorAll('.respostaReq');
    elementos.forEach(function (elemento) {
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
        console.log(res)
        if (res.error) {
          console.log("Aconteceu algum erro (res.error = true)")
        }
        else {
          const resultado = res[0];
          console.log(resultado)
          if (resultado.qtsAlertasCpu > 20) {
            cpuEstado.innerHTML = "Risco";
            cpuKPI.style = 'background-color: rgba(244, 69, 69, 0.604) !important;'
          } else if (resultado.qtsAlertasCpu <= 20 && resultado.qtsAlertasCpu > 10) {
            cpuEstado.innerHTML = "Alerta";
            cpuKPI.style = 'background-color: rgb(233, 186, 147);'
          } else {
            cpuEstado.innerHTML = "Estável";
            cpuKPI.style = 'background-color: #cdeabe !important;'
          }


          if (resultado.qtsAlertasRam > 20) {
            ramEstado.innerHTML = "Risco";
            ramKPI.style = 'background-color: rgba(244, 69, 69, 0.604) !important;'
          } else if (resultado.qtsAlertasRam <= 20 && resultado.qtsAlertasRam > 10) {
            ramEstado.innerHTML = "Alerta";
            ramKPI.style = 'background-color: rgb(233, 186, 147);'
          } else {
            ramEstado.innerHTML = "Estável";
            ramKPI.style = 'background-color: #cdeabe !important;'
          }


          if (resultado.qtsAlertasDisco > 20) {
            discoEstado.innerHTML = "Risco";
            discoKPI.style = 'background-color: rgba(244, 69, 69, 0.604) !important;'
          } else if (resultado.qtsAlertasDisco <= 20 && resultado.qtsAlertasDisco > 10) {
            discoEstado.innerHTML = "Alerta";
            discoKPI.style = 'background-color: rgb(233, 186, 147);'
          } else {
            discoEstado.innerHTML = "Estável";
            discoKPI.style = 'background-color: #cdeabe !important;'
          }

        }
      }).catch(function (res) {

      });
  }
}
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

          if (graficoAnual) {
            graficoAnual.destroy();
          }
          
          plotarGraficoAnual(meses, data)
          
        }
      }).catch(function (res) {
        console.log("buscarErrosMensais");
      });
  }
}
function plotarGraficoAnual(labels, data) {
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
      responsive: true,
      maintainAspectRatio: false,

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



function buscarUltimosRegistrosLive(tipo) {
  fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;
  fkTipoComponente = tipo;

  if (fkServidor == "" || fkServidor == undefined) {
    alert("Servidor não encontrado!")
  } else {
    if (interval != undefined) clearInterval(interval)
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
            var dadosObtidosHora = [];
            var dadosObtidosValor = [];
            metrica = res[0].sinal;
            textMetrica.innerHTML = metrica
            res.reverse();

            for(const i in res){
              dadosObtidosHora.push(formataHora(res[i].dataHora));
              dadosObtidosValor.push(res[i].valorRegistro);
              qtdAlertas += res[i].alerta;
            }

            if (graficoPlotado) {
              graficoPlotado.destroy();
            }
            graficoPlotado = plotarGrafico(dadosObtidosHora, dadosObtidosValor);

            atualizarKPI(metrica, dadosObtidosValor);
          }
        })
        .catch(function (res) {
        });
  }
}


function atualizarKPI(metrica, values) {
  let valores = [];

  for (let i = 0; i < values.length; i++) {
    if (!isNaN(parseFloat(values[i]))) {
      let numeroConvertido = parseFloat(values[i]);
      valores.push(numeroConvertido);
    }
  }

  valores.sort((a, b) => a - b);

  let mediana;
  if (valores.length % 2 === 0) {
    mediana = (valores[valores.length / 2 - 1] + valores[valores.length / 2]) / 2;
  } else {
    mediana = valores[(valores.length - 1) / 2];
  }


  if (mediana >= limite) {
    cardMed.style = "background-color: rgba(244, 69, 69, 0.604) !important;"
  } else {
    cardMed.style = "background-color: #cdeabe !important;"
  }

  if (qtdAlertas >= 5) {
    cardQtd.style = "background-color: rgba(244, 69, 69, 0.604) !important;"
  } else {
    cardQtd.style = "background-color: #cdeabe !important;"
  }

  kpiMedia.innerHTML = mediana.toFixed(2) + " " + metrica

  // Alertas
  kpiQtd.innerHTML = qtdAlertas
  qtdAlertas = 0;
}

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
          for (let i = 0; i < res.length; i++) {
            if (res[i].tipo == tipo) {
              limite = res[i].valor;
              kpiLimite.innerHTML = limite + " " + res[i].sinal
            }
          }
        }
      }).catch(function (res) {
        console.log("Aconteceu algum erro (res.error = false)")
      });
  }
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
    maintainAspectRatio: false, // Adicione esta linha
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

  return lineChart;
}

function selectUpdate(tipo) {
  buscarErrosMensais(tipo);
  
  // Limpa o intervalo existente
  if (intervalId) {
    clearInterval(intervalId);
  }

  buscarLimite(tipo);
  buscarEstadoServidor();

  buscarUltimosRegistrosLive(tipo);
  intervalId = setInterval(function() {
    buscarUltimosRegistrosLive(tipo);
  }, 3000);
}
