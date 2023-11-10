const database = require('../database/config');

function getMedidaSemanal(idServidor) {
    const sql = `
        SELECT AVG(r.valor) AS avgValues, DAYOFWEEK(r.datahora) days
        FROM tbRegistro r
        JOIN tbComponente c ON c.idComp = r.fkComp
        WHERE c.fkTipoComponente = 2 AND r.fkServidor = ${idServidor}
        GROUP BY days;
    `

    return database.executar(sql)
}

module.exports = {
    getMedidaSemanal
}