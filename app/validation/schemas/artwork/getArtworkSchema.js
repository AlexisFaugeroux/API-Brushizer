import Joi from 'joi';

export default Joi.object({
    name: Joi.string().min(2),
    image: Joi.string().min(2),
    description: Joi.string().min(2),
    artist_name: Joi.string().min(2),
    price_usd: Joi.number().positive(),
    price_sol: Joi.number().positive(),
    created_at: Joi.date().timestamp(),
    updated_at: Joi.date().timestamp(),
    user_id: Joi.number().integer(),
    collection_id: Joi.number().integer(),
});
