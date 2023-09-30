var contatoModel = require("../models/contatoModel");

function enviar(req,res){
        
    var nomeReceibed = req.body.nome;
    var emailReceibed = req.body.email;
    var assuntoReceubed  = req.body.assunto;
    // var telefoneReceibed = req.body.telefone;
    var mensagemReceibed = req.body.mensagem;
      
    contatoModel.enviar(nomeReceibed,emailReceibed,assuntoReceubed,mensagemReceibed)

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