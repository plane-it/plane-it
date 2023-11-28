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
function buscarVoos(req, res) {

    var siglaAeroportoOrigem = req.body.siglaAeroporto;
    
        climaModel.buscarVoos(siglaAeroportoOrigem).then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.json(resultado);
                } else {
                    res.status(403).json({ error: "Sem voos!" });
                }
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    
}

function buscarClimaTabela(req, res) {

    var regiao = req.body.regiao;
    
    climaModel.buscarClimaTabela(regiao).then(
        function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(403).json({ error: "Sem clima!" });
            }
        }
    ).catch(
        function (erro) {
            res.status(500).json(erro.sqlMessage);
        }
    );

}

function buscarOutrosFeriados(req, res) {

    var ids = req.body.ids;
    
    climaModel.buscarOutrosFeriados(ids).then(
        function (resultado) {
            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(403).json({ error: "Sem clima!" });
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
    buscarVoos,
    buscarClimaTabela,
    buscarOutrosFeriados
}