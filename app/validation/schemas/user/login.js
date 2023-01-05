import Joi from 'joi';

export default Joi.object({
    pseudo: Joi.string()
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/, 'password')
        .required(),
});
