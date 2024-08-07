const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Carregar variáveis de ambiente

const DB_PATH = process.env.DB_PATH; 

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH, // Caminho para o arquivo do banco de dados SQLite
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    comandaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Comandas',
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: false,
});

const Comanda = sequelize.define('Comanda', {
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nomeUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefoneUsuario: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false, 
});

Comanda.hasMany(Produto, { foreignKey: 'comandaId' });
Produto.belongsTo(Comanda, { foreignKey: 'comandaId' });


const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao SQLite com Sequelize!');
        await sequelize.sync(); // Cria as tabelas se não existirem
    } catch (error) {
        console.error('Erro ao conectar ao SQLite:', error);
    }
};

module.exports = { sequelize, User, connect, Comanda, Produto };
