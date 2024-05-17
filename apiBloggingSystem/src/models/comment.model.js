const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

exports.createComment = async (commentData) => {
  const comment = new Comment(commentData);
  return await comment.save();
};

exports.list = async () => {
  return await Comment.find()
    .populate('author', '-_id username email')
    .populate('post', '-_id title');
};

exports.updateComment = async (id, commentData) => {
  return await Comment.findOneAndUpdate({
    _id: id
  }, commentData);
};


exports.removeById = async (commentId) => {
  return await Comment.findByIdAndDelete(commentId);
};

/* VALIDATORS */
exports.commentIdExists = async( id ) => {
  const commentIdExists = await Comment.findById(id);
  if ( !commentIdExists ) {
      throw new Error(`El comment no existe ${ id }`);
  }
}