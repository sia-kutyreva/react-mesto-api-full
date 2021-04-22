const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  updateAvatarValidation,
  updateProfileValidation,
  getUserByIdValidation,
} = require('../middlewere/dataValidation');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUser);

usersRouter.get('/users/:userId', getUserByIdValidation, getUserById);

usersRouter.patch('/users/me', updateProfileValidation, updateUserProfile);

usersRouter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = usersRouter;
