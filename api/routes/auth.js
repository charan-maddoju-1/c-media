const router= require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");

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
        console.log(err);
    }
})


//LOGIN
router.post("/login",async (req,res)=>{
    try{
        const userFromDB=await User.findOne({email:req.body.email})
        !userFromDB&&res.status(404).json("User not found");

        const validPassword=await bcrypt.compare(req.body.password,userFromDB.password);
        !validPassword&&res.status(404).json("Invalid password");

        res.status(200).json(userFromDB);
    }
    catch(err){
        console.log(err);
    }
    

})

module.exports=router;