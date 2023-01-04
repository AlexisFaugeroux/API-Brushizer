import Joi from 'joi';

export default Joi.object({
    description: Joi.string()
        .allow(''),
    profile_pic: Joi.string()
        .max(30),
}).min(1);
