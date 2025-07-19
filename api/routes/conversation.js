const router=require("express").Router();
const Conversation=require("../models/conversation");

//new Convo
router.post("/",async (req,res)=>{
    const chat = await Conversation.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId] }
    });
    if(!chat){
        const newConversation=new Conversation({
            members:[req.body.senderId, req.body.receiverId],
        });
        try{
            const savedConversation=await newConversation.save();
            res.status(200).json(savedConversation);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.json(chat);
    }
    
})
//get a user convo

router.get("/:userId",async(req,res)=>{
    try{
        const userConversations=await Conversation.find({
            members:{$in:[req.params.userId]}
        });
        res.status(200).json(userConversations);
    }catch(err){
        res.status(500).json(err);
    }
})


//get convo between two users
router.get("/find/:firstUser/:secondUser",async(req,res)=>{
    try{
        const conversation=await Conversation.findOne({
            members:{$all:[req.params.firstUser,req.params.secondUser]}
        });
        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;