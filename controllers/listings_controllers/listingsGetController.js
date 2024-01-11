const listingsGetService = require('../../services/listings_services/listingsGetService');

//For All Listings...!
const getAllListings = async (req, res) => {
  try {
    const page = parseInt(req.params.page || 1);
    const listings = await listingsGetService.getAllListings(page);
    res.status(200).json({
      response_code: 200,
      response_message: "Success",
      current_page: page,
      data: listings
    });
  } catch (error) {
    console.error("Error Fetching Listings:", error);
    res.status(500).json({
      response_code:500,
      response_message:'error',
      error: "Error Fetching Listings",
    });
  }
};

//For Single Listing
const getSingleListing = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await listingsGetService.getSingleListing(listingId);
    
    if (listing) {
      res.status(200).json({
        response_code:200,
        response_message:'Success',
        data:listing
      });
    } else {
      res.status(404).json({response_code:404, response_message:'error', error: "Listing not found" });
    }
  } catch (error) {
    console.error("Error Fetching Single Listing:", error);
    res.status(500).json({
      response_code:500,
      response_message:'error',
      error: "Error Fetching Single Listing",
    });
  }
};

// For Getting Listings Uploaded By Logged In User
const getUserListings = async (req, res) => {
  try {
    const userId = req.userId;
    const userlistings = await listingsGetService.getUserListings(userId);
    // console.log('aaa'+userId);
    res.status(200).json({
      response_code:200,
      response_message:'Success',
      data:userlistings });
  } catch (error) {
    console.error("Error Fetching User's Listings:", error);
    res.status(500).json({
      response_code:500,
      response_message:'error',
      error: "Error Fetching User's Listings",
    });
  }
};

module.exports = {
  getAllListings,
  getSingleListing,
  getUserListings,
};
