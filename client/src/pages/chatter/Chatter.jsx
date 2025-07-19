import "./chatter.css";
import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import {io} from "socket.io-client";

import {useContext, useRef, useState, useEffect} from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Chatter(props){

    const [serachParameters]=useSearchParams();
    const conversationId=serachParameters.get("convoId");
    console.log(conversationId);


    const textareaRef = useRef();
    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    };


    const {user}=useContext(AuthContext);

    const[conversations,setConversations]=useState([]);
    const[currentChat,setcurrentChat]=useState(null);
    const[messages,setMessages]=useState([]);
    const[newMessage,setNewMessage]=useState("");
    const[arrivalMessage,setArrivalMessage]=useState("");
    const[onlineUsers,setOnlineUsers]=useState([]);

    const[msgLoading,setMsgLoading]=useState(true);

    const socket=useRef();

    useEffect(()=>{
        socket.current=io("ws://localhost:8900");
        socket.current.on("getMessage",(data)=>{
            setArrivalMessage({
                senderId:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[]);

    useEffect(()=>{
        arrivalMessage&&currentChat.members.includes(arrivalMessage.senderId)&&
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat]);

    useEffect(()=>{
        socket.current.emit("addUser",user?._id);
        socket.current.on("getUsers",users=>{
            setOnlineUsers(user.following.filter(friendId=>users.some(u=>u.userId===friendId)));
            console.log(users);
        })
    },[user]);

    // useEffect(()=>{
    //     socket?.current.on("Welcome",message=>{
    //         console.log(message);
    //     });
    //     console.log(socket);
    // },[]);
    

    useEffect(()=>{
        const getconversations=async()=>{
            try{
                const res=await axios.get("/api/conversation/"+user._id);
                // console.log(res);
                setConversations(res.data);
                
            }catch(err){
                console.log(err);
            }  
        }
        getconversations();
    },[user._id]);

    useEffect(() => {
        if (conversationId && conversations.length > 0) {
            const matched = conversations.find(c => c._id === conversationId);
            console.log("currentChat ",matched);
            setcurrentChat(matched); 
        }   
    }, [conversations, conversationId]);

    useEffect(()=>{
        const getMessages=async()=>{
            try{
                // console.log("In messages ",currentChat);
                setMsgLoading(true);
                const res=await axios.get("api/message/"+currentChat?._id);
                setMessages(res.data);
                setMsgLoading(false);
            }
            catch(err){
                setMsgLoading(false);
                console.log(err);
            }  
            
        }
        getMessages();
    },[currentChat?._id])

    const handleSend=async (event)=>{
        event.preventDefault();
        const message={
            senderId:user?._id,
            text:newMessage,
            conversationId:currentChat._id
        }

        const receiverId=currentChat.members.find(userId=>userId!==user?._id);
        socket.current.emit("sendMessage",{
            senderId:user?._id,
            receiverId:receiverId,
            text:newMessage
        })

        try{
            const res=await axios.post("/api/message",message);
            setMessages([...messages,res.data]);
            setNewMessage("");
        }catch(err){
            console.log(err);
        }
        
    }

    //making messages automatically scrol down when new msg arrives
    const scrollRef=useRef();
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages])

    const handleClick=(e,convo)=>{
        // e.target.style.backgroundColor="rgba(241, 241, 241, 0.884)";
        setcurrentChat(convo);
    }

    return(
        <>
            <Topbar/>
            <div className="chatterContainer">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for a friend" className="chatMenuInput" />
                        {conversations.map(convo=>
                            <div key={convo._id} onClick={(e)=>handleClick(e,convo)}>
                                <Conversations conversation={convo} currentUser={user}/>
                            </div>  
                        )}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat?
                            <>
                                <div className="chatBoxTop">
                                    {msgLoading?
                                    <div className="loadingContainer">
                                        <CircularProgress/>
                                    </div>
                                    :
                                    <div>
                                        {messages.map((msg)=>(
                                            <div ref={scrollRef} key={msg._id}>
                                                <Message message={msg} own={msg.senderId===user?._id ? "yes":"No"} />
                                            </div>
                                        
                                        ))} 
                                    </div>
                                    }
                                    
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea 
                                    className="chatBoxMessageInput" 
                                    placeholder="Message here...." 
                                    onInput={handleInput}
                                    name="" id="" 
                                    rows={1}
                                    ref={textareaRef}
                                    onChange={(e)=>setNewMessage(e.target.value)}
                                    value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSend}>Send</button>
                                </div>
                            </>
                            :
                            <span className="noConversationText">Open a conversation and start a chat</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} setcurrentChat={setcurrentChat} currentId={user._id}/>
                    </div>
                </div>
            </div>
        </>
        
        
    )
}