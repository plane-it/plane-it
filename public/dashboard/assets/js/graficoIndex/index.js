var dataAtual = new Date();
var anoAtual = dataAtual.getFullYear();
var totalServidores;
var servidoresAlerta = 0;
var servidoresRisco = 0;
var servidoresSeguro = 0;

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
                    qtdTotal += chamadosAnuais[i];
                }

                myChart.destroy()
                ctx = document.getElementById("analiseSistema").getContext("2d");
                myChart = new Chart(ctx, {
                    type: "line",
                    data: {
                      labels: [
                        "Janeiro",
                        "Fevereiro",
                        "Março",
                        "Abril",
                        "Maio",
                        "Junho",
                        "Julho",
                        "Agosto",
                        "Setembro",
                        "Outubro",
                        "Novembro",
                        "Dezembro",
                      ],
                      datasets: [
                        {
                          label: "Chamados abertos",
                          borderColor: "#000000",
                          backgroundColor: "#6bd098",
                          pointRadius: 8,
                          pointHoverRadius: 15,
                          borderWidth: 0.1,
                          data: [chamadosAnuais[0],chamadosAnuais[1],chamadosAnuais[2],chamadosAnuais[3],chamadosAnuais[4],chamadosAnuais[5],chamadosAnuais[6],chamadosAnuais[7],chamadosAnuais[8],chamadosAnuais[9],chamadosAnuais[10],chamadosAnuais[11]],
                        },
                      ],
                    },
                    options: {
                      legend: {
                        //display: false
                        position: "top",
                      },
              
                      /*  tooltips: {
                          enabled: false
                        }, */
              
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              fontColor: "#9f9f9f",
                              beginAtZero: false,
                              maxTicksLimit: 5,
                              //padding: 20
                            },
                            gridLines: {
                              drawBorder: false,
                              zeroLineColor: "#ccc",
                              color: "rgba(255,255,255,0.05)",
                            },
                          },
                        ],
              
                        xAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: false,
                              color: "rgba(255,255,255,0.1)",
                              zeroLineColor: "transparent",
                              display: false,
                            },
                            ticks: {
                              padding: 20,
                              fontColor: "#9f9f9f",
                            },
                          },
                        ],
                      },
                    },
                  });

                qtdChamados.innerHTML = qtdTotal;
            }
        }).catch(function (resposta) {

        });
}

buscarEstadoServidores()

function buscarEstadoServidores() {
  if (sessionStorage.ADM == 0) {
    fk = sessionStorage.FK_AEROPORTO
    adm = 0
  } else {
    fk = sessionStorage.FK_EMPRESA
    adm = 1
  }
    
    fetch("/registros/buscarEstadoServidores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fk": fk,
            "adm": adm
        })
    }).then((res) => res.json())
        .then((res) => {
            if (res.error) {
                console.log("Aconteceu algum erro (res.error = true)")
            }
            else {
                totalServidores = res.length;
                for (i in res) {
                    if (res[i].alertasGerados >= 5) {
                        servidoresRisco++
                    } else if (res[i].alertasGerados >=3) {
                        servidoresAlerta++
                    } else {
                        servidoresSeguro++
                    }
                }
                porcentServidoresAlerta.innerHTML = ((servidoresAlerta/totalServidores) * 100).toFixed(2) + "%"
                porcentServidoresRisco.innerHTML = ((servidoresRisco/totalServidores) * 100).toFixed(2) + "%"

                myChartRosca.destroy()
                ctx = document.getElementById("chartEstado").getContext("2d");
                myChartRosca = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                      labels: ["Seguro", "Alerta", "Risco"],
                      datasets: [
                        {
                          fill: false,
                          pointRadius: 0,
                          pointHoverRadius: 0,
                          backgroundColor: ["#3A7D44","#69b5789e","#EA2309"],
                          borderWidth: 0,
                          data: [servidoresSeguro, servidoresAlerta, servidoresRisco],
                        },
                      ],
                    },
              
                    options: {
                      legend: {
                        display: false,
                      },
              
                      pieceLabel: {
                        render: "percentage",
                        fontColor: ["white"],
                        precision: 2,
                      },
              
                      /* tooltips: {
                          enabled: false
                        }, */
              
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              display: false,
                            },
                            gridLines: {
                              drawBorder: false,
                              zeroLineColor: "transparent",
                              color: "69B578",
                            },
                          },
                        ],
              
                        xAxes: [
                          {
                            barPercentage: 1.6,
                            gridLines: {
                              drawBorder: true,
                              color: "69B578",
                              zeroLineColor: "transparent",
                            },
                            ticks: {
                              display: true,
                            },
                          },
                        ],
                      },
                    },
                  });
                rodarTempo()  
            }
        }).catch(function (resposta) {

        }); 
}

tempo = 0;

function rodarTempo() {
  tempo1.innerHTML = tempo
  tempo2.innerHTML = tempo
  setTimeout(() => {
    tempo++;
    rodarTempo()
  }, 60000)

}