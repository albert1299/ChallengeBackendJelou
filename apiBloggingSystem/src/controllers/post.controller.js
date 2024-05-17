const PostModel = require('../models/post.model');

exports.insert = async (req, res) => {
    try {
        req.body.author = req.jwt.userId;

        let newPost = await PostModel.createPost(req.body);
        res.status(201).send({
            status: 201,
            message: `Post con id ${newPost._id} creado exitosamente`,
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
        let posts = await PostModel.list(req.query.tags, req.query.categories);
        res.status(200).json({
            status: 200,
            message: "Posts obtenidos exitosamente",
            posts,
            errors: []
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
        const { postId } = req.params;

        req.body.author = req.jwt.userId;

        await PostModel.updatePost(postId, req.body);

        res.status(200).send({
            status: 200,
            message: `Post con id ${postId} actualizado exitosamente`,
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
        const { postId } = req.params;

        await PostModel.removeById(postId);

        res.status(200).send({
            status: 200,
            message: `Post con id ${postId} eliminado exitosamente`,
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
