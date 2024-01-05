import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Wound, { WoundProps } from "../components/Wound";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.wound.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};
type Props = {
  feed: WoundProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>All wounds</h1>
        <main>
          {props.feed.map((wound) => (
            <div key={wound.id} className="wound">
              <Wound wound={wound} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .wound {
          background: white;
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

export default Blog;
