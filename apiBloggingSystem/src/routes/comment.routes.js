const CommentController = require('../controllers/comment.controller');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const ValidationFields = require('../middlewares/validateFields.middleware');
const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');
const { check } = require('express-validator');

exports.routesConfig = function (app) {
    app.post('/api/v1/comments', [
        ValidationMiddleware.validJWTNeeded,
        check('content','El content es obligatorio').not().isEmpty(),
        check('post','El post es obligatorio').not().isEmpty(),
        check('post','No es un id válido').isMongoId(),
        check('post').custom( PostModel.postIdExists ),
        ValidationFields.validateFields,
        CommentController.insert
    ]);

    app.get('/api/v1/comments', [
        ValidationMiddleware.validJWTNeeded,
        CommentController.list
    ]);

    app.put('/api/v1/comments/:commentId', [
        ValidationMiddleware.validJWTNeeded,
        check('content','El content es obligatorio').not().isEmpty(),
        check('post','El post es obligatorio').not().isEmpty(),
        check('post','No es un id válido').isMongoId(),
        check('post').custom( PostModel.postIdExists ),
        check('commentId','No es un id válido').isMongoId(),
        check('commentId').custom( CommentModel.commentIdExists ),
        ValidationFields.validateFields,
        CommentController.update
    ]);

    app.delete('/api/v1/comments/:commentId', [
        ValidationMiddleware.validJWTNeeded,
        check('commentId','No es un id válido').isMongoId(),
        check('commentId').custom( CommentModel.commentIdExists ),
        ValidationFields.validateFields,
        CommentController.removeById
    ]);
};