const UserModel = require('../models/user.model');
const crypto = require('crypto');

exports.insert = async (req, res) => {
    try {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;

        let newUser = await UserModel.createUser(req.body);

        res.status(201).send({
            status: 201, 
            message: `User con id ${newUser._id} creado exitosamente`,
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