const model = require('../models/cronogramaModel')

async function getMedidaSemanal(req, res) {
    try{
        const { idServidor, tipoComponente } = req.body

        const medida = await model.getMedidaSemanal(idServidor, tipoComponente)

        res.status(200).json(medida)
    }
    catch(error){
        res.status(500).json({message: error})
    }
}

async function getMediaDiaria(req, res) {
    try{
        const { idServidor, data } = req.body

        const medida = await model.getMediaDiaria(idServidor, data)

        res.status(200).json(medida)
    }
    catch(error){
        res.status(500).json({message: error})
    }
}

async function getValores(req, res) {
    try{
        const { idServidor, data, type } = req.body

        const medida = await model.getValores(idServidor, data, type)

        res.status(200).json(medida)
    }
    catch(error){
        res.status(500).json({message: error})
    }
}

async function getFeriados(req, res) {
    try{
        const feriados = await model.getFeriados()

        res.status(200).json(feriados)
    }
    catch(error){
        res.status(500).json({message: error})
    }
}

module.exports = {
    getMedidaSemanal,
    getMediaDiaria,
    getValores,
    getFeriados
}