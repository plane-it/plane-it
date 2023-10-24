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

module.exports = {
    buscarEspecificacoes
}
