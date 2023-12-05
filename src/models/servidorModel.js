const database = require('../database/config')

function buscarServidor(fkAeroporto) {
    const sql = `
        SELECT * FROM tbServidor WHERE fkAeroporto = ${fkAeroporto};
    `
    return database.executar(sql)
}

function cadastrarServidor(codAutenticacao, nomeServidor, SO, IP, funcao, fkAeroporto) {
    const sql = `
        INSERT INTO tbServidor (codAutentic, apelido, sistemaOp, ip, funcao, fkAeroporto) VALUES('${codAutenticacao}','${nomeServidor}','${SO}','${IP}','${funcao}',${fkAeroporto});
    `
    console.log(sql)
    return database.executar(sql)
}

function cadastrarComponentes(idServidor, cpu, precoCpu, ram, precoRam, disco, precoDisco) {
    
    const sql = `
        INSERT INTO tbComponente (nome, fkTipoComponente, preco, fkServidor) VALUES('${cpu}', 1, '${precoCpu}',${idServidor}),
                                       ('${ram}', 2, '${precoRam}',${idServidor}),
                                       ('${disco}', 3,'${precoDisco}',${idServidor});
    `
    console.log(sql)
    return database.executar(sql)
}

function cadastrarLimite(idComponente, temperaturaCpu, limiteCpu, limiteRam, limiteDisco) {
    idComponente = parseInt(idComponente)
    const sql = `  INSERT INTO tbMetrica (valor, fkComponente, fkUnidadeMedida) VALUES('${temperaturaCpu}',${idComponente},${1}),
                                                ('${limiteCpu}',${idComponente},${2}),
                                                ('${limiteRam}',${idComponente + 1},${3}),
                                                ('${limiteDisco}',${idComponente + 2},${3});
    `
    return database.executar(sql)
}

function buscarAeroporto(fkEmpresa) {
    const sql = `SELECT idAeroporto,nomeAeroporto,nomeEmpresa FROM tbAeroporto JOIN tbEmpresa WHERE fkEmpresa = ${fkEmpresa};`;

    return database.executar(sql)

}

function buscarEstadoServidor(fkServidor) {
    // const sql = `CALL buscarEstadoDeServidor(${fkServidor});`
    const sql = `EXEC buscarEstadoDeServidor @_fkServ = ${fkServidor}`
    return database.executar(sql)
}

function buscarErrosMensais(fkServidor, mesLimite, anoAtual, fkComponente) {
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
    JOIN tbComponente on fkComp = idComp
    JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente
	WHERE idServ = ${fkServidor}
    AND idTipoComponente = ${fkComponente}
    AND YEAR(tbRegistro.dataHora) = ${anoAtual}
    AND MONth(tbRegistro.dataHora) <= ${mesLimite};`

    console.log(sql)
    return database.executar(sql)
}

function alertasCriticos(fkAeroporto){
    // const sql = `
    // SELECT SUM(alerta) AS 'qtdAlerta',apelido,(SELECT sum(alerta) AS 'Qtd de alerta' FROM tbRegistro
    // JOIN tbServidor 
    // ON fkServidor = idServ
    // JOIN tbAeroporto ON fkAeroporto = idAeroporto 
    // AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
    // JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = ${fkAeroporto} 
    // GROUP BY idserv HAVING SUM(alerta) >= 18 LIMIT 5;`
    const sql = `

        SELECT 
            top 5 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',
            apelido,
            (SELECT sum(case when alerta = 1 then 1 else 0 end) AS 'Qtd de alerta' FROM tbRegistro
                JOIN tbServidor 
                ON fkServidor = idServ
                JOIN tbAeroporto ON fkAeroporto = idAeroporto 
                AND idAeroporto = 1) AS 'alertaTotal' 
        FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
            JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = 1
        GROUP BY idserv, apelido HAVING SUM(case when alerta = 1 then 1 else 0 end) >= 18;
    `
    console.log(sql)
    return database.executar(sql)
}

function alertasEstadoAlerta(fkAeroporto){
    // const sql = `
    // SELECT SUM(alerta) AS 'qtdAlerta',apelido,(SELECT sum(alerta) AS 'Qtd de alerta' FROM tbRegistro
    // JOIN tbServidor 
    // ON fkServidor = idServ
    // JOIN tbAeroporto ON fkAeroporto = idAeroporto 
    // AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
    // JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = ${fkAeroporto} 
    // GROUP BY idserv HAVING SUM(alerta) > 6 && SUM(alerta) < 18 LIMIT 5;`

    const sql = `

        SELECT 
        top 5 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',
        apelido,
        (SELECT sum(case when alerta = 1 then 1 else 0 end) AS 'Qtd de alerta' FROM tbRegistro
        JOIN tbServidor 
        ON fkServidor = idServ
        JOIN tbAeroporto ON fkAeroporto = idAeroporto 
        AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
        JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = ${fkAeroporto}
        GROUP BY idserv, apelido HAVING SUM(case when alerta = 1 then 1 else 0 end) > 6 AND SUM(case when alerta = 1 then 1 else 0 end) < 18 ;
    `
    console.log(sql)
    return database.executar(sql)
}
function alertasEstadoBom(fkAeroporto){
    // const sql = `
    // SELECT sum(alerta) AS 'qtdAlerta',funcao,apelido,(SELECT sum(alerta) AS 'Qtd de alerta' FROM tbRegistro
    // JOIN tbServidor 
    // ON fkServidor = idServ
    // JOIN tbAeroporto ON fkAeroporto = idAeroporto 
    // AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
    // JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkAeroporto = ${fkAeroporto}
    // GROUP BY idserv
    // HAVING SUM(alerta) > 0 && SUM(alerta) <= 6 LIMIT 5;
    // `
    const sql = `
        SELECT 
        top 5 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',
        apelido,
        (SELECT sum(case when alerta = 1 then 1 else 0 end) AS 'Qtd de alerta' FROM tbRegistro
        JOIN tbServidor 
        ON fkServidor = idServ
        JOIN tbAeroporto ON fkAeroporto = idAeroporto 
        AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
        JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = ${fkAeroporto}
        GROUP BY idserv, apelido HAVING SUM(case when alerta = 1 then 1 else 0 end) > 0 AND SUM(case when alerta = 1 then 1 else 0 end) <= 6 ;
    `
    console.log(sql)
    return database.executar(sql)
}
function buscarComponente(fkAeroporto,servidor){
    // const sql = `
    // SELECT 
    // (SELECT COUNT(apelido) FROM tbservidor JOIN tbaeroporto ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto}) 
    // AS 'servidores',SUM(alerta) AS 'qtdAlerta',apelido,nome FROM tbRegistro 
    // JOIN tbComponente ON fkComp = idComp
    // JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente JOIN tbServidor 
    // ON fkServidor = idServ JOIN tbAeroporto
    // ON fkAeroporto = fkAeroporto WHERE idAeroporto = ${fkAeroporto} AND apelido = '${servidor}' GROUP BY 
    // apelido,nome HAVING SUM(alerta) > 0;  
    // `
    const sql = `

        SELECT 
        (SELECT COUNT(apelido) FROM tbservidor JOIN tbaeroporto ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto}) 
        AS 'servidores',SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',apelido,nome FROM tbRegistro 
        JOIN tbComponente ON fkComp = idComp
        JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente JOIN tbServidor 
        ON fkServidor = idServ JOIN tbAeroporto
        ON fkAeroporto = fkAeroporto WHERE idAeroporto = ${fkAeroporto} AND apelido = '${servidor}' GROUP BY 
        apelido,nome HAVING SUM(case when alerta = 1 then 1 else 0 end) > 0; 
    `

    console.log(sql)
    return database.executar(sql)
}


function buscarDesempenho(fkAeroporto){
    // const sql = `
    // SELECT SUM(alerta) AS 'qtdAlerta',tipo,(SELECT COUNT(apelido) FROM tbservidor JOIN 
    // tbaeroporto ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto}) AS 'servidores' FROM tbRegistro JOIN 
    // tbComponente ON fkComp = idComp
    // JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente JOIN tbServidor 
    // ON fkServidor = idServ JOIN tbAeroporto ON fkAeroporto = fkAeroporto WHERE idAeroporto = ${fkAeroporto} 
    // GROUP BY tipo;
    // `
    const sql = `

        SELECT SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',tipo,(SELECT COUNT(apelido) FROM tbservidor JOIN 
        tbaeroporto ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto}) AS 'servidores' FROM tbRegistro JOIN 
        tbComponente ON fkComp = idComp
        JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente JOIN tbServidor 
        ON fkServidor = idServ JOIN tbAeroporto ON fkAeroporto = fkAeroporto WHERE idAeroporto = ${fkAeroporto}
        GROUP BY tipo;
    `
    console.log(sql)
    return database.executar(sql)
}


function buscarAlertasComponente(fkAeroporto,componente){
    const sql = `
    SELECT top 4 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',tipo,apelido,nome FROM tbRegistro JOIN tbComponente ON fkComp = idComp
    JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente JOIN tbServidor 
    ON fkServidor = idServ JOIN tbAeroporto
    ON fkAeroporto = fkAeroporto WHERE idAeroporto = ${fkAeroporto} AND tipo = '${componente}' GROUP BY 
    tipo,apelido,nome
    HAVING SUM(case when alerta = 1 then 1 else 0 end) > 0; 
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarKpis(fkAeroporto){
//     const sql = `
//     SELECT apelido,
//   (CASE WHEN SUM(alerta) >= 18 THEN 1 ELSE 0 END) AS 'critico',
//   (CASE WHEN SUM(alerta) > 6 AND SUM(alerta) < 18 THEN 1 ELSE 0 END) AS 'alerta',
//   (CASE WHEN SUM(alerta) > 0 AND SUM(alerta) <= 6 THEN 1 ELSE 0 END) AS 'bom',
//   SUM(alerta) AS 'qtdAlerta',(SELECT COUNT(apelido) FROM tbservidor JOIN tbaeroporto 
//   ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto}) AS 'servidores' FROM tbRegistro JOIN tbServidor
// ON idServ = fkServidor JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = ${fkAeroporto} GROUP BY apelido
//   HAVING SUM(alerta) > 0;
//     `

    const sql = `
        SELECT apelido,
        (CASE WHEN SUM(case when alerta = 1 then 1 else 0 end) >= 18 THEN 1 ELSE 0 END) AS 'critico',
        (CASE WHEN SUM(case when alerta = 1 then 1 else 0 end) > 6 AND SUM(case when alerta = 1 then 1 else 0 end) < 18 THEN 1 ELSE 0 END) AS 'alerta',
        (CASE WHEN SUM(case when alerta = 1 then 1 else 0 end) > 0 AND SUM(case when alerta = 1 then 1 else 0 end) <= 6 THEN 1 ELSE 0 END) AS 'bom',
        SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',(SELECT COUNT(apelido) FROM tbservidor JOIN tbaeroporto 
        ON fkAeroporto = idAeroporto WHERE idAeroporto = 1) AS 'servidores' FROM tbRegistro JOIN tbServidor
        ON idServ = fkServidor JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = 1 GROUP BY apelido
        HAVING SUM(case when alerta = 1 then 1 else 0 end) > 0;
            `
    console.log(sql)
    return database.executar(sql)
}

function atualizarComponente(fkAeroporto){
    // const sql = `
    // SELECT SUM(alerta) AS 'qtdAlerta',tipo,(SELECT COUNT(apelido) FROM tbservidor JOIN 
    // tbaeroporto ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto}) AS 'servidores' FROM tbRegistro JOIN 
    // tbComponente ON fkComp = idComp
    // JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente JOIN tbServidor 
    // ON fkServidor = idServ JOIN tbAeroporto ON fkAeroporto = fkAeroporto WHERE idAeroporto = ${fkAeroporto} 
    // GROUP BY tipo;
    // `

    const sql = `
        SELECT SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',tipo,(SELECT COUNT(apelido) FROM tbservidor JOIN 
        tbaeroporto ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto}) AS 'servidores' FROM tbRegistro JOIN 
        tbComponente ON fkComp = idComp
        JOIN tbTipoComponente ON idTipoComponente = fkTipoComponente JOIN tbServidor 
        ON fkServidor = idServ JOIN tbAeroporto ON fkAeroporto = fkAeroporto WHERE idAeroporto = 1
        GROUP BY tipo;
    `

    return database.executar(sql) 
}

function atualizarServidorAlerta(fkAeroporto){
    // const sql = `
    // SELECT SUM(alerta) AS 'qtdAlerta',apelido,(SELECT sum(alerta) AS 'Qtd de alerta' FROM tbRegistro
    // JOIN tbServidor 
    // ON fkServidor = idServ
    // JOIN tbAeroporto ON fkAeroporto = idAeroporto 
    // AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
    // JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = ${fkAeroporto} 
    // GROUP BY idserv HAVING SUM(alerta) > 6 && SUM(alerta) < 18 LIMIT 5;`
    // console.log(sql)

    const sql = `
        SELECT top 5 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',apelido,(SELECT sum(case when alerta = 1 then 1 else 0 end) AS 'Qtd de alerta' FROM tbRegistro
        JOIN tbServidor 
        ON fkServidor = idServ
        JOIN tbAeroporto ON fkAeroporto = idAeroporto 
        AND idAeroporto = 1) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
        JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = 1 
        GROUP BY idserv, apelido HAVING SUM(case when alerta = 1 then 1 else 0 end) > 6 and SUM(case when alerta = 1 then 1 else 0 end) < 18;
    `
    return database.executar(sql)
}
function atualizarServidorBom(fkAeroporto){
    // const sql = `
    // SELECT sum(alerta) AS 'qtdAlerta',funcao,apelido,(SELECT sum(alerta) AS 'Qtd de alerta' FROM tbRegistro
    // JOIN tbServidor 
    // ON fkServidor = idServ
    // JOIN tbAeroporto ON fkAeroporto = idAeroporto 
    // AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
    // JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkAeroporto = ${fkAeroporto}
    // GROUP BY idserv
    // HAVING SUM(alerta) > 0 && SUM(alerta) <= 6 LIMIT 5;
    // `
    const sql = `
        SELECT top 5 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',apelido,(SELECT sum(case when alerta = 1 then 1 else 0 end) AS 'Qtd de alerta' FROM tbRegistro
        JOIN tbServidor 
        ON fkServidor = idServ
        JOIN tbAeroporto ON fkAeroporto = idAeroporto 
        AND idAeroporto = 1) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
        JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = 1 
        GROUP BY idserv, apelido HAVING SUM(case when alerta = 1 then 1 else 0 end) > 0 and SUM(case when alerta = 1 then 1 else 0 end) <= 6;
    `
    console.log(sql)
    return database.executar(sql)
}
function atualizarServidorCritico(fkAeroporto){
    // const sql = `
    // SELECT sum(alerta) AS 'qtdAlerta',funcao,apelido,(SELECT sum(alerta) AS 'Qtd de alerta' FROM tbRegistro
    // JOIN tbServidor 
    // ON fkServidor = idServ
    // JOIN tbAeroporto ON fkAeroporto = idAeroporto 
    // AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
    // JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkAeroporto = ${fkAeroporto}
    // GROUP BY idserv
    // HAVING SUM(alerta) >= 18 LIMIT 5;
    // `
    const sql = `
        SELECT top 5 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',apelido,(SELECT sum(case when alerta = 1 then 1 else 0 end) AS 'Qtd de alerta' FROM tbRegistro
        JOIN tbServidor 
        ON fkServidor = idServ
        JOIN tbAeroporto ON fkAeroporto = idAeroporto 
        AND idAeroporto = 1) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
        JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = 1 
        GROUP BY idserv, apelido HAVING SUM(case when alerta = 1 then 1 else 0 end) > 18;
    `
    return database.executar(sql)
}

function atualizarCompServidor(fkAeroporto,servidor){
    const sql = `
        SELECT top 5 SUM(case when alerta = 1 then 1 else 0 end) AS 'qtdAlerta',apelido,(SELECT sum(case when alerta = 1 then 1 else 0 end) AS 'Qtd de alerta' FROM tbRegistro
        JOIN tbServidor 
        ON fkServidor = idServ
        JOIN tbAeroporto ON fkAeroporto = idAeroporto 
        AND idAeroporto = 1) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
        JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = 1 
        GROUP BY idserv, apelido HAVING SUM(case when alerta = 1 then 1 else 0 end) >= 18;
    `
    console.log(sql)
    return database.executar(sql)
}

module.exports = {
    buscarServidor,
    cadastrarServidor,
    cadastrarComponentes,
    cadastrarLimite,
    buscarAeroporto,
    buscarEstadoServidor,
    buscarErrosMensais,
    buscarDesempenho,
    alertasCriticos,
    alertasEstadoAlerta,
    buscarComponente,
    alertasEstadoBom,
    // buscarAlertasComponente,
    buscarKpis,
    atualizarComponente,
    atualizarServidorAlerta,
    atualizarServidorBom,
    atualizarServidorCritico,
    atualizarCompServidor
}
