const database = require("../database/config")

function buscarServidor(fkAeroporto) {
    const sql = `
        SELECT * FROM tbServidor WHERE fkAeroporto = ${fkAeroporto};
    `
    return database.executar(sql)
}

function cadastrarServidor(codAutenticacao, nomeServidor, SO, IP, funcao, fkAeroporto) {
    const sql = `
        INSERT INTO tbServidor VALUES(null,"${codAutenticacao}","${nomeServidor}","${SO}","${IP}","${funcao}",${fkAeroporto});
    `

    return database.executar(sql)
}

function cadastrarComponentes(idServidor, cpu, precoCpu, ram, precoRam, disco, precoDisco) {
    const sql = `
        INSERT INTO tbComponente VALUES(null,"${cpu}","${precoCpu}","${idServidor}"),
                                       (null,"${ram}","${precoRam}","${idServidor}"),
                                       (null,"${disco}","${precoDisco}","${idServidor}");
    `

    return database.executar(sql)
}

function cadastrarLimite(idComponente, temperaturaCpu, limiteCpu, limiteRam, limiteDisco) {
    idComponente = parseInt(idComponente)
    const sql = `  INSERT INTO tbMetrica VALUES(null,"${temperaturaCpu}","${idComponente}","${1}"),
                                                (null,"${limiteCpu}","${idComponente}","${2}"),
                                                (null,"${limiteRam}","${idComponente + 1}","${3}"),
                                                (null,"${limiteDisco}","${idComponente + 2}","${3}");
    `
    return database.executar(sql)
}

function buscarAeroporto(fkEmpresa) {
    const sql = `SELECT idAeroporto,nomeAeroporto,nomeEmpresa FROM tbAeroporto JOIN tbEmpresa WHERE fkEmpresa = ${fkEmpresa};`;

    return database.executar(sql)

}


module.exports = {
    buscarServidor,
    cadastrarServidor,
    cadastrarComponentes,
    cadastrarLimite,
    buscarAeroporto

}
