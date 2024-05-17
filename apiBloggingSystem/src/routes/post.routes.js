const PostController = require('../controllers/post.controller');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const ValidationFields = require('../middlewares/validateFields.middleware');
const PostModel = require('../models/post.model');
const { check } = require('express-validator');

exports.routesConfig = function (app) {
    app.post('/api/v1/posts', [
        ValidationMiddleware.validJWTNeeded,
        check('title','El title es obligatorio').not().isEmpty(),
        check('content','El content es obligatorio').not().isEmpty(),
        ValidationFields.validateFields,
        PostController.insert
    ]);

    app.get('/api/v1/posts', [
        ValidationMiddleware.validJWTNeeded,
        PostController.list
    ]);

    app.put('/api/v1/posts/:postId', [
        ValidationMiddleware.validJWTNeeded,
        check('postId','No es un id válido').isMongoId(),
        check('postId').custom( PostModel.postIdExists ),
        check('title','El title es obligatorio').not().isEmpty(),
        check('content','El content es obligatorio').not().isEmpty(),
        ValidationFields.validateFields,
        PostController.update
    ]);

    app.delete('/api/v1/posts/:postId', [
        ValidationMiddleware.validJWTNeeded,
        check('postId','No es un id válido').isMongoId(),
        check('postId').custom( PostModel.postIdExists ),
        ValidationFields.validateFields,
        PostController.removeById
    ]);
};