const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'MusicIS',
        description: 'Description'
    },
    host: 'localhost:5000'
};

const outputFile = './swagger-output.js';
const routes = ["./routes/index.js"];


swaggerAutogen(outputFile, routes, doc);