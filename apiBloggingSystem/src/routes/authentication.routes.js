const VerifyUserMiddleware = require('../middlewares/verify.user.middleware');
const AuthController = require('../controllers/authentication.controller');

exports.routesConfig = function (app) {
    app.post('/api/v1/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ]);
};