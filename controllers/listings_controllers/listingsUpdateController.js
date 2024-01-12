
const pool =require('../../database/connection');
const {updateListing}=require('../../services/listings_services/listingsUpdateService');
const {deletePhotoFromS3}=require('../../middlewares/awsDeleteOldPhoto');

const fs=require('fs');

const path = require('path');

const updateListingDetails=async (req,res)=>{
  try {
    const listingId=req.params.id;
    const{address, state, country, pincode, latitude, longitude, deposit, rent, available_from, no_of_current_roommates, no_of_curret_female_roommates, no_of_curret_male_roommates, no_of_roommates_required, gender_preference, is_furnished, min_age, max_age}=req.body;

    let image='';
    
    if(req.file){
      image=`/public/listings/${req.file.filename}`;
      // console.log(image);

      const find_photo=await pool.query(`SELECT url from photos WHERE listings_id=$1`,[listingId]);
      const old_image_path=find_photo.rows[0]?.url;

      //Delete old Photo From Files...!
      if(old_image_path){
        deletePhotoFromS3(old_image_path);
        // const full_path=path.join(__dirname,'..','..',old_image_path);
        // fs.unlink(full_path,(err)=>{
        //   if(err){
        //     console.error(`Error Deleting Old file ${err}`);
        //   }else{
        //     console.log("Old Photo Path Deleted Successfully");
        //   }
        // });
      }

      const result =await updateListing(listingId, address, state, country, pincode, latitude, longitude, deposit, rent, available_from, no_of_current_roommates, no_of_curret_female_roommates, no_of_curret_male_roommates, no_of_roommates_required, gender_preference, is_furnished, min_age, max_age,image);
      
      if(result.rowCount===0){
        return res.status(404).json({
          response_code:404,
          response_message:'error',
          error:'Listing not found'
        });
      }
      res.status(200).json({
        response_code:200,
        response_message:"Success",
        data:result.listingUpdateResult.rows[0]
      });
    }
    else{
      const find_photo=await pool.query(`SELECT url FROM photos WHERE id=$1`,[listingId]);
      
      const old_image_path=find_photo.rows[0]?.url;

      const result = await updateListing(listingId, address, state, country, pincode, latitude, longitude, deposit, rent, available_from, no_of_current_roommates, no_of_curret_female_roommates, no_of_curret_male_roommates, no_of_roommates_required, gender_preference, is_furnished, min_age, max_age,old_image_path);

      if(result.rowCount===0){
        return res.status(404).json({
          response_code:404,
          response_message:'error',
          error:"Listing data not foud"});
      }else{
        res.status(200).json({
          response_code:200,
          response_message:"Success",
          data:result.listingUpdateResult.rows[0]})
      }
    }
  } catch (error) {
    console.error(`Error Updating Listing Data:  ${error}`);
    res.status(500).json({
      response_code:200,
      response_message:'error',
      error:'ERROR updating Listing Data'});
  }
};

module.exports={
  updateListingDetails
}

