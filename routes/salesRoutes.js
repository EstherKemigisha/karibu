const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")

//Import models
const Sale = require("../models/Sale");

router.get("/addSale", (req, res) => {
  res.render("sales");
});

router.post("/addSale", async(req, res) => {
  //this is for posting in the terminal
 try {
  const sale = new Sale(req.body)
  console.log(sale)
  await sale.save();
  res.redirect('/salesList');
 } catch (error) {
  res.status(400).render("sales")
  console.log(error);
 }

});

router.get("/salesList", async(req,res)=> {
  try {
    const items = await Sale.find().sort({$natural:-1});
    res.render("salesList", {
      sales:items
    })
  } catch (error){
    res.status(400).send("unable to find items in the db")
  }
})

//update
router.get("/updateSale/:id", async(req,res) => {
  try {
    const updateSale = await Sale.findOne({_id:req.params.id})
    res.render("updatesale",{sale:updateSale})
  } catch (error){
    res.status(400).send("unable to find this item in the db")
  }
  
  })
  
  router.post("/updateSale", async(req,res) =>{
    try {
      await Sale.findOneAndUpdate({_id:req.query.id}, req.body)
      res.redirect("/salesList")
    } catch (error) {
      res.status(400).send("unable to find this item in the database")
    }
  })
  
  //Delete route
router.post("/deleteSale", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
  try{
     await Sale.deleteOne({_id:req.body.id});
     res.redirect("back")
  } catch(error) {
    res.status(400).send("unable to delete this item in the database")
  }
})
module.exports = router;