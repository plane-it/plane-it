const manutencaoController = require("../controllers/manutencaoController")
const express = require("express")
const router = express.Router()

router.get("/buscarServidores/:fkAeroporto", (req, res) => {
    manutencaoController.buscarServidorController(req, res)
})

router.get("/buscarManutencao/:fkServidor", (req, res) => {
    manutencaoController.buscarManutencaoController(req, res)
})

router.get("/buscarUltimaManutencao/:fkServidor", (req, res) => {
    manutencaoController.buscarUltimaManutencaoController(req, res)
})

router.get("/buscarDadosAntes/:fkServidor/:unidadeMedida/:dataReferencia/:tipoComponente", (req, res) => {
    manutencaoController.buscarDadosAntesController(req, res)
})

router.get("/buscarDadosDepois/:fkServidor/:unidadeMedida/:dataReferencia/:tipoComponente", (req, res) => {
    manutencaoController.buscarDadosDepoisController(req, res)
})

router.get("/antesDaManutencaoRelatorio/:fkServidor/:dataReferencia", (req, res) => {
    manutencaoController.antesDaManutencaoRelatorioController(req, res)
})

router.get("/depoisDaManutencaoRelatorio/:fkServidor/:dataReferencia", (req, res) => {
    console.log("oi")
    manutencaoController.depoisDaManutencaoRelatorioController(req, res)
})

module.exports = router