const pool = require("../../database/connection");
const { updateUser } = require("../../services/users_services/userUpdateService");
const multerMiddleware=require('../../middlewares/multerMiddleware');
const fs = require('fs');
const path = require('path');

const updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, mobile_no, whatsapp_no } = req.body;

    let photo = '';

    if (req.file) { 
        photo = `/public/users/${req.file.filename}`;

        const find_user = await pool.query(`SELECT photo FROM users WHERE id=$1`, [userId]);
        const old_photo_path = find_user.rows[0]?.photo;

        if (old_photo_path) {
          const fullPath = path.join(__dirname,'..', '..', old_photo_path);
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.error(`Error deleting old File ${err}`);
            } else {
              console.log('Old Photo Deleted Successfully...!');
            }
          });
        }

        const result = await updateUser(userId, username, email, password, mobile_no, whatsapp_no, photo);

        if (result.rowCount === 0) {
          return res.status(404).json({ 
            response_code:404,
            response_message:'error',
            error: 'User not found' });
        }

        res.status(200).json({
          response_code:200,
          response_message:'Success',
          data: result.rows[0] 
        });
    } else {
      // If no new file is uploaded use old photo path
      const find_user = await pool.query(`SELECT photo FROM users WHERE id=$1`, [userId]);
      const old_photo_path = find_user.rows[0]?.photo;

      const result = await updateUser(userId, username, email, password, mobile_no, whatsapp_no, old_photo_path);

      if (result.rowCount === 0) {
        return res.status(404).json({ 
          response_code:404,
          response_message:'error',
          error: 'User not found' });
      }

      res.status(200).json({ 
        response_code:200,
        response_message:'Success',
        data: result.rows[0] 
      });
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ 
      response_code:200,
      response_message:'error',
      error: 'Error updating user data' 
    });
  }
};


module.exports = {
  updateUserDetails
};
