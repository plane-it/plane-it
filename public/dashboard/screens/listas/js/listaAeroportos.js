buscarAeroporto()

function buscarAeroporto() {

    fkEmpresa = sessionStorage.FK_EMPRESA

    if (fkEmpresa == "" || fkEmpresa == undefined) {
        alert("Você não esta logado!")
    } else {
        
        fetch("/aeroporto/buscarAeroporto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fkEmpresa": fkEmpresa
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {

                    console.log(res)

                    for(let i = 0; i < res.length; i++) {
                        aeroportos.innerHTML += `                      
                        <tr>
                        <td>
                          ${res[i].nome}
                        </td>
                        <td>
                          ${res[i].pais}
                        </td>
                        <td>
                          ${res[i].cidade}
                        </td>
                        <td>
                        <a class="a-td" onclick="listaServidores(${res[i].idAeroporto}, '${res[i].nome}')">Acessar</a>
                        </td>
                      </tr>`
                    }
                    
                }
            }).catch(function (resposta) {
                
            });
    }
}

function listaServidores(valor, nomeAeroporto) {
    sessionStorage.ID_AEROPORTO_SELECIONADO = valor;
    sessionStorage.NOME_AEROPORTO = nomeAeroporto;
    window.location.href="listaServidores.html";
}