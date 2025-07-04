const express=require("express");
const app=express(); //initiaising express server

const mongoose=require("mongoose");
const morgan=require("morgan");
const helmet=require("helmet");
const dotenv=require("dotenv");

const userRouter=require("./routes/users") //importing the user file created from routes
//Now we can use it as a router 
//So we can add different routes for different pages as we need
const authRouter=require("./routes/auth") 
const postRouter=require("./routes/posts") 

dotenv.config();//to use dotenv it is compulsory;

// 
mongoose.connect(process.env.MONGO_URL ,{useNewUrlParser : true}).then(()=>console.log('connected'))
.catch(e=>console.log(e));

app.use((req, res, next) => {
  console.log("INCOMING REQUEST:", req.method, req.url);
  next();
});

//middle wares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRouter);  
//its works like a router so that whenever a particular request matches with this then we send it to some other router so that remaining url is compared and some response is sent to it
app.use("/api/auth",authRouter);  
app.use("/api/posts",postRouter); 


app.get("/",(req,res)=>{
    res.send("Welcome to backend");
})

app.listen(8800,()=>{
    console.log("backend server is running at port 8800");
});

