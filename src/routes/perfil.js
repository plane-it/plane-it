var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.get("/dadosPerfil/:idUsuario", function (req, res) {
    perfilController.dadosPerfil(req, res);
});

router.post("/atualizarPerfil/:idUsuario", function (req, res) {
    perfilController.atualizarPerfil(req, res);
});


module.exports = router;
