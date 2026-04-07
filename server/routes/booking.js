const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/user');
const {
    createBooking,
    getBooking,
} = require('../controllers/bookingController');

router.route('/create-booking').post(isLoggedIn, createBooking);
router.route('/user-bookings').get(isLoggedIn, getBooking);

module.exports = router;