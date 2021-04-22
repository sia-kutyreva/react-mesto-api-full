const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helper.message('Некорректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Пароль должен быть не менее 8 символов',
        'any.required': 'Обязательное поле',
      }),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required()
      .custom((value, helper) => {
        if (!validator.isEmail(value)) {
          return helper.message('Некорректный email');
        }
        return value;
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string().min(8).required()
      .messages({
        'string.min': 'Пароль должен быть не менее 8 символов',
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
      }),
    avatar: Joi.string()
      .custom((value, helper) => {
        if (!validator.isURL(value)) {
          return helper.message('Некорректный email');
        }
        return value;
      }),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().required().keys({
    userId: Joi.string().length(24).hex()
      .messages({
        'string.length': 'Длина должна составлять 24 символа',
      }),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
      }),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helper.message('Некорректная ссылка на изображение');
      }),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Не менее 2-x символов',
        'string.max': 'Не более 30-x символов',
        'any.required': 'Обязательное поле',
      }),
    link: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helper.message('Некорректная ссылка на изображение');
      }),
  }),
});

const cardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Длина должна составлять 24 символа',
      }),
  }),
});

module.exports = {
  updateAvatarValidation,
  updateProfileValidation,
  getUserByIdValidation,
  createUserValidation,
  loginValidation,
  createCardValidation,
  cardValidation,
};
