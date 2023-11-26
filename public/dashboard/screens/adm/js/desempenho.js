fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO
buscarAlertaEstado()
buscarAlertaFuncao()
desempenhoComponente()
dados = ''
function buscarAlertaEstado() {
  funcaoServidor.innerHTML = ''
  if (fkAeroporto == "" || fkAeroporto == undefined) {
    alert("Servidores não encontrados!")
  } else {
    funcaoServidor.innerHTML += `<option value = "Ruim">Ruim</option>
    <option value = "Bom">Bom</option>
    <option value = "Médio">Médio</option>`
    fetch("/servidor/alertasEstadoRuim", {
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
          //Chamando a função de criação de grafico
          corGrafico = '#861A22'
          plotarAlertasServidores(dados,corGrafico)
        } 
      }).catch(function (res) {
        console.log(res)
      });
    }
  }
  function plotarAlertasServidores(dados,corGrafico){
  graficoAlerta = ''
  const dadosCor = corGrafico
  const dadosAlertas = dados.Alertas;
  dadosGrafico = []
  for(i=0;i<dadosAlertas.length;i++){
    if(dadosAlertas[i] > 6){
      dadosGrafico.push(dadosAlertas[i])
    }else if(dadosAlertas[i] <= 4){
      dadosGrafico.push(dadosAlertas[i])
    }else if(dadosAlertas[i] > 4 && dadosAlertas[i] <= 6){
      dadosGrafico.push(dadosAlertas[i])
    }
  }
    statusRuim = document.getElementById('chartPerformance').getContext("2d");
    graficoAlerta = new Chart(statusRuim, {
    type: 'bar',
              data: {
                labels: dados.Nome,
                datasets: [{
                  backgroundColor: dadosCor,
                  data: dadosGrafico
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
                      beginAtZero: true,
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
 function alterarEstadoServidores(value){
  console.log(value)
  nomesAlvo = []
  alertasAlvo = []
  if(value == "Bom"){
    fetch("/servidor/alertasEstadoBom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkAeroporto": fkAeroporto,
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
          alertasAlvo.push(resposta.qtdAlerta)
        }  
        dados = {
          'Nome': nomesAlvo, 'Alertas': alertasAlvo
        } 
        console.log(dados)
        corGrafico = '#0c701a'
        plotarAlertasServidores(dados,corGrafico)
        } 
      }).catch(function (res) {
        console.log(res)
      });
  }else if(value == "Médio"){
    fetch("/servidor/alertasEstadoMedio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkAeroporto": fkAeroporto,
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
          alertasAlvo.push(resposta.qtdAlerta)
        }  
        dados = {
          'Nome': nomesAlvo, 'Alertas': alertasAlvo
        } 
        console.log(dados)
        corGrafico = '#F7D917'
        plotarAlertasServidores(dados,corGrafico)
        } 
      }).catch(function (res) {
        console.log(res)
      });
  }else if(value == "Ruim"){
    buscarAlertaEstado()
  }
    
 }
function desempenhoComponente() {
  dados = ''
    fetch("/servidor/buscarDesempenho", {
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
        if (res.error) {
          console.log("Aconteceu algum erro")
         }
         else {
          alertaComponente = []
          tipoComponente = []
          for(i = 0; i < res.length; i++){
            resposta = res[i]
            console.log(resposta)
          }
          dados = {
            "Componente": tipoComponente, "Alertas": alertaComponente
          }
          plotarGraficoComponente(dados)
        } 
      }).catch(function (res) {
        console.log(res)
      });
}

function plotarGraficoComponente(dados){
  ctx = document.getElementById('chartComponente').getContext("2d");
  graficoAnual = new Chart(ctx, {
    type: 'pie',
              data: {
                labels: dados.Componente,
                datasets: [{
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
                      beginAtZero: true,
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
 function buscarAlertaFuncao() {
  if (fkAeroporto == "" || fkAeroporto == undefined) {
    alert("Servidores não encontrados!")
  } else {
    fetch("/servidor/alertasFuncoes", {
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
        funcao = []
        if (res.error) {
          console.log("Aconteceu algum erro")
         }
         else {
          for(i = 0; i <res.length;i++){
            resposta = res[i]
            alertas.push(resposta.qtdAlerta)
            funcao.push(resposta.funcao)
          }
          dados = {
            'Função': funcao,'Alertas': alertas
          }   
          console.log(dados)      
          //Chamando a função de criação de grafico
          plotarGraficoFuncoes(dados)
        } 
      }).catch(function (res) {
        console.log(res)
      });
  }
}

function plotarGraficoFuncoes(dados){
  const dadosAlertas = dados.Alertas;
  const dadosFuncoes = dados.Função
  graficoFuncao = []
  graficoAlerta = []

  for(i= 0; i < dadosAlertas.length; i++){
    graficoAlerta.push(dadosAlertas[i])
  }
  for(i =0; i < dadosFuncoes.length; i++){
    graficoFuncao.push(dadosFuncoes[i])
  }
  console.log(graficoFuncao)
    statusServidores = document.getElementById('chartServ').getContext("2d");
    graficoServidores = new Chart(statusServidores, {
    type: 'bar',
              data: {
                labels: graficoFuncao,
                datasets: [{
                  backgroundColor: "#0483r3v",
                  data: graficoAlerta
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
                      beginAtZero: true,
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


