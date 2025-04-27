const express = require("express");
const router = express.Router();

router.get("/salesAgentDash/:branch", (req, res) => {
  const { branch } = req.params;

  if (branch === "Maganjo") {
    res.render("salesAgentDashboard"); 
  } else if (branch === "Mattuga") {
    res.render("salesAgentDb"); 
  } else {
    res.status(404).send("Invalid sales agent branch");
  }
});

module.exports = router;

