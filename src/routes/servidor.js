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

router.post("/buscarAlertasComponente",function(req,res){
    servidorController.buscarAlertasComponente(req,res)
})

router.post("/buscarKpis",function(req,res){
    servidorController.buscarKpis(req,res)
})
module.exports = router