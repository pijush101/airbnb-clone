const Place = require('../models/Place');

exports.addPlace = async (req, res) => {
    try{
        const userData = req.user;
        const { title, address, addedPhotos, description, perks, extraInfo, maxGuests, price } = req.body;
        const place = await Place.create({
            owner: userData._id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            maxGuests,
            price,
        });
        res.status(201).json(place);
    }catch(error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
}   

//return user's places
exports.userPlaces = async (req, res) => {
    try{
        const userData = req.user;
        const id = userData._id;
        res.status(200).json(await Place.find({ owner: id }));
    }catch(error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
}   

//update place
exports.updatePlace = async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData._id;
        const { id, title, address, addedPhotos, description, perks, extraInfo, maxGuests, price } = req.body;
        const place = await Place.findById(id);
        if(userId === place.owner._id.toString()){
            place.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                maxGuests,
                price,
            });
            await place.save();
            res.status(200).json({
                message: 'Place updated successfully',
            });
        }
    } catch (error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

//Return all places in DB
exports.getPlaces = async (req, res) => {
    try{
        const places = await Place.find();
        res.status(200).json({
            places,
        });
    }catch(error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

//Return the single places based on id
exports.singlePlace = async (req, res) => {
    try{
        const { id } = req.params;
        const place = await Place.findById(id);
        if(!place){
            return res.status(400).json({
                message: 'place not found',
            });
        }
        res.status(200).json({
            place,
        });
    }catch(error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

//Searching the places in DB
exports.searchPlaces = async (req, res) => {
    try{
        const searchword = req.params.key;
        if(searchword === '') return res.status(200).json(await Place.find());
        const searchMatches = await Place.find({ address: { $regex: searchword, $options: 'i' } });
        res.status(200).json({
            searchMatches,
        });
    }catch(error){
        res.status(500).json(
            { 
            message: 'Internal server error',
            error: error,
            
         });
    }
};

     