const pool = require('../../database/connection');

async function createListing(listingData, userId, photoUrl) {
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
    } = listingData;

    const insertQuery = `
      INSERT INTO listings (
        user_id,
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
        no_of_roommates_required
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING id;
    `;

    const values = [
      userId,
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
    ];

    const result = await pool.query(insertQuery, values);
    const listingId = result.rows[0].id;

  
    const insertPhotoQuery = `
      INSERT INTO photos (listings_id, url)
      VALUES ($1, $2);
    `;

    const photoQueryResult= await pool.query(insertPhotoQuery, [listingId, photoUrl]);

    return result.rows[0]; 
  } catch (error) {
    throw new Error('Error creating listing:', error);
  }
}

module.exports = { createListing };
