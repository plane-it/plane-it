var database = require('../database/config');

function enviarReq(motivo, descricao, requisitante, servidor) {
    const sql = `
    INSERT INTO tbPedidosInspecao (motivo, descricao, fkServidor, fkRequisitante) VALUES ('${motivo}', '${descricao}', ${servidor}, ${requisitante})
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
    WHERE tbServidor.fkAeroporto = ${aeroporto}
    AND NOT EXISTS (
        SELECT 1 FROM tbRespostaInspecao
        WHERE tbPedidosInspecao.idPedidoInspecao = tbRespostaInspecao.fkPedido
    );    
    `
    console.log(sql)
    return database.executar(sql)
}

function enviarResposta(pedido, resposta, respondente) {
    const sqlInsert = `
    INSERT INTO tbRespostaInspecao (resposta, fkRespondente, fkPedido) VALUES ('${resposta}', ${respondente}, ${pedido})
    `
    return database.executar(sqlInsert).then(() => {
        const sqlSelect = `SELECT idRespostaInspecao FROM tbRespostaInspecao 
        WHERE resposta = '${resposta}' 
        AND fkRespondente = ${respondente} 
        AND fkPedido = ${pedido}`
        return database.executar(sqlSelect)
    })
}


function sianlizar(idComp, motivo, idResposta) {
    const sql = `
    INSERT INTO tbComponentesSinalizados VALUES (${idResposta}, ${idComp}, '${motivo}') 
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarSinalizados(idResposta) {
    const sql = `
    SELECT * FROM tbComponentesSinalizados
    JOIN tbComponente ON idComp = fkComponente
    JOIN tbTipoComponente ON idTipoComponente = fktipoComponente
    WHERE fkRespostaInspecao = ${idResposta}; 
    `
    console.log(sql)
    return database.executar(sql)
}

function revogarSinalizacao(idResposta, idComponente) {
    const sql = `
    DELETE FROM tbComponentesSinalizados WHERE fkRespostaInspecao = ${idResposta} AND fkComponente = ${idComponente}
    `
    console.log(sql)
    return database.executar(sql)
}



module.exports = {
    enviarReq,
    buscarRespostas,
    buscarSolicitacoes,
    enviarResposta,
    sianlizar,
    buscarSinalizados,
    revogarSinalizacao,
}