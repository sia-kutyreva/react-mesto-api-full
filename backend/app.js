require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const NotFoundError = require('./errors/not-found-err');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewere/auth');

const { requestLogger, errorLogger } = require('./middlewere/logger');

const {
  createUserValidation,
  loginValidation,
} = require('./middlewere/dataValidation');

const app = express();
const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://mesto.master.nomoredomains.icu',
    'http://mesto.master.nomoredomains.icu',
    'https://api.mesto.master.nomoredomains.icu',
    'http://api.mesto.master.nomoredomains.icu',
  ],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);

app.post('/signup', createUserValidation, createUser);

app.use('/', auth, usersRouter);
app.use('/', auth, cardsRouter);

app.use('*/', () => {
  throw new NotFoundError('Запрашиваемый ресур не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening port: ${PORT}`);
});
