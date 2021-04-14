const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/users', celebrate({
  headers: Joi.object().keys({}).unknown(true),
}), getUsers);

usersRouter.get('/users/me', celebrate({
  headers: Joi.object().keys({}).unknown(true),
}), getCurrentUser);

usersRouter.get('/users/:userId', celebrate({
  headers: Joi.object().keys({}).unknown(true),
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

usersRouter.patch('/users/me', celebrate({
  headers: Joi.object().keys({}).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

usersRouter.patch('/users/me/avatar', celebrate({
  headers: Joi.object().keys({}).unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(/^(http|https):\/\/(www\.)?[\w-._~:/?#[\]@!$&'()*+,;=%]+#?$/i)),
  }),
}), updateAvatar);

module.exports = usersRouter;
