var database = require("../database/config")


function buscarFeriados() {
    const sql = `
        SELECT * FROM tbFeriados;
    `
    return database.executar(sql)
}


module.exports = {
    buscarFeriados
};