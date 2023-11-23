fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO
buscarAlertaServidor();
dados = ''
function buscarAlertaServidor() {
  if (fkAeroporto == "" || fkAeroporto == undefined) {
    alert("Servidor não encontrado!")
  } else {
    fetch("/servidor/buscarAlertas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkAeroporto": fkAeroporto
      })
    }).then((res) => res.json())
      .then((res) => {
        console.log(res)
        alertas = []
        nomes = []
        funcao = []
        if (res.error) {
          console.log("Aconteceu algum erro")
         }
         else {
          for(i = 0; i <res.length;i++){
            resposta = res[i]
            alertas.push(resposta.qtdAlerta)
            nomes.push(resposta.apelido)
            funcao.push(resposta.funcao)
            alertaServidores.innerHTML = resposta.alertaTotal
          }
          dados = {
            'Nome': nomes, 'Função': funcao,'Alertas': alertas
          }
          //Limpando strings iguais
          funcaoServidor.innerHTML = `<option value = "Geral"> Geral </option>`
          for(i = 0;i < funcao.length; i++){
            if(funcao[i] == funcao[funcao.length-1]){
            }else{
              console.log(funcao[i],funcao[i-1])
            }
                  
          }
          plotarGrafico(dados)
          // desempenhoComponente()
        } 
      }).catch(function (res) {
        console.log(res)
      });
  }
}
// function desempenhoComponente() {
//   fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO
//   if (fkAeroporto == "" || fkAeroporto == undefined) {
//     alert("Servidor não encontrado!")
//   } else {
//     fetch("/servidor/buscarDesempenho", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "fkAeroporto": fkAeroporto
//       })
//     }).then((res) => res.json())
//       .then((res) => {
//         console.log(res)
//         if (res.error) {
//           console.log("Aconteceu algum erro")
//          }
//          else {
//           console.log(1)
//         } 
//       }).catch(function (res) {
//         console.log(res)
//       });
//   }
// }

function plotarGrafico(dados){
     ctx = document.getElementById('chartPerformance').getContext("2d");
     graficoAnual = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: dados.Nome,
                datasets: [{
                 borderColor: '#3A7D44',
                  backgroundColor: '#3A7D44',
                  data: dados.Alertas
                }
                ]
              },
              options: {
                legend: {
                  display: false,
                  position: 'top'
                },
                scales: {
                  yAxes: [{
                    ticks: {
                      fontColor: "#9f9f9f",
                      beginAtZero: false,
                      maxTicksLimit: 5,
                      adding: 20
                    },
                    gridLines: {
                      drawBorder: true,
                     zeroLineColor: "#fff",
                     color: 'transparent'
                    }
                  }],
                  xAxes: [{
                 barPercentage: 1,
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
 function alterarGrafico(value){

  console.log(value)
  nomesAlvo = []
  alertasAlvo = []
  if(value != "Geral"){
    funcionalidade = value
    fetch("/servidor/alertasPorServidor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkAeroporto": fkAeroporto,
        "funcionalidade": funcionalidade
      })
    }).then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.error) {
          console.log("Aconteceu algum erro")
         }
         else {
        for(i = 0; i < res.length;i++){
          resposta = res[i]
          nomesAlvo.push(resposta.apelido)
          alertasAlvo.push(resposta.alerta)
        }  
        dados = {
          'Nome': nomesAlvo, 'Alertas': alertasAlvo
        } 
        console.log(dados)
        plotarGrafico(dados)
        } 
      }).catch(function (res) {
        console.log(res)
      });
  }else{
    plotarGrafico(dados)
  }
    
 }
//  var dataAtual = new Date();
//  var anoAtual = dataAtual.getFullYear();
//  var graficoAnual;

//  function buscarErrosMensais(fkComponente) {


//    fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;
//   mesLimite = dataAtual.getMonth() + 1;
//   anoAtual = anoAtual;

//   if (fkServidor == "" || fkServidor == undefined || fkComponente == undefined || fkComponente == "") {
//     alert("Fk's faltando")
//   } else if (mesLimite == "" || mesLimite == undefined || anoAtual == "" || anoAtual == undefined) {
//     alert("Informe o mês e o ano!")
//   } else {
//     fetch("/servidor/buscarErrosMensais", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "fkServidor": fkServidor,
//         "mesLimite": mesLimite,
//         "anoAtual": anoAtual,
//         "fkComponente": fkComponente
//       })
//     }).then((res) => res.json())
//       .then((res) => {
//         if (res.error) {
//           console.log("Aconteceu algum erro (res.error = true)")
//         }
//         else {
//           todosMeses = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
//           meses = []
//           data = []
//           for (let i = 0; i < todosMeses.length; i++) {
//             if (i <= mesLimite - 1) {
//               meses[i] = todosMeses[i]
//               mesDaVez = meses[i]
//               data[i] = res[0][mesDaVez]
//             }
//           }

//           plotarGraficoAnual(meses, data)

//         }
//       }).catch(function (res) {

//       });
//   }
// }

// function plotarGraficoAnual(labels, data) {
//   if (typeof graficoAnual !== 'undefined') {
//     graficoAnual.destroy()
//   }
//   ctx = document.getElementById('chartHours').getContext("2d");

//   graficoAnual = new Chart(ctx, {
//     type: 'bar',

//     data: {

//       labels: labels,
//       datasets: [{
//         label: 'Número de vezes',
//         borderColor: "#",
//        borderColor: '#3A7D44',
//         backgroundColor: '#3A7D44',
//         pointBorderColor: '#3A7D44',
//         pointRadius: 4,
//         pointHoverRadius: 5,
//         pointBorderWidth: 8,
//         data: data
//       }
//       ]
//     },
//     options: {
//       legend: {
//         display: false,
//         position: 'top'
//       },

//       /*  tooltips: {
//          enabled: false
//        }, */

//       scales: {
//         yAxes: [{

//           ticks: {
//             fontColor: "#9f9f9f",
//             beginAtZero: false,
//             maxTicksLimit: 5,
//             adding: 20
//           },
//           gridLines: {
//             drawBorder: true,
//            zeroLineColor: "#fff",
//            color: 'transparent'
//           }

//         }],

//         xAxes: [{
//        barPercentage: 1.6,
//           gridLines: {
//             drawBorder: false,
//             color: 'rgba(0,0,0)',
//             zeroLineColor: "transparent",
//             display: false,
//           },
//           ticks: {
//             padding: 8,
//             fontColor: "#9f9f9f"
//           }
//         }]
//       },
//     }
//   });
// }

