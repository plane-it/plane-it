nomeServ.innerHTML = "Análises";
apresentacaoServers.innerHTML = "Histórico de análises realizadas para o " + sessionStorage.NOME_SERVIDOR;
voltar.href = 'custoBeneficio.html';

var idRespostaBackup;

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
                    for (let i = 0; i < res.length; i++) {
                        reqs.innerHTML += `                        
                        <tr>
                        <td>
                          ${res[i].motivo}
                        </td>
                        <td>
                          ${res[i].nome}
                        </td>
                        <td>
                        <a class="a-td" onclick="detalhes(${res[i].idRespostaInspecao}, '${res[i].nome}', '${res[i].resposta}')">Acessar</a>
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

function buscarSinalizados(idResposta) {
    idRespostaBackup = idResposta;
    if (idResposta != "" && idResposta != undefined) {
        fetch("/requisicoes/buscarSinalizados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "idResposta": idResposta
            })
        }).then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    for (let i = 0; i < res.length; i++) {
                        comps.innerHTML += `                        
                        <tr>
                        <td>
                          ${res[i].tipo}
                        </td>
                        <td>
                          ${res[i].nome}
                        </td>
                        <td>
                        ${res[i].motivo}
                        </td>
                        <td>
                        <a class="a-td" onclick="revogar(${res[i].fkRespostaInspecao}, ${res[i].fkComponente})">Revogar</a>
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

function detalhes(id, respondente, resposta) {
    tela1.style.display = "none";
    tela2.style.display = "block";

    identificandoRespondente.innerHTML = `Análise fornecida por ${respondente}`
    analiseObtida.innerHTML = resposta;
    buscarSinalizados(id)
}

function confirmarRevog(tipo) {
    if (tipo == 1) {
        return Swal.fire({
            title: 'Confirmação',
            text: "Você deseja revogar esta sinalização?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'rgba(244, 69, 69, 1)',
            confirmButtonText: 'Sim, revogar',
            confirmButtonColor: '#254D32',
            iconColor: 'rgba(244, 69, 69, 1)'
        }).then((result) => {
            return Promise.resolve(result.isConfirmed);
        })
    } else {
        return Swal.fire({
            title: 'Confirmação',
            text: "Você deseja excluir esta solicitação?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'rgba(244, 69, 69, 1)',
            confirmButtonText: 'Sim, excluir',
            confirmButtonColor: '#254D32',
            iconColor: 'rgba(244, 69, 69, 1)'
        }).then((result) => {
            return Promise.resolve(result.isConfirmed);
        })
    }

}

async function revogar(idResposta, idComponente) {
    var validou = await confirmarRevog(1);

    if (validou) {
        if (idResposta != "" && idResposta != undefined && idComponente != "" && idComponente != undefined) {
            fetch("/requisicoes/revogarSinalizacao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "idResposta": idResposta,
                    "idComponente": idComponente
                })
            }).then((res) => res.json())
                .then((res) => {
                    if (!res.error) {
                        Swal.fire({
                            title: 'Muito bem!',
                            text: "Sinalização revogada com sucesso!",
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#254D32',
                            iconColor: '#254D32'
                        }).then(() =>
                            comps.innerHTML = `
                        <tr>
                            <th>
                            Tipo
                            </th>
                             <th>
                            Nome
                            </th>
                            <th>
                            Motivo
                            </th>
                            <th>
                            Opção
                            </th>
                            </tr>`
                        ).then(() =>
                            buscarSinalizados(idRespostaBackup)
                        )
                    } else {
                        alert('Erro ao revogar')
                    }

                }).catch(function (error) {
                    console.error("Error:", error);
                });
        }
    }

}






