const database = require("../database/config")

function buscarAlertas(fkEmpresa, anoAtual) {
    const sql = `
    SELECT
    COUNT(*) AS totalAlertas FROM tbRegistro 
    JOIN tbServidor on fkServidor = idServ 
    JOIN tbAeroporto on fkAeroporto = idAeroporto
    JOIN tbEmpresa on fkEmpresa = idEmpr 
    WHERE idEmpr = ${fkEmpresa}
        AND alerta = true
        AND YEAR(dataHora) = ${anoAtual};
    `
    return database.executar(sql)
}

module.exports = {
    buscarAlertas
}
