//  const express = require("express");
// const router = express.Router();

// router.get("/managerDash/:branch", (req, res) => {
//   const { branch } = req.params;

//   if (branch === "maganjo") {
//     res.render("managerDashboard"); 
//   } else if (branch === "mattuga") {
//     res.render("managerDb"); 
//   } else {
//     res.status(404).send("Invalid manager branch");
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/Produce"); // Replace with your actual Product model

router.get("/managerDash/:branch", async (req, res) => {
  const { branch } = req.params;

  try {
    // Fetch low stock products for the specific branch
    const lowStockCount = await Product.countDocuments({ branch, stock: { $lt: 10 } });

    // Fetch total products for the branch
    const totalProducts = await Product.countDocuments({ branch });

    // Fetch in-stock products for the branch
    const inStockCount = await Product.countDocuments({ branch, stock: { $gte: 10 } });

    // Fetch total sales (replace with actual sales aggregation logic if needed)
    const totalSales = 20; // Placeholder value

    if (branch === "maganjo") {
      res.render("managerDashboard", {
        branch,
        totalProducts,
        totalSales,
        inStockCount,
        lowStockCount,
      });
    } else if (branch === "mattuga") {
      res.render("managerDb", {
        branch,
        totalProducts,
        totalSales,
        inStockCount,
        lowStockCount,
      });
    } else {
      res.status(404).send("Invalid manager branch");
    }
  } catch (error) {
    console.error("Error fetching manager dashboard data:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;