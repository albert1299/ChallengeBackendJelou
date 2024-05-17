const UsersController = require('../controllers/user.controller');

exports.routesConfig = function (app) {
    app.post('/api/v1/users', [
        UsersController.insert
    ]);
};