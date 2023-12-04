const database = require("../database/config")

function buscarServidoresModel(fkAeroporto) {
    const sql = `
        SELECT * FROM tbServidor WHERE fkAeroporto = ${fkAeroporto};
    `
    return database.executar(sql)
}

function buscarManutencaoModel(fkServidor) {
    const sql = `
    SELECT * FROM tbManutencao JOIN tbColaborador on fkResponsavel = idColab WHERE fkServidor = ${fkServidor}  order by dataHota desc;
    `
    return database.executar(sql)
}

function buscarUltimaManutencaoModel(fkServidor) {
    const sql = `
    SELECT * FROM tbManutencao  WHERE fkServidor = ${fkServidor} order by dataHota desc limit 1;
    `

    // const sql = `SELECT TOP 1 * FROM tbManutencao WHERE fkServidor = ${fkServidor} ORDER BY dataHora DESC; `

    return database.executar(sql)
}


function buscarDadosAntesModel(fkServidor, unidadeMedida, dataReferencia, tipoComponete) {
    const sql = `
    SELECT tbRegistro.valor FROM tbRegistro JOIN tbMetrica ON tbRegistro.fkMetrica = tbMetrica.idMetrica
		JOIN TbComponente ON fkComp = idComp WHERE tbRegistro.dataHora BETWEEN DATE_SUB('${dataReferencia}', INTERVAL 7 DAY)
        AND '${dataReferencia}' AND fkServidor = ${fkServidor} AND fkUnidadeMedida = ${unidadeMedida} AND fkTipoComponente = ${tipoComponete};
    `

    // const sql = `
    // SELECT tbRegistro.valor  FROM tbRegistro JOIN tbMetrica ON tbRegistro.fkMetrica = tbMetrica.idMetrica
    //  JOIN TbComponente ON tbRegistro.fkComp = TbComponente.idComp WHERE tbRegistro.dataHora BETWEEN DATEADD(DAY, -7, '${dataReferencia}') AND '${dataReferencia}' 
    //       AND tbRegistro.fkServidor = ${fkServidor} AND tbMetrica.fkUnidadeMedida = ${unidadeMedida} AND TbComponente.fkTipoComponente = ${tipoComponete};
    // `
    console.log(sql)
    return database.executar(sql)
}

function buscarDadosDepoisModel(fkServidor, unidadeMedida, dataReferencia, tipoComponete) {
    const sql = `   
    SELECT tbRegistro.valor FROM tbRegistro JOIN tbMetrica ON tbRegistro.fkMetrica = tbMetrica.idMetrica 
	    JOIN TbComponente ON fkComp = idComp WHERE tbRegistro.dataHora BETWEEN '${dataReferencia}' AND DATE_ADD('${dataReferencia}', INTERVAL 7 DAY) 
        AND fkServidor = ${fkServidor} AND fkUnidadeMedida = ${unidadeMedida} AND fkTipoComponente = ${tipoComponete};
    `

    // const sql = `
    // SELECT tbRegistro.valor FROM tbRegistro JOIN tbMetrica ON tbRegistro.fkMetrica = tbMetrica.idMetrica
    //     JOIN TbComponente ON tbRegistro.fkComp = TbComponente.idComp WHERE tbRegistro.dataHora BETWEEN '${dataReferencia}' AND DATEADD(DAY, 7, '${dataReferencia}')
    //     AND tbRegistro.fkServidor = ${fkServidor} AND tbMetrica.fkUnidadeMedida = ${unidadeMedida} AND TbComponente.fkTipoComponente = ${tipoComponete};
    // `
    
    return database.executar(sql)
}


module.exports = {
    buscarServidoresModel,
    buscarManutencaoModel,
    buscarUltimaManutencaoModel,
    buscarDadosAntesModel,
    buscarDadosDepoisModel
}