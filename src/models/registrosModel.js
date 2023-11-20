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

function buscarEstadoServidores(fk, adm) {
    console.log(adm)
    if (adm == 1) {
        const sql = `
        WITH ServidoresEmpresa AS (
            SELECT idServ FROM tbServidor 
            JOIN tbAeroporto ON tbServidor.fkAeroporto = tbAeroporto.idAeroporto
            WHERE fkEmpresa = ${fk}
        ),
        UltimosRegistros AS (
            SELECT fkServidor, alerta
            FROM (
                SELECT *, ROW_NUMBER() OVER (PARTITION BY fkServidor ORDER BY idRegst DESC) as rn
                FROM tbRegistro
                WHERE fkServidor IN (SELECT idServ FROM ServidoresEmpresa)
            ) tmp
            WHERE rn <= 10
        ),
        AlertasPorServidor AS (
            SELECT fkServidor, COUNT(*) as alertasGerados
            FROM UltimosRegistros
            WHERE alerta = true
            GROUP BY fkServidor
        )
        SELECT s.idServ, COALESCE(a.alertasGerados, 0) as alertasGerados
        FROM ServidoresEmpresa s
        LEFT JOIN AlertasPorServidor a ON s.idServ = a.fkServidor;
        `
        return database.executar(sql)

    } else if (adm == 0) {
        const sql = `
        WITH ServidoresEmpresa AS (
            SELECT idServ FROM tbServidor 
            JOIN tbAeroporto ON tbServidor.fkAeroporto = tbAeroporto.idAeroporto
            WHERE fkAeroporto = ${fk}
        ),
        UltimosRegistros AS (
            SELECT fkServidor, alerta
            FROM (
                SELECT *, ROW_NUMBER() OVER (PARTITION BY fkServidor ORDER BY idRegst DESC) as rn
                FROM tbRegistro
                WHERE fkServidor IN (SELECT idServ FROM ServidoresEmpresa)
            ) tmp
            WHERE rn <= 10
        ),
        AlertasPorServidor AS (
            SELECT fkServidor, COUNT(*) as alertasGerados
            FROM UltimosRegistros
            WHERE alerta = true
            GROUP BY fkServidor
        )
        SELECT s.idServ, COALESCE(a.alertasGerados, 0) as alertasGerados
        FROM ServidoresEmpresa s
        LEFT JOIN AlertasPorServidor a ON s.idServ = a.fkServidor;
        `
        return database.executar(sql)

    }

}

function buscarUltimosRegistrosLive(fkServidor, fkTipoComponente) {
    const sql = `
    SELECT * FROM (
        SELECT r.*, c.*, um.sinal 
        FROM tbRegistro r
        JOIN tbComponente c ON r.fkComp = c.idComp 
        JOIN tbMetrica m ON m.fkComponente = c.idComp
        JOIN tbUnidadeMedida um ON m.fkUnidadeMedida = um.idUnidadeMedida
        WHERE c.fktipoComponente = ${fkTipoComponente} AND c.fkServ = ${fkServidor}
        ORDER BY r.idRegst DESC
        LIMIT 10
    ) AS sub
    ORDER BY sub.idRegst ASC;
    `
    return database.executar(sql)
}


module.exports = {
    buscarAlertas,
    buscarChamados,
    buscarEstadoServidores,
    buscarUltimosRegistrosLive
}
