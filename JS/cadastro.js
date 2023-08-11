function cadastrar() {
    var cnpj = iptCnpj.value
    var nome = iptNome.value
    var senha = iptSenha.value
    var confirmacao = iptConfirmacao.value

    iptCnpj.style.border = "solid 2px #000000";
    iptNome.style.border = "solid 2px #000000";
    iptSenha.style.border = "solid 2px #000000";
    iptConfirmacao.style.border = "solid 2px #000000";

    if (cnpj == "") {
        erro = true
        iptCnpj.style.border = "solid 2px #ff0000"
        spanCnpj.style.display = "block"
    } else {
        spanCnpj.style.display = "none"
    }

    if (nome == "") {
        erro = true
        iptNome.style.border = "solid 2px #ff0000"
        spanNome.style.display = "block"
    } else {
        spanNome.style.display = "none"
    }

    if (senha == "") {
        erro = true
        iptSenha.style.border = "solid 2px #ff0000"
        spanSenha.style.display = "block"
    } else {
        spanSenha.style.display = "none"
    }

    if (confirmacao == "") {
        erro = true
        iptConfirmacao.style.border = "solid 2px #ff0000"
        spanConfirmacao.style.display = "block"
    } else {
        spanConfirmacao.style.display = "none"
    }


}