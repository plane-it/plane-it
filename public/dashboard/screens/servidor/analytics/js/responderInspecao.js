document.getElementById('chckCpu').addEventListener('change', function() {
    var iptMotivoCpu = document.getElementById('iptMotivoCpu');
    iptMotivoCpu.disabled = !this.checked;
    if (!this.checked) {
        iptMotivoCpu.value = '--';
    } else {
        iptMotivoCpu.value = '';
    }
});

document.getElementById('chckRam').addEventListener('change', function() {
    var iptMotivoRam = document.getElementById('iptMotivoRam');
    iptMotivoRam.disabled = !this.checked;
    if (!this.checked) {
        iptMotivoRam.value = '--';
    } else {
        iptMotivoRam.value = '';
    }
});

document.getElementById('chckDisco').addEventListener('change', function() {
    var iptMotivoDisco = document.getElementById('iptMotivoDisco');
    iptMotivoDisco.disabled = !this.checked;
    if (!this.checked) {
        iptMotivoDisco.value = '--';
    } else {
        iptMotivoDisco.value = '';

    }
});

function enviar() {
    alert("fui")
    var pedido = localStorage.ID_SOLICITACAO;
    var resposta = iptDescricao.value;
    var respondente = sessionStorage.ID_COLAB;
    alert(pedido)
    alert(resposta)
    alert(respondente)

    if (pedido != "" && pedido != undefined && resposta != "" && resposta != undefined && respondente != "" && respondente!= undefined) {
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
            .then((res) => {
                if (!res.error) {
                    alert("Solicitação atualizada com sucesso!");
                } else {
                    alert('Erro ao buscar as inspeções')
                }

            }).catch(function (error) {
                console.error("Error:", error);
            });
    } else {
        alert("Parametros faltando");
    }
}