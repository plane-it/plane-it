const database = require("../database/config")

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

module.exports = {
    buscarEspecificacoes,
    buscarComponentes,
    buscarSpecs
}
