const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");

router.get("/directorDash", async (req, res) => {
  try {
    let totalRevenue = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalQuantitySold: { $sum: "$qsold" },
          totalSale: { $sum: { $multiply: ["$pricePerkg", "$qsold"] } }
        }
      }
    ]);

    // Fix here:
    if (totalRevenue.length > 0) {
      totalRevenue = totalRevenue[0];
    } else {
      totalRevenue = { totalQuantitySold: 0, totalSale: 0 }; // <- define 0 properly
    }

    res.render("directorDashboard", {
      totalRevenue
    });
  } catch (error) {
    res.status(400).send("Unable to find item from DB");
    console.log("Aggregation error:", error.message);
  }
});

module.exports = router;
