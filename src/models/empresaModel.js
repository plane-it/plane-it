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

function listarChamados(id){
    const sql = `
        select 
            c.estado, c.nivel, c.sla, s.apelido, 
            (select rs.valor from tbRegistro rs join tbComponente c on rs.fkComp = c.idComp where rs.fkServidor = s.idServ and rs.datahora = r.datahora and c.tipo = "CPU") cpu,
            (select rs.valor from tbRegistro rs join tbComponente c on rs.fkComp = c.idComp where rs.fkServidor = s.idServ and rs.datahora = r.datahora and c.tipo = "HD") disco,
            (select rs.valor from tbRegistro rs join tbComponente c on rs.fkComp = c.idComp where rs.fkServidor = s.idServ and rs.datahora = r.datahora and c.tipo = "RAM") ram
        from tbChamados c
            join tbRegistro r on c.fkRegistro = r.idRegst
            join tbServidor s on r.fkServidor = s.idServ
            join tbAeroporto a on s.fkAeroporto = a.idAeroporto
        where a.fkEmpresa = ${id};
    `
    return database.executar(sql)
}

module.exports = {
    existe,
    cadastrar,
    listarChamados
}
