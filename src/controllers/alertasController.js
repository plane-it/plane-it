const alertasModel = require('../models/alertasModel')

function listar(req, res) {
    const { id } = req.params

    alertasModel.listar(id)
        .then(resultado => {
            res.status(200).json(resultado)
        })
        .catch(erro => {
            res.status(500).json(erro)
        })
}

module.exports = {
    listar
}