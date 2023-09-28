

async function proximo() {
  var contadorErro = 0
  var cnpj = iptCnpj.value
  var nomeEmpresa = iptNomeEmpresa.value
  
  iptNomeEmpresa.style.border = "solid 2px #000000"
  iptCnpj.style.border = "solid 2px #000000";
  
  
  if (nomeEmpresa == "") {
    contadorErro++
    iptNomeEmpresa.style.border = "solid 2px #ff0000"
  }
  
  if (cnpj == "" || cnpj.length != 14) {
    contadorErro++
    iptCnpj.style.border = "solid 2px #ff0000"
  }
  
  if (contadorErro > 0) {
    swal("Shii..", "Cheque suas informações!", "error")
  } else {
    fetch("/empresa/existe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cnpj: cnpj,
      })
    }).then((res) => res.json())
    .then((res) => {
      if(res.error != null){
        swal("ERRO",res.error, "error")
      }
      else{
        swal("Muito Bem!", "Você será redirecionado para o Login", "success");
        setTimeout(() => {
          idcontainer2.style.display = "none"
          idcontainer3.style.display = "flex"
        }, "1000")
      }
    }).catch(function (resposta) {
      swal("ERRO",res.error, "error")
    });
  }
  
}
  




function cadastrar() {
    const nomeEmpresa = iptNomeEmpresa.value
    const cnpj = iptCnpj.value 
    var cpf = iptCpf.value
    var nomeGerente = iptNomeGerente.value
    var email = iptEmail.value
    var senha = iptSenha.value
    var confirmacao = iptConfirmacao.value
    var contadorErro = 0

    iptCpf.style.border = "solid 2px #000000"
    iptNomeGerente.style.border = "solid 2px #000000";
    iptSenha.style.border = "solid 2px #000000";
    iptConfirmacao.style.border = "solid 2px #000000";
    iptEmail.style.border = "solid 2px #000000";
    
  
    if (email == "" || !email.includes("@") || !email.includes(".com")) {
      contadorErro++
      iptEmail.style.border = "solid 2px #ff0000"
    }

    if (nomeGerente == "") {
      contadorErro++
      iptNomeGerente.style.border = "solid 2px #ff0000"
    }

    if (cpf == "" || cpf.length < 11 || cpf.length > 11) {
      contadorErro++
      iptCpf.style.border = "solid 2px #ff0000"
    }
  
    if (senha == "" || senha.length < 8 || senha.length > 15) {
      contadorErro++
      iptSenha.style.border = "solid 2px #ff0000"
    }
    
    if (confirmacao == "" || confirmacao != senha) {
      contadorErro++
      iptConfirmacao.style.border = "solid 2px #ff0000"
    }

    if (contadorErro > 0) {
      swal("Ops..", "Cheque suas informações!", "error");
    } else {
      
      fetch("/empresa/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "cnpj": cnpj,
            "nomeEmpresa": nomeEmpresa,
            "cpf": cpf,
            "nomeFuncionario": nomeGerente,
            "email": email,
            "senha": senha
          })
        }).then((res) => res.json())
        .then((res) => {
          if(res.error){
            swal("ERRO", res.error, "error");
          }
          else{
            swal("Muito Bem!", "Você será redirecionado para o Login", "success");
            setTimeout(() => {
              window.location = "./login.html";
            }, "1000")
         
          }
        }).catch(function (resposta) {
          swal("ERRO",resposta.error, "error")
        });
    }
}