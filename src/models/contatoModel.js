var database = require("../database/config")


function enviar(nomeReceibed,emailReceibed,assuntoReceubed,mensagemReceibed){
 
    instrucao = `INSERT INTO tbContato(nome,email,assunto,mensagem) 
                        VALUES ("${nomeReceibed}","${emailReceibed}","${assuntoReceubed}","${mensagemReceibed}");`;
    
    console.log("Executando a instrução" + instrucao)
    return database.executar(instrucao);

}

module.exports = {
    enviar
};