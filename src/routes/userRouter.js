const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware'); 
const userService = require('../services/userService');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       description: Dados do usuário para registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário registrado com sucesso!
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Erro ao registrar o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao registrar o usuário
 *                 error:
 *                   type: string
 *                   example: Ocorreu um erro
 */
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.registrarUsuario(username, password);
        res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: user.id });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao registrar o usuário', error: err.message });
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Users]
 *     requestBody:
 *       description: Dados de login do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Token gerado para o usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       500:
 *         description: Erro ao fazer login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao fazer login
 *                 error:
 *                   type: string
 *                   example: Ocorreu um erro
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await userService.loginUsuario(username, password);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
    }
});

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Acesso a uma rota protegida
 *     tags: [Users]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Mensagem de acesso a rota protegida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Você acessou uma rota protegida!
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: john_doe
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Não autorizado
 */
router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Você acessou uma rota protegida!', user: req.user });
});

module.exports = { userRouter: () => router };
