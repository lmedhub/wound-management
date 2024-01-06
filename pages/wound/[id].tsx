import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { WoundProps } from "../../components/Wound";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import StyledButton from "../../components/FormComponents/StyledButton";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const wound = await prisma.wound.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: wound,
  };
};

async function deleteWound(id: string): Promise<void> {
  await fetch(`/api/wound/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Wound: React.FC<WoundProps> = (props) => {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (status === "loading") {
    return <div>Authenticating...</div>;
  }
  const userHasValidSession = Boolean(session);
  const woundBelongsToUser = session?.user?.email === props.author?.email;

  return (
    <Layout>
      <Container>
        <Typography
          variant="h2"
          sx={{ fontSize: isMobile ? "1.5rem" : "2.5rem" }}
        >
          Type: {props.type}
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontSize: isMobile ? "1.2rem" : "2rem" }}
        >
          Location: {props.location}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}
        >
          Author: {props?.author?.name || "Unknown author"}
        </Typography>
        <ReactMarkdown children={props.note} />
        {userHasValidSession && woundBelongsToUser && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <StyledButton onClick={() => deleteWound(props.id)}>
              Delete
            </StyledButton>
            <StyledButton href={`/wound/edit/${props.id}`}>Edit</StyledButton>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default Wound;
