const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")

//Import models
const User = require("../models/User");

router.get("/addUser", (req, res) => {
  res.render("users");
});

router.post("/addUser", async(req, res) => {
  //this is for posting in the terminal
 try {
  const user = new User(req.body)
  console.log(user)
  await user.save();
  res.redirect('/usersList');
 } catch (error) {
  res.status(400).render("users")
  console.log(error);
 }

});

router.get("/usersList", async(req,res)=> {
  try {
    const items = await User.find().sort({$natural:-1});
    res.render("usersList", {
      users:items
    })
  } catch (error){
    res.status(400).send("unable to find items in the db")
  }
})

//update
router.get("/updateUser/:id", async(req,res) => {
  try {
    const updateUser = await User.findOne({_id:req.params.id})
    res.render("updateuser",{user:updateUser})
  } catch (error){
    res.status(400).send("unable to find this item in the db")
  }
  
  })
  
  router.post("/updateUser", async(req,res) =>{
    try {
      await User.findOneAndUpdate({_id:req.query.id}, req.body)
      res.redirect("/usersList")
    } catch (error) {
      res.status(400).send("unable to find this item in the database")
    }
  })
  
  //Delete route
router.post("/deleteUser", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
  try{
     await User.deleteOne({_id:req.body.id});
     res.redirect("back")
  } catch(error) {
    res.status(400).send("unable to delete this item in the database")
  }
})
module.exports = router;