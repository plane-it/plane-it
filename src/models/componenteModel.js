const database = require('../database/config')

function buscarEspecificacoes(fkServidor) {
    const sql = `
        SELECT tbComponente.nome as modelo, tbComponente.preco, tbComponente.fktipoComponente as tipo, tbMetrica.valor, tbMetrica.fkUnidadeMedida, tbUnidadeMedida.sinal 
        FROM tbComponente 
        JOIN tbMetrica ON fkComponente = idComp 
        JOIN tbUnidadeMedida ON fkUnidadeMedida = idUnidadeMedida 
        WHERE fkServ = ${fkServidor};
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarComponentes(servidor) {
    const sql = `
        SELECT * FROM tbComponente
        WHERE fkServ = ${servidor};
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarSpecs(idComp) {
    const sql = `
        SELECT * FROM tbSpecs
        JOIN tbComponente ON fkComponente = idComp
        WHERE idComp = ${idComp};
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarMedianPreco(idEmpresa) {
    // const sql = `
    // CALL MedianPriceByComponentType(${idEmpresa});
    // `
    const sql = `
    SELECT fktipoComponente, AVG(preco) AS median_val
    FROM (
        SELECT fktipoComponente, preco, 
               ROW_NUMBER() OVER (
                   PARTITION BY fktipoComponente ORDER BY preco
               ) AS rn, 
               COUNT(*) OVER (
                   PARTITION BY fktipoComponente
               ) AS cnt
        FROM tbComponente
        JOIN tbServidor ON idServ = fkServ
        JOIN tbAeroporto ON idAeroporto = fkAeroporto
        WHERE fkEmpresa = ${idEmpresa}
    ) AS subquery
    WHERE rn IN ((cnt + 1) / 2, (cnt + 2) / 2)
    GROUP BY fktipoComponente;
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarMedianBeneficio(idEmpresa) {
    // const sql = `
    // CALL MedianBeneficioByType(${idEmpresa});
    // `

    const sql = `
    WITH medians AS (
        SELECT fktipoComponente, valor_preco_ratio,
               ROW_NUMBER() OVER (
                   PARTITION BY fktipoComponente 
                   ORDER BY valor_preco_ratio
               ) AS rn,
               COUNT(*) OVER (
                   PARTITION BY fktipoComponente
               ) AS cnt
        FROM (
            SELECT tbComponente.fktipoComponente, (tbSpecs.valor / tbComponente.preco) AS valor_preco_ratio
            FROM tbSpecs
            JOIN tbComponente ON tbSpecs.fkComponente = tbComponente.idComp
            JOIN tbServidor ON tbComponente.fkServ = tbServidor.idServ
            JOIN tbAeroporto ON tbServidor.fkAeroporto = tbAeroporto.idAeroporto
            WHERE tbAeroporto.fkEmpresa = ${idEmpresa}
        ) subquery1
    )
    SELECT fktipoComponente, AVG(valor_preco_ratio) AS median
    FROM medians
    WHERE rn BETWEEN cnt / 2.0 AND cnt / 2.0 + 1
    GROUP BY fktipoComponente;
    `
    console.log(sql)
    return database.executar(sql)
}

module.exports = {
    buscarEspecificacoes,
    buscarComponentes,
    buscarSpecs,
    buscarMedianPreco,
    buscarMedianBeneficio
}
