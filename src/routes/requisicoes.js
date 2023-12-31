const express = require("express")
const router = express.Router()

const requisicoesController = require("../controllers/requisicoesController");

router.post("/enviarReq", (req, res) => {
    requisicoesController.enviarReq(req, res)
})
router.post("/buscarRespostas", (req, res) => {
    requisicoesController.buscarRespostas(req, res)
})

router.post("/buscarSolicitacoes", (req, res) => {
    requisicoesController.buscarSolicitacoes(req, res)
})

router.post("/enviarResposta", (req, res) => {
    requisicoesController.enviarResposta(req, res)
})

router.post("/sianlizar", (req, res) => {
    requisicoesController.sianlizar(req, res)
})

router.post("/buscarSinalizados", (req, res) => {
    requisicoesController.buscarSinalizados(req, res)
})

router.post("/revogarSinalizacao", (req, res) => {
    requisicoesController.revogarSinalizacao(req, res)
})



module.exports = router