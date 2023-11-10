const model = require('../models/cronogramaModel')

async function getMedidaSemanal(req, res) {
    try{
        const { idServidor } = req.params

        const medida = await model.getMedidaSemanal(idServidor)

        res.status(200).json(medida)
    }
    catch(error){
        res.status(500).json({message: error})
    }
}

module.exports = {
    getMedidaSemanal
}