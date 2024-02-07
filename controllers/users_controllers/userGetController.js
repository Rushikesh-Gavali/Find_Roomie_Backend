const pool = require('../../database/connection');
const userGetService = require('../../services/users_services/userGetService');

const getAllUsers = async (req, res) => {
  try {
    const result = await userGetService.getAllUsers();
    res.status(200).json({
      response_code: 200,
      response_message: "Success",
      data: result.rows
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      response_code:500,
      response_message:'error',
      error: "Error fetching users" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await userGetService.getSingleUser(userId);

    if (result.rows.length > 0) {
      res.status(200).json({
        response_code:200,
        response_message:'Success',
        data:result.rows[0]});
    } else {
      res.status(404).json({
        response_code:404,
        response_message:'error',
        error: "User not found" 
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ 
      response_code:500,
      response_message:'error',
      error: "Error fetching user data" });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
};
