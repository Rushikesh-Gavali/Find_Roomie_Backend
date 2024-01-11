const pool = require("../../database/connection");
const bcrypt = require('bcrypt');

const softDeleteUser = async (userId, password) => {
    try {
        const passwordQuery = `SELECT password FROM users WHERE id = $1`;
        const passwordResult = await pool.query(passwordQuery, [userId]);

        if (passwordResult.rowCount === 0) {
            return { error: 'User not found' };
        }

        const hashedPassword = passwordResult.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) {
            return { error: 'Incorrect password' };
        }

        const softDeleteQuery = `
            UPDATE users 
            SET is_deleted = true 
            WHERE id = $1 
            RETURNING id, username, email, password, gender, mobile_no, whatsapp_no, dob, photo, is_deleted;
        `;

        const result = await pool.query(softDeleteQuery, [userId]);

        if (result.rowCount === 0) {
            return { error: 'User not found' };
        }

        return { message: 'User data soft deleted successfully', deletedUser: result.rows[0] };
    } catch (error) {
        console.error('Error deleting user:', error);
        
        throw error;
    }
};

module.exports = {
    softDeleteUser,
};
