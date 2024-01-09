// FloatingButton.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import ChatComponent from "./ChatComponent";
import { useTranslation } from "react-i18next";

const FloatingButton = () => {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={toggleChat}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {t("help")}
      </Button>
      {isChatOpen && <ChatComponent onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default FloatingButton;
