const express = require('express');
const router = express.Router();
const userDeleteController = require('../../controllers/users_controllers/userDeleteController');
const authenticateToken = require('../../middlewares/authenticateToken');

router.delete('/users', authenticateToken, userDeleteController.softDeleteUser);

module.exports = router;
