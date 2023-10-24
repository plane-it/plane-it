const express = require("express")
const router = express.Router()

const componenteController = require("../controllers/componenteController");

router.post("/buscarEspecificacoes", (req, res) => {
    componenteController.buscarEspecificacoes(req, res)
})

module.exports = router