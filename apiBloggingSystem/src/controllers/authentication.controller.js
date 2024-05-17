const jwtSecret = require('../common/config/env.config').jwt_secret,
    jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    try {
        const options = {
            expiresIn: '1h'
          };
        let token = jwt.sign(req.body, jwtSecret, options);
        res.status(201).send({
            status: 201,
            message: "Token obtenido exitosamente!", 
            accessToken: token,
            errors: []
        });
    } catch (error) {
        console.log("Error de servidor", error);
        res.status(500).send({
            status: 500,
            message: "",
            errors: ["Ha ocurrido un error de servidor"]
        });
    }
};