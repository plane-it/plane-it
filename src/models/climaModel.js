var database = require("../database/config");

function buscarFeriados() {
  const sql = `
        SELECT * FROM tbFeriados;
    `;
  return database.executar(sql);
}
function buscarVoos(siglaAeroportoOrigem) {
  const sql = `
            SELECT
            situacao,
            MONTH(horaPartidaPrevista) AS mes,
            COUNT(*) AS quantidade
        FROM
            voos
        WHERE
            situacao IN ('REALIZADO', 'CANCELADO')
            AND siglaAeroportoOrigem = '${siglaAeroportoOrigem}'
        GROUP BY
            situacao, mes;
    `;
  return database.executar(sql);
}

function buscarClimaTabela(regiao) {
  const sql = `
    SELECT 
    dia,
    mes,
    previsao, 
    regiao,
    diaSemana,
    titulo,
    idFeriado
FROM 
    tbFeriados
JOIN 
    tbClimaEstado ON dia = DAY(dataCompleta) AND mes = MONTH(dataCompleta) where regiao = '${regiao}';
    `;
  return database.executar(sql);
}

function buscarOutrosFeriados(ids) {
    let marcadores = '';
    
    for (let i = 0; i < ids.length; i++) {
        if (i == ids.length-1) {
            marcadores += `${ids[i]}`;
        } else {
            marcadores += `${ids[i]},`;
        }
    }
    
    console.log(marcadores)
    const sql = `
      SELECT * FROM tbFeriados WHERE idFeriado NOT IN (${marcadores});
    `;
  
    return database.executar(sql);
  }
  
  

module.exports = {
  buscarFeriados,
  buscarVoos,
  buscarClimaTabela,
  buscarOutrosFeriados
};
