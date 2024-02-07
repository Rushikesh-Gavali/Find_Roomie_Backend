const express = require('express');
const router = express.Router();
const userGetController = require('../../controllers/users_controllers/userGetController');
const authenticateToken = require('../../middlewares/authenticateToken');

router.use(express.json());


router.get("/users", userGetController.getAllUsers);


router.get("/users/my-profile",authenticateToken, userGetController.getSingleUser);

module.exports = router;
