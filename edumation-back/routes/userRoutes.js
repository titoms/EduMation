const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('../middlewares/validationMiddleware');
const s3Upload = require('../middlewares/s3UploadFile');
const verifyToken = require('../middlewares/verifyToken');
const upload = s3Upload.single('profileImage');

// Get all users
router.get('/', verifyToken, userController.getAllUsers);

// User registration
router.post(
  '/register',
  upload,
  validation.registerValidation,
  validation.checkValidation,
  userController.registerUser
);

// User login
router.post(
  '/login',
  validation.loginValidation,
  validation.checkValidation,
  userController.loginUser
);

// Get ONE User
router.get(
  '/:id',
  verifyToken,
  validation.isMongoId('id'),
  userController.getOneUser
);

// Update User
router.put(
  '/:id',
  verifyToken,
  upload,
  validation.updateUserValidation,
  validation.checkValidation,
  userController.updateUser
);

// Delete User
router.delete(
  '/:id',
  verifyToken,
  validation.isMongoId('id'),
  userController.deleteUser
);

module.exports = router;
