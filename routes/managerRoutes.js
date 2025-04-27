const express = require("express");
const router = express.Router();

router.get("/managerDash/:branch", (req, res) => {
  const { branch } = req.params;

  if (branch === "Maganjo") {
    res.render("managerDashboard"); 
  } else if (branch === "Mattuga") {
    res.render("managerDb"); 
  } else {
    res.status(404).send("Invalid manager branch");
  }
});

module.exports = router;