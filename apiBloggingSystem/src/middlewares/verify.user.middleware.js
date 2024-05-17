const UserModel = require('../models/user.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('El email es obligatorio');
        }
        if (!req.body.password) {
            errors.push('El password es obligatorio');
        }

        if (errors.length) {
            return res.status(400).send({
                status: 400,
                message: "Ha ocurrido algún error",
                errors
            });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({
            status: 400,
            message: "Ha ocurrido algún error",
            errors: ['Email y password son obligatorios']
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
            message: "Ha ocurrido algún error",
            errors: ['email o password incorrectas'] });
    }
};