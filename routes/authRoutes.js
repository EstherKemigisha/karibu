const express = require("express");//used to create server and handle routing
const router = express.Router();// defining routes
const passport = require("passport");//handling user authentication

// Import models
const Signup = require("../models/Signup");//represents the user data w/c comes from the schema

//rendering the signup page(showing the signup page)
//this is the page where the user will be redirected to after signing up
router.get("/signingup", (req, res) => {
  res.render("signup");
});

router.post("/signingup", async (req, res) => {
  try {
    console.log("Registration attempt with data:", req.body);

    const { fullName, email, password, branch, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !branch || !role) {
      console.log("Registration failed: Missing required fields");
      return res.status(400).render("signup", {
        error: "All fields are required. Please fill them in.",
      });
    }

    // Check if the user already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      console.log("Registration failed: Email already exists", email);
      return res.status(400).render("signup", {
        error: "Email already exists. Please use a different email.",
      });
    }

    // Create a new user object
    const user = new Signup({
      fullName,
      email,
      branch,
      role: role.toLowerCase(),
    });

    // Register the user with Passport (handles password hashing)
    await Signup.register(user, password);
    console.log("User registered successfully:", user);
    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific errors
    if (error.name === "MissingUsernameError") {
      return res.status(400).render("signup", {
        error: "Email is required. Please provide a valid email.",
      });
    }

    // Handle other errors
    res.status(500).render("signup", {
      error: "An unexpected error occurred. Please try again later.",
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("Login successful for user:", req.body.email, "with role:", req.user.role);

    req.session.user = req.user;

    const { role, branch } = req.user;

    if (!role) {
      return res.status(400).send("User role missing");
    }

    const lowerRole = role.toLowerCase();

if (lowerRole === "manager" || lowerRole === "sales agent") {
  if (!branch) {
    return res.status(400).send("Branch missing for this user");
  }

  const lowerBranch = branch.toLowerCase();

  if (lowerRole === "manager") {
    if (lowerBranch === "maganjo") {
      return res.redirect("/managerDash/maganjo");
    } else if (lowerBranch === "mattuga") {
      return res.redirect("/managerDash/mattuga");
    } else {
      return res.send("Invalid branch for manager");
    }
  } else if (lowerRole === "sales agent") {
    if (lowerBranch === "maganjo") {
      return res.redirect("/salesAgentDash/maganjo");
    } else if (lowerBranch === "mattuga") {
      return res.redirect("/salesAgentDash/mattuga");
    } else {
      return res.send("Invalid branch for sales agent");
    }
  }
} else if (lowerRole === "director") {
  return res.redirect("/directorDash");
} else {
  return res.send("This role does not exist");
    }
  }
);


module.exports = router;