const express = require("express")
const router = express.Router()

const aeroportoController = require("../controllers/aeroportoController");

router.post("/buscarAeroporto", (req, res) => {
    aeroportoController.buscarAeroporto(req, res)
})

router.post("/cadastrarAeroporto", (req, res) => {
    aeroportoController.cadastrarAeroporto(req, res)
})

router.get("/pegarDadosEmpresa/:idUsuario", function (req, res) {
    aeroportoController.pegarDadosEmpresa(req, res);
    console.log("erro");
});

module.exports = router