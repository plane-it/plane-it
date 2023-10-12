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

module.exports = {
    buscarAeroporto
}