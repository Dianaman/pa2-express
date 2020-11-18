var express = require('express');
const { STATUS_CODES } = require('http');
// const { Response } = require('../../models');

var router = express.Router();

router.use(function(req, res, next) {
    // loguear evento
    //hora, ip, ruta, método, usuario (si hay)
    
    const { url, method, user } = req;
    const ip = req.ip || req.connection?.remoteAddress;
    const usuario = user?.id;
    
    let query = 'INSERT INTO logs (usuario, metodo, ruta, ip)';
    query += 'VALUES (?, ?, ?, ?)';

    const values = [usuario, method, url, ip];
    
    req.db.query(query, values, function(err, rows, fields) {
        next();
    });
});

module.exports = router;
