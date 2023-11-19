const componenteModel = require("../models/componenteModel.js")

function buscarEspecificacoes(req, res) {
    const { fkServidor } = req.body

    if (!fkServidor) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        componenteModel.buscarEspecificacoes(fkServidor).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(403).json({ error: "Sem Componentes!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarComponentes(req, res) {
    const { servidor } = req.body

    if (!servidor) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        componenteModel.buscarComponentes(servidor).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(403).json({ error: "Sem Componentes!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarSpecs(req, res) {
    const { idComp } = req.body

    if (!idComp) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        componenteModel.buscarSpecs(idComp).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarMedianPreco(req, res) {
    const { idEmpresa } = req.body

    if (!idEmpresa) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        componenteModel.buscarMedianPreco(idEmpresa).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarMedianBeneficio(req, res) {
    const { idEmpresa } = req.body

    if (!idEmpresa) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        componenteModel.buscarMedianBeneficio(idEmpresa).then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    buscarEspecificacoes,
    buscarComponentes,
    buscarSpecs,
    buscarMedianPreco,
    buscarMedianBeneficio
}