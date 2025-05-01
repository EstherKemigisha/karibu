// const express = require("express");
// const router = express.Router();
// const connectEnsureLogin = require("connect-ensure-login")

// //Import models
// const Sale = require("../models/Sale");

// router.get("/addSale", (req, res) => {
//   res.render("sales");
// });

// router.post("/addSale", async(req, res) => {
//   //this is for posting in the terminal
//  try {
//   const sale = new Sale(req.body)
//   console.log(sale)
//   await sale.save();
//   res.redirect('/salesList');
//  } catch (error) {
//   res.status(400).render("sales")
//   console.log(error);
//  }

// });

// router.get("/salesList", async(req,res)=> {
//   try {
//     const items = await Sale.find().sort({$natural:-1});
//     res.render("salesList", {
//       sales:items
//     })
//   } catch (error){
//     res.status(400).send("unable to find items in the db")
//   }
// })

// //update
// router.get("/updateSale/:id", async(req,res) => {
//   try {
//     const updateSale = await Sale.findOne({_id:req.params.id})
//     res.render("updatesale",{sale:updateSale})
//   } catch (error){
//     res.status(400).send("unable to find this item in the db")
//   }
  
//   })
  
//   router.post("/updateSale", async(req,res) =>{
//     try {
//       await Sale.findOneAndUpdate({_id:req.query.id}, req.body)
//       res.redirect("/salesList")
//     } catch (error) {
//       res.status(400).send("unable to find this item in the database")
//     }
//   })
  
//   //Delete route
// router.post("/deleteSale", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
//   try{
//      await Sale.deleteOne({_id:req.body.id});
//      res.redirect("back")
//   } catch(error) {
//     res.status(400).send("unable to delete this item in the database")
//   }
// })
// module.exports = router;




const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Import models
const Sale = require("../models/Sale");
const Produce = require("../models/Produce");


// Routes for making a sale
router.get(
  "/addSale/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
  if (
  req.session.user.role == "sales agent" ||
  req.session.user.role == "manager"
  ) {
  try {
  const produce = await Produce.findOne({ _id: req.params.id });
  console.log("my produce...........................", produce);
  res.render("sales", {
  produce: produce,
  currentUser: req.session.user,
  });
  } catch (error) {
  console.error("Error rendering add_sale page:", error);
  res.status(400).send("Unable to find item in the database");
  }
  } else {
  res.send("You are not allowed to access this page");
  }
  }
  );

// POST route to handle selling a sale`
router.post(
  "/addSale/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
  if (
  req.session.user.role == "sales agent" ||
  req.session.user.role == "manager"
  ) {
  try {
  const { tonnage } = req.body;
  const produce = await Produce.findById({ _id: req.params.id });
  
  if (!produce) {
  return res.status(404).send("Produce not found");
  }
  
  if (produce.tonnage < tonnage) {
  return res
  .status(400)
  .send(
  `Not enough tonnage in stock,there are ${produce.tonnage}kg in stock`
  );
  }
  if (produce && produce.tonnage > 0) {
    const saleMade = new Sale({
    produceName: req.body.produceName,
    tonnage: req.body.tonnage,
    pricePerkg: req.body.pricePerkg,
    amountPaid: req.body.amountPaid,
    qsold: req.body.qsold,
    buyerName: req.body.buyerName,
    salesAgentName: req.body.salesAgentName,
    dateTime: req.body.dateTime,
    seller: req.body.seller,
    });
    await saleMade.save();

    // Decrease the tonnage of produce in the database by the number kgs of produce sold
    // The new produce tonnage after sale
    produce.tonnage -= tonnage;
    console.log("new tonnage after sale", produce.tonnage);
    await produce.save();
    
    res.redirect("/salesList");
    } else {
    return res
    .status(404)
    .json({ error: "Produce not found or sold out" });
    }
    } catch (error) {
    console.error("Error selling produce:", error.message);
    res.status(500).send("Internal Server Error");
    }
    } else {
    res.send("You are not allowed to access this page");
    }
    }
    );
// GET all sales
router.get("/salesList", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const items = await Sale.find()
      .sort({ $natural: -1 })
      .populate("produceName") // load produce details
      .populate("seller"); // load seller details

    res.render("salesList", {
      title: "Sales List",
      sales: items,
    });
  } catch (error) {
    res.status(400).send("Unable to find sales in the database.");
  }
});

// GET update sale page
router.get("/updateSale/:id", async (req, res) => {
  try {
    const updateSale = await Sale.findById(req.params.id);
    res.render("updatesale", { sale: updateSale });
  } catch (error) {
    res.status(400).send("Unable to find this sale in the database.");
  }
});

// POST update sale
router.post("/updateSale", async (req, res) => {
  try {
    await Sale.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/salesList");
  } catch (error) {
    res.status(400).send("Unable to update this sale in the database.");
  }
});

// POST delete sale
router.post("/deleteSale", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await Sale.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete this sale in the database.");
  }
});

module.exports = router;


