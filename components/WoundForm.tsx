import {
  MenuItem,
  Box,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import BacksideHuman from "./BacksideHuman";
import FrontsideHuman from "./FrontsideHuman";
import backHuman from "/home/lucas/Projects/wound-management/assets/backHuman.png";
import frontalHuman from "/home/lucas/Projects/wound-management/assets/frontalHuman.png";
import StyledSelect from "./FormComponents/StyledSelect";
import StyledTextField from "./FormComponents/StyledTextField";
import ErrorText from "./FormComponents/ErrorText";
import StyledButton from "./FormComponents/StyledButton";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";
import * as yup from "yup";
import { useRouter } from "next/router";

const Form = styled("form")`
  display: flex;
  flex-direction: column;
`;

const SelectInputLabel = styled(InputLabel)`
  &.MuiInputLabel-shrink {
    display: none;
  }
`;

interface FormData {
  type: string;
  location: string;
  note: string;
}

export default function WoundForm({ submitData, existingData = null }) {
  const router = useRouter();

  const schema = yup.object({
    type: yup.string().required("Type is required"),
    location: yup.string().required("Location is required"),
    note: yup.string(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: existingData?.type,
      location: existingData?.location,
      note: existingData?.note || "",
    },
  });

  const handleLocationChange = (newLocation: string) => {
    setValue("location", newLocation);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitData)}>
        <Typography variant="h4">
          {existingData ? "Edit wound" : "Create new wound"}
        </Typography>
        <Controller
          name="type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <InputLabel>Type</InputLabel>
              <FormControl>
                <SelectInputLabel disableAnimation id="selectLabel">
                  Choose the type of wound
                </SelectInputLabel>
                <StyledSelect
                  {...field}
                  labelId="selectLabel"
                  label="Choose the type of wound"
                  variant="standard"
                >
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
              </FormControl>
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
              <InputLabel>Location</InputLabel>
              <StyledTextField
                {...field}
                placeholder="Choose the wound location on the body"
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
            <div style={{ left: 5, top: 0, position: "absolute", zIndex: "2" }}>
              <BacksideHuman
                onLocationChange={handleLocationChange}
                location={watch("location")}
              />
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
            <>
              <InputLabel>Notes</InputLabel>
              <StyledTextField
                multiline
                {...field}
                placeholder="Notes"
                type="text"
                value={field.value}
                variant="standard"
              />
            </>
          )}
        />{" "}
        <Box sx={{ display: "flex", gap: 2 }}>
          <StyledButton onClick={() => router.back()} type="submit">
            Cancel
          </StyledButton>
          <StyledButton type="submit" disabled={Object.keys(errors).length > 0}>
            {existingData ? "Edit Wound" : "Create New Wound"}
          </StyledButton>
        </Box>
      </Form>
    </Container>
  );
}
