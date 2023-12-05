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

router.post("/alertasCriticos",function(req,res){
    servidorController.alertasCriticos(req,res)
})

router.post("/alertasEstadoAlerta",function(req,res){
    servidorController.alertasEstadoAlerta(req,res)
})

router.post("/buscarComponente/",function(req,res){
    servidorController.buscarComponente(req,res)
})

router.post("/alertasEstadoBom",function(req,res){
    servidorController.alertasEstadoBom(req,res)
})

router.post("/buscarDesempenho",function(req,res){
    servidorController.buscarDesempenho(req,res)
})

// router.post("/buscarAlertasComponente",function(req,res){
//     servidorController.buscarAlertasComponente(req,res)
// })

router.post("/buscarKpis",function(req,res){
    servidorController.buscarKpis(req,res)
})

router.get("/atualizarComponente/:fkAeroporto",function(req,res){
    servidorController.atualizarComponente(req,res)
})

router.get("/atualizarServidorAlerta/:fkAeroporto",function(req,res){
    servidorController.atualizarServidorAlerta(req,res)
})

router.get("/atualizarServidorBom/:fkAeroporto",function(req,res){
    servidorController.atualizarServidorBom(req,res)
})

router.get("/atualizarServidorCritico/:fkAeroporto",function(req,res){
    servidorController.atualizarServidorCritico(req,res)
})

router.post("/atualizarCompServidor",function(req,res){
    servidorController.atualizarCompServidor(req,res)
})
module.exports = router