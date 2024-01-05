import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Wound, { WoundProps } from "../components/Wound";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.wound.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: WoundProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>All wounds</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>All wounds</h1>
        <main>
          {props.drafts.map((wound) => (
            <div key={wound.id} className="wound">
              <Wound wound={wound} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .wound {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }

        .wound:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .wound + .wound {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
