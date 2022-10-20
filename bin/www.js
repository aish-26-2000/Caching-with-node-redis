//Module dependencies.
require('dotenv').config();
//require('dotenv').config({path : './config.env'});
const http = require('http');
const { CONSTANTS } = require('../src/config');
const app = require('../caching');
const redis = require('redis');


/**
 * Normalize a port into a number, string, or false.
 */
 function normalizePort(val) {
    const port = parseInt(val, 10);

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(CONSTANTS.APP.port || process.env.PORT);
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error({
                message: `${bind} requires elevated privileges`,
                level: 'error',
            });
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error({
                message: `${bind} is already in use`,
                level: 'error',
            });
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Server listening at ${bind} in ${CONSTANTS.APP.env} mode`);
 
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
