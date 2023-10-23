const database = require('../database/config')

function listar() {
    const sql = `
        SELECT
        DATE_SUB(
            FROM_UNIXTIME(
                MIN(UNIX_TIMESTAMP(r.datahora))
            ),
            INTERVAL MINUTE(
                FROM_UNIXTIME(
                    MIN(UNIX_TIMESTAMP(r.datahora))
                )
            ) - ROUND(
                MINUTE(
                    FROM_UNIXTIME(
                        MIN(UNIX_TIMESTAMP(r.datahora))
                    )
                ) / 5
            ) * 5 MINUTE
        ) as "datahora", (
            select rs.valor
            from tbRegistro rs
                join tbMetrica m on m.idMetrica = rs.fkMetrica
                join tbComponente c on c.idComp = m.fkComponente
                join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
            where
                c.tipo = "CPU"
                and rs.fkServidor = r.fkServidor
            order by rs.idRegst
            limit 1
        ) as "CPU", (
            select rs.valor
            from tbRegistro rs
                join tbMetrica m on m.idMetrica = rs.fkMetrica
                join tbComponente c on c.idComp = m.fkComponente
                join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
            where
                c.tipo = "RAM"
                and rs.fkServidor = r.fkServidor
            order by rs.idRegst
            limit 1
        ) as "RAM", (
            select rs.valor
            from tbRegistro rs
                join tbMetrica m on m.idMetrica = rs.fkMetrica
                join tbComponente c on c.idComp = m.fkComponente
                join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
            where
                c.tipo = "HD"
                and rs.fkServidor = r.fkServidor
            order by rs.idRegst
            limit
                1
        ) as "HD",
        s.apelido as "servidor"
        FROM tbRegistro r
            JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
            JOIN tbServidor s ON s.idServ = r.fkServidor
            JOIN tbAeroporto a on a.idAeroporto = s.fkAeroporto
        WHERE
            r.valor >= m.valor * 0.95
            and a.fkServ = ${id}
            and month(r.datahora) = month(now())
            and year(r.datahora) = year(now())
        GROUP BY
            DATE(r.datahora),
            HOUR(r.dataHora),
            ROUND(MINUTE(r.datahora) / 5) * 5,
            r.fkServidor;
    `
    return database.executar(sql)
}

module.exports = {
    listar
}