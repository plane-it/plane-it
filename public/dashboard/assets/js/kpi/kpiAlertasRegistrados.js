function buscarAlertas() {
    fkEmpresa = sessionStorage.FK_EMPRESA;

    
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

                for (let i = 0; i < res.length; i++) {
                    liAeroportos.innerHTML += `                      
                    <li><a onclick="selecionarAeroporto(${res[i].idAeroporto}, '${res[i].nomeAeroporto}')">${res[i].nomeAeroporto}</a></li>
                    `
                }

            }
        }).catch(function (resposta) {

        });
}