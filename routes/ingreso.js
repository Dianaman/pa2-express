var express = require('express');
var router = express.Router();

router.put('/', function(req, res, next) {
    const { legajo } = req.body;
    let values = [legajo];

    let query = "SELECT * FROM `ingresos` WHERE legajo = ? AND DATE(`hora`) = CURDATE()";

    req.db.query(query, values, function(err, results) {
        if (!err) {
            if (results.length) {
                res.send({code: 500, data: 'El usuario ya hizo un ingreso el día de hoy'});
            }
            else {
                const valuesInsert = [legajo];

                let queryInsert = 'INSERT INTO ingresos (legajo) ';
                queryInsert += 'VALUES (?) ';

                req.db.query(queryInsert, valuesInsert, function(error, rows, fields) {
                    if (!error) {
                      res.status(200).send({code: 200, data: rows});
                    } else {
                      res.status(500).send({code: 500, data: error});
                    }
                });
            }
        } else {
            res.status(500).send({code: 500, data: err});
        }
    });
});


router.get('/', function(req, res, next) {
    console.log('user', req.user);
    
    if (req.user?.tipo === 'admin') {
        getIngresosAdmin(req, res, next);
    } else {
        getIngresosUser(req, res, next);
    }
});

function getIngresosUser(req, res, next) {
    const values = [req.user];

    let query = 'SELECT hora ';
    query += 'FROM ingresos ';
    query += 'WHERE legajo = ? ';

    req.db.query(query, values, function(err, results) {
        if (!err) {
            res.status(200).send({code: 200, data: results});
          } else {
            res.status(500).send({code: 500, data: err});
          }
    });
}

function getIngresosAdmin(req, res, next) {
    
    let query = 'SELECT legajo, MAX(hora) AS hora ';
    query += 'FROM ingresos ';
    query += 'GROUP BY legajo DESC ';

    req.db.query(query, function(err, results) {
        if (!err) {
            res.status(200).send({code: 200, data: results});
          } else {
            res.status(500).send({code: 500, data: err});
          }
    });
}

module.exports = router;