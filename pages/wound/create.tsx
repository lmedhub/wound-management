import React from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import WoundForm from "../../components/WoundForm";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import UnauthorizedPage from "../../components/Unauthorized";

interface FormData {
  type: string;
  location: string;
  note: string;
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

type Props = {
  session: Session;
};

const MyWounds: React.FC<Props> = (props) => {
  const createData = async (data: FormData) => {
    try {
      const body = data;
      await fetch("/api/wound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!props.session) {
    return <UnauthorizedPage />;
  }

  return (
    <Layout>
      <WoundForm submitData={createData} />
    </Layout>
  );
};

export default MyWounds;
