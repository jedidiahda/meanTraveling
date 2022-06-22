const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = mongoose.model(process.env.USER_MODEL);

const createOne = function (req, res) {
  const { name, username, password } = req.body;

  if (!username || !password) {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_BAD_REQUEST,
      'User name and password are required'
    );
  } else if(password.length < process.env.DEFAULT_PASSWORD_MIN_LENGTH){
    _sendResponseBackToClient(
      res,
      process.env.STATUS_BAD_REQUEST,
      'Password must be greater than ' + process.env.DEFAULT_PASSWORD_MIN_LENGTH
    );
  }else {
    bcrypt
      .genSalt(parseInt(process.env.BCRYPT_SALT_ROUND))
      .then((value) => _hashPassword(password, value))
      .then((hashPwd) => _createUser(name, username, hashPwd))
      .then((user) =>
        _sendResponseBackToClient(res, process.env.STATUS_CREATED_SUCCESS, {
          name: user.name,
          username: user.username,
        })
      )
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      );
  }
};

const _createJwtToken = function (user) {
  const token = jwt.sign(
    JSON.stringify({
      name: user.name,
    }),
    process.env.JWT_SECRET
  );
  return { token };
};

const _createUser = function (name, username, hashPwd) {
  return Users.create({
    name,
    username,
    password: hashPwd,
  });
};

const _hashPassword = function (password, genValue) {
  return bcrypt.hash(password, genValue);
};

const _sendResponseBackToClient = function (res, status, message) {
  res.status(parseInt(status)).json(message);
};

const login = function (req, res) {
  const { username, password } = req.body;

  Users.findOne({
    username: username,
  })
    .exec()
    .then((user) => _checkAuthorization(res, user, password))
    .catch((err) =>
      _sendResponseBackToClient(
        res,
        process.env.STATUS_INTERNAL_ERROR,
        err.message
      )
    );
};

const _checkAuthorization = function (res, user, password) {
  let response = { status: process.env.STATUS_SUCCESS, message: {} };
  if (!user) {
    _sendResponseBackToClient(
      res,
      process.env.STATUS_NOT_FOUND,
      'User is unauthorized'
    );
  } else {
    bcrypt
      .compare(password, user.password)
      .then((isEqual) => _checkAuthorizationCallback(isEqual, user, response))
      .catch((err) =>
        _sendResponseBackToClient(
          res,
          process.env.STATUS_INTERNAL_ERROR,
          err.message
        )
      )
      .finally(() =>
        _sendResponseBackToClient(res, response.status, response.message)
      );
  }
};

const _checkAuthorizationCallback = function (isEqual, user, response) {
  if (isEqual) {
    response.message = _createJwtToken(user);
  } else {
    response.status = process.env.STATUS_BAD_REQUEST;
    response.message = 'Password is incorrect';
  }
  return response;
};

module.exports = {
  createOne,
  login,
};
