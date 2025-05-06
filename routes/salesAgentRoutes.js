// const express = require("express");
// const router = express.Router();

// router.get("/salesAgentDash/:branch", (req, res) => {
//   const { branch } = req.params;

  
//   if (branch === "maganjo") {
//     res.render("salesAgentDashboard"); 
//   } else if (branch === "mattuga") {
//     res.render("salesAgentDb"); 
//   } else {
//     res.status(404).send("Invalid sales agent branch");
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale"); // Replace with your actual Sale model

router.get("/salesAgentDash/:branch", async (req, res) => {
  const { branch } = req.params;

  try {
    // Total Sales for the branch
    const totalSales = await Sale.aggregate([
      { $match: { branch } }, // Filter by branch
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Today's Sales for the branch
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const todaysSales = await Sale.aggregate([
      { $match: { branch, date: { $gte: today } } }, // Filter by branch and today's date
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Average Sale for the branch
    const averageSale = await Sale.aggregate([
      { $match: { branch } }, // Filter by branch
      { $group: { _id: null, average: { $avg: "$amount" } } },
    ]);

    // Items Sold for the branch
    const itemsSold = await Sale.aggregate([
      { $match: { branch } }, // Filter by branch
      { $group: { _id: null, totalItems: { $sum: "$quantity" } } },
    ]);

    // Pass data to the appropriate template
    if (branch === "maganjo") {
      res.render("salesAgentDashboard", {
        branch,
        totalSales: totalSales[0]?.total || 0,
        todaysSales: todaysSales[0]?.total || 0,
        averageSale: averageSale[0]?.average || 0,
        itemsSold: itemsSold[0]?.totalItems || 0,
      });
    } else if (branch === "mattuga") {
      res.render("salesAgentDb", {
        branch,
        totalSales: totalSales[0]?.total || 0,
        todaysSales: todaysSales[0]?.total || 0,
        averageSale: averageSale[0]?.average || 0,
        itemsSold: itemsSold[0]?.totalItems || 0,
      });
    } else {
      res.status(404).send("Invalid sales agent branch");
    }
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

