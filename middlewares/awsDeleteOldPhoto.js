const aws = require('aws-sdk');
const path = require('path');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const deletePhotoFromS3 = (photoPath) => {
  if (photoPath) {
    const key = path.basename(photoPath);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      key,
    };  

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error(`Error Deleting file from S3: ${err}`);
      } else {
        console.log("Photo Deleted Successfully from S3");
      }
    });
  }
};

module.exports = {
  deletePhotoFromS3
};
