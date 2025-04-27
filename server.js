//1.Dependencies
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const passport = require("passport");
const moment = require("moment")
const expressSession = require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    });
require('dotenv').config();
//import user's model(containing details of the users)
const Signup = require("./models/Signup");

//2. instantions
const app = express();
const PORT = 3008;

//import routes
const salesRoutes = require("./routes/salesRoutes")
const authRoutes = require("./routes/authRoutes")
const managerRoutes = require("./routes/managerRoutes")
const directorRoutes = require("./routes/directorRoutes")
const salesAgentRoutes = require("./routes/salesAgentRoutes")
const indexRoutes = require("./routes/indexRoutes")
const produceRoutes = require("./routes/produceRoutes")
const logoutRoutes = require("./routes/logoutRoutes")
const userRoutes = require("./routes/userRoutes")
const creditRoutes = require("./routes/creditRoutes")

//3. configurations
//setting up how it should connect(connecting to what is in your .env file)
app.locals.moment = moment;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//testing the connection 
mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });


//set view engine to pug
app.set("view engine", "pug"); //specify the view engine
app.set("views", path.join(__dirname, "views")); //specifies the views directory

//4.middleware
app.use(express.urlencoded({ extended: true })); //this helps to parse data from the form
app.use(express.static(path.join(__dirname, "public"))); //specifies a folder for static files

// express session configs
app.use(expressSession);//is helps assign sessions to a user
app.use(passport.initialize());
app.use(passport.session());

// // passport configs
passport.use(Signup.createStrategy());//for authentication
passport.serializeUser(Signup.serializeUser());//serial number that is assigned to you in the system
passport.deserializeUser(Signup.deserializeUser());//deserialize/crash the serial number of a user who has logged out of  system

//5. routes
//using imported routes
app.use("/", salesRoutes);
app.use("/", authRoutes);
app.use("/", managerRoutes);
app.use("/", directorRoutes);
app.use("/",salesAgentRoutes);
app.use("/",indexRoutes);
app.use("/",produceRoutes);
app.use("/",logoutRoutes);
app.use("/",userRoutes);
app.use("/",creditRoutes);

//6. bootstraping the server
app.listen(PORT, () => console.log(`listening on port ${PORT}`));