const express = require('express');
const router = express.Router();
const { criarComanda, obterComandaPorId, obterComandas, atualizarComanda, removerComanda } = require('../services/comandaService');

/**
 * @swagger
 * tags:
 *   name: Comanda
 *   description: Operações relacionadas às comandas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comanda:
 *       type: object
 *       required:
 *         - idUsuario
 *         - nomeUsuario
 *         - telefoneUsuario
 *         - produtos
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da comanda
 *         idUsuario:
 *           type: integer
 *           description: ID do usuário associado
 *         nomeUsuario:
 *           type: string
 *           description: Nome do usuário associado
 *         telefoneUsuario:
 *           type: string
 *           description: Telefone do usuário associado
 *         produtos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do produto
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto
 *       example:
 *         id: 1
 *         idUsuario: 1
 *         nomeUsuario: "João"
 *         telefoneUsuario: "478888888"
 *         produtos:
 *           - id: 1
 *             nome: "X-Salada"
 *             preco: 30
 *           - id: 2
 *             nome: "X-Bacon"
 *             preco: 35
 */

/**
 * @swagger
 * /comandas:
 *   post:
 *     summary: Cria uma nova comanda
 *     requestBody:
 *       description: Dados da nova comanda
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comanda'
 *     responses:
 *       201:
 *         description: Comanda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comanda'
 *       500:
 *         description: Erro ao criar a comanda
 */
router.post('', async (req, res) => {
    try {
        const dadosComanda = req.body;
        const comanda = await criarComanda(dadosComanda);
        res.status(201).json(comanda);
    } catch (error) {
        console.error('Erro ao criar comanda:', error);
        res.status(500).json({ error: 'Erro ao criar comanda' });
    }
});

/**
 * @swagger
 * /comandas/{id}:
 *   get:
 *     summary: Obtém uma comanda pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da comanda
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comanda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comanda'
 *       404:
 *         description: Comanda não encontrada
 */
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const comanda = await obterComandaPorId(id);
        res.status(200).json(comanda);
    } catch (error) {
        console.error('Erro ao obter comanda:', error);
        res.status(404).json({ error: 'Comanda não encontrada' });
    }
});

/**
 * @swagger
 * /comandas:
 *   get:
 *     summary: Obtém todas as comandas
 *     responses:
 *       200:
 *         description: Lista de comandas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comanda'
 *       404:
 *         description: Nenhuma comanda encontrada
 */
router.get('', async (req, res) => {
    try {
        const comandas = await obterComandas();
        res.status(200).json(comandas);
    } catch (error) {
        console.error('Erro ao obter comandas:', error);
        res.status(404).json({ error: 'Nenhuma comanda encontrada' });
    }
});

/**
 * @swagger
 * /comandas/{id}:
 *   put:
 *     summary: Atualiza uma comanda pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da comanda
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados atualizados da comanda
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comanda'
 *     responses:
 *       200:
 *         description: Comanda atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comanda'
 *       400:
 *         description: Erro ao atualizar a comanda
 */
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const dadosAtualizados = req.body;
        const comanda = await atualizarComanda(id, dadosAtualizados);
        res.status(200).json(comanda);
    } catch (error) {
        console.error('Erro ao atualizar comanda:', error);
        res.status(400).json({ error: 'Erro ao atualizar comanda' });
    }
});

/**
 * @swagger
 * /comandas/{id}:
 *   delete:
 *     summary: Remove uma comanda pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da comanda
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comanda removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       example: 'Comanda removida'
 *       404:
 *         description: Comanda não encontrada
 */
router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const resultado = await removerComanda(id);
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao remover comanda:', error);
        res.status(404).json({ error: 'Comanda não encontrada' });
    }
});

module.exports = { comandaRouter: () => router };
