// src/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentação da API para o projeto Express',
    },
    servers: [
        {
          url: 'http://localhost:8080/RestAPIFurb', 
          description: 'Servidor local',
        },
    ]
  },
  apis: ['./src/routes/comandaRouter.js', './src/routes/userRouter.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = {
  swaggerUi,
  swaggerSpec,
};

module.exports = swaggerDocs;
