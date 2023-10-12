const database = require("../database/config")

function buscarServidor(fkAeroporto) {
    const sql = `
        SELECT * FROM tbServidor WHERE fkAeroporto = ${fkAeroporto};
    `
    return database.executar(sql)
}

module.exports = {
    buscarServidor
}
