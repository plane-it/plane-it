const requisicoesModel = require("../models/requisicoesModel.js")

function enviarReq(req, res) {
    const { motivo, descricao, requisitante, servidor } = req.body

    if (!motivo || !descricao) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.enviarReq(motivo, descricao, requisitante, servidor).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
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
    enviarReq
}