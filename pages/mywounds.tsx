import React, { useState } from "react";
import Layout from "../components/Layout";
import { WoundProps } from "../components/Wound";
import prisma from "../lib/prisma";
import { Typography } from "@mui/material";
import WoundList from "../components/WoundList";
import { getSession } from "next-auth/react";
import UnauthorizedPage from "../components/Unauthorized";
import { Session } from "next-auth";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const myWounds = await prisma.wound.findMany({
    where: {
      author: {
        email: session?.user?.email,
      },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { myWounds, session },
  };
};

type Props = {
  myWounds: WoundProps[];
  session: Session;
};

const MyWounds: React.FC<Props> = (props) => {
  const { t } = useTranslation();

  if (!props.session) {
    return <UnauthorizedPage />;
  }

  return (
    <Layout>
      <PageHeader title={t("mywounds")} />
      <WoundList wounds={props.myWounds} />
    </Layout>
  );
};

export default MyWounds;
