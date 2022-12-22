import Joi from 'joi';

export default Joi.object({
    // email: Joi.string()
    //     .email({ minDomainSegments: 2 }),
    // password: Joi.string()
    //     .pattern(/^[a-zA-Z0-9]{3,30}$/, 'password'),
    // pseudo: Joi.string()
    //     .alphanum()
    //     .min(2)
    //     .max(30),
    description: Joi.string()
        .allow(''),
    profile_pic: Joi.string()
        .max(30),
}).min(1);
// .required();
