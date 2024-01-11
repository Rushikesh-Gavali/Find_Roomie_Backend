const express = require("express");
const router = express.Router();
const { updateUserDetails } = require("../../controllers/users_controllers/userUpdateController");
const authenticateToken = require('../../middlewares/authenticateToken');
const { uploadUsers } = require("../../middlewares/multerMiddleware");

router.use(express.json());

router.put('/users/:id', authenticateToken,uploadUsers.single('photo'), updateUserDetails);

module.exports = router;
