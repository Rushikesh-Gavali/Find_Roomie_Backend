const express = require('express');
const router = express.Router();
const userGetController = require('../../controllers/users_controllers/userGetController');

router.use(express.json());


router.get("/users", userGetController.getAllUsers);


router.get("/users/:id", userGetController.getSingleUser);

module.exports = router;
