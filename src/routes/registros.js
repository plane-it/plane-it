const express = require("express")
const router = express.Router()

const aeroportoController = require("../controllers/registrosController");

router.post("/buscarAlertas", (req, res) => {
    aeroportoController.buscarAlertas(req, res)
})

module.exports = router