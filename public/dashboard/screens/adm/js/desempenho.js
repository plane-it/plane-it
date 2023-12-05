fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO;
dados = "";
graficoAlertComp = '';
container.style.display = 'none';
servidorBom = '';
servidorAlerta = '';
servidorCritico = '';
ctx = '';
//Busca de alerta por servidor
function buscarAlerta() {
  estadoServidor.innerHTML = "";
  if (fkAeroporto == "" || fkAeroporto == undefined) {
    alert("Servidores não encontrados!");   
  } else {
    fetch("/servidor/alertasCriticos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkAeroporto: fkAeroporto,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log("Aconteceu algum erro");
          alterarEstadoServidores("Alerta");
        } else {
          console.log(res);
          alertas = [];
          nomes = [];
          for (i = 0; i < res.length; i++) {
            resposta = res[i];
            alertas.push(resposta.qtdAlerta);
            nomes.push(resposta.apelido);
            servidorCritico = i +1
          }
          dados = {
            "Nome": nomes,
            "Alertas": alertas,
          };
          alertasServ = dados.Alertas;
          for (i = 0; i < alertasServ.length; i++) {
            if (alertasServ[i] >= 18) {
              estadoServidor.innerHTML += `
              <option value= "Crítico">Crítico</option value>
              <option value= "Alerta">Alerta</option value>
              <option value= "Bom">Bom</option value>`;
              break;
            }
          }
          plotarAlertasServidores(dados);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  }
}
function plotarAlertasServidores(dados) {
  dadosCor = "";
  dadosStatus = "";
  dadosAlertas = dados.Alertas;
  dadosGrafico = [];
  for (i = 0; i < dadosAlertas.length; i++) {
    //Alerta baixo
    if (dadosAlertas[i] > 0 && dadosAlertas[i] <= 6) {
      dadosGrafico.push(dadosAlertas[i]);
      dadosCor = "#0d4f1e";
      dadosStatus = "Estado bom";
      //Alerta médio
    } else if (dadosAlertas[i] > 6 && dadosAlertas[i] <= 18) {
      dadosGrafico.push(dadosAlertas[i]);
      dadosCor = "#b0b519";
      dadosStatus = "Estado de alerta";
      //Alerta alto
    } else if (dadosAlertas[i] > 18) {
      dadosGrafico.push(dadosAlertas[i]);
      dadosCor = "#861A22"
      dadosStatus = "Estado crítico";
    }
    statusServidor = document
      .getElementById("chartPerformance")
      .getContext("2d");
    graficoAlerta = new Chart(statusServidor, {
      type: "bar",
      data: {
        labels: dados.Nome,
        datasets: [
          {
            label: dadosStatus,
            backgroundColor: dadosCor,
            data: dadosGrafico,
          },
        ],
      },
      options: {
        legend: {
          display: true,
          position: "top",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: true,
                maxTicksLimit: 5,
                adding: 20,
              },
              gridLines: {
                drawBorder: true,
                zeroLineColor: "#fff",
                color: "transparent",
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,0,0)",
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 8,
                fontColor: "#9f9f9f",
              },
            },
          ],
        },
        events: ["click"],
        onClick: (event) => {
          const value = graficoAlerta.getElementAtEvent(event)[0]._datasetIndex;
          const model = graficoAlerta.getElementsAtEvent(event)[value]._model;
          servidorDados(model.label);
          //Função chama servidorDados() para ativar outro grafico
        },
      },
    });
    if(dadosStatus == 'Estado de alerta'){
      setTimeout(()=> atualizarServidoresAlertas(fkAeroporto,graficoAlerta,dadosStatus),5000)
    }
    if(dadosStatus == 'Estado bom'){
      setTimeout(()=> atualizarServidoresBons(fkAeroporto,graficoAlerta,dadosStatus),5000)
    }
    if(dadosStatus == 'Estado crítico'){
      setTimeout(()=> atualizarServidoresCriticos(fkAeroporto,graficoAlerta,dadosStatus),5000)
    }
  }
}
function alterarEstadoServidores(value) {
  corGrafico = "";
  console.log(value);
  nomesAlvo = [];
  alertasAlvo = [];
  if (value == "Bom") {
    fetch("/servidor/alertasEstadoBom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkAeroporto: fkAeroporto,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Aconteceu algum erro");
        } else {
          estadoServidor.innerHTML = "";
          for (i = 0; i < res.length; i++) {
            resposta = res[i];
            nomesAlvo.push(resposta.apelido);
            alertasAlvo.push(resposta.qtdAlerta);
            servidorBom =+ i+1
          }
          console.log(servidorBom)
          dados = {
            Nome: nomesAlvo,
            Alertas: alertasAlvo,
          };
          alertasServ = dados.Alertas;
          for (i = 0; i < alertasServ.length; i++) {
            if (alertasServ[i] > 0 && alertasServ[i] <= 6) {
              estadoServidor.innerHTML += `
            <option value= "Bom">Bom</option value>
            <option value= "Alerta">Alerta</option value>
            <option value= "Critico">Crítico</option value>`;
              break;
            }
          }
          plotarAlertasServidores(dados);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  } else if (value == "Alerta") {
    fetch("/servidor/alertasEstadoAlerta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkAeroporto: fkAeroporto,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Aconteceu algum erro");
          alterarEstadoServidores("Bom");
        } else {
          estadoServidor.innerHTML = "";
          for (i = 0; i < res.length; i++) {
            resposta = res[i];
            nomesAlvo.push(resposta.apelido);
            alertasAlvo.push(resposta.qtdAlerta);
            servidorAlerta = i+1
          }
          dados = {
            Nome: nomesAlvo,
            Alertas: alertasAlvo,
          };
          alertasServ = dados.Alertas;
          for (i = 0; i < alertasServ.length; i++) {
            if (alertasServ[i] > 6 && alertasServ[i] < 18) {
              estadoServidor.innerHTML += `
        <option value= "Alerta">Alerta</option value>
        <option value= "Crítico">Crítico</option value>
        <option value= "Bom">Bom</option value>`;
              break;
            }
          }
          plotarAlertasServidores(dados);
        }
      })
      .catch(function (res) {
        console.log(res);
      });
  } else if (value == "Crítico") {
    buscarAlerta()
  }
}
//Busca de alerta por componente do servidor
function servidorDados(servidor) {
  fetch("/servidor/buscarComponente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "fkAeroporto": fkAeroporto,
      "servidor": servidor,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error) {
        console.log("Aconteceu algum erro");
      } else {
        corGrafico = []
        alerta = [];
        nome = [];
        tipoComponente = []
        qtdServidores = "";
        for (i = 0; i < res.length; i++) {
          resposta = res[i];
          alerta.push(resposta.qtdAlerta);
          nome.push(resposta.nome);
          tipoComponente.push(resposta.tipo)
          qtdServidores = resposta.servidores;
        }
        dados = {
          "Alertas": alerta,
          "Nome": nome,
          "Servidores": qtdServidores,
          "Componente": tipoComponente
        }
        plotarAlertasComp(dados,servidor);
      }
    })
    .catch(function (res) {
      console.log(res);
    });
}
function plotarAlertasComp(dados,servidor) {
  container.style.display = 'block'
    const quantidadeAlerta = dados.Alertas;
        corGrafico = [];
        for (i = 0; i < quantidadeAlerta.length; i++) {
          if( quantidadeAlerta[i] > 0 && quantidadeAlerta[i] < dados.Servidores * 3){
            corGrafico.push("#0c701a");
          }if(quantidadeAlerta[i] >= dados.Servidores * 3 && quantidadeAlerta[i] <= dados.Servidores * 6){
            corGrafico.push("#F7D917");
          }else if(quantidadeAlerta[i] > dados.Servidores * 6){
            corGrafico.push("#861A22");
          }
        }
  ctx = document.getElementById("chartAnaliseComp").getContext("2d");
  if(graficoAlertComp != ''){
    graficoAlertComp.destroy()
  }
    graficoAlertComp = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dados.Nome,
        datasets: [
          {
            backgroundColor: corGrafico,
            data: dados.Alertas,
          },
        ],
      },
      options: {
        legend: {
          display: false,
          position: "top",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: true,
                maxTicksLimit: 5,
                adding: 20,
              },
              gridLines: {
                drawBorder: true,
                zeroLineColor: "#fff",
                color: "transparent",
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,0,0)",
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 8,
                fontColor: "#9f9f9f",
              },
            },
          ],
        },
      },
    });
    setTimeout(() => atualizarComponenteServidor(fkAeroporto,graficoAlertComp,servidor), 10000);
}
//Busca de alerta por componente no aeroporto
function desempenhoComponente() {
  dados = "";
  fetch("/servidor/buscarDesempenho", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkAeroporto: fkAeroporto,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error) {
        console.log("Aconteceu algum erro");
      } else {
        alertaComponente = [];
        tipoComponente = [];
        qtdServidores = ''
        for (i = 0; i < res.length; i++) {
          resposta = res[i];
          alertaComponente.push(resposta.qtdAlerta);
          tipoComponente.push(resposta.tipo);
          qtdServidores = resposta.servidores
        }
        dados = {
          "Componente": tipoComponente,
          "Alertas": alertaComponente,
          "Servidores": qtdServidores
        };
        plotarGraficoComponente(dados);
      }
    })
    .catch(function (res) {
      console.log(res);
    });
}
function plotarGraficoComponente(dados) {
  const quantidadeAlerta = dados.Alertas;
        corGrafico = [];
        for (i = 0; i < quantidadeAlerta.length; i++) {
          if( quantidadeAlerta[i] > 0 && quantidadeAlerta[i] < dados.Servidores * 3){
            corGrafico.push("#0c701a");
          }if(quantidadeAlerta[i] >= dados.Servidores * 3 && quantidadeAlerta[i] <= dados.Servidores * 6){
            corGrafico.push("#F7D917");
          }else if(quantidadeAlerta[i] > dados.Servidores * 6){
            corGrafico.push("#861A22");
          }
        }
  ctx = document.getElementById("chartComponente").getContext("2d");
  graficoComp = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: dados.Componente,
      datasets: [
        {
          label: dados.Componente[0],
          label: dados.Componente[1],
          label: dados.Componente[2],
          backgroundColor: corGrafico,
          data: dados.Alertas,
        },
      ],
    },
  });
  setTimeout(() => atualizarComponente(fkAeroporto,graficoComp), 5000);
}
//Exibir kpis
function mostrarKPI(){
  fetch("/servidor/buscarKpis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkAeroporto: fkAeroporto,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        console.log("Aconteceu algum erro");
      } else {
        servidorCritico = []
        servidorAlerta = []
        servidorBom = []
        alertaTotal = []
        qtdServidores = ''
        console.log(res)
        for(i=0 ; i < res.length; i++){
          resposta = res[i]
          servidorCritico.push(resposta.critico)
          servidorAlerta.push(resposta.alerta)
          servidorBom.push(resposta.bom)
          alertaTotal.push(resposta.qtdAlerta)
          qtdServidores = resposta.servidores
        }
        //Modificando kpis de estados de servidor
        somaBom = 0
        for(i=0; i< servidorBom.length;i++){
          somaBom += servidorBom[i]
        }
        somaCritico = 0
        for(i=0; i < servidorCritico.length;i++){
          somaCritico += servidorCritico[i]
        }
        somaAlerta = 0
        for(i=0; i< servidorAlerta.length;i++){
          somaAlerta += servidorAlerta[i]
        }
        statusBom.innerHTML = Number(somaBom)
        cardBom.style.color = '#07521d'
        iconeBom.style.color = '#07521d'
        statusAlerta.innerHTML = Number(somaAlerta)
        cardAlerta.style.color = '#F7D917'
        iconeAlerta.style.color = '#F7D917'
        statusCritico.innerHTML = Number(somaCritico)
        iconeCritico.style.color = '#dc3545'
        cardCritico.style.color = '#dc3545'
        
        //Modificando kpi de alertas gerais
        somaAlertasGerais = 0
        for(i=0;i < alertaTotal.length;i++){
          somaAlertasGerais += Number(alertaTotal[i])
        }
        qtdAlertaGeral.innerHTML = Number(somaAlertasGerais)
        if(somaAlertasGerais > 0 && somaAlertasGerais <= qtdServidores * 3){
          alertaServidores.style.color = '#07521d'
        }else if(somaAlertasGerais > qtdServidores * 3 && somaAlertasGerais <= qtdServidores * 6){
          alertaServidores.style.color = '#F7D917'
        }else{
          alertaServidores.style.color =  '#dc3545'
        }
      }
    })
    .catch(function (res) {
      console.log(res);
    });
}
//Atualizando gráficos com novos dados
function atualizarComponente(fkAeroporto,nomeGrafico){
  fetch(`/servidor/atualizarComponente/${fkAeroporto}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (novoRegistro) {
            alertasNovos = []
            componenteNovos = []
            qtdServidores = ''
            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            for(i=0;i<novoRegistro.length;i++){
              resposta = novoRegistro[i]
              alertasNovos.push(resposta.qtdAlerta)
              componenteNovos.push(resposta.tipo)
              qtdServidores = resposta.servidores
            }
            dados = {
              "Componente": componenteNovos,
              "Alertas": alertasNovos,
              "Servidores": qtdServidores 
            }
            plotarGraficoComponente(dados)
        });
        nomeGrafico.update()
        mostrarKPI()
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}
function atualizarServidoresAlertas(fkAeroporto,nomeGrafico,dadosStatus){
  if(dadosStatus == "Estado de alerta"){
    fetch(`/servidor/atualizarServidorAlerta/${fkAeroporto}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {
            servidorNovo = [];
            alertasNovo = [];
            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            for(i=0;i<novoRegistro.length;i++){
                resposta = novoRegistro[i]
                servidorNovo.push(resposta.apelido);
                if(resposta.qtdAlerta > 6 && resposta.qtdAlerta <= 18){
                  alertasNovo.push(resposta.qtdAlerta);
                }
              }
              for(i=0;i < servidorNovo.length;i++){
                if(nomeGrafico.data.labels.length <= 5){
                  if(servidorNovo[i] != nomeGrafico.data.labels[0]){
                    nomeGrafico.data.labels.push(servidorNovo[i])
                  }
                }else{
                  nomeGrafico.data.labels.shift()
                }
              }            
              for(i=0;i < alertasNovo.length;i++){
                if(alertasNovo[i] != nomeGrafico.data.datasets[0].data){
                  nomeGrafico.data.datasets[0].data.push(alertasNovo[i])
                }
              }   
              nomeGrafico.clear()      
              nomeGrafico.update()
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }
 
}
function atualizarServidoresBons(fkAeroporto,nomeGrafico,dadosStatus){
  if(dadosStatus == "Estado bom"){
    fetch(`/servidor/atualizarServidorBom/${fkAeroporto}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {
            servidorNovo = [];
            alertasNovo = [];
            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            for(i=0;i<novoRegistro.length;i++){
                resposta = novoRegistro[i]
                servidorNovo.push(resposta.apelido);
                alertasNovo.push(resposta.qtdAlerta);
                if(resposta.qtdAlerta > 0 && resposta.qtdAlerta <= 6){
                  alertasNovo.push(resposta.qtdAlerta);
                }
              }
              for(i=0;i < servidorNovo.length;i++){
                if(nomeGrafico.data.labels.length <= 5){
                  if(servidorNovo[i] != nomeGrafico.data.labels[0]){
                    nomeGrafico.data.labels.push(servidorNovo[i])
                  }
                }else{
                  nomeGrafico.data.labels.shift()
                }
              }             
              for(i=0;i < alertasNovo.length;i++){
                if(alertasNovo[i] != nomeGrafico.data.datasets[0].data){
                  nomeGrafico.data.datasets[0].data.push(alertasNovo[i])
                }
              }    
              nomeGrafico.clear()        
              nomeGrafico.update()
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }
  
}
function atualizarServidoresCriticos(fkAeroporto,nomeGrafico,dadosStatus){
  if(dadosStatus == "Estado crítico"){
    fetch(`/servidor/atualizarServidorCritico/${fkAeroporto}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {
            servidorNovo = [];
            alertasNovo = [];
            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            for(i=0;i<novoRegistro.length;i++){
                resposta = novoRegistro[i]
                servidorNovo.push(resposta.apelido);
                alertasNovo.push(resposta.qtdAlerta);
                if(resposta.qtdAlerta > 18){
                  alertasNovo.push(resposta.qtdAlerta);
                }
              }
              for(i=0;i < servidorNovo.length;i++){
                if(nomeGrafico.data.labels.length <= 5){
                  if(servidorNovo[i] != nomeGrafico.data.labels[0]){
                    nomeGrafico.data.labels.push(servidorNovo[i])
                  }
                }else{
                  nomeGrafico.data.labels.shift()
                }
              }           
              for(i=0;i < alertasNovo.length;i++){
                if(alertasNovo[i] != nomeGrafico.data.datasets[0].data){
                  nomeGrafico.data.datasets[0].data.push(alertasNovo[i])
                }
              }   
              nomeGrafico.clear()         
              nomeGrafico.update()
          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });  
  }
  
}
function atualizarComponenteServidor(fkAeroporto,nomeGrafico,servidor){
  fetch("/servidor/atualizarCompServidor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "fkAeroporto": fkAeroporto,
      "servidor": servidor,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.error) {
        console.log("Aconteceu algum erro");
      } else {
        corGrafico = []
        alerta = [];
        nome = [];
        qtdServidores = "";
        tipoComponente = []
        for (i = 0; i < res.length; i++) {
          resposta = res[i];
          alerta.push(resposta.qtdAlerta);
          nome.push(resposta.nome);
          qtdServidores = resposta.servidores;
          tipoComponente.push(resposta.tipo)
        }
        dados = {
          "Componente": tipoComponente,
          "Alertas": alerta,
          "Servidores": qtdServidores,
          "Nome": nome 
        }
        plotarAlertasComp(dados,servidor)
        nomeGrafico.clear()
        nomeGrafico.update()
        mostrarKPI()
      }
    })
    .catch(function (res) {
      console.log(res);
    });
}
