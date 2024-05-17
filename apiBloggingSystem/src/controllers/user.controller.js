const UserModel = require('../models/user.model');
const crypto = require('crypto');

exports.insert = async (req, res) => {
    try {
        let emailExists = await UserModel.findByEmail(req.body.email);
        if (emailExists) {
            return res.status(409).send({
                status: 409,
                message: "El email ingresado ya existe"
            });
        }

        let usernameExists = await UserModel.findByUsername(req.body.username);
        if (usernameExists) {
            return res.status(409).send({
                status: 409,
                message: "El username ingresado ya existe"
            });
        }

        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;

        let newUser = await UserModel.createUser(req.body);

        res.status(201).send({ id: newUser._id });
    } catch (error) {
        console.log("Error de servidor", error);
        res.status(500).send({
            status: 500,
            message: "Ha ocurrido un error de servidor"
        });
    }
};