const express = require("express");//used to create server and handle routing
const router = express.Router();
const passport = require("passport");//handling user authentication

// Import models
const Signup = require("../models/Signup");//represents the user data w/c comes from the schema

//rendering the signup page
router.get("/signingup", (req, res) => {
  res.render("signup");
});

router.post("/signingup", async (req, res) => {
  try {
    console.log("Registration attempt with data:", req.body);
    
    const { email, password, branch, role } = req.body;
    
    // Checking if user already exists
    let existingUser = await Signup.findOne({ email: email });
    
    if (existingUser) {
      console.log("Registration failed: Email already exists", email);
      return res.status(400).send("Not registered, email already exists");
    } else {
      // Creating new user object with all fields
      const user = new Signup({
        email: email,
        branch: branch,
        role: role.toLowerCase() 
      });
      
      // Register user with Passport (handles password hashing)
      await Signup.register(user, password, (error) => {
        if (error) {
          console.error("Registration error:", error);
          throw error;
        }
        console.log("User registered successfully:", user);
        res.redirect("/login");
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).render("signup");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
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
          return res.redirect("/managerDash/Maganjo");
        } else if (lowerBranch === "mattuga") {
          return res.redirect("/managerDash/Mattuga");
        } else {
          return res.send("Invalid branch for manager");
        }
      } else if (lowerRole === "sales agent") {
        if (lowerBranch === "maganjo") {
          return res.redirect("/salesAgentDash/Maganjo");
        } else if (lowerBranch === "mattuga") {
          return res.redirect("/salesAgentDash/Mattuga");
        } else {
          return res.send("Invalid branch for sales agent");
        }
      }
    } else if (lowerRole === "director") {
      return res.redirect("/directorDash");
    } else {
      return res.send("This role does not exist");

  }
});

module.exports = router;