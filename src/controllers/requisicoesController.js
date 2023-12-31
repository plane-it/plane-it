const requisicoesModel = require("../models/requisicoesModel.js")

function enviarReq(req, res) {
    const { motivo, descricao, requisitante, servidor } = req.body

    if (!motivo || !descricao) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.enviarReq(motivo, descricao, requisitante, servidor).then(
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

function buscarRespostas(req, res) {
    const { servidor } = req.body

    if (!servidor) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.buscarRespostas(servidor).then(
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

function buscarSolicitacoes(req, res) {
    const { aeroporto } = req.body

    if (!aeroporto) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.buscarSolicitacoes(aeroporto).then(
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

function enviarResposta(req, res) {
    const { pedido, resposta, respondente } = req.body

    if (!pedido || !resposta || !respondente) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.enviarResposta(pedido, resposta, respondente).then(
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

function sianlizar(req, res) {
    const { idComp, motivo, idResposta } = req.body

    if (!idComp || !motivo || !idResposta) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.sianlizar(idComp, motivo, idResposta).then(
            function (resultado) {
                res.json({res: resultado});
            }
        ).catch(
            function (erro) {
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function buscarSinalizados(req, res) {
    const { idResposta } = req.body

    if (!idResposta) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.buscarSinalizados(idResposta).then(
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

function revogarSinalizacao(req, res) {
    const { idResposta, idComponente } = req.body

    if (!idResposta || !idComponente) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        requisicoesModel.revogarSinalizacao(idResposta, idComponente).then(
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
    enviarReq,
    buscarRespostas,
    buscarSolicitacoes,
    enviarResposta,
    sianlizar,
    buscarSinalizados,
    revogarSinalizacao
}