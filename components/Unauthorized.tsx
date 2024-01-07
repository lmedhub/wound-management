// components/UnauthorizedPage.js

import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import StyledButton from "./FormComponents/StyledButton";

const UnauthorizedContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

function UnauthorizedPage() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/api/auth/signin");
  };

  return (
    <UnauthorizedContainer>
      <Typography variant="h4">Unauthorized Access</Typography>
      <Typography variant="body1">
        You need authorization to access this page.
      </Typography>
      <StyledButton onClick={handleSignupClick}>Login</StyledButton>
    </UnauthorizedContainer>
  );
}

export default UnauthorizedPage;
