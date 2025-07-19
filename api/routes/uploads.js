const router=require("express").Router();
// const path=require("path");
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const cloudinary=require("./cloudinary.js");


const storage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:`c_media_uploads`,
    allowed_formats: ['jpg', 'png', 'xhr', 'mp4', 'mov'],
  }
})
const upload = multer({ storage: storage });
router.post("/",upload.single("file"),async (req,res)=>{
  try{
    res.json({url:req.file.path||req.file.url});
    console.log(req.file.path);
  }catch(err){
    res.status(500).json({ error: err.message || "Something went wrong", stack: err.stack });
    console.log("Error:", JSON.stringify(err, null, 2));
  }
})

module.exports=router;