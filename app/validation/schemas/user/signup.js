import Joi from 'joi';

export default Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/, 'password')
        .required(),
    pseudo: Joi.string()
        .min(2)
        .max(30)
        .required(),
    country: Joi.string()
        .pattern(/[a-zA-Z][a-zA-Z ]{2,30}/, 'country')
        .required(),
    description: Joi.string()
        .allow(''),
    profile_pic: Joi.string()
        .max(30),
    role_id: Joi.number()
        .positive()
        .min(1),
});
