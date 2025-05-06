const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

// Import models
const Sale = require("../models/Sale");
const Produce = require("../models/Produce");

// GET route to render form for adding a sale with a specific produce
router.get(
  "/addSale/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    if (req.session.user.role === "sales agent" || req.session.user.role === "manager") {
      try {
        const produce = await Produce.findById("6818f7cac7d9f13a6c6de5ee");
        if (!produce) {
          return res.status(404).send("Produce not found");
        }
        res.render("sales", {
          produce: produce,
          currentUser: req.session.user
        });
      } catch (error) {
        console.error("Error rendering add_sale page:", error);
        res.status(400).send("Unable to find item in the database");
      }
    } else {
      res.status(403).send("You are not allowed to access this page");
    }
  }
);

// POST route to handle creating a sale
router.post(
  "/addSale/:id",
  connectEnsureLogin.ensureLoggedIn(),
  async (req, res) => {
    if (req.session.user.role === "sales agent" || req.session.user.role === "manager") {
      try {
        const {
          produceName,
          tonnage,
          pricePerkg,
          amountPaid,
          qsold,
          buyerName,
          salesAgentName,
          dateTime,
          totalAmount,
          storeBranch
        } = req.body;

        // Find the produce by ID
        const produce = await Produce.findById(req.params.id);
        if (!produce) {
          return res.status(404).send("Produce not found");
          
        }

        // Validate tonnage
        const parsedTonnage = Number(tonnage);
        if (isNaN(parsedTonnage) || parsedTonnage <= 0) {
          return res.status(400).send("Invalid tonnage value");
        }

        if (produce.tonnage < parsedTonnage) {
          return res.status(400).send(
            `Not enough tonnage in stock, only ${produce.tonnage}kg available`
          );
        }

        // Create a new sale
        const saleMade = new Sale({
          produceName,
          tonnage: parsedTonnage,
          pricePerkg,
          amountPaid,
          qsold,
          buyerName,
          salesAgentName,
          dateTime,
          storeBranch,
          seller: req.session.user._id,
          totalAmount
        });

        // Save the sale and update the produce tonnage
        await saleMade.save();
        produce.tonnage -= parsedTonnage;
        await produce.save();

        res.redirect("/salesList");
      } catch (error) {
        console.error("Error processing sale:", error.message);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(403).send("You are not allowed to access this page");
    }
  }
);

// GET all sales
router.get("/salesList", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    const items = await Sale.find()
      .sort({ $natural: -1 })
      .populate("produceName")
      .populate("seller");
    res.render("salesList", {
      title: "Sales List",
      sales: items
    });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(400).send("Unable to find sales in the database.");
  }
});

// POST update sale
router.get("/updateSale/:id", async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).send("Sale not found");
    }
    res.render("updatesale", { sale });
  } catch (error) {
    console.error("Error fetching sale:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

//post update sale
router.post("/updateSale/:id", async (req, res) => {
  try {
    const { produceName, tonnage, pricePerkg, amountPaid, qsold, totalAmount, storeBranch, buyerName, salesAgentName, dateTime } = req.body;

    const sale = await Sale.findByIdAndUpdate(
      req.params.id,
      { produceName, tonnage, pricePerkg, amountPaid, qsold, totalAmount, storeBranch, buyerName, salesAgentName, dateTime },
      { new: true }
    );

    if (!sale) {
      return res.status(404).send("Sale not found");
    }

    res.redirect("/salesList"); // Redirect to the sales list after updating
  } catch (error) {
    console.error("Error updating sale:", error.message);
    res.status(500).send("Internal Server Error");
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