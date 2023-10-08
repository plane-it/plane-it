buscarFunc();

function buscarFunc() {
    fkEmpresa = sessionStorage.FK_EMPRESA


    if (fkEmpresa == "" || fkEmpresa == undefined) {
        alert("Você não esta logado!")
    } else {
        fetch("/usuarios/buscarFunc", {
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
                    console.log(res);
                    console.log(res[1].nome)

                    for(let i = 0; i < res.length; i++) {
                        funcs.innerHTML += `                      
                        <tr>
                        <td>
                          ${res[i].nome}
                        </td>
                        <td>
                          ${res[i].cargo}
                        </td>
                        <td>
                          ${res[i].aeroporto}
                        </td>
                      </tr>`
                    }
                    
                }
            }).catch(function (resposta) {
                
            });
    }
}