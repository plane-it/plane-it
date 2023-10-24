
buscarEspecificacoes();

function buscarEspecificacoes() {

    fkServidor = sessionStorage.ID_SERVIDOR_ESCOLHIDO;

    if (fkServidor == "" || fkServidor == undefined) {
        alert("Servidor não encontrado!")
    } else {
        fetch("/componente/buscarEspecificacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fkServidor": fkServidor
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {

                    for (let i = 0; i < res.length; i++) {
                        if (res[i].tipo == 1 && res[i].fkUnidadeMedida == 1) {
                            cpuModelo.innerHTML = res[i].modelo;
                            cpuPreco.innerHTML = 'R$: ';
                            cpuPreco.innerHTML += res[i].preco;
                            cpuTemp.innerHTML = res[i].valor;
                            cpuTemp.innerHTML += res[i].sinal;
                        } else if (res[i].tipo == 1 && res[i].fkUnidadeMedida == 4) {
                            cpuFreq.innerHTML = res[i].valor;
                            cpuFreq.innerHTML += res[i].sinal;
                        } else if (res[i].tipo == 2) {
                            ramModelo.innerHTML = res[i].modelo;
                            ramPreco.innerHTML = 'R$: ';
                            ramPreco.innerHTML += res[i].preco;
                            ramLimite.innerHTML = res[i].valor;
                            ramLimite.innerHTML += res[i].sinal;
                        } else if (res[i].tipo == 3) {
                            discoModelo.innerHTML = res[i].modelo;
                            discoPreco.innerHTML = 'R$: ';
                            discoPreco.innerHTML += res[i].preco;
                            discoLimite.innerHTML = res[i].valor;
                            discoLimite.innerHTML += res[i].sinal;
                        }
                        
                    }
                    console.log(res)
                }
            }).catch(function (resposta) {

            });
    }
}