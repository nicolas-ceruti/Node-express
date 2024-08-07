const userDAO = require('../dao/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const registrarUsuario = async (username, password) => {
    try {
        const user = await userDAO.criarUsuario(username, password);
        return user;
    } catch (error) {
        throw error;
    }
};


const loginUsuario = async (username, password) => {
    try {
        const user = await userDAO.encontrarUsuarioPorUsername(username);
        if (!user || user.password !== password) {
            throw new Error('Credenciais inválidas');
        }

        console.log(user)
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1m' });
        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = { registrarUsuario, loginUsuario };
