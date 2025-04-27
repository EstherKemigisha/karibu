const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")

//Import models
const Credit = require("../models/Credit");

router.get("/credit", (req, res) => {
  res.render("credits");
});

router.post("/credit", async(req, res) => {
  //this is for posting in the terminal
 try {
  const credit = new Credit(req.body)
  console.log(credit)
  await credit.save();
  res.redirect('/creditList');
 } catch (error) {
  res.status(400).render("credits")
  console.log(error);
 }

});

router.get("/creditList", async(req,res)=> {
  try {
    const items = await Credit.find().sort({$natural:-1});
    res.render("creditList", {
      credits:items
    })
  } catch (error){
    res.status(400).send("unable to find items in the db")
  }
})

//update
router.get("/updateCredit/:id", async(req,res) => {
  try {
    const updateCredit = await Credit.findOne({_id:req.params.id})
    res.render("updatecredit",{credit:updateCredit})
  } catch (error){
    res.status(400).send("unable to find this item in the db")
  }
  
  })
  
  router.post("/updateCredit", async(req,res) =>{
    try {
      await Credit.findOneAndUpdate({_id:req.query.id}, req.body)
      res.redirect("/creditList")
    } catch (error) {
      res.status(400).send("unable to find this item in the database")
    }
  })
  
  //Delete route
// router.post("/deleteCredit", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
//   try{
//      await Credit.deleteOne({_id:req.body.id});
//      res.redirect("back")
//   } catch(error) {
//     res.status(400).send("unable to delete this item in the database")
//   }
// })


  router.post("/deleteCredit", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    if (!req.session.user || req.session.user.role !== "sales Agent") {
      return res.redirect("/login?message=PleaseLoginAsSales Agent");
    }
  
    try {
      await Produce.deleteOne({ _id: req.body.id });
      res.redirect("/creditList");
    } catch (error) {
      res.status(400).send("Unable to delete this item in the database");
    }
  });
  module.exports = router;