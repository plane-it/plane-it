buscarFeriados();


function buscarFeriados() {

  var dataAtual = new Date();
  var diaAtual = dataAtual.getDate();        
  var mesNumero = dataAtual.getMonth() + 1;


  var meses = {
    1: "janeiro", 2: "fevereiro", 3: "março", 4: "abril", 5: "maio", 6: "junho",
    7: "julho", 8: "agosto", 9: "setembro", 10: "outubro", 11: "novembro", 12: "dezembro"
  };
  
  var mesEscrito = meses[mesNumero];
  

  fetch("/clima/buscarFeriados", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      
    }),
  })
  .then((res) => res.json())
  .then((res) => {
      if (res.error) {
          console.log("Aconteceu algum erro (res.error = true)")
      }
      else {
        console.log("erro no js");
          for(let i = 0; i < res.length; i++) {
            tabelaFeriado.innerHTML += `                      
              <tr>
              <td>
                ${res[i].dia}
              </td>
              <td>
                ${res[i].mes}
              </td>
              <td>
                ${res[i].titulo}
              </td>
            </tr>`
          }

          for(let i = 0; i < res.length; i++) {
            if(res[i].mes == mesEscrito){
              if(diaAtual < res[i].dia){
                dataFeriado.innerHTML = ` ${mesEscrito} - ${res[i].dia}`

              }
            } else{
              // mesNumero += 1
              dataFeriado.innerHTML = ` ${meses[mesNumero + 1]} - ${res[i].dia}`

            }
            }
          

          

          
      }
  }).catch(function (resposta) {
      
  });
}