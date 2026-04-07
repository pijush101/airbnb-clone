const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

//upload photo using image url
router.post('/upload-by-link', async (req, res) => {
    try {
        const { link } = req.body;
        let result = await cloudinary.uploader.upload(link, {
            folder: 'airbnb-website',
        });
        res.json(result.secure_url);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
        });
    }
});

router.get('/', (req, res) => {
    res.status(200).json({
        greetings: 'Welcome to the Airbnb website',
    });
});

router.use('/user', require('./user'));
router.use('/place', require('./place'));
router.use('/booking', require('./booking'));

module.exports = router;