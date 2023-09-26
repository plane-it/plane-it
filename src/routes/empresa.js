const empresaController = require("../controllers/empresaController")
const express = require("express")
const router = express.Router()

router.post("/existe", (req, res) => {
    empresaController.existe(req, res)
})
router.post("/cadastrar", (req, res) => {
    empresaController.cadastrar(req, res)
})

module.exports = router