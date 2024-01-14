require ('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('../server/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const router = require('./routes/index')
const PORT = process.env.PORT || 5000;
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const app = express();

const swaggerSpec = require('./swagger-output.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Добавление bodyParser для обработки файлов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server started on port', PORT))
    } catch (e) {
        console.log(e)
    }
}
start()

