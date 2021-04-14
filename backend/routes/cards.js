const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', celebrate({
  headers: Joi.object().keys({}).unknown(true),
}), getCards);

cardsRouter.post('/cards', celebrate({
  headers: Joi.object().keys({}).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(/^(http|https):\/\/(www\.)?[\w-._~:/?#[\]@!$&'()*+,;=%]+#?$/i)),
  }),
}), createCard);

cardsRouter.delete('/cards/:cardId', celebrate({
  headers: Joi.object().keys({}).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), deleteCard);

cardsRouter.put('/cards/:cardId/likes', celebrate({
  headers: Joi.object().keys({}).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum(),
  }),
}), likeCard);

cardsRouter.delete('/cards/:cardId/likes', celebrate({
  headers: Joi.object().keys({}).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum(),
  }),
}), dislikeCard);

module.exports = cardsRouter;
