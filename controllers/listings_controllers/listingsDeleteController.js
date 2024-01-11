const { use } = require('../../routes/users_routes/userAuthRoutes');
const listingsDeleteService = require('../../services/listings_services/listingsDeleteService');

const softDeleteListing = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const listingsId = req.params.id;
    // console.log(listingsId);

    const result = await listingsDeleteService.softDeleteListing(listingsId, userId);

    if (result.error) {
      return res.status(404).json({ 
        response_code:404,
        response_message:'error',
        error: result.error });
    }

    res.status(200).json({
      response_code:200,
      response_message: 'Success',
      data: result.deletedListing,
    });
  } catch (error) {
    console.error(`Error deleting listing: ${error}`);
    res.status(500).json({response_code:500, response_message:'error', error: 'Error deleting listing' });
  }
};

module.exports = {
  softDeleteListing,
};
