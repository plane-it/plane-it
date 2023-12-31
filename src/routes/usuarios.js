var express = require("express");
var router = express.Router();
const path = require("path")

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/entrar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/proximo", function (req, res) {
    usuarioController.proximo(req, res);
});

router.get("/recuperar/:cpf", function(req, res) {
    usuarioController.recuperar(req,res)
})

router.get("/alterar-senha/:id", function(req, res){
    res.sendFile(path.join(__dirname,"../../public/alterarSenha.html"))
})

router.post("/alterar-senha/:id", function(req,res){
    usuarioController.alterarSenha(req,res)
})

router.post("/buscarFunc", (req, res) => {
    usuarioController.buscarFunc(req, res)
})

router.post("/buscarCPF", (req, res) => {
    usuarioController.buscarCPF(req, res)
})

router.post("/buscarEmail", (req, res) => {
    usuarioController.buscarEmail(req, res)
})

router.post("/cadastrarFunc", (req, res) => {
    usuarioController.cadastrarFunc(req, res)
})

module.exports = router;