const express = require("express")
const router = express.Router()

const cronogramaController = require("../controllers/cronogramaController")

router.post("/medidaSemanal", (req,res) => {
    cronogramaController.getMedidaSemanal(req,res)
})

router.post("/mediaDiaria", (req,res) => {
    cronogramaController.getMediaDiaria(req,res)
})

module.exports = router