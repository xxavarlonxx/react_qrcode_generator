const Joi = require('joi');

const qrcodeSchema = Joi.object({
  url: Joi.string().trim().uri().required(),
  size: Joi.number().min(100).max(500),
});

module.exports = {
  qrcodeSchema,
};
