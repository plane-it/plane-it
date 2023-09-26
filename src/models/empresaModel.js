const database = require("../database/config")

function existe(cnpj){
    const sql = `
        select * from tbEmpresa where cnpj = '${cnpj}';
    `
    return database.executar(sql)
}

function cadastrar(nomeEmpresa, cnpj) {
    const sql = `
        insert into tbEmpresa (nomeEmpresa, cnpj, razaoSocial) values ("${nomeEmpresa}","${cnpj}", "teste");
    `
    return database.executar(sql)
}

module.exports = {
    existe,
    cadastrar
}
