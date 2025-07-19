const router=require("express").Router();
const Post=require("../models/Post.js");
const User=require("../models/User.js");
const path=require("path");
const fs=require("fs");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary=require("./cloudinary.js");

router.get("/",async (req,res) => {
    console.log("post page");
})

//create a post
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(403).json(err);
    }
})

//update post
router.put("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post updated successfully");
        }
        else{
            return res.status(403).json("you are not allowed to update this post");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
    
})
//delete post
router.delete("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            // if(post.image!==""){
            // // const filePath = path.join(__dirname,"../public/images/",post.image); // construct full file path
            // fs.unlink(filePath, (err) => {
            //     if (err) {
            //     console.error("Failed to delete file:", err);
            //     } else {
            //     console.log("Deleted image:", post.image);
            //     }
            // })
        // }
            if(post.image){
                const afterUpload = post.image.split("/upload/")[1];
                const publicIdWithExt = afterUpload.split(".")[0]; // e.g. "v123/folder/image"
                const publicId = publicIdWithExt.replace(/^v\d+\//, '');
                console.log(publicId); 
                try{
                    const result=await cloudinary.uploader.destroy(publicId);
                    console.log("Deleted:", result);
                }
                catch(err){
                    console.log(post.image);
                    console.log(err);
                    return res.status(500).json(err);
                    
                }
                
            }
            await post.deleteOne();
            res.status(200).json("Deleted post Successfully");
        }
        else{
            res.status(403).json("You are not allowed to delete this post");
        } 
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }  
})
//like a post
router.put("/:id/like",async (req,res) => {
    const post=await Post.findById(req.params.id);
    try{
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{"likes":req.body.userId}});
            res.status(200).json("Post liked");
        }
        else{
            await post.updateOne({$pull:{"likes":req.body.userId}});
            res.status(200).json("Post disliked");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});
//get a post
router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post) {
            res.status(200).json(post);
        }
        else{
            res.status(404).json("Not Found");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})
//get all timelines of posts
router.get("/timeline/:userId",async (req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendsPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendsPosts));
    }
    catch(err){
        res.status(500).json(err);
    }
})

//get all user's posts
router.get("/profile/:username",async (req,res) => {
    try {
        const currentUser = await User.findOne({"username":req.params.username})
        const userPosts = await Post.find({ userId: currentUser._id });
        res.json(userPosts);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;