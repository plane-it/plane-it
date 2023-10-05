var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM cadastro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(cpf, senha) {
   
    var instrucao = `
        SELECT * FROM tbColaborador WHERE cpf = '${cpf}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function proximo(cnpj, nomeEmpresa) {
   
    var instrucao = `
        INSERT INTO tbEmpresa (cnpj, nomeEmpresa, razaoSocial) VALUES ('${cnpj}', '${nomeEmpresa}', 'Amor');
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(cpf, nomeGerente, email,  senha, idEmpresa) {
  
    const instrucao = `
        INSERT INTO tbColaborador (cpf, nome, email, senha, fkEmpr) VALUES ('${cpf}', '${nomeGerente}', '${email}', '${senha}', ${idEmpresa});
    `
    return database.executar(instrucao);
}

function recuperar(email){
    const sql = `
        SELECT idFuncionario FROM funcionario WHERE email = '${email}'
    `
    return database.executar(sql)
}

module.exports = {
    entrar,
    proximo,
    cadastrar,
    listar,
    recuperar
};