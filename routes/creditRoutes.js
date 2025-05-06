const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login")
const moment = require("moment");
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
router.post("/deleteCredit", connectEnsureLogin.ensureLoggedIn(), async(req,res)=>{
  try{
     await Credit.deleteOne({_id:req.body.id});
     res.redirect("back")
  } catch(error) {
    res.status(400).send("unable to delete this item in the database")
  }
})


  // router.post("/deleteCredit", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  //   if (!req.session.user || req.session.user.role !== "sales Agent") {
  //     return res.redirect("/login?message=PleaseLoginAsSales Agent");
  //   }
  
  //   try {
  //     await Produce.deleteOne({ _id: req.body.id });
  //     res.redirect("/creditList");
  //   } catch (error) {
  //     res.status(400).send("Unable to delete this item in the database");
  //   }
  // });

router.post("/deleteCredit", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    await Credit.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("Unable to delete this sale in the database.");
  }
});

  module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Credit = require('../models/Credit');
// const Produce = require('../models/Produce');
// const connectEnsureLogin = require('connect-ensure-login');

// // Helpers
// function getUserBranch(req) {
//     return (req.session.user?.branch || 'Matugga').toLowerCase();
// }

// function getAgentName(req) {
//     return req.session.user?.fullName || 'Agent';
// }

// // ========================== ROUTES =========================== //

// // Render form to create new credit
// router.get('/credit', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//     const branch = getUserBranch(req);
//     const agentName = getAgentName(req);
//     res.render("credits", { branch, agentName });
// });

// // Handle new credit creation
// router.post('/credit', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//     try {
//         const branch = getUserBranch(req);
//         const agentName = getAgentName(req);

//         const credit = new Credit({
//             ...req.body,
//             agentName,
//             branch
//         });

//         await credit.save();
//         res.redirect('/viewCredits');
//     } catch (error) {
//         console.error("Error saving credit:", error);
//         res.status(500).render("credits", {
//             branch: getUserBranch(req),
//             agentName: getAgentName(req),
//             error: 'Error submitting credit form. Please try again.'
//         });
//     }
// });

// // ===================== VIEW ALL CREDITS ====================== //
// router.get('//updateCredit?id', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//     const branch = getUserBranch(req);

//     try {
//         const credits = await Credit.find({ branch }).sort({ createdAt: -1 });
//         res.render('creditlist', { credits });
//     } catch (error) {
//         console.error("Error fetching credit list:", error);
//         res.status(500).send('Failed to retrieve credit entries.');
//     }
// });

// // ===================== UPDATE CREDIT ========================= //
// router.get('/updateCredit/:id', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//     if (req.session.user.role !== 'manager') {
//         return res.redirect('/');
//     }

//     try {
//         const credit = await Credit.findById(req.params.id);
//         if (!credit) return res.redirect('/viewCredits');

//         res.render('updatecredit', { credit });
//     } catch (error) {
//         console.error("Error loading credit to update:", error);
//         res.redirect('/viewCredits');
//     }
// });

// router.post('/updateCredit/:id', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//     if (req.session.user.role !== 'manager') {
//         return res.redirect('/');
//     }

//     try {
//         await Credit.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('/viewCredits');
//     } catch (error) {
//         console.error("Error updating credit:", error);
//         res.status(500).send('Error updating credit entry.');
//     }
// });

// // ===================== DELETE CREDIT ========================= //
// router.post('/deleteCredit', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//     if (req.session.user.role !== 'manager') {
//         return res.redirect('/');
//     }

//     try {
//         await Credit.findByIdAndDelete(req.body.id);
//         res.redirect('/viewCredits');
//     } catch (error) {
//         console.error("Error deleting credit:", error);
//         res.status(500).send('Error deleting credit entry.');
//     }
// });

// // ===================== GET PRODUCE INFO ======================= //
// router.get('/getProduceInfo', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
//     const { produceName } = req.query;
//     const branch = getUserBranch(req);

//     try {
//         const produce = await Produce.findOne({ produceName, branch }).sort({ createdAt: -1 });

//         if (!produce) {
//             return res.status(404).json({ error: 'Produce not found' });
//         }

//         res.json({ sellingPrice: produce.sellingPrice, tonnage: produce.tonnage });
//     } catch (err) {
//         console.error("Error fetching produce info:", err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;

