nomeServ.innerHTML = "Análise de " + sessionStorage.NOME_SERVIDOR;

buscarMoedas();
garficoFunc("BRL");
graficoBarras("BRL");

var chartFunc;
var chartBarras;

document.getElementById('slctMoeda').addEventListener('change', function() {
    var selectedOption = this.options[this.selectedIndex];
    var currencyName = selectedOption.getAttribute('data-currency-name');
    atualizarMoeda(currencyName);
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
function atualizarMoeda(moeda) {
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
    chartFunc = garficoFunc(moeda);
    chartBarras = graficoBarras(moeda);
}

function garficoFunc(moeda) {
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
function graficoBarras(moeda) {
    var ctx = document.getElementById('barras').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CPU Específica', 'Mediana dos Servidores'],
            datasets: [{
                label: `Desempenho por ${moeda} (MHz/$)`,
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
                        text: 'Desempenho fornecido (MHz/$)'
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

