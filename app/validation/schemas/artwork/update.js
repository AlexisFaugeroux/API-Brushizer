import Joi from 'joi';

export default Joi.object({
    description: Joi.string()
        .min(2),
    price_usd: Joi.number()
        .positive(),
    price_sol: Joi.number()
        .positive(),

}).min(1);
