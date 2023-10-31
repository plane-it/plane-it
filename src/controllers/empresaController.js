const empresaModel = require("../models/empresaModel.js")
const usuarioModel = require("../models/usuarioModel.js")

function existe(req, res) {
    const { cnpj } = req.body

    if (!cnpj) {
        res.status(400).json({ error: "Existe parametros faltando" })
    }
    else {
        empresaModel.existe(cnpj)
            .then((resposta) => {

                if (resposta.length == 0) {
                    res.status(200).json({ existe: false })
                }
                else {
                    res.status(400).json({ error: "Cnpj já esta em uso" })
                }
            })
            .catch((error) => {
                res.status(500).json({ error: error })
            })
    }
}

function cadastrar(req, res) {
    const { nomeEmpresa, cnpj,razaoSocial,endereco,cpf, nomeFuncionario, email, senha } = req.body

    if (!nomeEmpresa || !cnpj || !razaoSocial || !endereco) {
        res.status(400).json({ error: "Existem parametros faltando" })
    }
    else {
        empresaModel.cadastrar(nomeEmpresa, cnpj,razaoSocial,endereco)
            .then((resposta) => {
                usuarioModel.cadastrar(cpf, nomeFuncionario, email, senha, resposta.insertId)
                    .then(() => {
                        res.status(200).json({ msg: "Cadastro efetuado com sucesso" })
                    })
            })
            .catch((error) => {
                res.status(500).json({ error: error })
            })
    }
}

function chamados(req, res){
    const {id} = req.params

    empresaModel.listarChamados(id)
        .then((respostas) => {
            res.status(200).json(respostas)
        })
        .catch(erro => {
            res.status(500).json({error: erro})
        })
}


module.exports = {
    existe,
    cadastrar,
    chamados
}