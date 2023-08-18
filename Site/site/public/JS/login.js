function entrar() {
    var cnpj = iptCnpj.value
    var senha = iptSenha.value
    var contadorErro = 0
    var erro = false

    iptCnpj.style.border = "solid 2px #000000";
    iptSenha.style.border = "solid 2px #000000";

    if (cnpj == "" || cnpj.length > 14 || cnpj.length < 13) {
        erro = true
        iptCnpj.style.border = "solid 2px #ff0000"
        contadorErro++
        // spanCnpj.style.display = "block"
    } else {
        // spanCnpj.style.display = "none"
    }

    if (senha == "" || senha.length < 8) {
        erro = true
        contadorErro++
        iptSenha.style.border = "solid 2px #ff0000"
        // spanSenha.style.display = "block"
    } else {
        // spanSenha.style.display = "none"
    }

    if (contadorErro == 2 || contadorErro == 1) {
      swal("Shii..", "Cheque suas informações!", "error");
    } else if (contadorErro == 0) {
      swal("Muito Bem!", "Seja Bem-Vindo!", "success");
        fetch("/usuarios/entrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              // crie um atributo que recebe o valor recuperado aqui
              // Agora vá para o arquivo routes/usuario.js
              cnpjServer: cnpj,
              senhaServer: senha,
            })
          }).then(function (respostas) {
      
            console.log("respostas: ", respostas);
      
            if (respostas.ok) {
      
              setTimeout(() => {
                window.location = "./cadastro.html";
              }, "1000")
      
            } else {
              alert ("Houve um erro ao tentar realizar o login!");
            }
          }).catch(function (respostas) {
            console.log(`#ERRO: ${respostas}`);
          });
      
          return false;
      
        }


}