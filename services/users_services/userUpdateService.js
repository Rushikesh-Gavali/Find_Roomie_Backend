const pool = require("../../database/connection");

const updateUser = async (userId, username, email, password, mobile_no, whatsapp_no, photo) => {
  const updateQuery = `
    UPDATE users 
    SET username = COALESCE($1, username),
    email = COALESCE($2, email),
    password = COALESCE($3, password),
    mobile_no = COALESCE($4, mobile_no),
    whatsapp_no = COALESCE($5, whatsapp_no),
    photo = COALESCE($6,photo)
    WHERE id = $7 AND is_deleted=false
    RETURNING id, username, email, password, gender, mobile_no, whatsapp_no, dob, photo, is_deleted;
  `;
  const values = [username, email, password, mobile_no, whatsapp_no, photo, userId];
  return await pool.query(updateQuery, values);
};

module.exports = {
  updateUser
};
