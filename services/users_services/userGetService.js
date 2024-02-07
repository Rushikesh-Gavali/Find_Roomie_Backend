const pool = require('../../database/connection');

const getAllUsers = async () => {
  try {
    const query = `SELECT id, username, email, password, gender, mobile_no, whatsapp_no, dob, photo, is_deleted 
      FROM users WHERE is_deleted = false`;
    const result = await pool.query(query);
    return result;
  } catch (error) {
    throw error;
  }
};

const getSingleUser = async (userId) => {
  try {
    const query = `SELECT id, username, email, gender, mobile_no, whatsapp_no, dob, photo 
      FROM users WHERE id = $1 AND is_deleted=false`;
    const result = await pool.query(query, [userId]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
};
