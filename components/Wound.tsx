import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type WoundProps = {
  id: string;
  type: string;
  author: {
    name: string;
    email: string;
  } | null;
  location: string;
  note: string;
};

const Wound: React.FC<{ wound: WoundProps }> = ({ wound }) => {
  const authorName = wound.author ? wound.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${wound.id}`)}>
      <h2>Type: {wound.type}</h2>
      <h3>Location: {wound.location}</h3>
      <small>By {authorName}</small>
      <ReactMarkdown children={wound.note} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Wound;
