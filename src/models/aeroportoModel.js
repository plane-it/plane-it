const database = require("../database/config")

function buscarAeroporto(fkEmpresa) {
    const sql = `
        SELECT * FROM tbAeroporto WHERE fkEmpresa = ${fkEmpresa};
    `
    return database.executar(sql)
}

function cadastrarAeroporto(nomeAeroportoVar, paisVar, cidadeVar, enderecoVar, fkEmpresaVar){
    var instrucao = `INSERT INTO tbAeroporto (nomeAeroporto, pais, cidade, endereco, fkEmpresa) VALUES ('${nomeAeroportoVar}', '${paisVar}', '${cidadeVar}', '${enderecoVar}', '${fkEmpresaVar}');`
    return database.executar(instrucao);
}

function pegarDadosEmpresa(idUsuario) {

    var instrucao = `Select * FROM tbColaborador JOIN tbEmpresa on fkEmpr = idEmpr WHERE idColab = ${idUsuario};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

module.exports = {
    buscarAeroporto,
    cadastrarAeroporto,
    pegarDadosEmpresa
}
