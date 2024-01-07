import React from "react";
import Router from "next/router";
import { Card, Typography } from "@mui/material";
import styled from "@emotion/styled";

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

const StyledWoundCard = styled(Card)`
  && {
    color: inherit;
    padding: 2rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }

    .notes {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
      display: block;
    }
  }
`;

const Wound: React.FC<{ wound: WoundProps }> = ({ wound }) => {
  const authorName = wound.author ? wound.author.name : "Unknown author";

  const handleCardClick = () => {
    Router.push("/wound/[id]", `/wound/${wound.id}`);
  };

  return (
    <StyledWoundCard onClick={handleCardClick}>
      <Typography variant="h6">Type: {wound.type}</Typography>
      <Typography variant="subtitle1">Location: {wound.location}</Typography>
      <Typography variant="caption">Author: {authorName}</Typography>
      <Typography variant="body2" className="notes">
        {wound.note}
      </Typography>
    </StyledWoundCard>
  );
};

export default Wound;
