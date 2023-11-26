fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO
buscarAlertaEstado()
desempenhoComponente()
buscarDadosComponentes()
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
            alertaComponente.push(resposta.qtdAlerta)
            tipoComponente.push(resposta.tipo)
          }
          dados = {
            "Componente": tipoComponente, "Alertas": alertaComponente
          }
          const quantidadeAlerta = dados.Alertas
          corGrafico = []
          for(i=0; i< quantidadeAlerta.length;i++){
            if(quantidadeAlerta[i] > 6){
              corGrafico.push("#861A22")
            }else if(quantidadeAlerta[i] <= 6 && quantidadeAlerta[i] > 4){
              corGrafico.push('#F7D917')
            }else{
              corGrafico.push('#0c701a')
            }
          }
          console.log(corGrafico)
          plotarGraficoComponente(dados,corGrafico)
        } 
      }).catch(function (res) {
        console.log(res)
      });
}
function plotarGraficoComponente(dados,corGrafico){
  ctx = document.getElementById('chartComponente').getContext("2d");
  graficoComp = new Chart(ctx, {
    type: 'bar',
              data: {
                labels: dados.Componente,
                datasets: [{
                  backgroundColor: corGrafico,
                  data: dados.Alertas
                }
                ]
              },
              options: {
                legend: {
                  display: false,
                  position: 'top',
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
                events: ['click'],
                onClick: event =>{  
                  const datasetIndex =  graficoComp.getElementAtEvent(event)[0]._datasetIndex;
                  const model =  graficoComp.getElementsAtEvent(event)[datasetIndex]._model;
                  onBarClicked(model.label);
                }
              },
            });
}
function onBarClicked(componente){
container.classList.remove('col-md-12')
container.classList.add('col-md-3')
dados = ''
    fetch("/servidor/buscarAlertasComponente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "fkAeroporto": fkAeroporto,
        "componente":componente
      })
    }).then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.error) {
          console.log("Aconteceu algum erro")
         }
         else {
          alerta = []
          apelido = []
          nome = []
          for(i=0; i < res.length;i++){
            resposta = res[i]
            alerta.push(resposta.qtdAlerta)
            apelido.push(resposta.apelido)
            nome.push(resposta.nome)
          }
          dados = {
            "Nome": nome, "Servidor": apelido, "Alertas": alerta, "Tipo": componente
          }
          const quantidadeAlerta = dados.Alertas
          corGrafico = []
          for(i=0; i< quantidadeAlerta.length;i++){
            if(quantidadeAlerta[i] > 6){
              corGrafico.push("#861A22")
            }else if(quantidadeAlerta[i] >= 3 && quantidadeAlerta[i] <= 6){
              corGrafico.push('#F7D917')
            }else{
              corGrafico.push('#0c701a')
            }
          }
          plotarAlertasComp(dados,corGrafico)
        } 
      }).catch(function (res) {
        console.log(res)
      });
}

function plotarAlertasComp(dados,corGrafico){ 
  graficoAlertComp = ''
  ctx = document.getElementById('chartAnaliseComp').getContext("2d");
  graficoAlertComp = new Chart(ctx, {
    type: 'bar',
              data: {
                labels: dados.Nome,
                datasets: [{
                  backgroundColor: corGrafico,
                  data: dados.Alertas
                }
                ]
              },
              options: {
                legend: {
                  display: false,
                  position: 'top',
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
              },
            });
}



