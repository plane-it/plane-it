buscarServidor();

apresentacaoServers.innerHTML+= `${sessionStorage.NOME_AEROPORTO}`

function buscarServidor() {
    fkAeroporto = sessionStorage.ID_AEROPORTO_SELECIONADO


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
                          ${res[i].ultimaManutencao}
                        </td>
                        <td>
                        <a class="a-td" onclick="acessarServidor(${res[i].idServ})">Acessar</a>
                        </td>
                      </tr>`
                    }
                    
                }
            }).catch(function (resposta) {
                
            });
    }
}

function acessarServidor(valor) {
    sessionStorage.setItem('ID_SERVIDOR_ESCOLHIDO', valor);
    window.location.href="../servidor/principalDash.html";
}