const express = require("express")
const router = express.Router()

const registrosController = require("../controllers/registrosController");

router.post("/buscarAlertas", (req, res) => {
    registrosController.buscarAlertas(req, res)
})

router.post("/buscarChamados", (req, res) => {
    registrosController.buscarChamados(req, res)
})

module.exports = router