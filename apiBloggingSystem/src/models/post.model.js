const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String
  }],
  categories: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

exports.createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

exports.list = async (tags, categories) => {
  let query = {};
  if (tags) {
    query.tags = { $in: tags.split(',') };
  }

  if (categories) {
    query.categories = { $in: categories.split(',') };
  }

  return await Post.find(query).populate('author', '-_id username email'); ; 
};

exports.updatePost = async (id, postData) => {
  return await Post.findOneAndUpdate({
    _id: id
  }, postData);
};


exports.removeById = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};