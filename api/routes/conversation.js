const router=require("express").Router();
const Conversation=require("../models/conversation");

//new Convo
router.post("/",async (req,res)=>{
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


module.exports=router;