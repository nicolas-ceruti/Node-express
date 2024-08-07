const express = require('express');

const { connect } = require('./src/models/sequelize');
const userRouter = require('./src/routes/userRouter').userRouter;
const comandaRouter = require('./src/routes/comandaRouter').comandaRouter;
const swaggerDocs = require('./swagger');

const app = express();
app.use(express.json());
app.use('/RestAPIFurb/users', userRouter());
app.use('/RestAPIFurb/comandas', comandaRouter());


const PORT = process.env.PORT || 8080;

app.use('/api-docs', swaggerDocs.swaggerUi.serve, swaggerDocs.swaggerUi.setup(swaggerDocs.swaggerSpec));

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

