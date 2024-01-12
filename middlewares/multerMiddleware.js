
const multer = require('multer');
const multerS3=require('multer-s3');
const aws=require('aws-sdk');
const path = require('path');
require('dotenv').config();


const s3=new aws.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
  region:process.env.AWS_REGION
});

const storage=(destination)=>multerS3({
  s3,
bucket:process.env.AWS_BUCKET_NAME,
contentType:multerS3.AUTO_CONTENT_TYPE,
acl:'public-read',
key:(req,file,cb)=>{
  cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
},
});


// const storage = (destination) => multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, destination);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

const uploadListings = multer({
   storage: storage('public/listings'), 
   limits:{fileSize: 10*1024*1024 }
  });
const uploadUsers = multer({ 
  storage: storage('public/users'),
  limits:{ fileSize:10*1024*1024 }
});


module.exports = {
  uploadListings,
  uploadUsers,
};
