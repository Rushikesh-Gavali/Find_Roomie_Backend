const express = require('express');
const router = express.Router();
const listingsGetController = require('../../controllers/listings_controllers/listingsGetController');
const authenticateToken = require('../../middlewares/authenticateToken');

router.use(express.json());

router.get('/listings/:page?', listingsGetController.getAllListings);

router.get('/listing/:id', listingsGetController.getSingleListing);

router.get('/my-listings',authenticateToken, listingsGetController.getUserListings);

module.exports = router;
