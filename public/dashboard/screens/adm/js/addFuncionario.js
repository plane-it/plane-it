

buscarAeroporto()

var idAeroportoSelecionado;

function buscarAeroporto() {

    fkEmpresa = sessionStorage.FK_EMPRESA

    if (fkEmpresa == "" || fkEmpresa == undefined) {
        alert("Você não esta logado!")
    } else {
        fetch("/aeroporto/buscarAeroporto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "fkEmpresa": fkEmpresa
            })
        }).then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {
                    for (let i = 0; i < res.length; i++) {
                        console.log(res[i].idAeroporto)
                        inputAeroporto.innerHTML += `                      
                        <option value="${res[i].idAeroporto}">${res[i].nomeAeroporto}</option>
                        `
                    }

                }
            }).catch(function (resposta) {

            });
    }
}

function selecionarAeroporto(id, nome) {
    idAeroportoSelecionado = id;
    spanAeroporto.innerHTML = nome;
    confirm.log("teste")
}

function verifCampos() {
    nome = iptNome.value;
    sobrenome = iptSobrenome.value;
    cargo = iptCargo.value;
    email = iptEmail.value;
    senha = iptSenha.value;
    confirmacaoSenha = iptConfirmacaoSenha.value;
    telefone = iptTelefone.value;
    cpf = iptCPF.value;
    idCadastrador = sessionStorage.ID_COLAB;
    idEmpresa = sessionStorage.FK_EMPRESA;
    idAeroportoSelecionado = inputAeroporto.value;


    erro = false

    if (nome == undefined || nome == "") {
        iptNome.style = "border: 1px solid RED"
        erro = true;
    } else {
        iptNome.style = "border: 1px solid #DDDDDD;";
    }
    if (sobrenome == undefined || sobrenome == "") {
        iptSobrenome.style = "border: 1px solid RED"
        erro = true;
    } else {
        iptSobrenome.style = "border: 1px solid #DDDDDD;"
    }
    if (cargo == undefined || cargo == "") {
        iptCargo.style = "border: 1px solid RED"
        erro = true;
    } else {
        iptCargo.style = "border: 1px solid #DDDDD";
    }
    if (email == undefined || email == "") {
        iptEmail.style = "border: 1px solid RED"
        erro = true;
    } else {
        iptEmail.style = "border: 1px solid #DDDDD";
    }
    if (senha == undefined || senha == '') {
        iptSenha.style = "border: 1px solid RED"
        erro = true;
    } else {
        iptSenha.style = "border: 1px solid #DDDDD";
    }
    if (confirmacaoSenha == undefined || confirmacaoSenha == "") {
        iptConfirmacaoSenha.style = "border: 1px solid red"
        erro = true;
    } else {
        iptConfirmacaoSenha.style = "border: 1px solid #DDDDD";
    }
    if (confirmacaoSenha != senha) {
        iptConfirmacaoSenha.style = "border: 1px solid red;"
        iptSenha.style = "border: 1px solid red;"
        erro = true;
    } else {
        iptConfirmacaoSenha.style = "border: 1px solid #DDDDD;"
    }
    if (telefone == undefined || telefone == '') {
        iptTelefone.style = 'border: 1px solid red'
        erro = true;
    } else {
        iptTelefone.style = 'border: 1px solid #DDDDD;';
    }
    if (cpf == undefined || cpf == "") {
        iptCPF.style = 'border: 1px solid red';
        erro = true;
    } else {
        iptCPF.style = 'border: 1px solid #DDDDD;';
    }


    if (idCadastrador == undefined || idEmpresa == undefined) {
        alert("Você não esta logado!")
        window.location.href = "../../../../login.html";
        erro = true;
    }
    if (idAeroportoSelecionado == undefined) {
        console.log(idAeroportoSelecionado)
        alert("Escolha um Aéroporto!");
        // slctAero.style = 'border: 1px solid red;';
        erro = true;
    } else {
        // selctAero.style = 'border: none;'
    }
    if (erro) {
        Swal.fire({
            icon: "error",
            title: "Erro ao tentar fazer o cadastro",
            text: "Campos inválidos"
        });
    }
    if (!erro) {
        fetch("/usuarios/buscarCPF", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cpf": cpf
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {
                    if (res.length > 0) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "error",
                            title: "CPF já cadastrado!"
                        });
                        iptCPF.style = "border: 1px solid RED"
                    } else {
                        fetch("/usuarios/buscarEmail", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "email": email
                            })
                        }).then((res) => res.json())
                            .then((res) => {
                                if (res.error) {
                                    console.log(res)
                                    console.log("Aconteceu algum erro (res.error = true)")
                                }
                                else {
                                    if (res.length > 0) {
                                        const Toast = Swal.mixin({
                                            toast: true,
                                            position: "top-end",
                                            showConfirmButton: false,
                                            timer: 3000,
                                            timerProgressBar: true,
                                            didOpen: (toast) => {
                                                toast.onmouseenter = Swal.stopTimer;
                                                toast.onmouseleave = Swal.resumeTimer;
                                            }
                                        });
                                        Toast.fire({
                                            icon: "error",
                                            title: "Email já registrado!"
                                        });
                                        
                                        iptEmail.style = "border: 1px solid RED"
                                    } else {
                                        cadastrarFunc(nome, sobrenome, cargo, email, senha, telefone, cpf, idCadastrador, idAeroportoSelecionado, idEmpresa);
                                    }
                                }
                            }).catch(function (resposta) {

                            });
                    }
                }
            }).catch(function (resposta) {

            });
    }

}

function cadastrarFunc(nome, sobrenome, cargo, email, senha, telefone, cpf, idCadastrador, idAeroportoSelecionado, idEmpresa) {
    nome = nome + " " + sobrenome

    fetch("/usuarios/cadastrarFunc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "nome": nome,
            "cargo": cargo,
            "email": email,
            "senha": senha,
            "telefone": telefone,
            "cpf": cpf,
            "idCadastrador": idCadastrador,
            "idAeroporto": idAeroportoSelecionado,
            "idEmpresa": idEmpresa
        })
    }).then((res) => res.json())
        .then((res) => {
            if (res.error) {
                console.log("Aconteceu algum erro (res.error = true)")
            }
            else {
                Swal.fire({
                    title: "Usuário cadastrado",
                    icon: "success"
                });
                iptNome.value = "";
                iptSobrenome.value = "";
                iptCargo.value = "";
                iptEmail.value = "";
                iptSenha.value = "";
                iptConfirmacaoSenha.value = "";
                iptTelefone.value = "";
                iptCPF.value = "";
            }
        }).catch(function (resposta) {

        });
}

