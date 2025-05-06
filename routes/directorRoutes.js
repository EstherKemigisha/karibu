// const express = require("express");
// const router = express.Router();

// const Sale = require("../models/Sale");

// //this uses the mongodb aggregation to calculate the total revenue and quantity sold
// // and then renders the director dashboard with the data
// router.get("/directorDash", async (req, res) => {
//   try {
//     let totalRevenue = await Sale.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalQuantitySold: { $sum: "$qsold" },
//           totalSale: { $sum: { $multiply: ["$pricePerkg", "$qsold"] } }
//         }
//       }
//     ]);
//     //totalquantity(sumof all quantity sold)
//     //null(groups all the data together)

//     // Fix here:
//     //If aggregation returns a result, take the first object (it’s an array).
//     if (totalRevenue.length > 0) {
//       totalRevenue = totalRevenue[0];
//     } else {
//       totalRevenue = { totalQuantitySold: 0, totalSale: 0 }; // <- define 0 properly
//     }

//     res.render("directorDashboard", {
//       totalRevenue
//     });
//   } catch (error) {
//     res.status(400).send("Unable to find item from DB");
//     console.log("Aggregation error:", error.message);
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Sale = require("../models/Sale");

// router.get("/directorDash", async (req, res) => {
//   try {
//     // Aggregation pipeline to calculate total sales by branch
//     const salesOverview = await Sale.aggregate([
//       {
//         $group: {
//           _id: "$storeBranch", // Group by branch
//           totalSales: { $sum: "$totalAmount" }, // Sum the totalAmount field
//         },
//       },
//     ]);

//     // Calculate overall total sales
//     const overallTotalSales = salesOverview.reduce(
//       (acc, branch) => acc + branch.totalSales,
//       0
//     );

//     // Create structured branch sales data
//     const branchSales = salesOverview.map((s) => ({
//       branch: s._id,
//       totalSales: s.totalSales,
//       period: "March 2025", // You can make this dynamic if needed
//     }));

//     // Find specific branch totals
//     const maganjoSales =
//       salesOverview.find((branch) => branch._id === "maganjo")?.totalSales || 0;
//     const mattugaSales =
//       salesOverview.find((branch) => branch._id === "mattuga")?.totalSales || 0;

//     // Render the dashboard with all data
//     res.render("directorDashboard", {
//       totalRevenue: {
//         totalsale: overallTotalSales,
//         maganjo: maganjoSales,
//         mattuga: mattugaSales,
//       },
//       branchSales, // ✅ Send this to Pug template
//     });
//   } catch (error) {
//     console.error("Error fetching sales overview:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

router.get("/directorDash", async (req, res) => {
  try {
    // Aggregation to get total sales per branch
    const salesOverview = await Sale.aggregate([
      {
        $group: {
          _id: "$storeBranch",
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Calculate overall total sales
    const overallTotalSales = salesOverview.reduce(
      (acc, branch) => acc + branch.totalSales,
      0
    );

    // Get distinct sale dates for average calculation
    const saleDates = await Sale.distinct("createdAt");
    const uniqueDates = new Set(saleDates.map(date => new Date(date).toDateString()));
    const numberOfDays = uniqueDates.size || 1; // Prevent divide-by-zero

    // Compute average daily sales
    const averageDailySales = overallTotalSales / numberOfDays;

    // Create structured branch sales data
    const branchSales = salesOverview.map((s) => ({
      branch: s._id,
      totalSales: s.totalSales,
      period: "March 2025", // You can update this to be dynamic
    }));

    // Find specific branch totals
    const maganjoSales =
      salesOverview.find((branch) => branch._id === "maganjo")?.totalSales || 0;
    const mattugaSales =
      salesOverview.find((branch) => branch._id === "mattuga")?.totalSales || 0;

    // Render the dashboard view with the data
    res.render("directorDashboard", {
      totalRevenue: {
        totalsale: overallTotalSales,
        maganjo: maganjoSales,
        mattuga: mattugaSales,
      },
      averageSales: averageDailySales,
      branchSales,
    });

  } catch (error) {
    console.error("Error fetching sales overview:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
