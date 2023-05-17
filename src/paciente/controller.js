require('dotenv').config()
const { json, QueryTypes } = require('sequelize');
const db = require('../db/connect');
const pacientes = require('../paciente/model');
const responsaveis = require('../responsavel/model');

async function findAll(req, res) {
    try {
        const pacientesArray = await pacientes.findAll({include: responsaveis});
        res.json(pacientesArray);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar pacientes', erro: err.message});
    }
}

async function findByName(req, res) {
    try {
        const paciente = await db.returnInstance().query('SELECT * FROM pacientes WHERE nome = :nome', {
            replacements: {nome: `${req.params.nome}` || ''},
            type: QueryTypes.SELECT
        });
        res.json(paciente);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

async function create(req, res) {
    try {
        const paciente = await pacientes.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            doenca: req.body.doenca,
            data_nascimento: req.body.data_nascimento
        });
        
        res.json(paciente);
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao criar paciente', erro: err.message});
    }
}

async function alter(req, res) {

    try {
        const verificacao = await pacientes.update({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            doenca: req.body.doenca,
            data_nascimento: req.body.data_nascimento
        },{
            where: {
                id_paciente: req.params.id
            }
        });

        if(verificacao > 0) {
            const paciente = await pacientes.findByPk(req.params.id);
            res.json(paciente);
        } else {
            res.json({mensagem: "Paciente inexistente"});
        }
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

async function remove(req, res) {
    try {
        const paciente = await pacientes.findByPk(req.params.id);

        res.json({mensagem: `${paciente.nome} excluído com sucesso`});
        paciente.destroy();
    } catch(err) {
        res.status(404).json({mensagem:' Erro ao buscar paciente', erro: err.message});
    }
}

module.exports = {
    findAll,
    findByName,
    create,
    alter,
    remove
}
