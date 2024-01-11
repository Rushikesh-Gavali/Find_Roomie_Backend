const pool = require("../../database/connection");

const getAllListings = async (page) => {
  try {
    const page_limit = 50;
    const offset = (page - 1) * page_limit;

    const query = `
      SELECT list.id, list.user_id, list.address, list.state, list.country, list.pincode, list.latitude, 
      list.longitude, list.deposit, list.rent, list.available_from, list.no_of_current_roommates, 
      list.no_of_current_female_roommates, list.no_of_current_male_roommates, list.is_furnished, list.min_age, 
      list.max_age, list.gender_preference, list.no_of_roommates_required, list.status,
      usr.username, usr.mobile_no, usr.whatsapp_no, usr.photo,
      (SELECT ARRAY_AGG(ph.url) AS images
      FROM photos AS ph
      WHERE ph.listings_id = list.id)
      FROM listings AS list
      INNER JOIN users AS usr ON list.user_id = usr.id
      WHERE list.status = true AND usr.is_deleted = false
      ORDER BY list.id
      LIMIT $1
      OFFSET $2
    `;

    const result = await pool.query(query, [page_limit, offset]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getSingleListing = async (listingId) => {
  try {
    const query = `
      SELECT id, user_id, address, state, country, pincode, latitude, longitude, deposit, rent, available_from, 
      no_of_current_roommates, no_of_current_female_roommates, no_of_current_male_roommates, is_furnished, min_age,
       max_age, gender_preference, no_of_roommates_required, status
      FROM listings
      WHERE id = $1 AND status = true
    `;

    const result = await pool.query(query, [listingId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserListings = async (userId) => {
  try {
    const query = `
      SELECT id, user_id, address, state, country, pincode, latitude, longitude, deposit, rent, available_from, 
      no_of_current_roommates, no_of_current_female_roommates, no_of_current_male_roommates, is_furnished, min_age,
      max_age, gender_preference, no_of_roommates_required, status
      FROM listings
      WHERE user_id = $1 AND status = true
    `;

    const result = await pool.query(query,[userId]);
    // console.log('bbb'+userId)
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllListings,
  getSingleListing,
  getUserListings,
};
