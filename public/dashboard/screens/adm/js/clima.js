buscarFeriados();


function buscarFeriados() {

  var dataAtual = new Date();
  var diaAtual = dataAtual.getDate();        
  var mesNumero = dataAtual.getMonth() + 1;


  var meses = {
    1: "janeiro", 2: "fevereiro", 3: "março", 4: "abril", 5: "maio", 6: "junho",
    7: "julho", 8: "agosto", 9: "setembro", 10: "outubro", 11: "novembro", 12: "dezembro"
  };
  
  var mesEscrito = meses[mesNumero];
  

  fetch("/clima/buscarFeriados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      
    }),
  })
  .then((res) => res.json())
  .then((res) => {
      if (res.error) {
          console.log("Aconteceu algum erro (res.error = true)")
      }
      else {
        console.log("erro no js");
          for(let i = 0; i < res.length; i++) {
            tabelaFeriado.innerHTML += `                      
              <tr>
              <td>
                ${res[i].dia}
              </td>
              <td>
                ${res[i].mes}
              </td>
              <td>
                ${res[i].titulo}
              </td>
            </tr>`
          }

          for(let i = 0; i < res.length; i++) {
            if(res[i].mes == mesEscrito){
              if(diaAtual < res[i].dia){
                dataFeriado.innerHTML = ` ${mesEscrito} - ${res[i].dia}`

              }
            } else{
              // mesNumero += 1
              dataFeriado.innerHTML = ` ${meses[mesNumero + 1]} - ${res[i].dia}`

            }
            }
          

          

          
      }
  }).catch(function (resposta) {
      
  });
}

buscarVoos();

var chamadosAnuais = [];

function buscarVoos() {
  siglaAeroporto = sessionStorage.SIGLA_AEROPORTO
  

  fetch("/clima/buscarVoos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      siglaAeroporto: siglaAeroporto
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        console.log("Aconteceu algum erro (res.error = true)");
      } else {
        chamadosAnuais[0] = parseInt(res[0].Janeiro);
        chamadosAnuais[1] = parseInt(res[0].Fevereiro);
        chamadosAnuais[2] = parseInt(res[0].Marco);
        chamadosAnuais[3] = parseInt(res[0].Abril);
        chamadosAnuais[4] = parseInt(res[0].Maio);
        chamadosAnuais[5] = parseInt(res[0].Junho);
        chamadosAnuais[6] = parseInt(res[0].Julho);
        chamadosAnuais[7] = parseInt(res[0].Agosto);
        chamadosAnuais[8] = parseInt(res[0].Setembro);
        chamadosAnuais[9] = parseInt(res[0].Outubro);
        chamadosAnuais[10] = parseInt(res[0].Novembro);
        chamadosAnuais[11] = parseInt(res[0].Dezembro);

        let qtdTotal = 0;

        for (i in chamadosAnuais) {
          qtdTotal += chamadosAnuais[i];
        }

        myChart.destroy();
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
                data: [
                  chamadosAnuais[0],
                  chamadosAnuais[1],
                  chamadosAnuais[2],
                  chamadosAnuais[3],
                  chamadosAnuais[4],
                  chamadosAnuais[5],
                  chamadosAnuais[6],
                  chamadosAnuais[7],
                  chamadosAnuais[8],
                  chamadosAnuais[9],
                  chamadosAnuais[10],
                  chamadosAnuais[11],
                ],
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
    })
    .catch(function (resposta) {});
}