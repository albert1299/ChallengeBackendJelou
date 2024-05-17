const UserModel = require('../models/user.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('No se ha ingresado el email');
        }
        if (!req.body.password) {
            errors.push('No se ha ingresado el password');
        }

        if (errors.length) {
            return res.status(400).send({
                status: 400,
                errors: errors.join(',')
            });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({
            status: 400,
            errors: 'No se han ingresado ni email ni password'
        });
    }
};

exports.isPasswordAndUserMatch = async (req, res, next) => {

    let user = await UserModel.findByEmail(req.body.email);
    if (!user) {
        return res.status(403).send({});
    }
    let passwordFields = user.password.split('$');
    let salt = passwordFields[0];
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    if (hash === passwordFields[1]) {
        req.body = {
            userId: user._id,
            email: user.email,
            email: user.username,
            provider: 'email'
        };
        return next();
    } else {
        return res.status(401).send({
            status: 401,
            errors: ['email o password incorrectas'] });
    }
};