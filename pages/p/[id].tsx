import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { WoundProps } from "../../components/Wound";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

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
  if (status === "loading") {
    return <div>Authenticating...</div>;
  }
  const userHasValidSession = Boolean(session);
  const woundBelongsToUser = session?.user?.email === props.author?.email;

  return (
    <Layout>
      <div>
        <h2>Type: {props.type}</h2>
        <h3>Location: {props.location}</h3>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.note} />
        {userHasValidSession && woundBelongsToUser && (
          <button onClick={() => deleteWound(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Wound;
