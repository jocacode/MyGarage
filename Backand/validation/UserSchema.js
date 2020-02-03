const Joi = require('@hapi/joi');

const register_user = Joi.object({
    Username: Joi.string().min(6).required(),
    Email: Joi.string().min(6).required().email(),
    Password: Joi.string().min(6).required()

});

module.exports = register_user;