const database = require("../database/config")

function buscarServidor(fkAeroporto) {
    const sql = `
        SELECT * FROM tbServidor WHERE fkAeroporto = ${fkAeroporto};
    `
    return database.executar(sql)
}

function cadastrarServidor(codAutenticacao, nomeServidor, SO, IP, funcao, fkAeroporto) {
    const sql = `
        INSERT INTO tbServidor (codAutentic, apelido, sistemaOp, ip, funcao, fkAeroporto) VALUES("${codAutenticacao}","${nomeServidor}","${SO}","${IP}","${funcao}",${fkAeroporto});
    `
    console.log(sql)
    return database.executar(sql)
}

function cadastrarComponentes(idServidor, cpu, precoCpu, ram, precoRam, disco, precoDisco) {
    
    const sql = `
        INSERT INTO tbComponente VALUES(null,"${cpu}", 1, "${precoCpu}",${idServidor}),
                                       (null,"${ram}", 2, "${precoRam}",${idServidor}),
                                       (null,"${disco}", 3,"${precoDisco}",${idServidor});
    `
    console.log(sql)
    return database.executar(sql)
}

function cadastrarLimite(idComponente, temperaturaCpu, limiteCpu, limiteRam, limiteDisco) {
    idComponente = parseInt(idComponente)
    const sql = `  INSERT INTO tbMetrica VALUES(null,"${temperaturaCpu}",${idComponente},${1}),
                                                (null,"${limiteCpu}",${idComponente},${2}),
                                                (null,"${limiteRam}",${idComponente + 1},${3}),
                                                (null,"${limiteDisco}",${idComponente + 2},${3});
    `
    return database.executar(sql)
}

function buscarAeroporto(fkEmpresa) {
    const sql = `SELECT idAeroporto,nomeAeroporto,nomeEmpresa FROM tbAeroporto JOIN tbEmpresa WHERE fkEmpresa = ${fkEmpresa};`;

    return database.executar(sql)

}

function buscarEstadoServidor(fkServidor) {
    const sql = `CALL buscarEstadoDeServidor(${fkServidor});`
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

function buscarAlertas(fkAeroporto){
    const sql = `
    SELECT sum(alerta) AS 'qtdAlerta',funcao,apelido,(SELECT sum(alerta) AS 'Qtd de alerta' FROM tbRegistro
    JOIN tbServidor 
    ON fkServidor = idServ
    JOIN tbAeroporto ON fkAeroporto = idAeroporto 
    AND idAeroporto = ${fkAeroporto}) AS 'alertaTotal' FROM tbRegistro JOIN tbServidor ON idServ = fkServidor
    JOIN tbaeroporto ON fkaeroporto = idaeroporto WHERE fkaeroporto = ${fkAeroporto} GROUP BY idserv;
    `
    console.log(sql)
    return database.executar(sql)
}

function alertasPorServidor(funcionalidade,fkAeroporto){
    const sql = `
    SELECT sum(alerta) AS 'alerta',apelido,funcao FROM tbRegistro JOIN tbServidor ON fkServidor = idServ 
    JOIN tbAeroporto
    ON fkAeroporto = idAeroporto WHERE idAeroporto = ${fkAeroporto} AND 
    funcao = '${funcionalidade}'
    GROUP BY funcao,apelido;
    `
    console.log(sql)
    return database.executar(sql)
}

function buscarDesempenho(fkAeroporto){
    const sql = `
    SELECT SUM(alerta) AS 'desempenho',tipo FROM tbRegistro JOIN tbComponente ON fkComp = idComp 
    JOIN tbServidor on fkServidor = idServ JOIN tbTipoComponente on idTipoComponente = fkTipoComponente 
    JOIN tbAeroporto on fkAeroporto = idAeroporto WHERE idaeroporto = ${fkAeroporto} GROUP BY tipo; 
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
    buscarAlertas,
    buscarDesempenho,
    alertasPorServidor
}
