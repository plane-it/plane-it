var sinalizados = [];
var idCpu;
var idRam;
var idDisco;

window.onload = function () {
    document.getElementById('chckCpu').checked = false;
    document.getElementById('chckRam').checked = false;
    document.getElementById('chckDisco').checked = false;

    iptMotivoCpu.value = '--';
    iptMotivoCpu.disabled = true;
    iptMotivoRam.value = '--';
    iptMotivoRam.disabled = true;
    iptMotivoDisco.value = '--';
    iptMotivoDisco.disabled = true;
    iptDescricao.value = '';
};

document.getElementById('chckCpu').addEventListener('change', function () {
    var iptMotivoCpu = document.getElementById('iptMotivoCpu');
    iptMotivoCpu.disabled = !this.checked;
    if (!this.checked) {
        iptMotivoCpu.value = '--';
        sinalizados[1] = '--'
    } else {
        iptMotivoCpu.value = '';
        sinalizados[1] = 'cpu'
    }
});

document.getElementById('chckRam').addEventListener('change', function () {
    var iptMotivoRam = document.getElementById('iptMotivoRam');
    iptMotivoRam.disabled = !this.checked;
    if (!this.checked) {
        iptMotivoRam.value = '--';
        sinalizados[2] = '--';
    } else {
        iptMotivoRam.value = '';
        sinalizados[2] = 'ram';
    }
});

document.getElementById('chckDisco').addEventListener('change', function () {
    var iptMotivoDisco = document.getElementById('iptMotivoDisco');
    iptMotivoDisco.disabled = !this.checked;
    if (!this.checked) {
        iptMotivoDisco.value = '--';
        sinalizados[3] = '--'
    } else {
        iptMotivoDisco.value = '';
        sinalizados[3] = 'disco'
    }
});

buscarIdComps();

function buscarIdComps() {
    let servidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;

    if (servidor != "" && servidor != undefined) {
        fetch("/componente/buscarComponentes", {
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
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].fktipoComponente == 1) {
                            idCpu = res[i].idComp
                        } else if (res[i].fktipoComponente == 2) {
                            idRam = res[i].idComp
                        } else if (res[i].fktipoComponente == 3) {
                            idDisco = res[i].idComp
                        }
                    }
                } else {
                    Swal.fire("Erro!", "Componentes não encontrados", "error");
                }
            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}

async function enviar() {
    var pedido = localStorage.ID_SOLICITACAO;
    var resposta = iptDescricao.value;
    var respondente = sessionStorage.ID_COLAB;

    if (sinalizados[1] == 'cpu' && (iptMotivoCpu == undefined || iptMotivoCpu == '')) {
        Swal.fire("Atenção!", "Favor insira um motivo!", "warning");
        return;
    }
    if (sinalizados[2] == 'ram' && (iptMotivoRam == undefined || iptMotivoRam == '')) {
        Swal.fire("Atenção!", "Favor insira um motivo!", "warning");
        return;
    }
    if (sinalizados[3] == 'disco' && (iptMotivoDisco == undefined || iptMotivoDisco == '')) {
        Swal.fire("Atenção!", "Favor insira um motivo!", "warning");
        return;
    }

    if (pedido != "" && pedido != undefined && resposta != "" && resposta != undefined && respondente != "" && respondente != undefined) {
        fetch("/requisicoes/enviarResposta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "pedido": pedido,
                "resposta": resposta,
                "respondente": respondente
            })
        }).then((res) => res.json())
            .then(async (res) => {
                if (!res.error) {
                    idResposta = res[0].idRespostaInspecao;

                    let promises = [];

                    if (sinalizados[1] == 'cpu') {
                        if (idCpu != undefined && idCpu != '') {
                            promises.push(enviarSinalizado(idCpu, iptMotivoCpu.value, idResposta));
                        } else {
                            Swal.fire("Erro!", "Cpu não encontrada", "error");
                            return;
                        }
                    }
                    if (sinalizados[2] == 'ram') {
                        if (idRam != undefined && idRam != '') {
                            promises.push(enviarSinalizado(idRam, iptMotivoRam.value, idResposta));
                        } else {
                            Swal.fire("Erro!", "Memória RAM não encontrada", "error");
                            return;
                        }
                    }
                    if (sinalizados[3] == 'disco') {
                        if (idDisco != undefined && idDisco != '') {
                            promises.push(enviarSinalizado(idDisco, iptMotivoDisco.value, idResposta));
                        } else {
                            Swal.fire("Erro!", "Disco não encontrado", "error");
                            return;
                        }
                    }

                    Promise.all(promises)
                        .then(() =>
                            Swal.fire("Sucesso!", "Componentes sinalizados, resposta enviada!", "success")
                            .then(() => {
                                // Redirecionar para a página inspecao.html
                                window.location.href = 'requisicao.html';
                            })
                        )

                        .catch((error) => {
                            console.error("Error:", error);
                            Swal.fire("Erro!", "Ocorreu um erro ao processar os sinais", "error");
                        });
                } else {
                    Swal.fire("Erro!", "Erro ao buscar as inspeções", "error");
                }
            }).catch(function (error) {
                console.error("Error:", error);
                Swal.fire("Erro!", "Ocorreu um erro ao enviar a resposta", "error");
            });
    } else {
        Swal.fire("Atenção!", "Parâmetros faltando", "warning");
    }
}

function enviarSinalizado(idComp, motivo, idResposta) {
    return new Promise((resolve, reject) => {
        fetch("/requisicoes/sianlizar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idComp: idComp,
                motivo: motivo,
                idResposta: idResposta
            })
        }).then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    resolve(res);
                } else {
                    reject(res.error);
                }
            }).catch(function (error) {
                console.error( error);
                reject(error);
            });
    });
}

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
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].idPedidoInspecao == localStorage.ID_SOLICITACAO) {
                            pDescricao.innerHTML = res[i].descricao;
                            h5Quem.innerHTML = `O que foi relatado por ${res[i].nome}`;
                        }
                    }
                } else {
                    Swal.fire("Erro!", "Erro ao buscar as inspeções", "error");
                }
            }).catch(function (error) {
                console.error("Error:", error);
            });
    }
}

