const database = require('../database/config');

function getMedidaSemanal(idServidor, tipoComponente) {
    const sql = `
        SELECT AVG(r.valor) AS avgValues, DAYOFWEEK(r.datahora) days
        FROM tbRegistro r
        JOIN tbComponente c ON c.idComp = r.fkComp
        WHERE c.fkTipoComponente = ${tipoComponente} AND r.fkServidor = ${idServidor}
        GROUP BY days;
    `

    return database.executar(sql)
}
 
function getMediaDiaria(){
    const sql = `
        SELECT AVG(r.valor), DATE(r.dataHora) FROM tbRegistro r
        JOIN tbComponente c ON c.idComp = r.fkComp
        WHERE r.fkServidor = 1 AND DATE(r.datahora) = DATE("2023-11-09")
        GROUP BY DATE(r.dataHora), c.fkTipoComponente;
    `

    return database.executar(sql)
}

module.exports = {
    getMedidaSemanal
}