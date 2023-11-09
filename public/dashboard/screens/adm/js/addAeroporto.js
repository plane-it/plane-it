function cadastrarAeroporto(){
    var nomeAeroportoVar = ipt_nomeAeroporto.value;
    var paisVar = ipt_pais.value;
    var cidadeVar = ipt_cidade.value;
    var enderecoVar = ipt_endereco.value;
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;

    if (nomeAeroportoVar == undefined || nomeAeroportoVar == ''){
        Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: "O nome do aeroporto está inválido"
        })
    } else if(paisVar == undefined || paisVar == ''){
        Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: "O nome do país está inválido"
        });
    } else if(cidadeVar == undefined || cidadeVar == ''){
        Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: "O nome da cidade está inválido"
        });
    } else if(enderecoVar == undefined || enderecoVar == ''){
        Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: "O endereço está inválido"
        });
    } else if(fkEmpresaVar == undefined || fkEmpresaVar == ''){
        Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: "O nome da empresa está inválido"
        });
    } else{
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
        }).then(function(resposta) {
            if(resposta.ok){

                
                
                // ipt_nomeAeroporto.value = '';
                // ipt_pais.value = '';
                // ipt_cidade.value = '';
                // ipt_endereco.value = '';
                Swal.fire({
                    title: "Cadastro realizado com sucesso!",
                    icon: "success"
                });
            }
        }).catch(function (resposta){
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