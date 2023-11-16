nomeServ.innerHTML = "Análise de " + sessionStorage.NOME_SERVIDOR;

buscarMoedas();
atualizarMoeda("BRL", 1)

var chartFunc;
var chartBarras;
var chartRadar;
var chartPizza;

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
    if (chartRadar) {
        chartRadar.destroy();
    }
    if (chartPizza) {
        chartPizza.destroy();
    }

    moedaAtual = moeda;

    cpuValorAtual = cpuValorBRL*valor;
    ramValorAtual = ramValorBRL*valor;
    discoValorAtual = discoValorBRL*valor;
    custoTotalAtual = custoTotalBRL*valor

    cpuEstado.innerHTML = (maxMhzCpu/cpuValorAtual).toFixed(2);
    ramEstado.innerHTML = (maxGbRam/ramValorAtual).toFixed(2);
    discoEstado.innerHTML = (maxGbDisco/discoValorAtual).toFixed(2);
    custoTotal.innerHTML = "$ " + custoTotalAtual.toFixed(2);

    chartFunc = garficoFunc(moeda, "MHz");
    chartBarras = graficoBarras(moeda, "MHz");
    chartRadar = graficoRadar(cpuValorAtual, ramValorAtual, discoValorAtual, custoTotalAtual);
    chartPizza = graficoPizza(cpuValorAtual, ramValorAtual, discoValorAtual)
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

                    if (chartRadar) {
                        chartRadar.destroy();
                        chartRadar = graficoRadar(cpuValorBRL, ramValorBRL, discoValorBRL, custoTotalBRL);
                    }
                    if (chartPizza) {
                        chartPizza.destroy();
                        chartPizza = graficoPizza(cpuValorBRL, ramValorBRL, discoValorBRL);
                    }

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
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            },
            {
                label: 'Desempenho do Componente',
                data: valoresDesempenho,
                fill: false,
                borderColor: '#8eac7e',
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
    var ctxBar = document.getElementById('barras').getContext('2d');
    var chartBarras = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['CPU Específica', 'Mediana dos Servidores'],
            datasets: [{
                label: `Desempenho por ${moeda} (${medidaComponente}/$)`,
                data: [5.17, 4.2],
                backgroundColor: [
                    'rgba(244, 69, 69, 0.604) ',
                    '#8eac7e'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
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
    return chartBarras;
}

function graficoRadar(cpuValor, ramValor, discoValor, orcamentoTotal) {
    var dados = {
        labels: ['CPU', 'RAM', 'Disco'],
        datasets: [{
            label: 'Distribuição de Orçamento',
            data: [cpuValor, ramValor, discoValor],
            backgroundColor: ['rgba(244, 69, 69, 0.604) ', '#8eac7e', 'rgba(255, 206, 86, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', '#3A7D44', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2,
        }],
    };

    var opcoes = {
        scales: {
            r: {
                beginAtZero: true,
                max: orcamentoTotal * 1.1,
                ticks: {
                    stepSize: orcamentoTotal / 10,
                    display: false 
                },
                gridLines: {
                    display: false
                }
            },
        },
        aspectRatio: 1.2
    };

    var ctx = document.getElementById('graficoRadar').getContext('2d');

    var graficoRadar = new Chart(ctx, {
        type: 'radar',
        data: dados,
        options: opcoes,
    });

    return graficoRadar;
}

function graficoPizza(cpuValor, ramValor, discoValor) {
    var dados = {
        labels: ['CPU', 'RAM', 'Disco'],
        datasets: [{
            label: 'Distribuição de Orçamento',
            data: [cpuValor, ramValor, discoValor],
            backgroundColor: ['rgba(244, 69, 69, 0.604) ', '#8eac7e', 'rgba(255, 206, 86, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', '#3A7D44', 'rgba(255, 206, 86, 1)'],
            borderWidth: 2,
        }],
    };

    var opcoes = {
        aspectRatio: 1.2
    };

    var ctx = document.getElementById('graficoPizza').getContext('2d');

    var graficoPizza = new Chart(ctx, {
        type: 'pie',
        data: dados,
        options: opcoes,
    });

    return graficoPizza;
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


