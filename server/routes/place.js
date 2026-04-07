const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/user');
const {
    addPlace,
    getPlaces,
    updatePlace,
    singlePlace,
    userPlaces, 
    searchPlaces,
} = require('../controllers/placeController');

router.route('/add-place').post(isLoggedIn, addPlace);
router.route('/get-places').get(isLoggedIn, getPlaces);
router.route('/update-place').put(isLoggedIn, updatePlace);
router.route('/single-place/:id').get(singlePlace);
router.route('/user-places').get(userPlaces);
router.route('/search-places/:key').get(searchPlaces);

module.exports = router;