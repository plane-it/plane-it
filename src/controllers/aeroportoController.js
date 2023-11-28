const aeroportoModel = require("../models/aeroportoModel.js")

function buscarAeroporto(req, res) {
    const { fkEmpresa } = req.body

    if (!fkEmpresa) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        aeroportoModel.buscarAeroporto(fkEmpresa).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                    // sessionStorage.SIGLA_AEROPORTO = res[0].siglaAeroporto
                } else {
                    res.status(403).json({ error: "Sem Aeroportos!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function cadastrarAeroporto(req,res){
    var nomeAeroportoVar = req.body.nomeAeroportoServer;
    var paisVar = req.body.paisServer;
    var cidadeVar = req.body.cidadeServer;
    var enderecoVar = req.body.enderecoServer;
    var fkEmpresaVar = req.body.fkEmpresaServer;

    if(nomeAeroportoVar == undefined){
        res.status(400).send("O nome está undefined")
    } else if (paisVar == undefined){
        res.status(400).send("O pais está undefined")
    } else if(cidadeVar == undefined){
        res.status(400).send("A cidade está undefined")
    } else if(enderecoVar == undefined){
        res.status(400).send("O endereco está undefined")
    } else if (fkEmpresaVar == undefined){
        res.status(400).send("A empresa está undefined")
    } else{
        aeroportoModel.cadastrarAeroporto(nomeAeroportoVar, paisVar, cidadeVar, enderecoVar, fkEmpresaVar)
            .then(
                function(resultado){
                    res.json(resultado);
                }
            ).catch(
                function(erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao atualizar o cadastro!Erro: ",
                        erro.sqlMessage);
                    res.status(500).send(erro.sqlMessage);
                }
            )
    }
}

function pegarDadosEmpresa(req, res) {
    var idUsuario = req.params.idUsuario;

    aeroportoModel.pegarDadosEmpresa(idUsuario)
    .then(
        function(resultado){
            console.log(resultado)
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
function guardarAeroporto(req, res) {
    var idUsuario = req.params.idUsuario;

    aeroportoModel.pegarDadosEmpresa(idUsuario)
    .then(
        function(resultado){
            console.log(resultado)
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

module.exports = {
    buscarAeroporto,
    cadastrarAeroporto,
    pegarDadosEmpresa,
    guardarAeroporto
}