const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});

let users=[];//online users list

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId!==socketId);
}

const addUser=(userId,socketId)=>{
    !users.some(user=>(user.userId===userId))&&
    users.push({userId,socketId});
}

const getUser=(userId)=>{
   return users.find(user=>user.userId===userId)
}

io.on("connection",(socket)=>{
    //when a user connects to socket
    console.log("a user connected.");
    socket.on("addUser",userId=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users);
    })

    //passing messages recieved from a sender to receiver
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const receiver=getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", {
                senderId,
                text
            });
        }
    })


    //when a user is disconnected 
    socket.on("disconnect",()=>{
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers",users);
    })
    
})