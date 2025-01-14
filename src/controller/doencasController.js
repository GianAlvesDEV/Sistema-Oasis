const database = require('../models');

async function findAll(req, res) {
    try {
        const doencasArray = await database.doencas.findAll();
        res.json(doencasArray);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar doenças', erro: err.message});
    }
}

async function findByName(req, res) {
    try {
        const doenca = await database.doencas.findAll(
            {
                where : {
                    nome: req.params.nome
                }
            }
        );
        res.json(doenca);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar doenças', erro: err.message});
    }
}

async function create(req, res) {
    try {
        const doenca = await database.doencas.create({
            nome: req.body.nome
        });
        
        res.json(doenca);
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao criar doença', erro: err.message});
    }
}

async function alter(req, res) {

    try {
        const verificacao = await database.doencas.update({
            nome: req.body.nome,
        },{
            where: {
                id: req.params.id
            }
        });

        if(verificacao > 0) {
            const doenca = await database.doencas.findByPk(req.params.id);
            res.json(doenca);
        } else {
            res.json({mensagem: "Doença inexistente"});
        }
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar doença', erro: err.message});
    }
}

async function remove(req, res) {
    try {
        const doenca = await database.doencas.findByPk(req.params.id);

        res.json({mensagem: `${doenca.nome} excluído com sucesso`});
        doenca.destroy();
    } catch(err) {
        res.status(500).json({mensagem:' Erro ao buscar doença', erro: err.message});
    }
}

module.exports = {
    findAll,
    findByName,
    create,
    alter,
    remove
}