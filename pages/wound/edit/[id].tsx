import React from "react";
import Layout from "../../../components/Layout";
import Router from "next/router";
import WoundForm from "../../../components/WoundForm";
import prisma from "../../../lib/prisma";
import { GetServerSideProps } from "next";
import { WoundProps } from "../../../components/Wound";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import UnauthorizedPage from "../../../components/Unauthorized";
import { Button } from "@mui/material";

interface FormData {
  type: string;
  location: string;
  note: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    props: { wound, session, params },
  };
};

type Props = {
  wound: WoundProps;
  session: Session;
  params: Params;
};

const EditWound: React.FC<Props> = (props) => {
  const id = props.params?.id;
  const existingData = props.wound;
  const woundBelongsToUser =
    props.session?.user?.email === props.wound?.author?.email;

  const editData = async (data: FormData) => {
    try {
      const body = data;
      await fetch(`/api/wound/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.log("Error editing data. Please try again.", "error");
    }
  };

  if (!props.session || !woundBelongsToUser) {
    return <UnauthorizedPage />;
  }

  return (
    <Layout>
      <WoundForm submitData={editData} existingData={existingData} />
    </Layout>
  );
};

export default EditWound;
