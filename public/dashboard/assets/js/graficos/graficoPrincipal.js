function cpuMain(){
    fetch("/dadosCpu/capturar",{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(resposta){
        if(resposta.ok){
            response.json().then(function(resposta){
                console.log(`${JSON.stringify(resposta)}`);
            })
            
        }else{
            console.error()
        }
    })
}