// services/comandaService.js
const ComandaDAO = require('../dao/comanda');

const criarComanda = async (dadosComanda) => {
    try {
        return await ComandaDAO.criarComanda(dadosComanda);
    } catch (error) {
        console.error('Erro ao criar comanda:', error);
        throw error;
    }
};

const obterComandaPorId = async (id) => {
    try {
        return await ComandaDAO.obterComandaPorId(id);
    } catch (error) {
        console.error('Erro ao obter comanda:', error);
        throw error;
    }
};

const obterComandas = async () => {
    try {
        return await ComandaDAO.obterComandas();
    } catch (error) {
        console.error('Erro ao obter comandas:', error);
        throw error;
    }
};

const atualizarComanda = async (id, dadosAtualizados) => {
    try {
        return await ComandaDAO.atualizarComanda(id, dadosAtualizados);
    } catch (error) {
        console.error('Erro ao atualizar comanda:', error);
        throw error;
    }
};

const removerComanda = async (id) => {
    try {
        return await ComandaDAO.removerComanda(id);
    } catch (error) {
        console.error('Erro ao remover comanda:', error);
        throw error;
    }
};

module.exports = { criarComanda, obterComandaPorId, obterComandas, atualizarComanda, removerComanda };
