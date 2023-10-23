function cadastrarAeroporto(){
    var nomeAeroportoVar = ipt_nomeAeroporto.value;
    var paisVar = ipt_pais.value;
    var cidadeVar = ipt_cidade.value;
    var enderecoVar = ipt_endereco.value;
    var fkEmpresaVar = sessionStorage.FK_EMPRESA;

    if (nomeAeroportoVar == undefined){
        alert("O nome do aeroporto não pode estar vazio")
    } else if(paisVar == undefined){
        alert("O nome do país não pode estar vazio")
    } else if(cidadeVar == undefined){
        alert("O nome da cidade não pode estar vazio")
    } else if(enderecoVar == undefined){
        alert("O nome do endereço não pode estar vazio")
    } else if(fkEmpresaVar == undefined){
        alert("O nome da empresa não pode estar vazio")
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
                location.reload();
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