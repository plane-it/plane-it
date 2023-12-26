const express = require("express")
const router = express.Router()

const cronogramaController = require("../controllers/cronogramaController")

router.post("/medidaSemanal", (req,res) => {
    cronogramaController.getMedidaSemanal(req,res)
})

router.post("/mediaDiaria", (req,res) => {
    cronogramaController.getMediaDiaria(req,res)
})

router.post("/valores", (req,res) => {
    cronogramaController.getValores(req,res)
})

router.get("/feriados", (req,res) => {
    cronogramaController.getFeriados(req,res)
})

module.exports = router