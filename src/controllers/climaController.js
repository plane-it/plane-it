var climaModel = require("../models/climaModel");





function buscarFeriados(req, res) {
    
        climaModel.buscarFeriados().then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(403).json({ error: "Sem feriados!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    
}

module.exports = {
    buscarFeriados,
}