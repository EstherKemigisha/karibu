const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale")

router.get("/directorDash", async(req, res) => {
  try {
    let totalRevenue = await Sale.aggregate([
      {$group:{_id:null,
        totalQuantitySold: {$sum:"$qsold"},
          totalSale:{$sum:{$multiply:["$pricePerkg","$qsold"]}}
        }
      }
    ])
    totalRevenue = totalRevenue[0] ?? {totalQuantitySold:0,totalSale};//incase there's nothing 
    res.render("directorDashboard",{
      totalRevenue
    });
  } catch (error) {
    res.status(400).send("unable to find item from db")
    console.log("aggregation error:",error.message)
  }
  
  });
  module.exports = router;