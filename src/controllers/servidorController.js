const servidorModel = require("../models/servidorModel.js")

function buscarServidor(req, res) {
    const {fkAeroporto} = req.body

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

module.exports = {
    buscarServidor
}