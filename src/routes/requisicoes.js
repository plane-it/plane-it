const express = require("express")
const router = express.Router()

const requisicoesController = require("../controllers/requisicoesController");

router.post("/enviarReq", (req, res) => {
    requisicoesController.enviarReq(req, res)
})
router.post("/buscarRespostas", (req, res) => {
    requisicoesController.buscarRespostas(req, res)
})


module.exports = router