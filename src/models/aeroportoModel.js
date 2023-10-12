const database = require("../database/config")

function buscarAeroporto(fkEmpresa) {
    const sql = `
        SELECT * FROM tbAeroporto WHERE fkEmpresa = ${fkEmpresa};
    `
    return database.executar(sql)
}

module.exports = {
    buscarAeroporto
}
