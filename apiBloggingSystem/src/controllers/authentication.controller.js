const jwtSecret = require('../common/config/env.config').jwt_secret,
    jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    try {
        const options = {
            expiresIn: '1h'
          };
        let token = jwt.sign(req.body, jwtSecret, options);
        res.status(201).send({ accessToken: token });
    } catch (err) {
        res.status(500).send({ errors: err });
    }
};