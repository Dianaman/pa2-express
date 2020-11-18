var express = require('express');
var router = express.Router();

router.put('/', function(req, res, next) {
    const { legajo } = req.body;

    let values = [legajo];

    let query = "SELECT * FROM `ingresos` WHERE legajo = ? AND DATE(`hora`) = CURDATE()";

    req.db.query(query, values, function(err, results) {
        if (!err) {
            if (results.length) {
                const hora = new Date();
                const valuesInsert = [legajo, hora];

                let queryInsert = 'INSERT INTO egresos (legajo)';
                queryInsert += 'VALUES (?)';

            
                req.db.query(query, values, function(error, rows, fields) {
                    if (!error) {
                      res.send({code: 200, data: rows});
                    } else {
                      res.send({code: 500, data: error});
                    }
                });
            }
            else {
                res.send({code: 500, data: 'El usuario no ha ingresado hoy.'});
            }
        } else {
            res.send({code: 500, data: err});
        }
    });
});

module.exports = router;