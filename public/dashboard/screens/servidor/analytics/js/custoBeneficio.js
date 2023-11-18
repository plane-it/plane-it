nomeServ.innerHTML = "Análise de " + sessionStorage.NOME_SERVIDOR;

var chartFunc;
var chartBarras;
var chartRadar;
var chartPizza;

var moedaAtual = "BRL";

var idCpu;
var cpuValorBRL;
var cpuValorAtual;
var maxMhzCpu;
var medianPriceForEachCpuBRL;
var medianPriceForEachCpUAtual;
var medianBeneficioCpuBRL;
var medianBeneficioCpuAtual;

var idRam;
var ramValorBRL;
var ramValorAtual;
var maxGbRam;
var medianPriceForEachRamBRL;
var medianPriceForEachRamAtual;
var medianBeneficioRamBRL;
var medianBeneficioRamAtual;

var idDisco;
var discoValorBRL;
var discoValorAtual;
var maxGbDisco;
var medianPriceForEachDiscoBRL;
var medianPriceForEachDiscoAtual;
var medianBeneficioDiscoBRL;
var medianBeneficioDiscoAtual;

var custoTotalBRL;
var custoTotalAtual;
var medianCustoTotalBRL;
var medianCustoTotalAtual;

var coresAtualizadas = false;

document.getElementById('slctMoeda').addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
    var currencyName = selectedOption.getAttribute('data-currency-name');
    var currencyValue = selectedOption.value;
    atualizarMoeda(currencyName, currencyValue);
});

window.onload = async function() {
    Promise.all([
        document.getElementById('slctComponente').value = '1',
        buscarMoedas(),
        await buscarIdComps()]).then(() => {
            custoTotalBRL = (cpuValorBRL + ramValorBRL + discoValorBRL)
            custoTotal.innerHTML = (cpuValorBRL + ramValorBRL + discoValorBRL).toFixed(2);
        }).then(async()=>{
            await buscarMedianPreco(),
            await buscarMedianBeneficio()
        }).then(() => {
        atualizarMoeda("BRL", 1);
    }).catch((error) => {
        console.error("Erro ao carregar funções: ", error);
    });
};

// if (chartRadar) {
//     chartRadar.destroy();
//     chartRadar = graficoRadar(cpuValorBRL, ramValorBRL, discoValorBRL, custoTotalBRL);
// }
// if (chartPizza) {
//     chartPizza.destroy();
//     chartPizza = graficoPizza(cpuValorBRL, ramValorBRL, discoValorBRL);
// }


// FUNÇÕES INICIAIS
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

function buscarIdComps() {
    return new Promise((resolve, reject) => {
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
                        resolve();
                    } else {
                        Swal.fire("Erro!", "Componentes não encontrados", "error");
                        reject();
                    }
                }).catch(function (error) {
                    console.error("Error:", error);
                    reject(error);
                });
        }
    });
}

function buscarSpecs(idComp) {
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
                        cpuEstado.innerHTML = (maxMhzCpu / cpuValorBRL).toFixed(2);
                    } else if (res[0].fktipoComponente == 2 && res[0].fkUnidadeMedida == 3) {
                        maxGbRam = parseFloat(res[0].valor);
                        ramEstado.innerHTML = (maxGbRam / ramValorBRL).toFixed(2);
                    } else if (res[0].fktipoComponente == 3 && res[0].fkUnidadeMedida == 3) {
                        maxGbDisco = parseFloat(res[0].valor);
                        discoEstado.innerHTML = (maxGbDisco / discoValorBRL).toFixed(2);
                    }

                } else {
                    Swal.fire("Erro!", "Componentes não encontrados", "error");
                }
            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}

function buscarMedianPreco() {
    return new Promise((resolve, reject) => {
        let idEmpresa = sessionStorage.FK_EMPRESA;

        if (idEmpresa != "" && idEmpresa != undefined) {
            fetch("/componente/buscarMedianPreco", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "idEmpresa": idEmpresa
                })
            }).then((res) => res.json())
                .then((res) => {
                    if (!res.error) {
                        for (let i = 0; i < res[0].length; i++) {
                            if (res[0][i].fktipoComponente == 1) {
                                medianPriceForEachCpuBRL = parseFloat(res[0][i].median_val);
                            } else if (res[0][i].fktipoComponente == 2) {
                                medianPriceForEachRamBRL = parseFloat(res[0][i].median_val);
                            } else if (res[0][i].fktipoComponente == 3) {
                                medianPriceForEachDiscoBRL = parseFloat(res[0][i].median_val);
                            }
                        }
                        medianCustoTotalBRL = medianPriceForEachCpuBRL + medianPriceForEachRamBRL + medianPriceForEachDiscoBRL;
                        resolve();
                    } else {
                        Swal.fire("Erro!", "Medianas não encontradas", "error");
                        reject(new Error("Medianas não encontradas"));
                    }
                }).catch(function (error) {
                    console.error("Error:", error);
                    reject(error);
                });
        } else {
            reject(new Error("ID da empresa não definido"));
        }
    });
}


function buscarMedianBeneficio() {
    return new Promise((resolve, reject) => {
        let idEmpresa = sessionStorage.FK_EMPRESA;

        if (idEmpresa != "" && idEmpresa != undefined) {
            fetch("/componente/buscarMedianBeneficio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "idEmpresa": idEmpresa
                })
            }).then((res) => res.json())
                .then((res) => {
                    if (!res.error) {
                        for (let i = 0; i < res[0].length; i++) {
                            if (res[0][i].fktipoComponente == 1) {
                                medianBeneficioCpuBRL = res[0][i].median;
                            } else if (res[0][i].fktipoComponente == 2) {
                                medianBeneficioRamBRL = res[0][i].median;
                            } else if (res[0][i].fktipoComponente == 3) {
                                medianBeneficioDiscoBRL = res[0][i].median;
                            }
                        }
                        resolve();
                    } else {
                        Swal.fire("Erro!", "Medianas não encontradas", "error");
                        reject(new Error("Medianas não encontradas"));
                    }
                }).catch(function (error) {
                    console.error("Error:", error);
                    reject(error);
                });
        } else {
            reject(new Error("ID da empresa não definido"));
        }
    });
}




// FUNÇÕES DINÂMICAS
function mudarComponente() {
    var elements = document.getElementsByClassName('medidaComponente');
    var medianaCompSelected;
    var valorCompSelected;

    switch (slctComponente.value) {
        case "1":
            medidaComponente = "MHz";
            medianaCompSelected = medianBeneficioCpuAtual;
            valorCompSelected = maxMhzCpu/cpuValorAtual;
            break;
        case "2":
            medidaComponente = "Gb";
            medianaCompSelected = medianBeneficioRamAtual;
            valorCompSelected = maxGbRam/ramValorAtual;
        case "3":
            medidaComponente = "Gb";
            medianaCompSelected = medianBeneficioDiscoAtual;
            valorCompSelected = maxGbDisco/discoValorAtual;
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
    
    chartFunc = garficoFunc(moedaAtual, medidaComponente, medianaCompSelected, valorCompSelected);
    chartBarras = graficoBarras(moedaAtual, medidaComponente, medianaCompSelected, valorCompSelected);
}

function atualizarMoeda(moeda, valor) {
    var elements = document.getElementsByClassName('nomeMoeda');
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = moeda;
    }
    var charts = [chartFunc, chartBarras, chartRadar, chartPizza];
    charts.forEach(function(chart) {
        if (chart) {
            chart.destroy();
        }
    });

    moedaAtual = moeda;

    var valores = {
        cpu: cpuValorBRL * valor,
        ram: ramValorBRL * valor,
        disco: discoValorBRL * valor,
        custoTotal: custoTotalBRL * valor
    };

    var medianBeneficios = {
        cpu: (1/valor)*medianBeneficioCpuBRL,
        ram: (1/valor)*medianBeneficioRamBRL,
        disco: (1/valor)*medianBeneficioDiscoBRL,
        custoTotal: (1/valor)*medianCustoTotalBRL
    };

    var maxValues = {
        cpu: maxMhzCpu,
        ram: maxGbRam,
        disco: maxGbDisco
    };

    var cards = {
        cpu: cardCPU,
        ram: cardRAM,
        disco: cardDISCO,
        custoTotal: cardTOTAL
    };

    if (!coresAtualizadas) {
        for (var key in valores) {
            if (key === 'custoTotal') {
                if (valores[key] > medianBeneficios[key]) {
                    cards[key].style="background-color: rgba(244, 69, 69, 0.604) !important";
                } else {
                    cards[key].style="background-color: #cdeabe !important";
                }
            } else {
                if (parseFloat((maxValues[key]/valores[key]).toFixed(2)) < parseFloat(medianBeneficios[key].toFixed(2))) {
                    cards[key].style="background-color: rgba(244, 69, 69, 0.604) !important";
                } else {
                    cards[key].style="background-color: #cdeabe !important";
                }
            }
        }
        coresAtualizadas = true;
    }

    medianBeneficioCpuAtual = medianBeneficios.cpu;
    medianBeneficioRamAtual = medianBeneficios.ram;
    medianBeneficioDiscoAtual = medianBeneficios.disco;

    cpuValorAtual = valores.cpu;
    ramValorAtual = valores.ram;
    discoValorAtual = valores.disco;

    medianPriceForEachCpUAtual = medianPriceForEachCpuBRL*valor;
    medianPriceForEachRamAtual = medianPriceForEachRamBRL*valor;
    medianPriceForEachDiscoAtual = medianPriceForEachDiscoBRL*valor;

    cpuEstado.innerHTML = (maxMhzCpu / valores.cpu).toFixed(2);
    ramEstado.innerHTML = (maxGbRam / valores.ram).toFixed(2);
    discoEstado.innerHTML = (maxGbDisco / valores.disco).toFixed(2);
    custoTotal.innerHTML = "$ " + valores.custoTotal.toFixed(2);

    chartRadar = graficoRadar(valores.cpu, valores.ram, valores.disco, medianPriceForEachCpUAtual, medianPriceForEachRamAtual, medianPriceForEachDiscoAtual);
    chartPizza = graficoPizza(valores.cpu, valores.ram, valores.disco);
    mudarComponente();
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



// GRÁFICOS
function garficoFunc(moeda, medidaComponente, medianaCompSelected, valorCompSelected) {
    // Gera alguns valores para x
    var valoresX = Array.from({ length: 10 }, (_, i) => i + 1);

    // Calcula os valores correspondentes de y usando a função linear
    var valoresY = valoresX.map(x => x * valorCompSelected);

    // Calcula os valores da mediana
    var valoresMediana = valoresX.map(x => x * medianaCompSelected);

    var ctx = document.getElementById('func').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: valoresX,
            datasets: [{
                label: 'Mediana dos servidores',
                data: valoresMediana,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            },
            {
                label: 'Desempenho fornecido',
                data: valoresY,
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
                        text: `${medidaComponente} fornecido`
                    }
                }
            },
            aspectRatio: 1.8
        }
    });
    return chart;
}

function graficoBarras(moeda, medidaComponente, medianaCompSelected, valorCompSelected) {
    var ctxBar = document.getElementById('barras').getContext('2d');
    var chartBarras = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Desempenho fornecido', 'Mediana dos Servidores'],
            datasets: [{
                label: `Desempenho por ${moeda} (${medidaComponente}/$)`,
                data: [valorCompSelected, medianaCompSelected],
                backgroundColor: [
                    '#8eac7e',
                    'rgba(244, 69, 69, 0.604) '
                ],
                borderColor: [
                    '#3A7D44',
                    'rgba(255, 99, 132, 1)'
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

function graficoRadar(cpuValor, ramValor, discoValor, medianPriceForEachCpUAtual, medianPriceForEachRamAtual, medianPriceForEachDiscoAtual) {
    var dados = {
        labels: ['CPU', 'RAM', 'Disco'],
        datasets: [{
            label: 'Servidor Atual',
            data: [cpuValor, ramValor, discoValor],
            backgroundColor: ['rgba(0, 128, 0, 0.2)', 'rgba(0, 128, 0, 0.2)', 'rgba(0, 128, 0, 0.2)'],
            borderColor: ['rgba(0, 128, 0, 1)', 'rgba(0, 128, 0, 1)', 'rgba(0, 128, 0, 1)'],
            borderWidth: 2,
        },
        {
            label: 'Mediana de Preços',
            data: [medianPriceForEachCpUAtual, medianPriceForEachRamAtual, medianPriceForEachDiscoAtual],
            backgroundColor: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
            borderColor: ['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 1)'],
            borderWidth: 2,
        }],
    };

    var opcoes = {
        scales: {
            r: {
                beginAtZero: true,
                ticks: {
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



// MANIPULAÇÃO DE TELAS
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