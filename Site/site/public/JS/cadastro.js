function cadastrar() {
  
  var cnpj = iptCnpj.value
    var nome = iptNome.value
    var email = iptEmail.value
    var tel = iptTel.value
    var senha = iptSenha.value
    var confirmacao = iptConfirmacao.value
    var erro = false
    var contadorErro = 0

    iptCnpj.style.border = "solid 2px #000000";
    iptNome.style.border = "solid 2px #000000";
    iptEmail.style.border = "solid 2px #000000";
    iptTel.style.border = "solid 2px #000000";
    iptSenha.style.border = "solid 2px #000000";
    iptConfirmacao.style.border = "solid 2px #000000";

    if (cnpj == "" || cnpj.length > 14 || cnpj.length < 13) {
        erro = true
        contadorErro++
        iptCnpj.style.border = "solid 2px #ff0000"
        // spanCnpj.style.display = "block"
    } else {
      // spanCnpj.style.display = "none"
    }

    if (nome == "") {
        erro = true
        contadorErro++
        iptNome.style.border = "solid 2px #ff0000"
        // spanNome.style.display = "block"
    } else {
        // spanNome.style.display = "none"
    }

    if (email == "" || !email.includes("@") || !email.includes(".com")) {
      erro = true
      contadorErro++
      iptEmail.style.border = "solid 2px #ff0000"
      // spanEmail.style.display = "block"
  } else {
    // spanEmail.style.display = "none"
  }
  
  if (tel == "" || tel.length == 0) {
    erro = true
    contadorErro++
    iptTel.style.border = "solid 2px #ff0000"
    // spanTel.style.display = "block"
} else {
  // spanTel.style.display = "none"
}

if (senha == "" || senha.length < 8) {
        erro = true
        contadorErro++
        iptSenha.style.border = "solid 2px #ff0000"
        // spanSenha.style.display = "block"
    } else {
      // spanSenha.style.display = "none"
    }
    
    if (confirmacao == "" || confirmacao != senha) {
        erro = true
        contadorErro++
        iptConfirmacao.style.border = "solid 2px #ff0000"
        // spanConfirmacao.style.display = "block"
      } else {
        // spanConfirmacao.style.display = "none"
    }

    if (contadorErro <= 6 && contadorErro >= 1) {
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
              nomeServer: nome,
              emailServer: email,
              telServer: tel,
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