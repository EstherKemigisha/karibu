const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")
const moment = require('moment');

const Produce = require("../models/Produce");
router.get("/addProduce", (req, res) => {
  res.render("produce");
});

router.post("/addProduce", async(req, res) => {
  //this is for posting in the terminal
  try {
    const produce = new Produce(req.body)
    console.log(produce);
    await produce.save();
  res.redirect("/produceList")
  } catch (error) {
    res.status(400).render("produce")
    console.log(error);
  }
  
});
// getting from the db
router.get("/produceList", async(req,res)=> {
  try {
    const items = await Produce.find().sort({$natural:-1});
    res.render("produceList", {
      produce:items
    })
  } catch (error){
    res.status(400).send("unable to find items in the db")
  }
})

//update
router.get("/updateProduce/:id", async (req, res) => {
  try {
    const produceId = req.params.id;  // Get the produce ID from the URL
    const updateProduce = await Produce.findOne({ _id: produceId });
    res.render("updateproduce", { produce: updateProduce });
  } catch (error) {
    res.status(400).send("Unable to find this item in the database");
  }
});



    //Delete route
  router.post("/deleteProduce", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
    try{
       await Produce.deleteOne({_id:req.body.id});
       res.redirect("back")
    } catch(error) {
      res.status(400).send("unable to delete this item in the database")
    }
  })
  // router.post("/deleteProduce", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  //   if (!req.session.user || req.session.user.role !== "manager") {
  //     return res.redirect("/login?message=PleaseLoginAsManager");
  //   }
  
  //   try {
  //     await Produce.deleteOne({ _id: req.body.id });
  //     res.redirect("/back");
  //   } catch (error) {
  //     res.status(400).send("Unable to delete this item in the database");
  //   }
  // });
  
  
    
  
module.exports = router;
