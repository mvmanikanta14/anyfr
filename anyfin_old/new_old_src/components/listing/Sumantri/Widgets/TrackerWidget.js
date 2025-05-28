// App.js
import React from 'react';
import { Box, Typography, Avatar, Chip, LinearProgress } from '@mui/material';
import { Description, Note, Mail, AttachFile } from '@mui/icons-material';

// Function to choose the icon and color based on memo status
const getMemoIcon = (status) => {
  switch (status) {
    case 'Reviewed':
      return { icon: <Description sx={{ color: '#fff' }} />, color: '#4caf50' };
    case 'Pending Review':
      return { icon: <Note sx={{ color: '#fff' }} />, color: '#ff9800' };
    case 'Requires Action':
      return { icon: <Mail sx={{ color: '#fff' }} />, color: '#f44336' };
    default:
      return { icon: <AttachFile sx={{ color: '#fff' }} />, color: '#757575' };
  }
};

const TrackerWidget = ({ communications }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', // Change to row-wise layout
        overflowX: 'auto', // Enable horizontal scrolling
        gap: '20px',
        width: '102%',
        padding: '20px',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, #e0f7fa, #ffffff)',
        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      {communications.map((item, index) => {
        const { icon, color } = getMemoIcon(item.status);
        const progress = item.status === 'Reviewed' ? 100 : item.status === 'Pending Review' ? 50 : 20; // Example progress based on status
        return (
          <Box
            key={index}
            sx={{
              minWidth: '23%', // Minimum width for each item to be displayed in a row
              padding: '6px',
              borderRadius: '16px',
              background: 'linear-gradient(to right, #f5f5f5, #ffffff)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to right, #ffffff, #e0f7fa)',
              },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar
              sx={{ width: 56, height: 56, bgcolor: color, mb: 1 }}
            >
              {icon}
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: '600', color: '#333' }}>
              {item.type}
            </Typography>
            <Typography variant="body2" sx={{ color: '#777', mb: 1 }}>
              {item.details}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                width: '80%',
                height: 8,
                borderRadius: 5,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                },
              }}
            />
            <Chip
              label={item.status}
              sx={{
                backgroundColor: color,
                color: '#fff',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

// Example Usage
const communications = [
  { type: 'Memo', details: 'Review of Q3 Financials', status: 'Reviewed' },
  { type: 'Note', details: 'Meeting Notes from 2024', status: 'Pending Review' },
  { type: 'Internal Communication', details: 'Audit Team about Policy Update', status: 'Requires Action' },
  { type: 'External Communication', details: 'Client Regarding Audit Findings', status: 'Reviewed' },
];

export default () => <TrackerWidget communications={communications} />;
