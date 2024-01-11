const express = require('express');
const userAuthController = require('../../controllers/users_controllers/userAuthController');
const router = express.Router();

router.post('/signup', userAuthController.signup);
router.post('/login', userAuthController.login);

module.exports = router;
