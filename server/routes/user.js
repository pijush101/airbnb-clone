const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');
const upload = multer({ dest: os.tmpdir() });
const {
    register,
    login,
    googleLogin,
    uploadPicture,
    updateUserDetails,
    logout,
} = require('../controllers/usercontroller');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/googleLogin').post(googleLogin);
router.route('/update-picture').post(upload.single('picture'), uploadPicture);
router.route('/update-user').put(updateUserDetails);
router.route('/logout').get(logout);

module.exports = router;