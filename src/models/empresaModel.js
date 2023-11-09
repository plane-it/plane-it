const database = require("../database/config")

function existe(cnpj){
    const sql = `
        select * from tbEmpresa where cnpj = '${cnpj}';
    `
    return database.executar(sql)
}

function cadastrar(nomeEmpresa, cnpj,razaoSocial,endereco) {
    const sql = `
        insert into tbEmpresa (nomeEmpresa, cnpj, razaoSocial,endereco) values ("${nomeEmpresa}","${cnpj}", "${razaoSocial}","${endereco}");
    `
    return database.executar(sql)
}

function listarChamados(id){
    const sql = `
    select 
            c.estado, c.nivel, c.sla, s.apelido, r.datahora, 
        (select rs.valor from tbRegistro rs 
            join tbComponente c on rs.fkComp = c.idComp 
            join tbTipoComponente tc on c.fkTipoComponente = tc.idTipoComponente
            where rs.fkServidor = s.idServ and rs.datahora = r.datahora and tc.tipo = "CPU") cpu,
        (select um.sinal from tbRegistro rs 
            join tbComponente c on rs.fkComp = c.idComp 
            join tbTipoComponente tc on c.fkTipoComponente = tc.idTipoComponente
            join tbMetrica m on rs.fkMetrica = m.idMetrica
            join tbUnidadeMedida um on m.fkUnidadeMedida = um.idUnidadeMedida
            where rs.fkServidor = s.idServ and rs.datahora = r.datahora and tc.tipo = "CPU") cpuUni,
        (select rs.valor from tbRegistro rs
            join tbComponente c on rs.fkComp = c.idComp
            join tbTipoComponente tc on c.fkTipoComponente = tc.idTipoComponente
            where rs.fkServidor = s.idServ and rs.datahora = r.datahora and tc.tipo = "Disco") disco,
        (select um.sinal from tbRegistro rs 
            join tbComponente c on rs.fkComp = c.idComp 
            join tbTipoComponente tc on c.fkTipoComponente = tc.idTipoComponente
            join tbMetrica m on rs.fkMetrica = m.idMetrica
            join tbUnidadeMedida um on m.fkUnidadeMedida = um.idUnidadeMedida
            where rs.fkServidor = s.idServ and rs.datahora = r.datahora and tc.tipo = "Disco") discoUni,
        (select rs.valor from tbRegistro rs 
            join tbComponente c on rs.fkComp = c.idComp 
            join tbTipoComponente tc on c.fkTipoComponente = tc.idTipoComponente
            where rs.fkServidor = s.idServ and rs.datahora = r.datahora and tc.tipo = "RAM") ram,
        (select um.sinal from tbRegistro rs 
            join tbComponente c on rs.fkComp = c.idComp 
            join tbTipoComponente tc on c.fkTipoComponente = tc.idTipoComponente
            join tbMetrica m on rs.fkMetrica = m.idMetrica
            join tbUnidadeMedida um on m.fkUnidadeMedida = um.idUnidadeMedida
            where rs.fkServidor = s.idServ and rs.datahora = r.datahora and tc.tipo = "RAM") ramUni
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
