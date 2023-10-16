const database = require("../database/config")

function buscarAlertas(fkEmpresa, anoAtual) {
    const sql = `
    SELECT
    COUNT(*) AS totalAlertas FROM tbRegistro 
    JOIN tbServidor on fkServidor = idServ 
    JOIN tbAeroporto on fkAeroporto = idAeroporto
    JOIN tbEmpresa on fkEmpresa = idEmpr 
    WHERE idEmpr = ${fkEmpresa}
        AND alerta = true
        AND YEAR(dataHora) = ${anoAtual};
    `
    return database.executar(sql)
}

function buscarChamados(fkEmpresa, anoAtual) {
    const sql = `
    SELECT
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 1 THEN 1 ELSE 0 END) AS Janeiro,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 2 THEN 1 ELSE 0 END) AS Fevereiro,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 3 THEN 1 ELSE 0 END) AS Marco,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 4 THEN 1 ELSE 0 END) AS Abril,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 5 THEN 1 ELSE 0 END) AS Maio,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 6 THEN 1 ELSE 0 END) AS Junho,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 7 THEN 1 ELSE 0 END) AS Julho,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 8 THEN 1 ELSE 0 END) AS Agosto,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 9 THEN 1 ELSE 0 END) AS Setembro,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 10 THEN 1 ELSE 0 END) AS Outubro,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 11 THEN 1 ELSE 0 END) AS Novembro,
    SUM(CASE WHEN MONTH(tbRegistro.dataHora) = 12 THEN 1 ELSE 0 END) AS Dezembro
    FROM tbRegistro
    JOIN tbChamados ON fkRegistro = idRegst
    JOIN tbServidor ON fkServidor = idServ
    JOIN tbAeroporto ON fkAeroporto = idAeroporto
    JOIN tbEmpresa ON fkEmpresa = idEmpr
	WHERE idEmpr = ${fkEmpresa}
    AND YEAR(tbRegistro.dataHora) = ${anoAtual};
    `
    return database.executar(sql)
}

module.exports = {
    buscarAlertas,
    buscarChamados
}
