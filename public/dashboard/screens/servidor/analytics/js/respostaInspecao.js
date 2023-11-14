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
                    for(let i=0; i < res.length ; i++) {
                        reqs.innerHTML+=`                        
                        <tr>
                        <td>
                          ${res[i].motivo}
                        </td>
                        <td>
                          ${res[i].nome}
                        </td>
                        <td>
                        <a class="a-td" onclick="detalhes(${res[i].idRespostaInspecao}, '${res[i].nome}')">Acessar</a>
                        </td>
                      </tr>`
                    }
                } else {
                    alert('Erro ao solicitar a inspeção')
                }

            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}

function detalhes(resposta, respondente) {
    tela1.style.display = "none";
    tela2.style.display = "block";

    identificandoRespondente.innerHTML = `Análise fornecida por ${respondente}`
    analiseObtida.innerHTML = resposta;
}




