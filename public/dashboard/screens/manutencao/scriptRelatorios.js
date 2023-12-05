async function baixarRelatorioManuntencao(idServidor) {
    //Obter dados formatados corretamente usando a função manutencoes
    const dados = await manutencoes(idServidor);

    //Criar CSV a partir dos dados
    const csvContent = 'data:text/csv;charset=utf-8,' +
        'id,dataHora,responsavel,descricao\n' +
        dados.map(row => Object.values(row).join(',')).join('\n');

    //Criar um link de download para o arquivo CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'relatorioManutencao.csv');

    // o link à página e simular o clique para iniciar o download
    document.body.appendChild(link);
    link.click();

    // o link após o download
    document.body.removeChild(link);
}

function manutencoes(idServidor) {
    dados = []
    return fetch(`/manutencao/buscarManutencao/${idServidor}`)
        .then(res => res.json())
        .then(res => {
            res.map(i => {
                dados.push({
                    id: i.idManutencao,
                    dataHora: i.dataHota,
                    responsavel: i.nome,
                    descricao: i.descricaoManutencao
                })
            })
            return dados
        })
}

async function relatorioAntesManutencao(idServidor) {
    const dataReferencia = await buscarDataReferenciaManutencao(idServidor)
    const dados = await antesDaManutencaoRelatorio(idServidor, dataReferencia)
    imprimirRelatorio(dados)
}

function antesDaManutencaoRelatorio(idServidor, dataReferencia) {
    dados = []
    return fetch(`/manutencao/antesDaManutencaoRelatorio/${idServidor}/${dataReferencia}`)
        .then(res => res.json())
        .then(async res => {
            res.map(i => {
                dados.push({
                    id: i.idRegst,
                    valor: i.valor,
                    dataHora: i.dataHora,
                    alerta: i.alerta,
                    componente: i.idComp,
                    nome: i.nome,
                    tipo: i.tipo,
                    sinal: i.sinal
                })
            })
            return dados
        });
}

async function relatorioDepoisManutencao(idServidor) {
   
    const dataReferencia = await buscarDataReferenciaManutencao(idServidor);
    const dados = await depoisDaManutencaoRelatorio(idServidor, dataReferencia);
    imprimirRelatorio(dados)
    
}

function depoisDaManutencaoRelatorio(idServidor, dataReferencia) {
    dados = []
    dados = []
    return fetch(`/manutencao/depoisDaManutencaoRelatorio/${idServidor}/${dataReferencia}`)
        .then(res => res.json())
        .then(async res => {
            res.map(i => {
                dados.push({
                    id: i.idRegst,
                    valor: i.valor,
                    dataHora: i.dataHora,
                    alerta: i.alerta,
                    componente: i.idComp,
                    nome: i.nome,
                    tipo: i.tipo,
                    sinal: i.sinal
                })
            })
            return dados
        });
}

function buscarDataReferenciaManutencao(idServidor) {
    return fetch(`/manutencao/buscarUltimaManutencao/${idServidor}`)
        .then(res => res.json())
        .then(async res => {
            return res[0].dataHota

        })
}

function imprimirRelatorio(dados) {

    //Criar CSV a partir dos dados
    const csvContent = 'data:text/csv;charset=utf-8,' +
        'id,valor,dataHora,alerta,componente,nome,tipo,sinal\n' +
        dados.map(row => Object.values(row).join(',')).join('\n');

    //Criar um link de download para o arquivo CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'relatorioManutencao.csv');
    //Adicionar o link à página e simular o clique para iniciar o download
    document.body.appendChild(link);
    link.click()
    //Remover o link após o download
    document.body.removeChild(link);
}


