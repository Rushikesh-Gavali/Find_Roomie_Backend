const pool = require('../../database/connection.js');

const softDeleteListing = async (listingId, userId) => {
  try {
    const softDeleteQuery = `
      UPDATE listings
      SET status = false
      WHERE id = $1 AND user_id = $2
      RETURNING id, user_id, address, state, country, pincode, latitude, longitude, deposit, rent, available_from, no_of_current_roommates, no_of_current_female_roommates, no_of_current_male_roommates, is_furnished, min_age, max_age, gender_preference, no_of_roommates_required, status
    `;

    const result = await pool.query(softDeleteQuery, [listingId, userId]);
    console.log('result rows='+listingId,userId);

    if (result.rowCount === 0) {
      return { response_code:404,
        response_message:'error',
        error: 'Listing not found' };
    }

    return { deletedListing: result.rows[0] };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  softDeleteListing,
};
