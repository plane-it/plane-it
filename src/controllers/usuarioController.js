var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    const {cpf, senha} = req.body

    if (!cpf || !senha){
        res.json({error: "Existem campos indefinidos"})
    } else {
        usuarioModel.entrar(cpf, senha)
            .then(
                function (resultado) {
                    if (resultado.length > 0) {
                        res.json(resultado[0]);
                    } else {
                        res.status(403).json({error: "Cnpj e/ou senha inválido(s)"});
                    }
                }
            ).catch(
                function (erro) {
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function proximo(req, res) {
    var cnpj = req.body.cnpjServer;
    var nomeEmpresa = req.body.nomeEmpresaServer;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está indefinido!");
    } else if (nomeEmpresa == undefined) {
        res.status(400).send("Sua nomeEmpresa está indefinida!");
    } else {
        
        usuarioModel.proximo(cnpj, nomeEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro(proximo)! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var cpf = req.body.cpfServer;
    var nomeGerente = req.body.nomeGerenteServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    

    // Faça as validações dos valores
    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!")
    }   else if (nomeGerente == undefined) {
        res.status(400).send("Seu nomeGerente está undefined")
    }  else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
        }  else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(cpf, nomeGerente, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function recuperar(req, res){
    const { email } = req.body;
    
    if(!email){
        res.status(400).json({msg: "Existem valor faltando"})
    }
    usuarioModel.recuperar(email)
        .then(function(resultado){
            if(resultado.length > 0){
                enviarEmail(email, resultado[0].idFuncionario)
                resultado.status(200).json({msg: "Email enviado!"})
            }
        })
        .catch(function(erro){
            
        })
}

module.exports = {
    entrar,
    proximo,
    cadastrar,
    listar,
    testar,
    recuperar
}