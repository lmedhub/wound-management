import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Select, MenuItem, TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import FrontsideHuman from "../components/FrontsideHuman";
import frontalHuman from "../assets/frontalHuman.png";
import BacksideHuman from "../components/BacksideHuman";
import backHuman from "../assets/backHuman.png";
import Router from "next/router";
import Image from "next/image";
import zIndex from "@mui/material/styles/zIndex";

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

const FormContainer = styled("div")`
  /* Add your styles for the form container */
  padding: 1rem;
`;

const Form = styled("form")`
  /* Add your styles for the form */
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
`;

const StyledButton = styled(Button)`
  background: #ececec;
  border: 0;
  padding: 1rem 2rem;
`;

const ErrorText = styled("div")`
  color: red;
  margin-top: 0.25rem;
`;

const MyWounds: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submitData = async (data: FormData) => {
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

  const handleLocationChange = (newLocation: string) => {
    setValue("location", newLocation);
  };

  return (
    <Layout>
      <FormContainer>
        <Form onSubmit={handleSubmit(submitData)}>
          <h1>New Wound</h1>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <StyledSelect autoFocus {...field} variant="standard">
                  <MenuItem value="" disabled>
                    Select type of wound
                  </MenuItem>
                  <MenuItem value="Abrasion">Abrasion</MenuItem>
                  <MenuItem value="Laceration">Laceration</MenuItem>
                  <MenuItem value="Incision">Incision</MenuItem>
                  <MenuItem value="Puncture">Puncture</MenuItem>
                  <MenuItem value="Avulsion">Avulsion</MenuItem>
                  <MenuItem value="Contusion">Contusion (Bruise)</MenuItem>
                  <MenuItem value="Fracture">Fracture</MenuItem>
                  <MenuItem value="Internal Bleeding">
                    Internal Bleeding
                  </MenuItem>
                </StyledSelect>
                {errors.type && <ErrorText>{errors.type.message}</ErrorText>}
              </>
            )}
          />
          <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <StyledTextField
                  {...field}
                  placeholder="Location"
                  type="text"
                  value={field.value}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{ pointerEvents: "none" }}
                  variant="standard"
                />
                {errors.location && (
                  <ErrorText>{errors.location.message}</ErrorText>
                )}
              </>
            )}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <div style={{ top: 0, position: "absolute", zIndex: "2" }}>
                <FrontsideHuman
                  onLocationChange={handleLocationChange}
                  location={watch("location")}
                />
              </div>
              <Image
                src={frontalHuman}
                alt="Frontal Human"
                layout="fixed"
                width={200}
                height={376}
                style={{ left: 1, top: 0 }}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <div
                style={{ left: 5, top: 0, position: "absolute", zIndex: "2" }}
              >
                <BacksideHuman onLocationChange={handleLocationChange} />
              </div>
              <Image
                src={backHuman}
                alt="Back of a Human"
                width={200}
                height={376}
                layout="fixed"
                style={{ left: 1, top: 0 }}
              />
            </Box>
          </Box>

          <Controller
            name="note"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <StyledTextField
                {...field}
                placeholder="Notes"
                type="text"
                value={field.value}
                variant="standard"
              />
            )}
          />
          <StyledButton type="submit" disabled={Object.keys(errors).length > 0}>
            Create
          </StyledButton>
          <a className="back" href="#" onClick={() => console.log("Cancel")}>
            or Cancel
          </a>
        </Form>
      </FormContainer>
    </Layout>
  );
};

export default MyWounds;
