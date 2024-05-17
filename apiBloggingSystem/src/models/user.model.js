const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

exports.findByEmail = async (email) => {
    return await User.findOne({ email: email });
};

exports.findByUsername = async (username) => {
    return await User.findOne({ username: username });
};

exports.findById = async (id) => {
    return await User.findById(id)
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

/* VALIDATORS */
exports.emailExists = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El email: ${email}, ya está registrado`);
    }
}

exports.usernameExists = async (username = '') => {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        throw new Error(`El username: ${username}, ya está registrado`);
    }
}