const express = require("express")
const router = express.Router()

const alertasController = require("../controllers/alertasController");

router.get("/listar/:id", (req, res) => {
    alertasController.listar(req, res)
})

module.exports = router