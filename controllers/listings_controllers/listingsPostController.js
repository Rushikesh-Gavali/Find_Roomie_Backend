const listingsPostService = require('../../services/listings_services/listingsPostService');

async function createListing(req, res) {
 
  try {
    const {
      address,
      state,
      country,
      pincode,
      latitude,
      longitude,
      deposit,
      rent,
      available_from,
      no_of_current_roommates,
      no_of_current_female_roommates,
      no_of_current_male_roommates,
      is_furnished,
      min_age,
      max_age,
      gender_preference,
      no_of_roommates_required,
    } = req.body;

    const userId = req.userId; 
    console.log("Listing Data", req.body ,userId)
    // const photoUrl = req.file ? `/public/listings/${req.file.filename}` : 'default_photo_url';
    const photoUrl=req.file ? req.file.location : 'Photo Unavailable...!';
    // const photoUrl=req.file.location

    const listingData = {
      address,
      state,
      country,
      pincode,
      latitude,
      longitude,
      deposit,
      rent,
      available_from,
      no_of_current_roommates,
      no_of_current_female_roommates,
      no_of_current_male_roommates,
      is_furnished,
      min_age,
      max_age,
      gender_preference,
      no_of_roommates_required,
    };

    const result = await listingsPostService.createListing(listingData, userId, photoUrl);

    res.status(201).json({
      response_code: 200,
      response_message: 'Success',
      Data: result,
    });
  } catch (error) {
    console.error('Error creating listing controller:', error.message); // Log the specific error message
   
    res.status(500).json({
      response_code:200,
      response_message:'error',
       error: 'Error creating listing'+ error });
  }
}

module.exports = { createListing };
