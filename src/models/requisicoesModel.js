var database = require("../database/config");

function enviarReq(motivo, descricao, requisitante, servidor) {
    const sql = `
    INSERT INTO tbPedidosInspecao VALUES (NULL, '${motivo}', '${descricao}', ${servidor}, ${requisitante})
    `
    return database.executar(sql)
}

function buscarRespostas(servidor) {
    const sql = `
    SELECT * FROM tbRespostaInspecao 
    JOIN tbPedidosInspecao ON fkPedido = idPedidoInspecao
    JOIN tbColaborador ON idColab = fkRespondente
    WHERE fkServidor = ${servidor};
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarSolicitacoes(aeroporto) {
    const sql = `
    SELECT * FROM tbPedidosInspecao
    JOIN tbServidor ON idServ = fkServidor
    JOIN tbColaborador ON idColab = fkRequisitante
    WHERE tbServidor.fkAeroporto = ${aeroporto};    
    `
    console.log(sql)
    return database.executar(sql)
}

function enviarResposta(pedido, resposta, respondente) {
    const sql = `
    INSERT INTO tbRespostaInspecao VALUES (NULL, '${resposta}', ${respondente}, ${pedido})
    `
    console.log(sql)
    return database.executar(sql)
}

module.exports = {
    enviarReq,
    buscarRespostas,
    buscarSolicitacoes,
    enviarResposta
}