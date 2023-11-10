function cadastrarAeroporto() {
    var nomeAeroportoVar = ipt_nomeAeroporto.value;
    var paisVar = ipt_pais.value;
    var cidadeVar = ipt_cidade.value;
    var enderecoVar = ipt_endereco.value;
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;
    var erro = false;


    if (nomeAeroportoVar == undefined || nomeAeroportoVar == '') {
        ipt_nomeAeroporto.style = "border: 1px solid RED"
        erro = true;
    } else {
        ipt_nomeAeroporto.style = "border: 1px solid #DDDDDD;";
    }

    if (paisVar == undefined || paisVar == '') {
        ipt_pais.style = "border: 1px solid RED"
        erro = true;
    } else {
        ipt_pais.style = "border: 1px solid #DDDDDD;";
    }

    if (cidadeVar == undefined || cidadeVar == '') {
        ipt_cidade.style = "border: 1px solid RED"
        erro = true;
    } else {
        ipt_cidade.style = "border: 1px solid #DDDDDD;";
    }
    if (enderecoVar == undefined || enderecoVar == '') {
        ipt_endereco.style = "border: 1px solid RED"
        erro = true;
    } else {
        ipt_cidade.style = "border: 1px solid #DDDDDD;";
    }

    if (erro) {
        Swal.fire({
            icon: "error",
            title: "Erro no cadastrado",
            text: "Campos invalidos"
        });
    } else {
        fetch(`/aeroporto/cadastrarAeroporto`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeAeroportoServer: nomeAeroportoVar,
                paisServer: paisVar,
                cidadeServer: cidadeVar,
                enderecoServer: enderecoVar,
                fkEmpresaServer: fkEmpresaVar
            })
        }).then(function (resposta) {
            if (resposta.ok) {

                Swal.fire({
                    title: "Cadastro realizado com sucesso!",
                    icon: "success"
                });
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`)
        });
    }
    return false;
}

function pegarDadosEmpresa() {

    idUsuario = sessionStorage.ID_COLAB;

    fetch(`/aeroporto/pegarDadosEmpresa/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {

                vazio.textContent = "Nenhum resultado encontrado."
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {


                ipt_empresa.value = resposta[0].nomeEmpresa;

                respostas = resposta[0];

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}