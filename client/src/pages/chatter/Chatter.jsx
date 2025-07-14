import "./chatter.css";
import Topbar from "../../components/topbar/Topbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";

import {useContext, useRef, useState, useEffect} from "react";
import axios from "axios";

export default function Chatterr(){
    //dealing input textarea element size
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

    useEffect(()=>{
        const getMessages=async()=>{
            try{
                const res=await axios.get("api/message/"+currentChat._id);
                setMessages(res.data);
            }
            catch(err){
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
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])


    return(
        <>
            <Topbar/>
            <div className="chatterContainer">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder="Search for a friend" className="chatMenuInput" />
                        {conversations.map(convo=>
                            <div key={convo._id} onClick={()=>setcurrentChat(convo)}>
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
                                    {messages.map((msg)=>(
                                        <div ref={scrollRef}>
                                            <Message message={msg} own={msg.senderId===user?._id ? "yes":"No"} />
                                        </div>
                                       
                                    ))}
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
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
        
        
    )
}