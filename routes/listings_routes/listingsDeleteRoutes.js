const express = require('express');
const router = express.Router();
const listingsDeleteController = require('../../controllers/listings_controllers/listingsDeleteController');
const authenticateToken = require('../../middlewares/authenticateToken');

router.use(express.json());

router.delete('/listings/:id', authenticateToken, listingsDeleteController.softDeleteListing);

module.exports = router;
