// App.js
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Function to generate data for the bar chart
const generateBarChartData = (data) => ({
  labels: data.map((item) => item.year),
  datasets: [
    {
      label: 'Revenue',
      data: data.map((item) => item.revenue),
      backgroundColor: '#4caf50',
    },
    {
      label: 'Profit',
      data: data.map((item) => item.profit),
      backgroundColor: '#ff9800',
    },
  ],
});

const ProjectWidgetStyle1 = ({ historicalData }) => {
  const chartData = generateBarChartData(historicalData);

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #f0f4f8, #ffffff)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Historical FSS Overview
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: '10px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box>
    </Box>
  );
};

// Example Usage
const historicalData = [
  { year: '2020', revenue: 120, profit: 40 },
  { year: '2021', revenue: 150, profit: 60 },
  { year: '2022', revenue: 180, profit: 75 },
];

export default () => <ProjectWidgetStyle1 historicalData={historicalData} />;
