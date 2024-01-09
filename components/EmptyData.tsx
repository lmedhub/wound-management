import React from "react";
import { Box, Typography } from "@mui/material";
import Layout from "./Layout";
import { useTranslation } from "react-i18next";

const EmptyData = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("nodata")}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {t("nodatadisplay")}
        </Typography>
      </Box>
    </Layout>
  );
};

export default EmptyData;
