require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectwithDB = require("./config/db");
const cloudinary = require("cloudinary").v2;
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

//Connect with the database
connectwithDB();

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Required for Vercel to trust the HTTPS proxy so secure cookies work
app.set("trust proxy", 1); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieParser()
);

app.use(
    cookieSession({
        name: "session",
        keys: [process.env.COOKIE_SECRET || "default_secret_key"],
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
    })
);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use("/", require("./routes"));

app.listen(process.env.PORT || 8000, (err) => {
    if(err){
        console.log("Error is there while connecting the server:", err);
    }
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
module.exports = app;


