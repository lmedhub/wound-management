import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import Wound from "./Wound";
import styled from "@emotion/styled";

const StyledWoundContainer = styled("div")`
  .wound {
    margin-bottom: 16px;
  }
`;

export default function WoundList({ wounds }) {
  return (
    <StyledWoundContainer>
      <Grid container spacing={3}>
        {wounds.map((wound) => (
          <Grid item key={wound.id} xs={12} sm={6} md={4}>
            <Card className="wound">
              <Wound wound={wound} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </StyledWoundContainer>
  );
}
