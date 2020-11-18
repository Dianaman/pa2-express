var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log('body', req.body);

  const { legajo, clave, tipo } = req.body;

  // TODO: Validar

  let query = 'INSERT INTO users (legajo, clave, tipo) ';
  query += 'VALUES (?, ?, ?) ';

  const values = [legajo, clave, tipo];

  req.db.query(query, values, function(err, rows, fields) {
    if (!err) {
      res.send({code: 200, data: rows});
    } else {
      res.send({code: 500, data: err});
    }
  });

});

module.exports = router;
