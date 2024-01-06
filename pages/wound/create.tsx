import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MenuItem, Button, Box, Container } from "@mui/material";
import styled from "@emotion/styled";
import Layout from "../../components/Layout";
import FrontsideHuman from "../../components/FrontsideHuman";
import frontalHuman from "../../assets/frontalHuman.png";
import BacksideHuman from "../../components/BacksideHuman";
import backHuman from "../../assets/backHuman.png";
import Router from "next/router";
import Image from "next/image";
import StyledSelect from "../../components/FormComponents/StyledSelect";
import StyledTextField from "../../components/FormComponents/StyledTextField";
import ErrorText from "../../components/FormComponents/ErrorText";
import StyledButton from "../../components/FormComponents/StyledButton";
import WoundForm from "../../components/WoundForm";

interface FormData {
  type: string;
  location: string;
  note: string;
}

const MyWounds: React.FC = () => {
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

  return (
    <Layout>
      <WoundForm submitData={createData} />
    </Layout>
  );
};

export default MyWounds;
