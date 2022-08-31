import {
  AppBar,
  Avatar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  detachMsgListener,
  fetchAllMsgs,
  sendMsg,
} from "../Store/Action/chatAction";
import { borderRadius } from "@mui/system";
import { SendRounded, ArrowBack } from "@mui/icons-material";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const chatRecipient = location.state.user;
  const currentUser = location.state.currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSendMsg = () => {
    const msgInfo = {
      receiver: chatRecipient.uid,
      sender: currentUser.uid,
      message,
      createdAt: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    if (message) {
      dispatch(sendMsg(msgInfo));
      setMessage("");
    }
  };
  useEffect(() => {
    dispatch(fetchAllMsgs(currentUser.uid, chatRecipient.uid));
  }, []);
  useEffect(() => () => dispatch(detachMsgListener()), []);
  const chats = useSelector(({ chat }) => chat.chat);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  return (
    <Box>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "sticky",
          p: 0.5,
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ArrowBack
            sx={{ cursor: "pointer" }}
            fontSize="medium"
            onClick={() => navigate("/")}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Recepient Profile Pic"
              sx={{ width: 50, height: 50, ml: 2 }}
              src={chatRecipient.imageURL}
            />
            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }}>
              {chatRecipient.name}
            </Typography>
          </Box>
          <Box></Box>
        </Toolbar>
      </AppBar>
      {chats || chats.length > 0
        ? chats.map((chat, index) => {
            return (
              <Box
                ref={messagesEndRef}
                sx={{
                  display: "flex",
                  justifyContent:
                    currentUser.uid === chat.sender ? "flex-end" : "flex-start",
                  alignItems: "center",
                }}
                key={index}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    border: 1,
                    borderColor: "lightgrey",
                    bgcolor:
                      currentUser.uid === chat.sender
                        ? "lightgrey"
                        : "lightblue",
                    borderTopRightRadius:
                      currentUser.uid === chat.sender ? -0 : 15,
                    borderTopLeftRadius:
                      currentUser.uid === chat.sender ? 15 : 0,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    pl: 2,
                    pr: 2,
                    pt: 1,
                    mt: 1,
                    ml:
                      currentUser.uid !== chat.sender
                        ? { sm: 2, xs: 2 }
                        : { sm: 20, xs: 10 },
                    mr:
                      currentUser.uid === chat.sender
                        ? { sm: 2, xs: 2 }
                        : { sm: 20, xs: 10 },
                    display: "inline-block",
                    wordBreak: "break-word",
                  }}
                >
                  {chat.message}
                  <Typography
                    sx={{
                      display: "block",
                      textAlign: "right",
                      fontSize: 11,
                      color: "gray",
                    }}
                    variant="caption"
                  >
                    {chat.time}
                  </Typography>
                </Typography>
              </Box>
            );
          })
        : null}
      <Box
        sx={{
          bgcolor: "white",
          width: "100%",
          position: "fixed",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: { sm: "center", xs: "space-evenly" },
          zIndex: 1,
          pb: 1,
          pt: 1,
        }}
      >
        <TextField
          type={"text"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ width: { sm: 320, xs: 220 } }}
          variant="outlined"
        />
        <Button onClick={handleSendMsg} endIcon={<SendRounded />}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
