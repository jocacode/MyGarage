const Joi = require('@hapi/joi');

const added_comment = Joi.object({
    Content: Joi.string().required(),
    PostId: Joi.required(),
    UserId: Joi.required()
});

module.exports = added_comment;