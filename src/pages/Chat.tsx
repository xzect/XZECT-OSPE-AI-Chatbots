import React, { useEffect, useLayoutEffect, useRef, useState,  } from "react";
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import { UserAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = UserAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); 

  const handleSubmit = async () => {
  const content = inputRef.current?.value as string;
  if (inputRef && inputRef.current) {
    inputRef.current.value = "";
  }
  const newMessage: Message = { role: "user", content };
  setChatMessages((prev) => [...prev, newMessage]);

  setLoading(true); 
  try {
    const chatData = await sendChatRequest(content);
    setChatMessages((prev) => [...prev, chatData.chats[chatData.chats.length - 1]]);
  } catch (error) {
    console.error("Error sending chat request:", error);
    
  }
  setLoading(false);
};


 
  async function handleDeleteChats() {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  }
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          console.log('Fetched chats:', data.chats); // Log the fetched chats
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);


  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      width: '100%',
      height: "100%",
      mt: 3,
      gap: 3,
      
    }}>
      <Box sx={{
        display: {
          md: "flex",
          xs: "none",
          sm: "none"
        },
        flex: 0.2,
        flexDirection: 'column'
      }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "80vh",
          bgcolor: "rgb(17, 29, 39)",
          borderRadius: 3,
          flexDirection: "column",
          mx: 3,
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: 'white',
            color: 'black',
            fontWeight: 700,
          }}>

            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
           </Avatar>
             <img src="johnnychat.png" alt="johnnychat" width={"150px"} 
             style={{ display: 'block', margin: '0 auto' }} />
          <Typography sx={{ mx: 'auto', fontFamily: "Open Sans", fontWeight: 700 }}>
            Hello! Johnny 5 here! 
          </Typography>
            <Typography sx={{ mx: 'auto', fontFamily: "Open Sans", fontWeight: 200, my: 2, p: 2 }}>
            How can I assist you today? I can answer many questions, provide code, and even create stories! 
            Need advice? Need inspiration? Looking up facts? I can generate jokes and riddles too! 
            I'm here to help!                       
            **Please note that I'm not a real person, so please refrain from sharing personal information.**
            </Typography>

          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: 'auto',
              color: 'white',
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400
              }
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3 }}>
        <Typography sx={{
          fontSize: "40px",
          color: "white",
          mb: 2,
          mx: "auto",
          fontWeight: "600",
        }}>
          Model - GPT 3.5 Turbo
        <img src="openai.png" alt="openai" width={"40px"} style={{ marginLeft: '5px', backgroundColor: "#51538f" }} /> 
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >

          {chatMessages.map((chat, index) => (
          
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >

          {" "}
          <input
  ref={inputRef}
  type="text"
  onChange={(e) => setInputValue(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
<IconButton disabled={!inputValue.trim()} onClick={handleSubmit} sx={{ color: "white", mx: 1 }} >
  {loading ? 
    <Box sx={{
      display: 'block',
      margin: '0 auto',
    }}>
      <BeatLoader color={"#123abc"} loading={loading} size={15} />
    </Box> 
    : 
    <IoMdSend />
  }
</IconButton>
        </div>
      </Box>
    </Box>
  );
};



export default Chat;
