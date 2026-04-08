const mongoose = require("mongoose");
const connectWithDb = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => {
        console.log('DB is failed');
        console.log(err);
    });
};

module.exports = connectWithDb;



