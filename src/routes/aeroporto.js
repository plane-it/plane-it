const express = require("express")
const router = express.Router()

const aeroportoController = require("../controllers/aeroportoController");

router.post("/buscarAeroporto", (req, res) => {
    aeroportoController.buscarAeroporto(req, res)
})

module.exports = router