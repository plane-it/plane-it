const { resolve } = require("path");
const servidorModel = require("../models/servidorModel.js");

function buscarServidor(req, res) {
    const { fkAeroporto } = req.body

    if (!fkAeroporto) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        servidorModel.buscarServidor(fkAeroporto).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(403).json({ error: "Sem Servidores!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function cadastrarServidor(req, res) {
    var codAutenticacao = req.body.codAutenticacao
    var nomeServidor = req.body.nomeServidor
    var SO = req.body.SO
    var IP = req.body.IP
    var funcao = req.body.funcao
    var fkAeroporto = req.body.fkAeroporto
    // -----------------------------
    var cpu = req.body.cpu
    var precoCpu = req.body.precoCpu
    var ram = req.body.ram
    var precoRam = req.body.precoRam
    var disco = req.body.disco
    var precoDisco = req.body.precoCpu
    // --------------------------------
    var temperaturaCPU = req.body.temperaturaCpu
    var limiteCpu = req.body.limiteCpu
    var limiteRam = req.body.limiteRam
    var limiteDisco = req.body.limiteDisco
    
    servidorModel.cadastrarServidor(codAutenticacao,nomeServidor,SO, IP, funcao, fkAeroporto)
        .then(
            async function (resultado) {
                console.log(resultado)
                const result = await cadastrarComponentes(resultado.insertId, cpu, precoCpu, ram, precoRam, disco, precoDisco,
                    temperaturaCPU, limiteCpu, limiteRam, limiteDisco)
                res.json(result);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function cadastrarComponentes(idServidor, cpu, precoCpu, ram, precoRam, disco, precoDisco, temperaturaCPU, limiteCpu, limiteRam,
    limiteDisco) {

    return new Promise((resolve) => {
        servidorModel.cadastrarComponentes(idServidor, cpu, precoCpu, ram, precoRam, disco, precoDisco)
            .then(
                async function (resultado) {
                    const result = await cadastrarLimite(resultado.insertId, temperaturaCPU, limiteCpu, limiteRam, limiteDisco)
                    resolve(result)
                    console.log(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                    resolve(res.status(500).json(erro.sqlMessage))
                }
            )
    })
}

function cadastrarLimite(idComponente, temperaturaCPU, limiteCpu, limiteRam, limiteDisco) {
    return new Promise((resolve) => {
        servidorModel.cadastrarLimite(idComponente, temperaturaCPU, limiteCpu, limiteRam, limiteDisco)
            .then(
                function (resultado) {
                    resolve(resultado);
                    console.log(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro")
                }
            )
    })
}

function buscarAeroporto(req, res) {
    var fkEmpresa = req.params.fkEmpresa

    servidorModel.buscarAeroporto(fkEmpresa)
        .then(
             function (resultado) {
                 res.json(resultado);
                 console.log(resultado)
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}


module.exports = {
    buscarServidor,
    cadastrarServidor,
    cadastrarComponentes,
    cadastrarLimite,
    buscarAeroporto
}