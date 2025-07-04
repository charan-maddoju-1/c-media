const router=require("express").Router();
const { ReturnDocument } = require("mongodb");
const User=require("../models/User.js");
const bcrypt=require("bcrypt");
// router.get("/",(req,res)=>{
//     res.send("Hey its user router.");
// })

// router.get("/1",(req,res)=>{
//     res.send("Hey its user router1   ..............");
// })

//Update User
router.put("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (error) {
               return  res.status(403).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }
            );
            if (!user) {
                return res.status(404).json("User not found");
            }
            res.status(200).json("Account Updated Successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else{
        return res.status(404).json("You can update your account only");
    }
})

//Delete User
router.delete("/:id",async (req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin===true){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json("User not found");
            }
            res.status(200).json("Account deleted Successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else{
        return res.status(404);
    }
})

//get user
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//follow a user
router.put("/:id/follow",async (req,res) => {
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{"followers":req.body.userId}});
                await currentUser.updateOne({$push:{"following":req.params.id}});
                res.status(200).json("Following");
            }
            else{
                return res.status(403).json("already following");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("You can't follow yourself");
    }
})

//unfollow a user
router.put("/:id/unfollow",async (req,res) => {
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{"followers":req.body.userId}});
                await currentUser.updateOne({$pull:{"following":req.params.id}});
                res.status(200).json("user unfollowed");
            }
            else{
                return res.status(403).json("already unfollowed");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("You can't follow yourself");
    }
})

module.exports=router;