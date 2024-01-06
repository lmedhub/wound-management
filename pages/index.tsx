import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Wound, { WoundProps } from "../components/Wound";
import prisma from "../lib/prisma";
import { Grid, Card, Typography } from "@mui/material";
import styled from "@emotion/styled";

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

const StyledWoundContainer = styled("div")`
  .wound {
    margin-bottom: 16px;
  }
`;

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <StyledWoundContainer>
        <Typography variant="h3">All wounds</Typography>
        <Grid container spacing={3}>
          {props.feed.map((wound) => (
            <Grid item key={wound.id} xs={12} sm={6} md={4}>
              <Card className="wound">
                <Wound wound={wound} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledWoundContainer>
    </Layout>
  );
};

export default Blog;
