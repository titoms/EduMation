const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // store it in .env file to keep it safe
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: 'eu-west-3', // this is the region that you select in AWS account
});

function sanitizeFile(file, cb) {
  // Define the allowed extension
  const fileExts = ['.png', '.jpg', '.jpeg', '.gif'];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith('image/');

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb('Error: File type not allowed!');
  }
}

const s3Upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    ACL: 'public-read',
    resize: {
      width: 512,
    },
    fileFilter: (req, file, callback) => {
      sanitizeFile(file, callback);
    },
    limits: {
      fileSize: 1024 * 1024 * 2, // 2mb file size
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname); // Use Date.now() as filename, you can change this
    },
  }),
});

module.exports = s3Upload;
