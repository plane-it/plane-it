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
                if (res.error) {
                    console.log("Aconteceu algum erro (res.error = true)")
                }
                else {


                    console.log(res)

                    for (let i = 0; i < res.length; i++) {
                        liAeroportos.innerHTML += `                      
                        <li><a onclick="selecionarAeroporto(${res[i].idAeroporto}, '${res[i].nome}')">${res[i].nome}</a></li>
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
    liAeroportos.style.visibility = "hidden";
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
    idAeroportoSelecionado = idAeroportoSelecionado;
    

    erro = false

    if (nome == undefined || nome == "") {
        alert('Preencha o campo Nome');
        iptNome.style = "border: 1px solid RED"
        erro = true;
    } else {
        iptNome.style = "border: 1px solid #DDDDDD;";
    }
    if (sobrenome == undefined || sobrenome == "") {
        alert('Preencha o campo Sobrenome')
        iptSobrenome.style = "border: 1px solid RED"
        erro = true;
    } else {
        iptSobrenome.style = "border: 1px solid #DDDDDD;"
    }
    if (cargo == undefined || cargo == "") {
        alert('Preencha o campo Cargo')
        iptCargo.style = "border: 1px solid RED"
        erro=true;
    } else {
        iptCargo.style = "border: 1px solid #DDDDD";
    }
    if (email == undefined || email == "") {
        alert('Preencha o campo Email')
        iptEmail.style = "border: 1px solid RED"
        erro=true;
    } else {
        iptEmail.style = "border: 1px solid #DDDDD";
    }
    if (senha == undefined || senha == '') {
        alert('Preencha a Senha')
        iptSenha.style = "border: 1px solid RED"
        erro=true;
    } else {
        iptSenha.style = "border: 1px solid #DDDDD";
    }
    if (confirmacaoSenha == undefined || confirmacaoSenha == "") {
        alert("Confirme sua senha")
        iptConfirmacaoSenha.style = "border: 1px solid red"
        erro=true;
    } else {
        iptConfirmacaoSenha.style = "border: 1px solid #DDDDD";
    }
    if (confirmacaoSenha != senha) {
        alert("As senhas não são iguais");
        iptConfirmacaoSenha.style="border: 1px solid red;"
        iptSenha.style="border: 1px solid red;"
        erro=true;
    } else {
        iptConfirmacaoSenha.style ="border: 1px solid #DDDDD;"
    }
    if (telefone == undefined || telefone == '') {
        alert('Preencha o Telefone')
        iptTelefone.style = 'border: 1px solid red'
        erro=true;
    } else {
        iptTelefone.style='border: 1px solid #DDDDD;';
    }
    if (cpf == undefined || cpf == "") {
        alert('Preencha o cpf')
        iptCPF.style = 'border: 1px solid red';
        erro=true;
    } else {
        iptCPF.style = 'border: 1px solid #DDDDD;';
    }
    if (idCadastrador == undefined || idEmpresa == undefined) {
        alert("Você não esta logado!")
        window.location.href = "../../../../login.html";
        erro=true;
    } 
    if (idAeroportoSelecionado == undefined) {
        alert ("Escolha um Aéroporto!");
        slctAero.style = 'border: 1px solid red;';
        erro=true;
    } else {
        selctAero.style = 'border: none;'
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
                    if (res.length>0) {
                        alert("CPF já registrado")
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
                                    console.log("Aconteceu algum erro (res.error = true)")
                                }
                                else {
                                    if (res.length>0) {
                                        alert("Email já registrado")
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
                console.log(res)

                for (let i = 0; i < res.length; i++) {
                    liAeroportos.innerHTML += `                      
                    <li><a onclick="selecionarAeroporto(${res[i].idAeroporto}, '${res[i].nome}')">${res[i].nome}</a></li>
                    `
                }

            }
        }).catch(function (resposta) {

        });
}

