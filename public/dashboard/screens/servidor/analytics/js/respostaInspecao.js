nomeServ.innerHTML = sessionStorage.NOME_SERVIDOR;

buscarResposta();
function buscarResposta() {
    var servidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;


    if (servidor != "" && servidor != undefined) {
        fetch("/requisicoes/buscarRespostas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "servidor": servidor
            })
        }).then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    console.log(res)
                } else {
                    alert('Erro ao solicitar a inspeção')
                }

            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}




