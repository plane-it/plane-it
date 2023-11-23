const express = require("express")
const router = express.Router()

const servidorController = require("../controllers/servidorController");

router.post("/buscarServidor", (req, res) => {
    servidorController.buscarServidor(req, res)
})

router.post("/cadastrarServidor", (req, res) => {
    servidorController.cadastrarServidor(req, res)
})

router.get("/buscarAeroporto/:fkEmpresa", function (req,res) {
    servidorController.buscarAeroporto(req,res)
})

router.post("/buscarEstadoServidor", function (req,res) {
    servidorController.buscarEstadoServidor(req,res)
})

router.post("/buscarErrosMensais", function (req,res) {
    servidorController.buscarErrosMensais(req,res)
})

router.post("/buscarAlertas",function(req,res){
    servidorController.buscarAlertas(req,res)
})

router.post("/alertasPorServidor",function(req,res){
    servidorController.alertasPorServidor(req,res)
})

router.post("/buscarDesempenho",function(req,res){
    servidorController.buscarDesempenho(req,res)
})
module.exports = router