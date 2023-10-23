var database = require("../database/config");

function dadosPerfil(idUsuario) {

    var instrucao = `SELECT * FROM tbColaborador JOIN tbEmpresa ON fkEmpr = idEmpr
                            JOIN tbAeroporto ON idAeroporto = fkAeroporto WHERE idColab = ${idUsuario};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function atualizarPerfil(idUsuario, telefone, email, senha) {

    var instrucao = `UPDATE tbColaborador SET telefone = "${telefone}", email = "${email}", senha = "${senha}"
                         where idColab = ${idUsuario}`;

    return database.executar(instrucao);

}

module.exports = {
    dadosPerfil,
    atualizarPerfil
}