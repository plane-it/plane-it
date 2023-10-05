function entrar() {
    var cpf = iptCpf.value
    var senha = iptSenha.value
    var contadorErro = 0

    iptCpf.style.border = "solid 2px #000000";
    iptSenha.style.border = "solid 2px #000000";

    if (cpf == "" || cpf.length > 11 || cpf.length <= 10) {
        iptCpf.style.border = "solid 2px #ff0000"
        contadorErro++
        // spancpf.style.display = "block"
    } else {
        // spancpf.style.display = "none"
    }

    if (senha == "" || senha.length < 8) {
        contadorErro++
        iptSenha.style.border = "solid 2px #ff0000"
    }
    
    if (contadorErro > 0) {
      Swal.fire("Ops..", "Cheque suas informações!", "error");
    } else {
        fetch("/usuarios/entrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              cpf: cpf,
              senha: senha,
            })
          }).then(res => res.json())
          .then((res) => {
           if (res.error) {
              Swal.fire("ERRO",res.error, "error")
           }
           else{
                Swal.fire("Muito Bem!", "Seja Bem-Vindo!", "success");
                setTimeout(() => {
                      window.location = "../dashboard/screens/index.html";
                }, "1000")
            }
          }).catch(function (res) {
              Swal.fire("ERRO",res.error, "error")
          });
        }
}