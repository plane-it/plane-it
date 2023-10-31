function pegarDadosCpu(){
//Coletando dados do banco
    fetch("/dadosCpu/capturar",{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(resposta){
        if(resposta.ok){
            response.json().then(function(resposta){
                console.log(`${JSON.stringify(resposta)}`);
                gerarGraficoCpu(resposta);
            }) 
        }else{
            console.error()
        }
    })
}

function gerarGraficoCpu(resposta){
//Montando o grafico com os dados
ctx = document.getElementById('analiseCPU').getContext("2d");
    var dados = [];
    for(i = 0; i < resposta.length; i++){
        var registro = resposta[i];
        dados.push(registro)
        }
    var info = {
        labels: dados,
        datasets: [{
            label: 'Dados CPU',
            data: [],
            fill: false,
            borderColor: "rgb(75,190,190)",
            tension: 0.1
        }]
    };
    var config = {
        type: 'line',
        data: info,
    }
    var myChart = new Chart(ctx,{
    info,
    config,
    });

}