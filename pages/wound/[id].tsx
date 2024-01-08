import React from "react";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { WoundProps } from "../../components/Wound";
import { getSession, useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { Box, Container, Typography } from "@mui/material";
import StyledButton from "../../components/FormComponents/StyledButton";
import { Session } from "next-auth";
import UnauthorizedPage from "../../components/Unauthorized";
import { useTranslation } from "react-i18next";

export const getServerSideProps = async (context) => {
  const { params } = context;
  const session = await getSession(context);
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
    props: { wound, session },
  };
};

async function deleteWound(id: string): Promise<void> {
  await fetch(`/api/wound/${id}`, {
    method: "DELETE",
  });
  Router.push("/mywounds");
}

type Props = {
  wound: WoundProps;
  session: Session;
};

const Wound: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const woundBelongsToUser =
    props.session?.user?.email === props.wound?.author?.email;

  if (!props.session || !woundBelongsToUser) {
    return <UnauthorizedPage />;
  }

  return (
    <Layout>
      <Container>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" } }}
        >
          {t("type")}: {t(`woundTypes.${props.wound.type}`)}
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.2rem", md: "2rem" } }}
        >
          {t("location")}: {t(`bodyPart.${props.wound.location}`)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
        >
          {t("author")}: {props?.wound?.author?.name || "Unknown author"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
        >
          {t("notes")}: {props.wound?.note}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <StyledButton onClick={() => deleteWound(props.wound?.id)}>
            {t("delete")}
          </StyledButton>
          <StyledButton href={`/wound/edit/${props.wound?.id}`}>
            {t("edit")}
          </StyledButton>
        </Box>
      </Container>
    </Layout>
  );
};

export default Wound;
