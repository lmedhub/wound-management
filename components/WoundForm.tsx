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
import backHuman from "../assets/backHuman.png";
import frontalHuman from "../assets/frontalHuman.png";

import StyledSelect from "./FormComponents/StyledSelect";
import StyledTextField from "./FormComponents/StyledTextField";
import ErrorText from "./FormComponents/ErrorText";
import StyledButton from "./FormComponents/StyledButton";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
  } = useForm({
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
          {existingData ? t("editwound") : t("createwound")}
        </Typography>
        <Controller
          name="type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <InputLabel>{t("type")}</InputLabel>
              <FormControl>
                <SelectInputLabel disableAnimation id="selectLabel">
                  {t("typeselectlabel")}
                </SelectInputLabel>
                <StyledSelect
                  {...field}
                  labelId="selectLabel"
                  label={t("typeselectlabel")}
                  variant="standard"
                >
                  <MenuItem value="Abrasion">
                    {t("woundTypes.Abration")}
                  </MenuItem>
                  <MenuItem value="Laceration">
                    {t("woundTypes.Laceration")}
                  </MenuItem>
                  <MenuItem value="Incision">
                    {t("woundTypes.Incision")}
                  </MenuItem>
                  <MenuItem value="Puncture">
                    {t("woundTypes.Puncture")}
                  </MenuItem>
                  <MenuItem value="Avulsion">
                    {t("woundTypes.Avulsion")}
                  </MenuItem>
                  <MenuItem value="Contusion">
                    {t("woundTypes.Contusion")}
                  </MenuItem>
                  <MenuItem value="Fracture">
                    {t("woundTypes.Fracture")}
                  </MenuItem>
                  <MenuItem value="Internal Bleeding">
                    {t("woundTypes.Internal Bleeding")}
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
              <InputLabel>{t("location")}</InputLabel>
              <StyledTextField
                {...field}
                placeholder={t("locationplaceholder")}
                type="text"
                value={t(`bodyPart.${field.value}`)}
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
              <InputLabel>{t("notes")}</InputLabel>
              <StyledTextField
                multiline
                {...field}
                placeholder={t("notes")}
                type="text"
                value={field.value}
                variant="standard"
              />
            </>
          )}
        />{" "}
        <Box sx={{ display: "flex", gap: 2 }}>
          <StyledButton onClick={() => router.back()} type="submit">
            {t("cancel")}
          </StyledButton>
          <StyledButton type="submit" disabled={Object.keys(errors).length > 0}>
            {existingData ? t("editwound") : t("createwound")}
          </StyledButton>
        </Box>
      </Form>
    </Container>
  );
}
