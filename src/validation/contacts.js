import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s-]+$/)
    .min(3)
    .max(20)
    .required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9\s\-()]+$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must contain only numbers, spaces, dashes, or parentheses and be 3-20 characters long',
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .custom((value, helpers) => {
      if (value.length < 3 || value.length > 20) {
        return helpers.error('string.min');
      }
      return value;
    })
    .messages({
      'string.min': 'Email must be between 3 and 20 characters',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .min(3)
    .max(20)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s-]+$/)
    .min(3)
    .max(20),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9\s\-()]+$/)
    .min(3)
    .max(20)
    .messages({
      'string.pattern.base':
        'Phone number must contain only numbers, spaces, dashes, or parentheses and be 3-20 characters long',
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .custom((value, helpers) => {
      if (value.length < 3 || value.length > 20) {
        return helpers.error('string.min');
      }
      return value;
    })
    .messages({
      'string.min': 'Email must be between 3 and 20 characters',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').min(3).max(20),
}).min(1);
