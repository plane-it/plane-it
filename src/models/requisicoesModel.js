var database = require("../database/config");

function enviarReq(motivo, descricao, requisitante, servidor) {
    const sql = `
    INSERT INTO tbPedidosInspecao VALUES (NULL, '${motivo}', '${descricao}', ${servidor}, ${requisitante})
    `
    return database.executar(sql)

}


module.exports = {
    enviarReq,

}