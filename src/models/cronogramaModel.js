const database = require('../database/config');

function getMedidaSemanal(idServidor, tipoComponente) {
    // const sql = `
    //     SELECT AVG(r.valor) AS avgValues, DAYOFWEEK(r.datahora) days, m.valor AS metrica, um.sinal AS uni, um.nome AS uniName
    //     FROM tbRegistro r
    //     JOIN tbComponente c ON c.idComp = r.fkComp
    //     JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
    //     JOIN tbUnidadeMedida um ON um.idUnidadeMedida = m.fkUnidadeMedida
    //     WHERE c.fkTipoComponente = ${tipoComponente} AND r.fkServidor = ${idServidor}
    //     GROUP BY days, m.valor, um.sinal, um.nome;

    const sql = `
        SELECT AVG(CAST(r.valor AS FLOAT)) AS avgValues, DATEPART(DW,r.datahora) days, m.valor AS metrica, um.sinal AS uni, um.nome AS uniName
        FROM tbRegistro r
        JOIN tbComponente c ON c.idComp = r.fkComp
        JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
        JOIN tbUnidadeMedida um ON um.idUnidadeMedida = m.fkUnidadeMedida
        WHERE c.fkTipoComponente = ${tipoComponente} AND r.fkServidor = ${idServidor}
        GROUP BY DATEPART(DW,r.datahora), m.valor, um.sinal, um.nome;
    `

    return database.executar(sql)
}
 
function getMediaDiaria(idServidor, data){
    // const sql = `
    //     SELECT AVG(r.valor) AS value, DATE(r.dataHora) AS datetime, c.fkTipoComponente AS type, um.sinal AS uni
    //     FROM tbRegistro r
    //     JOIN tbComponente c ON c.idComp = r.fkComp
    //     JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
    //     JOIN tbUnidadeMedida um ON um.idUnidadeMedida = m.fkUnidadeMedida
    //     WHERE r.fkServidor = ${idServidor} AND DATE(r.datahora) = DATE("${data}")
    //     GROUP BY DATE(r.dataHora), c.fkTipoComponente, um.sinal;

    const sql = `
        SELECT AVG(CAST(r.valor AS FLOAT)) AS value, CAST(r.dataHora AS DATE) AS datetime, c.fkTipoComponente AS type, um.sinal AS uni
        FROM tbRegistro r
        JOIN tbComponente c ON c.idComp = r.fkComp
        JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
        JOIN tbUnidadeMedida um ON um.idUnidadeMedida = m.fkUnidadeMedida
        WHERE r.fkServidor = ${idServidor}  AND CAST(r.datahora AS DATE) = CAST('${data}' AS DATE)
        GROUP BY CAST(r.dataHora AS DATE), c.fkTipoComponente, um.sinal;
    `

    return database.executar(sql)
}

function getValores(idServidor, data, tipoComponente){
    // const sql = `
    //     SELECT AVG(r.valor) value,  HOUR(r.dataHora) hour, FLOOR(MINUTE(r.datahora)/5)*5 minute, m.valor AS metrica, um.sinal AS uni, um.nome AS uniName
    //         FROM tbRegistro r
    //         JOIN tbMetrica m ON r.fkMetrica = m.idMetrica
    //         JOIN tbUnidadeMedida um ON m.fkUnidadeMedida = um.idUnidadeMedida
    //         JOIN tbComponente c ON c.idComp = r.fkComp
    //     WHERE r.fkServidor = ${idServidor} AND DATE(r.dataHora) = DATE("${data}") AND c.fkTipoComponente = ${tipoComponente}
    //     GROUP BY
    //         um.nome,
    //         um.sinal,
    //         m.valor,
    //         HOUR(r.dataHora),
    //         FLOOR(MINUTE(r.dataHora)/5)*5
    //     ORDER BY hour, minute;
    
    const sql = `
        SELECT AVG(CAST(r.valor AS FLOAT)) value,  DATEPART(HOUR,r.dataHora) hour, (CAST(DATEPART(MINUTE,r.datahora)AS FLOAT)/5)*5 minute, m.valor AS metrica, um.sinal AS uni, um.nome AS uniName
            FROM tbRegistro r
            JOIN tbMetrica m ON r.fkMetrica = m.idMetrica
            JOIN tbUnidadeMedida um ON m.fkUnidadeMedida = um.idUnidadeMedida
            JOIN tbComponente c ON c.idComp = r.fkComp
        WHERE r.fkServidor = ${idServidor} AND CAST(r.dataHora AS DATE) = CAST('${data}' AS DATE) AND c.fkTipoComponente = ${tipoComponente}
        GROUP BY
            um.nome,
            um.sinal,
            m.valor,
            DATEPART(HOUR,r.dataHora),
			(CAST(DATEPART(MINUTE,r.datahora)AS FLOAT)/5)*5
        ORDER BY hour, minute;
    `

    return database.executar(sql)
}

function getFeriados(){
    const sql = `
        SELECT * FROM tbFeriados;
    `

    return database.executar(sql)
}

module.exports = {
    getMedidaSemanal,
    getMediaDiaria,
    getValores,
    getFeriados
}