const pool = require('../../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;
const secret_key=process.env.JWT_SECRET_KEY

const signupUser = async (username, email, password, gender, mobile_no, whatsapp_no, dob, photo) => {
  try {
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const insertQuery = `
      INSERT INTO users (username, email, password, gender, mobile_no, whatsapp_no, dob, photo) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, username, email, password, gender, mobile_no, whatsapp_no, dob, photo, is_deleted;
    `;

    const values = [username, email, hashed_password, gender, mobile_no, whatsapp_no, dob, photo];
    const result = await pool.query(insertQuery, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = `
      SELECT id, username, email, password, gender, mobile_no, whatsapp_no, dob, photo, is_deleted 
      FROM users 
      WHERE email=$1 AND is_deleted=false
    `;
    const result = await pool.query(query, [email]);
    return result;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password, hashed_password) => {
  try {
    const isValid = await bcrypt.compare(password, hashed_password);
    return isValid;
  } catch (error) {
    throw error;
  }
};

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secret_key);
  return token;
};

module.exports = {
  signupUser,
  getUserByEmail,
  comparePassword,
  generateToken,
};
