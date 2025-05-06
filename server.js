// 1. Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");
const expressSession = require("express-session");
require("dotenv").config();

// 2. Instantiate the app
const app = express();

// 3. Middlewares
app.use(express.json());  // Now 'app' is properly initialized
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Specify the folder for static files

// 4. Session and passport setup
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 5. Passport Configuration (if needed)
const Signup = require("./models/Signup");
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());

// 6. Import routes
const salesRoutes = require("./routes/salesRoutes");
const authRoutes = require("./routes/authRoutes");
const managerRoutes = require("./routes/managerRoutes");
const directorRoutes = require("./routes/directorRoutes");
const salesAgentRoutes = require("./routes/salesAgentRoutes");
const indexRoutes = require("./routes/indexRoutes");
const produceRoutes = require("./routes/produceRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const userRoutes = require("./routes/userRoutes");
const creditRoutes = require("./routes/creditRoutes");

// 7. Set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 8. Database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// 9. Routes setup
app.use("/", salesRoutes);
app.use("/", authRoutes);
app.use("/", managerRoutes);
app.use("/", directorRoutes);
app.use("/", salesAgentRoutes);
app.use("/", indexRoutes);
app.use("/", produceRoutes);
app.use("/", logoutRoutes);
app.use("/", userRoutes);
app.use("/", creditRoutes);

// 10. Start server
const PORT = 3008;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
