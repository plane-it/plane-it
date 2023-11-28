const express = require("express")
const router = express.Router()

const climaController = require("../controllers/climaController");

router.post("/buscarFeriados", (req, res) => {
    climaController.buscarFeriados(req, res)
})
router.post("/buscarVoos", (req, res) => {
    climaController.buscarVoos(req, res)
})
router.post("/buscarClimaTabela", (req, res) => {
    climaController.buscarClimaTabela(req, res)
})
router.post("/buscarOutrosFeriados", (req, res) => {
    climaController.buscarOutrosFeriados(req, res)
})




module.exports = router