
const userAuthService = require('../../services/users_services/userAuthService');
const {uploadUsers}=require('../../middlewares/multerMiddleware');

//For Signup...!
// async function signup(req, res) {
//   try {
//     uploadUsers.single('photo')(req, res, async function (err) {
//       if (err) {
//         console.error(`Error uploading file: ${err}`);
//         return res.status(500).json({
//           response_code:500,
//           response_message:'error',
//           error: 'Error uploading user photo' 
//           });
//       }
      
//       const { username, email, password, gender, mobile_no, whatsapp_no, dob } = req.body;

//       // const photo = req.file ? `/public/users/${req.file.filename}` : 'path not found...!';
//       const photo=req.file ? req.file.filename :'Path Not Found...!'
//       const result = await userAuthService.signupUser(username, email, password, gender, mobile_no, whatsapp_no, dob, photo);
//       console.log("Restarted!!!!")
//       res.status(200).json({
//         response_code:200,
//         response_message: 'Success Test', 
//         data: result.rows[0].id
//       });
//     });
//   } catch (error) {
//     console.error('Error uploading user data:', error);
//     res.status(500).json({ 
//       respomse_code:500,
//       respomse_message:'error',
//       error: 'Error uploading user data' });
//   }
// }

async function signup(req, res) {
  try {
    uploadUsers.single('photo')(req, res, async function (err) {
      if (err) {
        console.error(`Error uploading file: ${err}`);
        return res.status(500).json({
          response_code: 500,
          response_message: 'error',
          error: 'Error uploading user photo' 
        });
      }
      
      const { username, email, password, gender, mobile_no, whatsapp_no, dob } = req.body;

      // const photo = req.file ? `/public/users/${req.file.filename}` : 'path not found...!';
      const photo = req.file ? req.file.filename : 'Path Not Found...!';
      const result = await userAuthService.signupUser(username, email, password, gender, mobile_no, whatsapp_no, dob, photo);
      console.log("Restarted!!!!")
      res.status(200).json({
        response_code: 200,
        response_message: 'Success Test', 
        data: result.rows[0].id
      });
    });
  } catch (error) {
    console.error('Error uploading user data:', error);
    res.status(500).json({ 
      response_code: 500,
      response_message: 'error',
      error: 'Error uploading user data' 
    });
  }
}


//For Login...!
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        respomse_code:400,
        respomse_message:'error',
        error: 'Email and Password required' });
    }

    const user = await userAuthService.getUserByEmail(email);

    if (user.rows.length === 0) {
      return res.status(404).json({ 
        response_code:404,
        response_message:'error',
        error: 'User not found' });
    }

    const isValidPassword = await userAuthService.comparePassword(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        response_code:401,
        response_message:'error',
        error: 'Invalid password' });
    }

    const token = userAuthService.generateToken(user.rows[0].id);

    res.status(200).json({
      response_code: 200,
      response_message: 'Success',
      data: {
        id: user.rows[0].id,
        token,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ 
      response_code:500,
      response_message:'error',
      error: 'Error logging in user' });
  }
}

module.exports = {
  signup,
  login,
};
