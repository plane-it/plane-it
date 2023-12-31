
localStorage.removeItem('ID_SOLICITACAO')

buscarServidor();


if (sessionStorage.ADM == 0) {
    apresentacaoServers.innerHTML = "Lista de servidores"
} else {
    apresentacaoServers.innerHTML = `Lista de servidores de ${sessionStorage.NOME_AEROPORTO}`
}

function buscarServidor() {
    if (sessionStorage.ADM == 0) {
        fkAeroporto = sessionStorage.FK_AEROPORTO;
    } else {
        fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO;
    }

    if (fkAeroporto == "" || fkAeroporto == undefined) {
        alert("Você não esta logado!")
    } else {
        fetch("/servidor/buscarServidor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fkAeroporto": fkAeroporto
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {
                    console.log(res)
                    

                    for(let i = 0; i < res.length; i++) {
                        servers.innerHTML += `                      
                        <tr>
                        <td>
                          ${res[i].apelido}
                        </td>
                        <td>
                          ${res[i].funcao}
                        </td>
                        <td>
                          ${res[i].codAutentic}
                        </td>
                        <td>
                        <a class="a-td" onclick="acessarServidor(${res[i].idServ}, '${res[i].apelido}')">Acessar</a>
                        </td>
                      </tr>`
                    }
                    
                }
            }).catch(function (resposta) {
                
            });
    }
}



function acessarServidor(valor, nome) {
    sessionStorage.setItem('ID_SERVIDOR_ESCOLHIDO', valor);
    sessionStorage.setItem('NOME_SERVIDOR', nome);
    window.location.href="../servidor/principalDash.html";
}