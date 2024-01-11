

const pool=require('../../database/connection');

const updateListing=async (listingId, address, state, country, pincode, latitude, longitude, deposit, rent, available_from, no_of_current_roommates, no_of_curret_female_roommates, no_of_curret_male_roommates, no_of_roommates_required, gender_preference, is_furnished, min_age, max_age,image)=>{
const updateQuery=`UPDATE listings 
SET address=COALESCE($1,address),
    state=COALESCE($2,state),
    country=COALESCE($3,country),
    pincode=COALESCE($4,pincode),
    latitude=COALESCE($5,latitude),
    longitude=COALESCE($6,longitude),
    deposit=COALESCE($7,deposit),
    rent=COALESCE($8,rent),
    available_from=COALESCE($9,available_from),
    no_of_current_roommates=COALESCE($10,no_of_current_roommates),
    no_of_current_female_roommates=COALESCE($11,no_of_current_female_roommates),
    no_of_current_male_roommates=COALESCE($12,no_of_current_male_roommates),
    no_of_roommates_required=COALESCE($13,no_of_roommates_required),
    gender_preference=COALESCE($14,gender_preference),
    is_furnished=COALESCE($15,is_furnished),
    min_age =COALESCE($16,min_age),
    max_age=COALESCE($17,max_age)
WHERE id=$18 AND status=true
RETURNING *`;

const values=[address, state, country, pincode, latitude, longitude, deposit, rent, available_from, no_of_current_roommates, no_of_curret_female_roommates, no_of_curret_male_roommates, no_of_roommates_required, gender_preference, is_furnished, min_age, max_age,listingId];

const updatePhotoQuery=`UPDATE photos
SET url=COALESCE($1,url)
WHERE listings_id=$2
RETURNING *`;

const photoValues=[image,listingId];

try {
  const listingUpdateResult=await pool.query(updateQuery,values);
  const photoUpdateResult=await pool.query(updatePhotoQuery,photoValues);

  return{listingUpdateResult,photoUpdateResult}
} catch (error) {
  console.error(`error updating listing:  ${error}`)
}

};
module.exports={
  updateListing
}
