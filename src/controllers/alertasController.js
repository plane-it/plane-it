
function listar(req, res){
    const {id} = req.params

    res.status(200).json({
        alertas: [
            {
                servidor: "teste",
                datahora: "12/12/2012 13:30",
                cpu: 98,
                ram: 98,
                disco: 91.444
            },
            {
                servidor: "teste",
                datahora: "12/12/2012 13:30",
                cpu: 98,
                ram: 98,
                disco: 91.444
            }
        ]
    })
}

module.exports = {
    listar
}