
const express=require('express');
const router=express.Router();
const {updateListingDetails}=require('../../controllers/listings_controllers/listingsUpdateController');
const authenticateToken=require('../../middlewares/authenticateToken');
const {uploadListings}=require('../../middlewares/multerMiddleware');

router.use(express.json());

router.put('/listings/:id',authenticateToken,uploadListings.single('image'),updateListingDetails);

module.exports=router;
