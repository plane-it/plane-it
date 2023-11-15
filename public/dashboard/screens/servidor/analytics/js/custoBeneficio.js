nomeServ.innerHTML = "Análise de " + sessionStorage.NOME_SERVIDOR;

buscarMoedas();
garficoFunc("BRL", "MHz");
graficoBarras("BRL", "MHz");
atualizarMoeda("BRL")

var chartFunc;
var chartBarras;

var moedaAtual = "BRL";

var idCpu;
var cpuValorBRL;
var cpuValorAtual;
var maxMhzCpu;

var idRam;
var ramValorBRL;
var ramValorAtual;
var maxGbRam;

var idDisco;
var discoValorBRL;
var discoValorAtual;
var maxGbDisco;

var custoTotalBRL;
var custoTotalAtual;

document.getElementById('slctMoeda').addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
    var currencyName = selectedOption.getAttribute('data-currency-name');
    var currencyValue = selectedOption.value;
    atualizarMoeda(currencyName, currencyValue);
});

function buscarMoedas() {
    $.ajax({
        url: 'https://api.exchangerate-api.com/v4/latest/BRL', // API de taxa de câmbio
        type: 'GET',
        success: function (res) {
            let moedas = res.rates; // Obter todas as moedas
            let select = $('#slctMoeda'); // Seu elemento select

            $.getJSON('https://openexchangerates.org/api/currencies.json', function (data) {
                for (let codigo in moedas) {
                    let option = $('<option/>');
                    option.attr('value', moedas[codigo]); // Valor da moeda em relação ao real
                    option.attr('data-currency-name', codigo); // Nome da moeda
                    // Use o mapeamento para obter o nome completo da moeda
                    let nomeMoeda = data[codigo] || codigo;
                    option.text(nomeMoeda + ' (' + codigo + ')'); // Texto da opção
                    select.append(option);
                }
            });
        }
    });

}
function atualizarMoeda(moeda, valor) {
    var elements = document.getElementsByClassName('nomeMoeda');
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = moeda;
    }
    if (chartFunc) {
        chartFunc.destroy();
    }
    if (chartBarras) {
        chartBarras.destroy();
    }
    moedaAtual = moeda;

    cpuValorAtual = cpuValorBRL*valor;
    ramValorAtual = ramValorBRL*valor;
    discoValorAtual = discoValorBRL*valor;
    custoTotalAtual = custoTotalBRL*valor

    alert("disco valor em brl: " + discoValorBRL + " discovalor nesta moeda: " + discoValorAtual + " currency: " + valor)

    cpuEstado.innerHTML = (maxMhzCpu/cpuValorAtual).toFixed(2);
    ramEstado.innerHTML = (maxGbRam/ramValorAtual).toFixed(2);
    discoEstado.innerHTML = (maxGbDisco/discoValorAtual).toFixed(2);
    custoTotal.innerHTML = "$ " + custoTotalAtual.toFixed(2);

    chartFunc = garficoFunc(moeda);
    chartBarras = graficoBarras(moeda);
}


buscarIdComps()
function buscarIdComps() {
    let servidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;

    if (servidor != "" && servidor != undefined) {
        fetch("/componente/buscarComponentes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "servidor": servidor
            })
        }).then((res) => res.json())
            .then(async (res) => {
                if (!res.error) {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].fktipoComponente == 1) {
                            idCpu = res[i].idComp;
                            cpuValorBRL = parseFloat(res[i].preco);
                            await buscarSpecs(idCpu);
                        } else if (res[i].fktipoComponente == 2) {
                            idRam = res[i].idComp;
                            ramValorBRL = parseFloat(res[i].preco);
                            await buscarSpecs(idRam);
                        } else if (res[i].fktipoComponente == 3) {
                            idDisco = res[i].idComp;
                            discoValorBRL = parseFloat(res[i].preco);
                            await buscarSpecs(idDisco);
                        }
                    }
                    custoTotalBRL = (cpuValorBRL+ramValorBRL+discoValorBRL)
                    custoTotal.innerHTML = (cpuValorBRL+ramValorBRL+discoValorBRL).toFixed(2);
                } else {
                    Swal.fire("Erro!", "Componentes não encontrados", "error");
                }
            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}
function buscarSpecs(idComp){
    if (idComp != "" && idComp != undefined) {
        fetch("/componente/buscarSpecs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "idComp": idComp
            })
        }).then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    if (res[0].fktipoComponente == 1 && res[0].fkUnidadeMedida == 4) {
                        maxMhzCpu = parseFloat(res[0].valor);
                        cpuEstado.innerHTML = (maxMhzCpu/cpuValorBRL).toFixed(2);
                    } else if (res[0].fktipoComponente == 2 && res[0].fkUnidadeMedida == 3) {
                        maxGbRam = parseFloat(res[0].valor);
                        ramEstado.innerHTML = (maxGbRam/ramValorBRL).toFixed(2);
                    } else if (res[0].fktipoComponente == 3 && res[0].fkUnidadeMedida == 3) {
                        maxGbDisco = parseFloat(res[0].valor);
                        discoEstado.innerHTML = (maxGbDisco/discoValorBRL).toFixed(2);
                    }
                    
                } else {
                    Swal.fire("Erro!", "Componentes não encontrados", "error");
                }
            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}


function mudarComponente() {
    var elements = document.getElementsByClassName('medidaComponente');

    switch (slctComponente.value) {
        case "1":
            medidaComponente = "MHz";
            break;
        case "2":
        case "3":
            medidaComponente = "Gb";
            break;
        default:
            break;
    }

    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = medidaComponente;
    }
    if (chartFunc) {
        chartFunc.destroy();
    }
    if (chartBarras) {
        chartBarras.destroy();
    }
    chartFunc = garficoFunc(moedaAtual, medidaComponente);
    chartBarras = graficoBarras(moedaAtual, medidaComponente);
}



function garficoFunc(moeda, medidaComponente) {
    // Coeficientes da função linear f(x) = ax + b
    var a = 1;
    var b = 5.71;

    // Gera alguns valores para x
    var valoresX = Array.from({ length: 10 }, (_, i) => i);

    // Calcula os valores correspondentes de y usando a função linear
    var valoresY = valoresX.map(x => a * x + b);

    var valoresDesempenho = valoresY.map(y => y + 2);

    var ctx = document.getElementById('func').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: valoresX,
            datasets: [{
                label: 'Mediana',
                data: valoresY,
                fill: false,
                borderColor: '#3A7D44',
                tension: 0.1
            },
            {
                label: 'Desempenho do Componente',
                data: valoresDesempenho,
                fill: false,
                borderColor: '#FF0000',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: `${moeda} gasto`
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Desempenho fornecido'
                    }
                }
            },
            aspectRatio: 1.8
        }
    });
    return chart;

}
function graficoBarras(moeda, medidaComponente) {
    var ctx = document.getElementById('barras').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CPU Específica', 'Mediana dos Servidores'],
            datasets: [{
                label: `Desempenho por ${moeda} (${medidaComponente}/$)`,
                data: [5.17, 4.2],
                backgroundColor: [
                    '#FF0000',
                    '#3A7D44'
                ],
                borderColor: [
                    '#FF0000',
                    '#3A7D44'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: `Desempenho fornecido (${medidaComponente}/$)`
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 10
                    }
                }
            },
            aspectRatio: 1.2
        }
    });
    return chart;
}


function aparecerTela() {
    fundo.style = "filter: opacity(40%) blur(0.5px); backdrop-filter: opacity(40%) blur(0.5px);"
    frente.style = "position: absolute; top: 10%; left: 30%; display: block;"
}
function sumirTela() {
    fundo.style = "filter: opacity(100%) blur(0px); backdrop-filter: opacity(100%) blur(0px);"
    frente.style = "display:none"
}
function verRespostas() {
    window.location = "respostasInspecao.html"
}

function confirmarEnviarAnalise() {
    return Swal.fire({
        title: 'Confirmação',
        text: "Você deseja enviar esta análise?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: 'rgba(244, 69, 69, 1)',
        confirmButtonText: 'Sim, enviar!',
        confirmButtonColor: '#254D32',
        iconColor: 'rgba(244, 69, 69, 1)'
    }).then((result) => {
        return Promise.resolve(result.isConfirmed);
    })
}

function enviarAnalise() {
    var motivo = iptMotivo.value;
    var descricao = iptProblema.value;
    var requisitante = sessionStorage.ID_COLAB;
    var servidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;


    if (motivo != "" && motivo != undefined && descricao != "" && descricao != undefined && requisitante != "" && requisitante != undefined && servidor != "" && servidor != undefined) {
        (async () => {
            try {
                var validou = await confirmarEnviarAnalise();
                if (validou) {
                    fetch("/requisicoes/enviarReq", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "motivo": motivo,
                            "descricao": descricao,
                            "requisitante": requisitante,
                            "servidor": servidor
                        })
                    }).then((res) => res.json())
                        .then((res) => {
                            if (!res.error) {
                                iptMotivo.value = "";
                                iptProblema.value = "";
    
                                Swal.fire({
                                    title: 'Muito Bem!',
                                    text: 'Solicitação enviada com sucesso!',
                                    icon: 'success',
                                    confirmButtonColor: '#254D32'
                                  }).then(() => {
                                    fundo.style = "filter: opacity(100%) blur(0px); backdrop-filter: opacity(100%) blur(0px);"
                                    frente.style = "display:none"
                                  });
                            } else {
                                alert('Erro ao solicitar a inspeção')
                            }
    
                        }).catch(function (error) {
                            console.error("Error:", error);
                            Swal.fire("ERRO", res.error, "error")
    
                        });
                }
            }
            catch (error) {
                console.error(error)
            }
        })();
    } else {
        alert("Requisição incompleta")
    }
}


