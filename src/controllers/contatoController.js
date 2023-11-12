var contatoModel = require("../models/contatoModel");

function enviar(req,res){
        
    var nomeRecebido = req.body.nome;
    var emailRecebido = req.body.email;
    var assuntoRecebido  = req.body.assunto;
    // var telefoneReceibed = req.body.telefone;
    var mensagemRecebido = req.body.mensagem;
      
    contatoModel.enviar(nomeRecebido,emailRecebido,assuntoRecebido,mensagemRecebido)

    .then(
        function(resultado){

            res.json(resultado);
        }

    ).catch(
        function(erro){

            console.log(erro);
            console.log("\nHouve um erro ao realizar o envio do formulario ",erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        }

    )


}

module.exports = {
     enviar
}