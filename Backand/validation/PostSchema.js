const Joi = require('@hapi/joi');

const added_post = Joi.object({
    Content: Joi.string().min(6).required(),
    CarId: Joi.string().required(),
    UserId: Joi.string().required()
});

module.exports = added_post;