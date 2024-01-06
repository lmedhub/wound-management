import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MenuItem, Button, Box, Container } from "@mui/material";
import styled from "@emotion/styled";
import Layout from "../../../components/Layout";
import FrontsideHuman from "../../../components/FrontsideHuman";
import frontalHuman from "../../../assets/frontalHuman.png";
import BacksideHuman from "../../../components/BacksideHuman";
import backHuman from "../../../assets/backHuman.png";
import Router from "next/router";
import Image from "next/image";
import StyledSelect from "../../../components/FormComponents/StyledSelect";
import StyledTextField from "../../../components/FormComponents/StyledTextField";
import ErrorText from "../../../components/FormComponents/ErrorText";
import StyledButton from "../../../components/FormComponents/StyledButton";
import { useRouter } from "next/router";
import WoundForm from "../../../components/WoundForm";
import prisma from "../../../lib/prisma";
import { GetServerSideProps } from "next";
import { WoundProps } from "../../../components/Wound";

interface FormData {
  type: string;
  location: string;
  note: string;
}

const schema = yup.object({
  type: yup.string().required("Type is required"),
  location: yup.string().required("Location is required"),
  note: yup.string(),
});

const Form = styled("form")`
  display: flex;
  flex-direction: column;
`;

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

const MyWounds: React.FC<WoundProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const existingData = { props };

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
      console.error(error);
    }
  };

  return (
    <Layout>
      <WoundForm submitData={editData} existingData={existingData} />
    </Layout>
  );
};

export default MyWounds;
