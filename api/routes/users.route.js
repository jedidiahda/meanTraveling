const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.put('/users',usersController.login);
router.post('/users', usersController.createOne);


module.exports = router;