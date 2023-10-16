const registrosModel = require("../models/registrosModel.js")

function buscarAlertas(req, res) {
    const { fkEmpresa, anoAtual } = req.body

    if (!fkEmpresa || !anoAtual) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        registrosModel.buscarAlertas(fkEmpresa, anoAtual).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(403).json({ error: "Sem Alertas!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarChamados(req, res) {
    const { fkEmpresa, anoAtual } = req.body

    if (!fkEmpresa || !anoAtual) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        registrosModel.buscarChamados(fkEmpresa, anoAtual).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(403).json({ error: "Sem chamados!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarEstadoServidores(req, res) {
    const { fkEmpresa } = req.body

    if (!fkEmpresa) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        registrosModel.buscarEstadoServidores(fkEmpresa).then(
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

module.exports = {
    buscarAlertas,
    buscarChamados,
    buscarEstadoServidores
}