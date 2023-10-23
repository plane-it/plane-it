const perfilModel = require("../models/perfilModel.js")

function dadosPerfil(req, res) {
    var idUsuario = req.params.idUsuario;
    
    perfilModel.dadosPerfil(idUsuario)
    .then(
        function(resultado){

            res.json(resultado);
        }

    ).catch(
        function(erro){

            console.log(erro);
            console.log("\nHouve um erro ao realizar o envio do formulario ",erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        }

    )
}

function atualizarPerfil(req, res) {
    var idUsuario = req.params.idUsuario;
    var telefone = req.body.telefone;
    var email = req.body.email;
    var senha = req.body.senha;

    perfilModel.atualizarPerfil(idUsuario, telefone, email, senha)
    .then(
        function (resultado) {
            res.status(200).json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    dadosPerfil,
    atualizarPerfil
}