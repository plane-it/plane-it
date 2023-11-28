buscarDataIgual();

function buscarDataIgual() {
  dias = [];
  meses = [];

  fetch("/clima/buscarFeriados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        console.log("Aconteceu algum erro (res.error = true)");
      } else {
        for (let i = 0; i < res.length; i++) {
          dias[i] = res[i].dia;
          meses[i] = res[i].mes;
        }
      }
    })
    .catch(function (resposta) {});
}

buscarClimaTabela()

function obterNomeMes(numero) {
  switch (numero) {
    case 1:
      return "Janeiro";
    case 2:
      return "Fevereiro";
    case 3:
      return "Março";
    case 4:
      return "Abril";
    case 5:
      return "Maio";
    case 6:
      return "Junho";
    case 7:
      return "Julho";
    case 8:
      return "Agosto";
    case 9:
      return "Setembro";
    case 10:
      return "Outubro";
    case 11:
      return "Novembro";
    case 12:
      return "Dezembro";
    default:
      return "Mês inválido";
  }
}

// Exemplo de uso
let numeroMes = 3;
let nomeMes = obterNomeMes(numeroMes);
console.log(nomeMes); // Saída: Março


var clima = [];
var idEncontrado = [];
var todosFeriados = [];

function buscarClimaTabela() {
  var naoAchouDia = [];
  var naoAchouMes = [];
  regiao = sessionStorage.getItem("REGIAO_AEROPORTO");
  diaMostrado = "";

  fetch("/clima/buscarClimaTabela", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      regiao: sessionStorage.getItem("REGIAO_AEROPORTO"),
    }),
  })
    .then((res) => res.json())
    .then((resposta) => {
      if (resposta.error) {
        console.log("Aconteceu algum erro (res.error = true)");
      } else {
        console.log(resposta)
        for (let i = 0; i < resposta.length; i++) {
          todosFeriados.push(resposta[i]);
          idEncontrado.push(resposta[i].idFeriado); 
          let previsao;
          if (resposta[i].previsao < 2.5) {
            previsao="Previsão boa"
            styleBoa = "color: green"
          } else if (resposta[i].previsao < 10) {
            previsao="Previsâo moderada"
          } else if (resposta[i].previsao < 50) {
            previsao="Previsão preocupante"
          } else {
            previsao="Voos cancelados"
          }

          
          
          tabelaFeriado.innerHTML += `
          <tr>
          <td>
          ${resposta[i].dia}
          </td>
          <td>
          ${resposta[i].diaSemana}
          </td>
          <td>
          ${obterNomeMes(parseInt(resposta[i].mes))} 
          </td>
          <td>
          ${resposta[i].titulo}
          </td>
          <td id="previsaoMuda">
          ${previsao}
          </td>
          </tr>`;
        }
        buscarOutrosFeriados(idEncontrado)
        
      }
    })
    .catch(function (resposta) {});
}

function buscarOutrosFeriados(idEncontrado) {
  fetch("/clima/buscarOutrosFeriados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: idEncontrado
    }),
  })
    .then((res) => res.json())
    .then((resposta) => {
      if (resposta.error) {
        console.log("Aconteceu algum erro (res.error = true)");
      } else {
        let previsao = "Previsao boa"
        console.log(resposta)
        for (let i = 0; i < resposta.length; i++) {
          todosFeriados.push(resposta[i]);

            tabelaFeriado.innerHTML += `
            <tr>
            <td>
              ${resposta[i].dia}
            </td>
            <td>
            ${resposta[i].diaSemana}
            </td>
            <td>
              ${obterNomeMes(parseInt(resposta[i].mes))} 
            </td>
            <td>
              ${resposta[i].titulo}
            </td>
            <td>
              ${previsao}
            </td>
          </tr>`;
      }

      kpiFeriado();

    }})
    .catch(function (resposta) {});
}

function kpiFeriado() {
  var dataAtual = new Date();
  var diaAtual = dataAtual.getDate();
  var mesAtual = dataAtual.getMonth() + 1;

  var proximoFeriado = null;

  for (let i = 0; i < todosFeriados.length; i++) {
    const feriado = todosFeriados[i];

    if (
      (feriado.mes > mesAtual) ||
      (feriado.mes === mesAtual && feriado.dia >= diaAtual)
    ) {
      // Verifica se encontramos um feriado válido
      if (!proximoFeriado || feriado.mes < proximoFeriado.mes || (feriado.mes === proximoFeriado.mes && feriado.dia < proximoFeriado.dia)) {
        proximoFeriado = feriado;
      }
    }
  }

  if (proximoFeriado) {
    let previsao;
    if (proximoFeriado.previsao < 2.5) {
      previsao="Previsão boa"
    } else if (proximoFeriado.previsao < 10) {
      previsao="Previsâo moderada"
    } else if (proximoFeriado.previsao < 50) {
      previsao="Previsão preocupante"
    } else {
      previsao="Voos cancelados"
    }
    dataFeriado.innerHTML = proximoFeriado.dia + " / " + proximoFeriado.mes
    if(previsao == "Previsão boa"){
      mesFeriado.innerHTML = previsao
      mesFeriado.style = "color: green"
    } else if (previsao == "Previsão moderada"){
      mesFeriado.innerHTML = previsao
      mesFeriado.style = "color: yellow"
    } else if(previsao == "Previsão preocupante"){
      mesFeriado.innerHTML = previsao
      mesFeriado.style = "color: orange"
    } else{
      mesFeriado.innerHTML = previsao
      mesFeriado.style = "color: red"
    }
    console.log('Próximo feriado:', proximoFeriado);
  } else {
    console.log('Não há feriados futuros neste ano.');
  }
}


function buscarFeriados() {
  var mesEscrito = meses[mesAtual];

  fetch("/clima/buscarFeriados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        console.log("Aconteceu algum erro (res.error = true)");
      } else {
        for (let i = 0; i < res.length; i++) {
          tabelaFeriado.innerHTML += `
          <tr>
          <td>
            ${res[i].dia}
          </td>
          <td>
          ${res[i].diaSemana}
          </td>
          <td>
            ${meses[res[i].mes]}
          </td>
          <td>
            ${res[i].titulo}
          </td>
          <td>
            ${clima[i]}
          </td>
        </tr>`;
        }

        for (let i = 0; i < res.length; i++) {
          if (res[i].mes == mesEscrito) {
            if (diaAtual < res[i].dia) {
              dataFeriado.innerHTML = ` ${meses[res[i].mes]} - ${res[i].dia}`;
            }
          } else {
            // mesNumero += 1
            dataFeriado.innerHTML = ` ${meses[res[i].mes]} - ${res[i].dia}`;
          }
        }
      }
    })
    .catch(function (resposta) {});
}

buscarVoos();

function buscarVoos() {
  qtdVoo = [];

  fetch("/clima/buscarVoos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      siglaAeroporto: sessionStorage.getItem("SIGLA_AEROPORTO"),
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        console.log("Aconteceu algum erro (res.error = true)");
      } else {
        qtdVoo[0] = res[0].quantidade;
        qtdVoo[1] = res[1].quantidade;

        media = ((res[0].quantidade + res[1].quantidade) * 1.63) / 100;

        if (media < qtdVoo[1]) {
          qtdVoosCancelados.innerHTML = res[1].quantidade;
          qtdVoosCancelados.style = "color: red";
        } else {
          qtdVoosCancelados.innerHTML = res[1].quantidade;
          qtdVoosCancelados.style = "color: green";
        }

        const topLine = {
          id: "topLine",
          afterDatasetsDraw(chart, args, plugins) {
            const { ctx, data } = chart;

            ctx.save();
            chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
              ctx.beginPath();
              ctx.strokeStyle = data.datasets[0].borderColor[index];
              ctx.lineWidth = 3;
              const halfWidth = datapoint.width / 2;
              ctx.moveTo(datapoint.x - halfWidth, datapoint.y - 6);
              ctx.lineTo(datapoint.x + halfWidth, datapoint.y - 6);
              ctx.stroke();

              // texto

              ctx.font = "bold 12px sans-serif";
              ctx.fillStyle = data.datasets[0].borderColor[index];
              ctx.textAlign = "center";
              ctx.fillText(
                data.datasets[0].data[index],
                datapoint.x,
                datapoint.y - 15
              );
            });
          },
        };

        // myChart.destroy();
        ctx = document.getElementById("analiseVoos");

        myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Cancelados", "Realizados"],
            datasets: [
              {
                label: "Cancelados",
                data: [qtdVoo[1], qtdVoo[0]],
                backgroundColor: ["#dc3545", "#28a745"],
                borderColor: ["#dc3545", "#28a745"],
              },
            ],
          },
          options: {
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                grace: "10%",
                border: {
                  display: false,
                },
                // grid: {
                //   display: false
                // }
                afterTickToLabelConversion: (ctx) => {
                  ctx.ticks = [];
                  ctx.ticks.push({
                    value: media,
                    label: "Média de voos cancelados: " + media.toFixed(0),
                  });
                },
              },
            },
          },
          plugins: [topLine],
        });
      }
    })
    .catch(function (resposta) {});
}
rodarTempo();
function rodarTempo() {
  tempo = 0;
  tempoClima3.innerHTML = tempo;
  tempoClima1.innerHTML = tempo;
  tempoClima2.innerHTML = tempo;

  setTimeout(() => {
    tempo++;
    rodarTempo();
  }, 60000);
}
