
buscarEstadoServidor();

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

