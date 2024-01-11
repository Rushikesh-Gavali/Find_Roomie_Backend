const express = require('express');
const router = express.Router();
const listingsPostController = require('../../controllers/listings_controllers/listingsPostController');
const authenticateToken = require('../../middlewares/authenticateToken');

const {uploadListings}=require('../../middlewares/multerMiddleware')

router.use(express.json());

router.post('/listings', authenticateToken, uploadListings.single('image'), listingsPostController.createListing);

module.exports = router;
