const cpuController = require("../controllers/cpuController")
const express = require("express")
const router = express.Router()

router.get("/capturar", (req, res) => {
    empresaController.capturar(req, res)
})
router.post("/cadastrar", (req, res) => {
    empresaController.cadastrar(req, res)
})

module.exports = router