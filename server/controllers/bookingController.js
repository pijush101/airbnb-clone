const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
    try{
        const userData = req.user;
        const { place, checkIn, checkout, numOfGuests, name, phone, price } = req.body;
        const booking = await Booking.create({
            user: userData._id,
            place,
            checkIn,
            checkout,
            numOfGuests,
            name,
            phone,
            price,
        });
        res.status(201).json(booking);
    }catch(error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
}
exports.getBooking = async (req, res) => {
    try{
        const userData = req.user;
        if(!userData){
            return res.status(401).json({ message: 'Your are not authorized to access this resource' });
        }
        const bookings = await Booking.find({ user: userData._id }).populate('place');
        res.status(200).json(bookings);
    }catch(error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
}   
