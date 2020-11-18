var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    const { legajo, clave } = req.body;
  
    let query = 'SELECT * ';
    query += 'FROM users ';
    query += 'WHERE legajo = ? ';
    query += 'AND clave = ?';

    const values = [legajo, clave];
  
    req.db.query(query, values, function(err, results) {
      if (!err) {
        if (results && results.length) {
          const {legajo, tipo} = results[0];
          console.log('user', results[0]);
          const user = {
            legajo,
            tipo
          };
          const token = jwt.sign({tipo: tipo, legajo: legajo}, 'shhhhhhared-secret');
          
          res.status(200).send({code: 200, data: token});
        } else {
          res.status(401).send({code: 401, data: 'Usuario o contraseña inválidos'});
        }
      } else {
        res.status(500).send({code: 500, data: err});
      }
    });
});
  

module.exports = router;