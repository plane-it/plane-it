const manutencaoModel = require("../models/manutencaoModel.js")

function buscarServidorController(req, res) {
    const fkAeroporto = req.params.fkAeroporto
    console.log(`buscando servidores`);

    manutencaoModel.buscarServidoresModel(fkAeroporto).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os servidores.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarManutencaoController(req, res) {
    const fkServidor = req.params.fkServidor
    console.log(req.params.fkServidor)
    console.log(`buscando manutencoes`);

    manutencaoModel.buscarManutencaoModel(fkServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas manutenções.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimaManutencaoController(req, res) {
    const fkServidor = req.params.fkServidor
    console.log(req.params.fkServidor)
    console.log(`buscando ultimaManutencao`);

    manutencaoModel.buscarUltimaManutencaoModel(fkServidor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas manutenções.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosAntesController(req, res) {
    const fkServidor = req.params.fkServidor
    const unidadeMedida = req.params.unidadeMedida
    const dataReferencia = req.params.dataReferencia
    const tipoComponente = req.params.tipoComponente

    console.log(`buscando dados`);

    manutencaoModel.buscarDadosAntesModel(fkServidor,unidadeMedida,dataReferencia,tipoComponente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas manutenções.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosDepoisController(req, res) {
    const fkServidor = req.params.fkServidor
    const unidadeMedida = req.params.unidadeMedida
    const dataReferencia = req.params.dataReferencia
    const tipoComponente = req.params.tipoComponente

    console.log(`buscando dados`);

    manutencaoModel.buscarDadosDepoisModel(fkServidor,unidadeMedida,dataReferencia,tipoComponente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas manutenções.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosAntesRelatorioController(req, res) {
    const fkServidor = req.params.fkServidor
    const dataReferencia = req.params.dataReferencia

    console.log(`buscando dados`);

    manutencaoModel.buscarDadosAntesModel(fkServidor,dataReferencia).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas manutenções.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosDepoisRelatorioController(req, res) {
    const fkServidor = req.params.fkServidor
    const dataReferencia = req.params.dataReferencia

    console.log(`buscando dados`);

    manutencaoModel.buscarDadosDepoissModel(fkServidor,dataReferencia).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas manutenções.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarServidorController,
    buscarManutencaoController,
    buscarUltimaManutencaoController,
    buscarDadosAntesController,
    buscarDadosDepoisController,
    buscarDadosAntesRelatorioController,
    buscarDadosDepoisRelatorioController
 }