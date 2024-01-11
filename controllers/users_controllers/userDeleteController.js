const userDeleteService = require('../../services/users_services/userDeleteService');

const softDeleteUser = async (req, res) => {
    try {
        const userId=req.userId;
        const password=req.body.password;
        const result = await userDeleteService.softDeleteUser(userId, password);
        if (result.error) {
            return res.status(401).json({ error: result.error });
        }
        res.status(200).json({
            response_code:200,
            response_message:'Success',
            data:result
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
            response_code:500,
            response_message:'error',
            error: 'Error deleting user' 
        });
    }
};

module.exports = {
    softDeleteUser,
};
