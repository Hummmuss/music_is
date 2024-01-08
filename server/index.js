require ('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('../server/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());ti
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));


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

