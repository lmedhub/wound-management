import React from "react";
import Layout from "../components/Layout";
import { WoundProps } from "../components/Wound";
import prisma from "../lib/prisma";
import WoundList from "../components/WoundList";
import { Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import UnauthorizedPage from "../components/Unauthorized";
import { Session } from "next-auth";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const allWounds = await prisma.wound.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { allWounds, session },
  };
};

type Props = {
  allWounds: WoundProps[];
  session: Session;
};

const AllWounds: React.FC<Props> = (props) => {
  if (!props?.session || props?.session?.user?.role !== "ADMIN") {
    return <UnauthorizedPage />;
  }

  console.log(props.session);

  return (
    <Layout>
      <Typography variant="h3">All wounds</Typography>
      <WoundList wounds={props.allWounds} />
    </Layout>
  );
};

export default AllWounds;
