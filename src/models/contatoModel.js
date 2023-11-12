var database = require("../database/config")


function enviar(nomeRecebido,emailRecebido,assuntoRecebido,mensagemRecebido){
 
    instrucao = `INSERT INTO tbFaleConosco(nome,email,assunto,mensagem) VALUES ("${nomeRecebido}","${emailRecebido}","${assuntoRecebido}","${mensagemRecebido}");`;
    
    console.log("Executando a instrução" + instrucao)
    return database.executar(instrucao);

}

module.exports = {
    enviar
};