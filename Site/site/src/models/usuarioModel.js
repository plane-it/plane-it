var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM cadastro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(cnpj, senha) {
   
    var instrucao = `
        SELECT * FROM cadastro WHERE cnpj = '${cnpj}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(cnpj, nomeGerente, nomeEmpresa, email, tel, senha, confirmacao) {
   
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO cadastro (cnpj, nomeGerente, telefone, nomeEmpresa, emailEmpresa, senha, confirmacao) VALUES ('${cnpj}','${nomeGerente}', '${tel}', '${nomeEmpresa}, '${email}', '${senha}', '${confirmacao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};