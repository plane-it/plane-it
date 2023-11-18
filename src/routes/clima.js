const express = require("express")
const router = express.Router()

const climaController = require("../controllers/climaController");

router.post("/buscarFeriados", (req, res) => {
    climaController.buscarFeriados(req, res)
})


module.exports = router