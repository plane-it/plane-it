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
    fkEmpresa = sessionStorage.FK_EMPRESA;
    
    fetch("/registros/buscarEstadoServidores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "fkEmpresa": fkEmpresa,
        })
    }).then((res) => res.json())
        .then((res) => {
            if (res.error) {
                console.log("Aconteceu algum erro (res.error = true)")
            }
            else {
                totalServidores = res[0].totalServidores;
                for (i in res) {
                    if (res[i].alertasGerados >= 5) {
                        servidoresRisco++
                    } else if (res[i].alertasGerados >=3) {
                        servidoresAlerta++
                    } else {
                        servidoresSeguro++
                    }
                }
                porcentServidoresRisco.innerHTML = ((servidoresAlerta/totalServidores) * 100).toFixed(2) + "%"
                porcentServidoresAlerta.innerHTML = ((servidoresRisco/totalServidores) * 100).toFixed(2) + "%"
            }
        }).catch(function (resposta) {

        }); 
}