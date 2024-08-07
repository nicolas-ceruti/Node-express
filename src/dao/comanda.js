const { Comanda, Produto } = require('../models/sequelize');

class ComandaDAO {

    static async criarComanda(dadosComanda) {
        try {
            const { idUsuario, nomeUsuario, telefoneUsuario, produtos } = dadosComanda;
            const comanda = await Comanda.create({
                idUsuario,
                nomeUsuario,
                telefoneUsuario
            });

            if (produtos && produtos.length) {
                await Promise.all(produtos.map(produto => 
                    Produto.create({ ...produto, comandaId: comanda.id })
                ));
            }

            const comandaComProdutos = await Comanda.findByPk(comanda.id, {
                include: Produto
            });

            return comandaComProdutos;
        } catch (error) {
            console.error('Erro ao criar comanda:', error);
            throw error;
        }
    }

    static async obterComandaPorId(id) {
        try {
            const comanda = await Comanda.findByPk(id, {
                include: Produto
            });
            if (!comanda) throw new Error('Comanda não encontrada');
            return comanda;
        } catch (error) {
            console.error('Erro ao obter comanda:', error);
            throw error;
        }
    }

    static async obterComandas() {
        try {
            const comandas = await Comanda.findAll({
                include: Produto
            });
            if (!comandas) throw new Error('Nenhuma comanda foi encontrada');
            return comandas;
        } catch (error) {
            console.error('Erro ao obter comandas:', error);
            throw error;
        }
    }

    static async atualizarComanda(id, dadosAtualizados) {
        try {
            const comanda = await Comanda.findByPk(id);
            if (!comanda) throw new Error('Comanda não encontrada');

            const novosDados = {
                idUsuario: dadosAtualizados.idUsuario !== undefined ? dadosAtualizados.idUsuario : comanda.idUsuario,
                nomeUsuario: dadosAtualizados.nomeUsuario !== undefined ? dadosAtualizados.nomeUsuario : comanda.nomeUsuario,
                telefoneUsuario: dadosAtualizados.telefoneUsuario !== undefined ? dadosAtualizados.telefoneUsuario : comanda.telefoneUsuario,
            };

            await comanda.update(novosDados);

            if (dadosAtualizados.produtos && dadosAtualizados.produtos.length > 0) {
                const produtosExistentes = await Produto.findAll({ where: { comandaId: comanda.id } });
                const produtosExistentesMap = produtosExistentes.reduce((map, produto) => {
                    map[produto.id] = produto;
                    return map;
                }, {});

                // Atualiza ou cria novos produtos
                for (const produtoNovo of dadosAtualizados.produtos) {
                    if (produtosExistentesMap[produtoNovo.id]) {
                        // Atualiza o produto existente
                        await produtosExistentesMap[produtoNovo.id].update(produtoNovo);
                        delete produtosExistentesMap[produtoNovo.id];
                    } else {
                        await Produto.create({ ...produtoNovo, comandaId: comanda.id });
                    }
                }

            }

            const comandaAtualizada = await Comanda.findByPk(id, {
                include: Produto
            });

            return comandaAtualizada;

        } catch (error) {
            console.error('Erro ao atualizar comanda:', error);
            throw error;
        }
    }


    static async removerComanda(id) {
        try {
            const comanda = await Comanda.findByPk(id);
            if (!comanda) throw new Error('Comanda não encontrada');

            await Produto.destroy({ where: { comandaId: id } });

            await comanda.destroy();
            return { success: { text: 'Comanda removida' } };
        } catch (error) {
            console.error('Erro ao remover comanda:', error);
            throw error;
        }
    }
}

module.exports = ComandaDAO;
