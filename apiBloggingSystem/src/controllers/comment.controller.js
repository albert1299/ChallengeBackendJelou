const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');

exports.insert = async (req, res) => {
    try {
        req.body.author = req.jwt.userId;

        let newComment = await CommentModel.createComment(req.body);
        res.status(201).send({
            status: 201,
            message: `Comment con id ${newComment._id} creado exitosamente`,
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

exports.list = async (req, res) => {
    try {
        let comments = await CommentModel.list();
        res.status(200).json({
            status: 200,
            message: "Comments obtenidos exitosamente",
            comments,
            erros: []
        })
    } catch (error) {
        console.log("Error de servidor", error);
        res.status(500).send({
            status: 500,
            message: "",
            errors: ["Ha ocurrido un error de servidor"]
        });
    }
}

exports.update = async (req, res) => {
    try {
        const { commentId } = req.params;

        req.body.author = req.jwt.userId;

        await CommentModel.updateComment(commentId, req.body);

        res.status(200).send({
            status: 200,
            message: `Comment con id ${commentId} actualizado exitosamente`,
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
}

exports.removeById = async (req, res) => {
    try {
        const { commentId } = req.params;

        await CommentModel.removeById(commentId);

        res.status(200).send({
            status: 200,
            message: `Comment con id ${commentId} eliminado exitosamente`,
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
