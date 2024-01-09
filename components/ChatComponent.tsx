import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

const ChatContent = ({ chatMessages, onSendMessage, onClose }) => {
  const { t } = useTranslation();
  const [inputMessage, setInputMessage] = useState("");
  const { data: session } = useSession();

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatMessages]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 999,
        margin: "10px",
        width: "350px",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, mx: 1 }}>
          HealthHub Helper
        </Typography>

        <IconButton onClick={onClose} style={{ marginRight: "8px" }}>
          <CloseOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          height: "350px",
          width: "auto",
          overflowY: "auto",
        }}
        id="chat-container"
      >
        <List>
          {chatMessages.map((message, index) => (
            <div key={index}>
              {index % 2 === 0 ? (
                <ListItem
                  style={{
                    gap: 4,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Avatar alt={session.user.name} src={session.user.image} />
                  <ListItemText
                    primaryTypographyProps={{
                      style: { wordWrap: "break-word" },
                    }}
                  >
                    {message}
                  </ListItemText>
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{
                      style: { wordWrap: "break-word" },
                    }}
                  >
                    {message}
                  </ListItemText>
                </ListItem>
              )}
              <Divider />
            </div>
          ))}
        </List>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <TextField
          label={t("chatTextLabel")}
          variant="outlined"
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          inputProps={{ maxLength: 75 }}
          onKeyDown={handleKeyPress}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          style={{ marginLeft: "8px" }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

const ChatComponent = ({ onClose }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const sendMessageToChatbot = async (userMessage) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const responseData = await response.json();
      const botReply =
        responseData.data[0]?.queryResult?.fulfillmentText ||
        "Internal server error";

      setChatMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        botReply,
      ]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
    }
  };

  return (
    <Box>
      <ChatContent
        onClose={onClose}
        chatMessages={chatMessages}
        onSendMessage={sendMessageToChatbot}
      />
    </Box>
  );
};

export default ChatComponent;
