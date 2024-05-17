const UsersController = require('../controllers/user.controller');
const ValidationFields = require('../middlewares/validateFields.middleware');
const UserModel = require('../models/user.model');
const { check } = require('express-validator');


exports.routesConfig = function (app) {
    app.post('/api/v1/users', [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email').custom( UserModel.emailExists ),
        check('username').custom( UserModel.usernameExists ),
        ValidationFields.validateFields,
        UsersController.insert
    ]);
};