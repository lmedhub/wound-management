import React, { ReactNode } from "react";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

type Props = {
  children: ReactNode;
};

function Layout(props: Props) {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" sx={{ padding: "1rem" }}>
        {props.children}
      </Container>
    </>
  );
}

export default Layout;
