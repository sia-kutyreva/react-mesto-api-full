const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validation: {
      validator(link) {
        let valid = false;
        const space = /\S/.test(link);
        const mainLink = /(https?:\/\/)?([\w\\.]+)\.([a-z]{2,6}\.?)(\/[\w\\.]*)*\/?\//.test(link);
        if (!space && mainLink) {
          valid = true;
        }
        return valid;
      },
      massage: 'Некорректный URL карточки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
