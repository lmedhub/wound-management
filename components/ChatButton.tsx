// FloatingButton.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import ChatComponent from "./ChatComponent"; // Update the path accordingly

const FloatingButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleChat}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        Help
      </Button>
      {isChatOpen && <ChatComponent onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default FloatingButton;
