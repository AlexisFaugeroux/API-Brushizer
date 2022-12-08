import Joi from 'joi';

export default Joi.object({
    pseudo: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/, 'password')
        .required(),
});
// .required();
