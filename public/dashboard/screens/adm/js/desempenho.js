fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO;
console.log(fkAeroporto);
buscarAlerta();
desempenhoComponente();
dados = "";
graficoAlertComp = ''
container.style.display = 'none'
servidorBom = ''
servidorAlerta = ''
servidorCritico = ''
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
          alert("Não foi encontrado servidor crítico");
          alterarEstadoServidores("Alerta");
        } else {
          console.log(res);
          alertas = [];
          nomes = [];
          for (i = 0; i < res.length; i++) {
            resposta = res[i];
            alertas.push(resposta.qtdAlerta);
            nomes.push(resposta.apelido);
            alertaServidores.innerHTML = resposta.alertaTotal
            servidorCritico = i +1
          }
          console.log(servidorCritico)
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
  const dadosAlertas = dados.Alertas;
  dadosGrafico = [];
  console.log(dadosAlertas);
  for (i = 0; i < dadosAlertas.length; i++) {
    //Alerta baixo
    if (dadosAlertas[i] > 0 && dadosAlertas[i] <= 6) {
      dadosGrafico.push(dadosAlertas[i]);
      dadosCor = "#0d4f1e";
      dadosStatus = "Estado bom";
      //Alerta médio
    } else if (dadosAlertas[i] > 6 && dadosAlertas[i] < 18) {
      dadosGrafico.push(dadosAlertas[i]);
      dadosCor = "#b0b519";
      dadosStatus = "Estado de alerta";
      //Alerta alto
    } else if (dadosAlertas[i] >= 18) {
      dadosGrafico.push(dadosAlertas[i]);
      dadosCor = "#eb4034";
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
          alert("Não foi encontrado servidor bom")
        } else {
          estadoServidor.innerHTML = "";
          for (i = 0; i < res.length; i++) {
            resposta = res[i];
            nomesAlvo.push(resposta.apelido);
            alertasAlvo.push(resposta.qtdAlerta);
            alertaServidores.innerHTML = resposta.alertaTotal
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
          alert("Não foi encontrado servidor em alerta");
          alterarEstadoServidores("Bom");
        } else {
          estadoServidor.innerHTML = "";
          for (i = 0; i < res.length; i++) {
            resposta = res[i];
            nomesAlvo.push(resposta.apelido);
            alertasAlvo.push(resposta.qtdAlerta);
            alertaServidores.innerHTML = resposta.alertaTotal
            servidorAlerta = i+1
          }
          console.log(servidorAlerta)
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
  console.log(servidor);
  dados = "";
  fetch("/servidor/buscarComponente", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkAeroporto: fkAeroporto,
      servidor: servidor,
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
        for (i = 0; i < res.length; i++) {
          resposta = res[i];
          alerta.push(resposta.qtdAlerta);
          nome.push(resposta.nome);
          qtdServidores = resposta.servidores;
        }
        dados = {
          "Alertas": alerta,
          "Nome": nome,
          "Servidores": qtdServidores,
        };
        corGrafico = []
        for(i=0;i < dados.Alertas.length;i++){
          if( dados.Alertas[i] > 0 && dados.Alertas[i] < dados.Servidores * 3){
            corGrafico.push("#0c701a");
          }else if(dados.Alertas[i] >= dados.Servidores * 3 && dados.Alertas[i] < dados.Servidores * 6){
            corGrafico.push("#F7D917");
          }else if(dados.Alertas[i] > dados.Servidores * 6){
            corGrafico.push("#861A22");
          }
        }
        if(ctx == ''){
          plotarAlertasComp(dados,corGrafico);
        }else{
          ctx = ''
          plotarAlertasComp(dados,corGrafico);
        }
      }
    })
    .catch(function (res) {
      console.log(res);
    });
}
function plotarAlertasComp(dados,corGrafico) {
  container.style.display = 'block'
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
        const quantidadeAlerta = dados.Alertas;
        corGrafico = [];
        for (i = 0; i < quantidadeAlerta.length; i++) {
          if( quantidadeAlerta[i] > 0 && quantidadeAlerta[i] < dados.Servidores * 3){
            corGrafico.push("#0c701a");
          }if(quantidadeAlerta[i] >= dados.Servidores * 3 && quantidadeAlerta[i] < dados.Servidores * 6){
            corGrafico.push("#F7D917");
          }else if(quantidadeAlerta[i] > dados.Servidores * 6){
            corGrafico.push("#861A22");
          }
        }
        plotarGraficoComponente(dados, corGrafico);
      }
    })
    .catch(function (res) {
      console.log(res);
    });
}
function plotarGraficoComponente(dados, corGrafico) {
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
        console.log(res)
        for(i=0 ; i < res.length; i++){
          resposta = res[i]
          servidorCritico.push(resposta.critico)
          servidorAlerta.push(resposta.alerta)
          servidorBom.push(resposta.bom)
        }
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
        if(somaCritico > 0 ){
          statusCritico.innerHTML = Number(somaCritico)

          iconeCritico.style.color = '#dc3545'
        }else{
          iconeCritico.style.color = '#dc3545'
          statusCritico.innerHTML = Number(somaCritico)
        }
      }
    })
    .catch(function (res) {
      console.log(res);
    });
}
mostrarKPI()

