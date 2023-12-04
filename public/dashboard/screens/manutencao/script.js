function buscarServidores(fkAeroporto) {
    fetch(`/manutencao/buscarServidores/${fkAeroporto}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            res.map(i => {
                conteudo.innerHTML += `
                <div class="card">

                <div class="card-header">

                    <div class="navbar navbar-expand-lg navbar-transparent" id="cabecalho">
                        <div class="container-fluid">
                            <div class="navbar-wrapper">
                                <a class="navbar-brand card-header" href="javascript:;">${i.apelido}</a>
                            </div>
                            <div class="collapse navbar-collapse justify-content-end" id="navigation">
                                <li class="navbar-nav">
                                    <!-- Drop Donw -->
                                    <div class="dropdown col-md-6 pr-1">
                                        <a class="btn btn-secondary dropdown-toggle" href="#" role="button"
                                            id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            Baixar Relatório
                                        </a>

                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                            <button onclick="baixarRelatorioManuntencao(${i.idServ})" class="dropdown-item" href="#">Histórico de Manutenções</button>
                                            

                                        </div>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="card-body">
                    <div class="row">

                        <div id="accordion">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne"
                                            aria-expanded="true" aria-controls="collapseOne">
                                            GRÁFICO
                                        </button>
                                    </h5>
                                </div>


                                <div id="collapseOne" class="collapse show " aria-labelledby="headingOne"
                                data-parent="#accordion">
                                <div class="card-body">
                                    <p>
                                        <button class="btn btn-primary" onclick="buscarUltimaManutencao(${i.idServ},4,'frequenciaAntes${i.idServ}','frequenciaDepois${i.idServ}',1)" type="button"
                                            data-toggle="collapse" data-target=".frequenciaCpu${i.idServ}"
                                            aria-expanded="false"
                                            aria-controls="cpuAntes${i.idServ} cpuDepois${i.idServ}">
                                            Frequência da CPU </button>
                                        <button class="btn btn-primary" onclick="buscarUltimaManutencao(${i.idServ},1,'tempGraficoAntes${i.idServ}','tempGraficoDepois${i.idServ}',1)" type="button"
                                            data-toggle="collapse" data-target=".temperaturaCpu${i.idServ}"
                                            aria-expanded="false"
                                            aria-controls="temperaturaAntes${i.idServ} temperaturaDepois${i.idServ}">
                                            Temperatura da CPU</button>
                                        <button class="btn btn-primary" onclick="buscarUltimaManutencao(${i.idServ},2,'usoCpuGraficoAntes${i.idServ}','usoCpuGraficoDepois${i.idServ}',1)" type="button"
                                            data-toggle="collapse" data-target=".usoCpu${i.idServ}"
                                            aria-expanded="false"
                                            aria-controls="usoCpuAntes${i.idServ} usoCpuDepois${i.idServ}">Uso
                                            da CPU</button>
                                        <button class="btn btn-primary" onclick="buscarUltimaManutencao(${i.idServ},3,'usoRamGraficoAntes${i.idServ}','usoRamGraficoDepois${i.idServ}',2)" type="button"
                                            data-toggle="collapse" data-target=".usoRam${i.idServ}"
                                            aria-expanded="false"
                                            aria-controls="usoRamAntes${i.idServ} usoRamDepois${i.idServ}">Uso
                                            da ram</button>
                                        <button class="btn btn-primary" onclick="buscarUltimaManutencao(${i.idServ},3,'usoDiscoGraficoAntes${i.idServ}','usoDiscoGraficoDepois${i.idServ}',3)" type="button"
                                            data-toggle="collapse" data-target=".usoDisco${i.idServ}"
                                            aria-expanded="false"
                                            aria-controls="usoDiscoAntes${i.idServ} usoDiscoDepois${i.idServ}">Uso
                                            de Disco</button>

                                    </p>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="collapse frequenciaCpu${i.idServ}"
                                                id="cpuAntes${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="frequenciaAntes${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse frequenciaCpu${i.idServ}"
                                                id="cpuDepois${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="frequenciaDepois${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse temperaturaCpu${i.idServ}"
                                                id="temperaturaAntes${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="tempGraficoAntes${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse temperaturaCpu${i.idServ}"
                                                id="temperaturaDepois${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="tempGraficoDepois${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse usoCpu${i.idServ}"
                                                id="usoCpuAntes${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="usoCpuGraficoAntes${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse usoCpu${i.idServ}"
                                                id="usoCpuDepois${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="usoCpuGraficoDepois${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse usoRam${i.idServ}"
                                                id="usoRamAntes${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="usoRamGraficoAntes${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse usoRam${i.idServ}"
                                                id="usoRamDepois${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="usoRamGraficoDepois${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse usoDisco${i.idServ}"
                                                id="usoDiscoAntes${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="usoDiscoGraficoAntes${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="collapse usoDisco${i.idServ}"
                                                id="usoDiscoDepois${i.idServ}">
                                                <div class="card card-body">
                                                    <figure class="highcharts-figure">
                                                        <canvas id="usoDiscoGraficoDepois${i.idServ}"></canvas>
                                                        <p class="highcharts-description"></p>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" data-toggle="collapse"
                                            data-target="#collapseTwo" aria-expanded="false"
                                            aria-controls="collapseTwo">
                                            Informações do servidor
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                    data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <p> Nome: ${i.apelido} </p>
                                                <p> Mac Adress: ${i.codAutentic} </p>
                                                <p> IP: ${i.ip} </p>
                                            </div>
                                            <div class="col-md-12">
                                                <p> Sistema Operacional: ${i.sistemaOp} </p>
                                                <p> Função: ${i.funcao}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                              
                            <div class="card">
                            <div class="card-header" id="headingThree">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" onclick="historicoManutencao('${i.idServ}')" data-toggle="collapse"
                                        data-target="#collapseThree${i.idServ}" aria-expanded="false"
                                        aria-controls="collapseThree">
                                        Informações das manutenções
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseThree${i.idServ}" class="collapse" aria-labelledby="headingThree"
                                data-parent="#accordion">
                                <div class="card-body" id="manutencoesRegistro${i.idServ}"> </div>
                                
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
             `
            })
        })
}

function buscarUltimaManutencao(id, unidadeMedida, ondeInserirAntes, ondeInserirDepois, tipoComponete) {
    fetch(`/manutencao/buscarUltimaManutencao/${id}`)
        .then(res => res.json())
        .then(async res => {
            console.log(res)
            await buscarDadosAntes(id, res[0].dataHota, unidadeMedida, ondeInserirAntes, tipoComponete)
            await buscarDadosDepois(id, res[0].dataHota, unidadeMedida, ondeInserirDepois, tipoComponete)
        })
}

async function buscarDadosAntes(id, dataReferencia, unidadeMedida, ondeInserir, tipoComponete) {
    dados = []
    return fetch(`/manutencao/buscarDadosAntes/${id}/${unidadeMedida}/${dataReferencia}/${tipoComponete}`)
        .then(res => res.json())
        .then(async res => {
            res.map(i => {
                dados.push(i.valor)
            })
            await plotarGrafico(dados, ondeInserir, "Antes da Manutenção")
        });
}

async function buscarDadosDepois(id, dataReferencia, unidadeMedida, ondeInserir, tipoComponete) {
    dados = []
    return fetch(`/manutencao/buscarDadosDepois/${id}/${unidadeMedida}/${dataReferencia}/${tipoComponete}`)
        .then(res => res.json())
        .then(async res => {
            res.map(i => {
                dados.push(i.valor)
            })
            await plotarGrafico(dados, ondeInserir, "Depois da Manutenção")
        });

}

function plotarGrafico(dados, ondeInserir, labelDescri) {
    colocar = document.getElementById(ondeInserir)

    return new Chart(colocar, {
        type: 'line',
        data: {
            labels: dados,
            datasets: [{
                label: labelDescri,
                data: dados,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(39, 115, 128, 0.582)'

                ],
                borderColor: [
                    'rgb(39, 115, 128)'

                ],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });

}

function historicoManutencao(id) {
    campoInserir = `manutencoesRegistro${id}`
    document.getElementById(campoInserir).innerHTML = ''
    fetch(`/manutencao/buscarManutencao/${id}`)
        .then(res => res.json())
        .then(res => {
            res.map(i => {
                console.log(i)
                document.getElementById(campoInserir).innerHTML += `
                <div class="col-md-12">
                    <p> Data: ${i.dataHota} </p>
                    <p> Responsavel: ${i.nome} </p>
                    <p> Descrição: ${i.descricaoManutencao} </p> 
                    <br>
                </div>  
           
         `

            })
        })
}
