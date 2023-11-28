const database = require('../database/config')

function listar(id) {
    // const sql = `
    //     SELECT
    //     DATE_SUB(
    //         FROM_UNIXTIME(
    //             MIN(UNIX_TIMESTAMP(r.datahora))
    //         ),
    //         INTERVAL MINUTE(
    //             FROM_UNIXTIME(
    //                 MIN(UNIX_TIMESTAMP(r.datahora))
    //             )
    //         ) - ROUND(
    //             MINUTE(
    //                 FROM_UNIXTIME(
    //                     MIN(UNIX_TIMESTAMP(r.datahora))
    //                 )
    //             ) / 5
    //         ) * 5 MINUTE
    //     ) as 'datahora', (
    //         select rs.valor
    //         from tbRegistro rs
    //             join tbMetrica m on m.idMetrica = rs.fkMetrica
    //             join tbComponente c on c.idComp = m.fkComponente
    //             join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
    //             join tbTipoComponente tc on tc.idTipoComponente = c.fkTipoComponente
    //         where
    //             tc.tipo = 'CPU'
    //             and rs.fkServidor = r.fkServidor
    //         order by rs.idRegst
    //         limit 1
    //     ) as 'cpu', (
    //         select u.sinal
    //         from tbRegistro rs
    //             join tbMetrica m on m.idMetrica = rs.fkMetrica
    //             join tbComponente c on c.idComp = m.fkComponente
    //             join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
    //             join tbTipoComponente tc on tc.idTipoComponente = c.fkTipoComponente
    //         where
    //             tc.tipo = 'CPU'
    //             and rs.fkServidor = r.fkServidor
    //         order by rs.idRegst
    //         limit 1
    //     ) as 'cpuUni',(
    //         select rs.valor
    //         from tbRegistro rs
    //             join tbMetrica m on m.idMetrica = rs.fkMetrica
    //             join tbComponente c on c.idComp = m.fkComponente
    //             join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
    //             join tbTipoComponente tc on tc.idTipoComponente = c.fkTipoComponente
    //         where
    //             tc.tipo = 'RAM'
    //             and rs.fkServidor = r.fkServidor
    //         order by rs.idRegst
    //         limit 1
    //     ) as 'ram', (
    //         select u.sinal
    //         from tbRegistro rs
    //             join tbMetrica m on m.idMetrica = rs.fkMetrica
    //             join tbComponente c on c.idComp = m.fkComponente
    //             join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
    //             join tbTipoComponente tc on tc.idTipoComponente = c.fkTipoComponente
    //         where
    //             tc.tipo = 'RAM'
    //             and rs.fkServidor = r.fkServidor
    //         order by rs.idRegst
    //         limit 1
    //     ) as 'ramUni', (
    //         select rs.valor
    //         from tbRegistro rs
    //             join tbMetrica m on m.idMetrica = rs.fkMetrica
    //             join tbComponente c on c.idComp = m.fkComponente
    //             join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
    //             join tbTipoComponente tc on tc.idTipoComponente = c.fkTipoComponente
    //         where
    //             tc.tipo = 'Disco'
    //             and rs.fkServidor = r.fkServidor
    //         order by rs.idRegst
    //         limit
    //             1
    //     ) as 'disco',(
    //         select u.sinal
    //         from tbRegistro rs
    //             join tbMetrica m on m.idMetrica = rs.fkMetrica
    //             join tbComponente c on c.idComp = m.fkComponente
    //             join tbUnidadeMedida u on u.idUnidadeMedida = m.fkUnidadeMedida
    //             join tbTipoComponente tc on tc.idTipoComponente = c.fkTipoComponente
    //         where
    //             tc.tipo = 'Disco'
    //             and rs.fkServidor = r.fkServidor
    //         order by rs.idRegst
    //         limit 1
    //     ) as 'discoUni',
    //     s.apelido as 'servidor'
    //     FROM tbRegistro r
    //         JOIN tbMetrica m ON m.idMetrica = r.fkMetrica
    //         JOIN tbServidor s ON s.idServ = r.fkServidor
    //         JOIN tbAeroporto a on a.idAeroporto = s.fkAeroporto
    //     WHERE
    //         r.valor >= m.valor * 0.8
    //         and a.idAeroporto = ${id}
    //         and month(r.datahora) = month(now())
    //         and year(r.datahora) = year(now())
    //     GROUP BY
    //         DATE(r.datahora),
    //         HOUR(r.dataHora),
    //         ROUND(MINUTE(r.datahora) / 5) * 5,
    //         r.fkServidor
    //     ORDER BY
    //         datahora DESC
    // `

    const sql = `
        Select (
        DATEADD(
            MINUTE, 
            -(CAST(DATEPART(MINUTE, min(r.datahora)) AS FLOAT)-ROUND(CAST(DATEPART(MINUTE, r.datahora) AS FLOAT) / 5, 0) * 5), 
            min(r.dataHora)
        )
        ) as datahora,
        (
            SELECT TOP 1 rs.valor
            FROM tbRegistro rs
                JOIN tbMetrica m ON m.idMetrica = rs.fkMetrica
                JOIN tbComponente c ON c.idComp = m.fkComponente
                JOIN tbTipoComponente tc ON tc.idTipoComponente = c.fkTipoComponente
            WHERE
                tc.tipo = 'CPU'
                AND rs.fkServidor = s.idServ
            ORDER BY rs.idRegst
        ) AS cpu,
        (
            SELECT TOP 1 u.sinal
            FROM tbRegistro rs
                JOIN tbMetrica m ON m.idMetrica = rs.fkMetrica
                JOIN tbComponente c ON c.idComp = m.fkComponente
                JOIN tbUnidadeMedida u ON u.idUnidadeMedida = m.fkUnidadeMedida
                JOIN tbTipoComponente tc ON tc.idTipoComponente = c.fkTipoComponente
            WHERE
                tc.tipo = 'CPU'
                AND rs.fkServidor = s.idServ
            ORDER BY rs.idRegst
        ) AS cpuUni,
        (
            SELECT TOP 1 rs.valor
            FROM tbRegistro rs
                JOIN tbMetrica m ON m.idMetrica = rs.fkMetrica
                JOIN tbComponente c ON c.idComp = m.fkComponente
                JOIN tbTipoComponente tc ON tc.idTipoComponente = c.fkTipoComponente
            WHERE
                tc.tipo = 'RAM'
                AND rs.fkServidor = s.idServ
            ORDER BY rs.idRegst
        ) AS ram,
        (
            SELECT TOP 1 u.sinal
            FROM tbRegistro rs
                JOIN tbMetrica m ON m.idMetrica = rs.fkMetrica
                JOIN tbComponente c ON c.idComp = m.fkComponente
                JOIN tbUnidadeMedida u ON u.idUnidadeMedida = m.fkUnidadeMedida
                JOIN tbTipoComponente tc ON tc.idTipoComponente = c.fkTipoComponente
            WHERE
                tc.tipo = 'RAM'
                AND rs.fkServidor = s.idServ
            ORDER BY rs.idRegst
        ) AS ramUni,
        (
            SELECT TOP 1 rs.valor
            FROM tbRegistro rs
                JOIN tbMetrica m ON m.idMetrica = rs.fkMetrica
                JOIN tbComponente c ON c.idComp = m.fkComponente
                JOIN tbTipoComponente tc ON tc.idTipoComponente = c.fkTipoComponente
            WHERE
                tc.tipo = 'Disco'
                AND rs.fkServidor = s.idServ
            ORDER BY rs.idRegst
        ) AS disco,
        (
            SELECT TOP 1 u.sinal
            FROM tbRegistro rs
                JOIN tbMetrica m ON m.idMetrica = rs.fkMetrica
                JOIN tbComponente c ON c.idComp = m.fkComponente
                JOIN tbUnidadeMedida u ON u.idUnidadeMedida = m.fkUnidadeMedida
                JOIN tbTipoComponente tc ON tc.idTipoComponente = c.fkTipoComponente
            WHERE
                tc.tipo = 'Disco'
                AND rs.fkServidor = s.idServ
            ORDER BY rs.idRegst
        ) AS discoUni,
        s.apelido as servidor
        from tbregistro r 
            join tbMetrica m ON m.idMetrica = r.fkMetrica
            join tbServidor s ON s.idServ = r.fkServidor
            join tbAeroporto a on a.idAeroporto = s.fkAeroporto
        WHERE
            r.valor >= m.valor*0.8
            and a.idAeroporto = 1
            -- and MONTH(r.dataHora) = MONTH(GETDATE())
            -- and YEAR(r.dataHora) = YEAR(GETDATE())
        GROUP BY 
            CAST(r.datahora as DATE),
            DATEPART(HOUR, r.dataHora),
            ROUND(CAST(DATEPART(MINUTE, r.datahora) AS FLOAT) / 5, 0) * 5,
            s.idServ,
            s.apelido
        order by 
            datahora desc;
    `

    return database.executar(sql)
}

module.exports = {
    listar
}