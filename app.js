require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes');


const { errorHandler, responseHelper } = require('./src/helpers');

const app = express();

app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 1000000,
    })
);
app.use(express.json({ limit: '50mb' }));
app.use(morgan('[:date[web]] :method :url :status :response-time ms - :res[content-length]'));

app.use('/api/v1', routes);

app.use(errorHandler);

process.on('uncaughtException', function (err) {
    console.log(err);
});

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', function (reason, p) {
    console.log(reason);
});

module.exports = app;
