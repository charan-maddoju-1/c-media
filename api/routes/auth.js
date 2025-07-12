const router= require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// const bodyParser=require("body-parser");
const express=require("express");



router.get("/",(req,res)=>{
    res.send("Hey its auth router.");
})

router.get("/1",(req,res)=>{
    res.send("Hey its auth router1   ..............");
})

//REGISTER
router.post("/register",async (req,res)=>{
    try{
        //encrypting the password using bcypt package
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        const newuser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword

        });

        //saving the registered user data in mongo DB
        const user=await newuser.save();
        res.status(200).json(user);
    }
    catch(err){
        if (err.code === 11000) {
            // Duplicate key error (user already exists)
            res.status(409).json({ message: "User already exists" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
})


const secretKey="C-Media jwt token for you";
//LOGIN
router.post("/login", async (req, res) => {
  try {
    const userFromDB = await User.findOne({ email: req.body.email });
    if (!userFromDB) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, userFromDB.password);
    if (!validPassword) {
      return res.status(400).json("Invalid password");
    }

    const jwt_token=jwt.sign(
      {id:userFromDB._id,email:userFromDB.email},
      secretKey,
      {expiresIn:"7d"}
    );

    res.status(200).json({user:userFromDB,jwt_token:jwt_token});
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});


module.exports=router;