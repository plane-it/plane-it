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

router.post("/alertasEstadoRuim",function(req,res){
    servidorController.alertasEstadoRuim(req,res)
})

router.post("/alertasEstadoBom",function(req,res){
    servidorController.alertasEstadoBom(req,res)
})

router.post("/alertasEstadoMedio",function(req,res){
    servidorController.alertasEstadoMedio(req,res)
})

router.post("/buscarDesempenho",function(req,res){
    servidorController.buscarDesempenho(req,res)
})

router.post("/alertasFuncoes",function(req,res){
    servidorController.alertasFuncoes(req,res)
})
module.exports = router