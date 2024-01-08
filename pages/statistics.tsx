import React from "react";
import prisma from "../lib/prisma";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
import Layout from "../components/Layout";
import { Box, Divider, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import UnauthorizedPage from "../components/Unauthorized";
import { getSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

Chart.register(BarElement, CategoryScale, LinearScale, ArcElement);

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);

  const typesCount = await prisma.wound.groupBy({
    by: ["type"],
    _count: true,
  });

  const locationsCount = await prisma.wound.groupBy({
    by: ["location"],
    _count: true,
  });

  return {
    props: { typesCount, locationsCount, session },
  };
};

const Statistics = ({ typesCount, locationsCount, session }) => {
  const { t } = useTranslation();

  const getChartData = (data) => {
    const labels = data.map((entry) => entry.type || entry.location);
    const counts = data.map((entry) => entry._count);

    return {
      labels: labels,
      datasets: [
        {
          label: "Count",
          data: counts,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4CAF50",
            "#FF8C00",
          ],
        },
      ],
    };
  };

  const renderChart = (data, title) => {
    const chartData = getChartData(data);

    return (
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                stacked: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    );
  };

  if (!session || session?.user?.role !== "ADMIN") {
    return <UnauthorizedPage />;
  }

  return (
    <Layout>
      <PageHeader title={t("woundstats")} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {renderChart(typesCount, t("typecounts"))}
        <Divider sx={{ my: 5 }} />
        {renderChart(locationsCount, t("locationcounts"))}
      </Box>
    </Layout>
  );
};

export default Statistics;
