import Joi from 'joi';

export default Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),
    image: Joi.string()
        .min(2)
        .max(30)
        .required(),
    description: Joi.string()
        .allow(''),
    artist_name: Joi.string()
        .min(2)
        .max(30)
        .required(),
    price_usd: Joi.number()
        .positive()
        .required(),
    price_sol: Joi.number()
        .positive()
        .required(),
    collection_id: Joi.number()
        .integer()
        .positive(),
});
