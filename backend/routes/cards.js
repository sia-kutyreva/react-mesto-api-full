const cardsRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  cardValidation,
} = require('../middlewere/dataValidation');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCardValidation, createCard);

cardsRouter.delete('/cards/:cardId', cardValidation, deleteCard);

cardsRouter.put('/cards/:cardId/likes', cardValidation, likeCard);

cardsRouter.delete('/cards/:cardId/likes', cardValidation, dislikeCard);

module.exports = cardsRouter;
