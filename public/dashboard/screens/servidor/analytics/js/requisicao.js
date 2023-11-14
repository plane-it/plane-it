buscarRequisições();
function buscarRequisições() {
    var aeroporto = sessionStorage.FK_AEROPORTO;
    if (aeroporto != "" && aeroporto != undefined) {
        fetch("/requisicoes/buscarSolicitacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "aeroporto": aeroporto
            })
        }).then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    for(let i=0; i < res.length ; i++) {
                        reqs.innerHTML+=`                        
                        <tr>
                        <td>
                          ${res[i].nome}
                        </td>
                        <td>
                          ${res[i].motivo}
                        </td>
                        <td>
                          ${res[i].apelido}
                        </td>
                        <td>
                        <a class="a-td" onclick="responder(${res[i].idPedidoInspecao}, ${res[i].idServ})">Acessar</a>
                        </td>
                      </tr>`
                    }
                } else {
                    alert('Erro ao buscar as inspeções')
                }

            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}

function responder(pedido, idServ) {
    window.location="responderInspecao.html"
    localStorage.setItem("ID_SOLICITACAO", pedido);
    sessionStorage.setItem("ID_SERVIDOR_ESCOLHIDO", idServ);
}

function enviarResposta(pedido) {
    window.location="responderInspecao.html"
    localStorage.setItem("ID_SOLICITACAO", pedido);
}
