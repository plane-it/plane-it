function cpuMain(){
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
ctx = document.getElementById('chartHours').getContext("2d");
    var dados = [];
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

}