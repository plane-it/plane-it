var cnpj = ""
var nomeEmpresa = ""
var email = ""


function proximo() {
  var contadorErro = 0
  
  nomeEmpresa = iptNomeEmpresa.value
  cnpj = iptCnpj.value
  email = iptEmail.value
  
  
  iptNomeEmpresa.style.border = "solid 2px #000000"
  iptCnpj.style.border = "solid 2px #000000";
  iptEmail.style.border = "solid 2px #000000";
  
  if (email == "" || !email.includes("@") || !email.includes(".com")) {
    contadorErro++
    iptEmail.style.border = "solid 2px #ff0000"
  }

  if (nomeEmpresa == "") {
    contadorErro++
    iptNomeEmpresa.style.border = "solid 2px #ff0000"
  }
  
  if (cnpj == "" || cnpj.length > 14 || cnpj.length < 13) {
    contadorErro++
    iptCnpj.style.border = "solid 2px #ff0000"
  }
  
  if (contadorErro <= 3 && contadorErro >=1) {
    swal("Shii..", "Cheque suas informações!", "error")
  } else if (contadorErro == 0) {
    swal("Muito Bem!", "Você será redirecionado ao próximo passo!", "success");
    idcontainer2.style.display = "none"
    idcontainer3.style.display = "flex"
  }

}


function cadastrar() {

    console.log(nomeEmpresa, email, cnpj)
    var cnpjNew = cnpj
    var nomeEmpresaNew = nomeEmpresa
    var emailNew = email
    var cpf = iptCpf.value
    var nomeGerente = iptNomeGerente.value
    var tel = iptTel.value
    var senha = iptSenha.value
    var confirmacao = iptConfirmacao.value
    var contadorErro = 0

    iptCpf.style.border = "solid 2px #000000"
    iptNomeGerente.style.border = "solid 2px #000000";
    iptTel.style.border = "solid 2px #000000";
    iptSenha.style.border = "solid 2px #000000";
    iptConfirmacao.style.border = "solid 2px #000000";

    

    if (nomeGerente == "") {
      contadorErro++
      iptNomeGerente.style.border = "solid 2px #ff0000"
    }

    if (cpf == "" || cpf.length < 11 || cpf.length > 11) {
      contadorErro++
      iptCpf.style.border = "solid 2px #ff0000"
    }
  
    if (tel == "" || tel.length != 11) {
      contadorErro++
      iptTel.style.border = "solid 2px #ff0000"
    }

    if (senha == "" || senha.length < 8) {
      contadorErro++
      iptSenha.style.border = "solid 2px #ff0000"
    }
    
    if (confirmacao == "" || confirmacao != senha) {
      contadorErro++
      iptConfirmacao.style.border = "solid 2px #ff0000"
    }

    if (contadorErro <= 5 && contadorErro >= 1) {
      swal("Shii..", "Cheque suas informações!", "error");
    } else if (contadorErro == 0) {
      swal("Muito Bem!", "Você será redirecionado para o Login", "success");
      console.table({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        cpfServer: cpf,
        cnpjServer: cnpjNew,
        nomeServer: nomeGerente,
        telServer: tel,
        nomeEmpresaServer: nomeEmpresaNew,
        emailServer: emailNew,
        senhaServer: senha,
        confirmacaoServer: confirmacao,
      })
      fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              // crie um atributo que recebe o valor recuperado aqui
              // Agora vá para o arquivo routes/usuario.js
              cpfServer: cpf,
              cnpjServer: cnpjNew,
              nomeGerenteServer: nomeGerente,
              telServer: tel,
              nomeEmpresaServer: nomeEmpresaNew,
              emailServer: emailNew,
              senhaServer: senha,
              confirmacaoServer: confirmacao
            })
          }).then(function (resposta) {
      
            console.log("resposta: ", resposta);
      
            if (resposta.ok) {
      
              setTimeout(() => {
                window.location = "./login.html";
              }, "1000")
              
            } else {
              throw ("Houve um erro ao tentar realizar o cadastro!");
            }
          }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
          });
          
          return false;
          
        }
}