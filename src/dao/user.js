const { User } = require('../models/sequelize');

class UserDAO {

    static async criarUsuario(username, password) {
        try {
            const user = await User.create({ username, password });
            return user;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    };

    static async encontrarUsuarioPorUsername(username) {
        try {
            const user = await User.findOne({ where: { username } });
            return user;
        } catch (error) {
            console.error('Erro ao encontrar usuário:', error);
            throw error;
        }
    };

}

module.exports = UserDAO;
