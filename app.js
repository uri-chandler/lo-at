const express = require('express');
const Toolog = require('toolog');

const app = express();
const log = new Toolog('lo-at');

const PORT = process.env.LOAT_PORT || 3000;

log.banner('Welcome to Lo-At!');

app.use('/', (req, res) => {
    res.end('Hi there!');
});


log.info('Starting server');

app.listen(PORT, error => {
    if (error)
        log.error('Something broke!', error);
    else
        log.info(' -> Listening @ http://localhost/');
});