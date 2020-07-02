const Joi = require('@hapi/joi');
const register_user = require('./validation/UserSchema');
const added_post = require('./validation/PostSchema');
const added_comment = require('./validation/CommentSchema');

const registerValidation = (data) => {
    return register_user.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        Username: Joi.string().min(6).required(),
        Password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const PostValidation = (data) => {
    return added_post.validate(data);
}
const CommentValidation = (data) => {
    return added_comment.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.PostValidation = PostValidation;
module.exports.CommentValidation = CommentValidation;