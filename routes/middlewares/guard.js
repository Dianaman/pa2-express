var express = require('express');
var jwt = require('express-jwt');


var router = express.Router();

router.use(/*function(req, res, next) {
    console.log(req);

    if(req.headers.user) { // comprobar que sea el jwt
        next();
    } else {
        res.send(401, 'Debe autenticarse primero');
    }

    

}*/
    jwt({
        secret: 'shhhhhhared-secret',
        algorithms: ['HS256']
    })
    .unless({
        path: ['/login', '/users']
    })
);

module.exports = router;
