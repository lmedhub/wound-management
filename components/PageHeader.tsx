import React from "react";
import Typography from "@mui/material/Typography";

const PageHeader = ({ title }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderBottom: "2px solid #3f51b5",
        paddingBottom: "8px",
        marginTop: "20px",
        marginBottom: "8px",
      }}
    >
      {title}
    </Typography>
  );
};

export default PageHeader;
