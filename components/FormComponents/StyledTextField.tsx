import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";

const StyledTextFieldComponent = styled(TextField)`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
`;

export default function StyledTextField({ ...props }) {
  return <StyledTextFieldComponent {...props} />;
}
