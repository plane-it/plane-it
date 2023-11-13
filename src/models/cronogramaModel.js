const database = require('../database/config');

function getMedidaSemanal(idServidor, tipoComponente) {
    const sql = `
        SELECT AVG(r.valor) AS avgValues, DAYOFWEEK(r.datahora) days, m.valor AS metrica, um.sinal AS uni
        FROM tbRegistro r
        JOIN tbComponente c ON c.idComp = r.fkComp
        JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
        JOIN tbUnidadeMedida um ON um.idUnidadeMedida = m.fkUnidadeMedida
        WHERE c.fkTipoComponente = ${tipoComponente} AND r.fkServidor = ${idServidor}
        GROUP BY days, m.valor, um.sinal;
    `

    return database.executar(sql)
}
 
function getMediaDiaria(idServidor, data){
    const sql = `
        SELECT AVG(r.valor) AS value, DATE(r.dataHora) AS datetime, c.fkTipoComponente AS type, um.sinal AS uni
        FROM tbRegistro r
        JOIN tbComponente c ON c.idComp = r.fkComp
        JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
        JOIN tbUnidadeMedida um ON um.idUnidadeMedida = m.fkUnidadeMedida
        WHERE r.fkServidor = ${idServidor} AND DATE(r.datahora) = DATE("${data}")
        GROUP BY DATE(r.dataHora), c.fkTipoComponente, um.sinal;
    `

    return database.executar(sql)
}

function getValores(idServidor, data, tipoComponente){
    const sql = `
        SELECT AVG(r.valor) value,  HOUR(r.dataHora) hour, FLOOR(MINUTE(r.datahora)/5)*5 minute
            FROM tbRegistro r
            JOIN tbMetrica m ON r.fkMetrica = m.idMetrica
            JOIN tbUnidadeMedida um ON m.fkUnidadeMedida = um.idUnidadeMedida
            JOIN tbComponente c ON c.idComp = m.fkComponente
        WHERE r.fkServidor = ${idServidor} AND DATE(r.dataHora) = DATE("${data}") AND c.fkTipoComponente = ${tipoComponente}
        GROUP BY 
            HOUR(r.dataHora),
            FLOOR(MINUTE(r.dataHora)/5)*5;
    `

    return database.executar(sql)
}

module.exports = {
    getMedidaSemanal,
    getMediaDiaria,
    getValores
}