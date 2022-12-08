import Joi from 'joi';

export default Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/, 'password'),
    pseudo: Joi.string()
        .alphanum()
        .min(2)
        .max(30),
    profile_pic: Joi.string()
        .alphanum()
        .max(30),
    role_id: Joi.number()
        .positive()
        .min(1),

}).min(1);
// .required();
