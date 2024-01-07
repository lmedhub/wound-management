import styled from "@emotion/styled";
import { Select } from "@mui/material";
import React from "react";

const StyledSelectComponent = styled(Select)`
  width: 100%;
  margin: 0.5rem 0;
`;

export default function StyledSelect({ children, ...props }) {
  return <StyledSelectComponent {...props}>{children}</StyledSelectComponent>;
}
