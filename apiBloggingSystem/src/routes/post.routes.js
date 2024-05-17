const PostController = require('../controllers/post.controller');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/api/v1/posts', [
        ValidationMiddleware.validJWTNeeded,
        PostController.insert
    ]);

    app.get('/api/v1/posts', [
        PostController.list
    ]);

    app.put('/api/v1/posts/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PostController.update
    ]);

    app.delete('/api/v1/posts/:postId', [
        PostController.removeById
    ]);
};