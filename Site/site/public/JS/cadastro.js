function cadastrar() {
  
    var cnpj = iptCnpj.value
    var nomeEmpresa = iptNomeEmpresa.value
    var nomeGerente = iptNomeGerente.value
    var email = iptEmail.value
    var tel = iptTel.value
    var senha = iptSenha.value
    var confirmacao = iptConfirmacao.value
    var erro = false
    var contadorErro = 0

    iptNomeEmpresa.style.border = "solid 2px #000000"
    iptCnpj.style.border = "solid 2px #000000";
    iptNomeGerente.style.border = "solid 2px #000000";
    iptEmail.style.border = "solid 2px #000000";
    iptTel.style.border = "solid 2px #000000";
    iptSenha.style.border = "solid 2px #000000";
    iptConfirmacao.style.border = "solid 2px #000000";

    if (nomeEmpresa == "") {
      erro = true;
      contadorErro++
      iptNomeEmpresa.style.border = "solid 2px #ff0000"
    }

    if (cnpj == "" || cnpj.length > 14 || cnpj.length < 13) {
        erro = true
        contadorErro++
        iptCnpj.style.border = "solid 2px #ff0000"
    }

    if (nomeGerente == "") {
        erro = true
        contadorErro++
        iptNomeGerente.style.border = "solid 2px #ff0000"
    }

    if (email == "" || !email.includes("@") || !email.includes(".com")) {
      erro = true
      contadorErro++
      iptEmail.style.border = "solid 2px #ff0000"
    }
  
  if (tel == "" || tel.length != 11) {
    erro = true
    contadorErro++
    iptTel.style.border = "solid 2px #ff0000"
  }

if (senha == "" || senha.length < 8) {
        erro = true
        contadorErro++
        iptSenha.style.border = "solid 2px #ff0000"
      }
    
    if (confirmacao == "" || confirmacao != senha) {
        erro = true
        contadorErro++
        iptConfirmacao.style.border = "solid 2px #ff0000"
    }

    if (contadorErro <= 7 && contadorErro >= 1) {
      swal("Shii..", "Cheque suas informações!", "error");
    } else if (contadorErro == 0) {
      swal("Muito Bem!", "Você será redirecionado para o Login", "success");
      fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              // crie um atributo que recebe o valor recuperado aqui
              // Agora vá para o arquivo routes/usuario.js
              cnpjServer: cnpj,
              nomeServer: nomeGerente,
              telServer: tel,
              nomeEmpresaServer: nomeEmpresa,
              emailServer: email,
              senhaServer: senha,
              confirmacaoServer: confirmacao,
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