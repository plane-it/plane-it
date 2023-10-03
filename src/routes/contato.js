var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController")


router.post("/enviar",function(req,res){

    contatoController.enviar(req,res);

});

module.exports = router;