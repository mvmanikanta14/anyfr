import React from 'react';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import { Gavel, AccountBalance, Flag, Public } from '@mui/icons-material';

// Function to choose the icon and color based on government type
const getGovernmentIcon = (type) => {
  switch (type) {
    case 'Federal':
      return { icon: <Gavel sx={{ color: '#1976d2' }} />, color: '#e3f2fd' };
    case 'State':
      return { icon: <AccountBalance sx={{ color: '#388e3c' }} />, color: '#e8f5e9' };
    case 'Local':
      return { icon: <Flag sx={{ color: '#d32f2f' }} />, color: '#ffebee' };
    case 'International':
      return { icon: <Public sx={{ color: '#fbc02d' }} />, color: '#fffde7' };
    default:
      return { icon: <Public sx={{ color: '#757575' }} />, color: '#f5f5f5' };
  }
};

const RiskAssessmentWidget = ({ governments }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        borderRadius: '20px',
        // background: 'linear-gradient(145deg, #97cbae, #ffffff)',
        background:"#9cebbf78",
        // boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Gavel sx={{ fontSize: 80, color: '#1E88E5', position: 'absolute', top: -10, right: 10, opacity: 0.1 , padding:'10px' }}/>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
        Government Entities
      </Typography>
      {/* <Typography variant="subtitle1" style={{ color: '#555', marginBottom: '20px' }}>
        Total Count: {governments.length}
      </Typography> */}
      <Grid container spacing={2}>
        {governments.map((government, index) => {
          const { icon, color } = getGovernmentIcon(government.type);
          return (
            <Grid
              item
              xs={6}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: color,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Avatar sx={{ backgroundColor: 'transparent' }}>{icon}</Avatar>
              <Typography variant="subtitle2" style={{ color: '#333', fontWeight: '600' }}>{government.name}</Typography>
              <Typography variant="body2" style={{ color: '#666' }}>{government.location}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// Example Usage
const governments = [
  { name: 'Government', type: 'Federal', location: 'USA' },
  { name: 'Government', type: 'State', location: 'India' },
  
];

export default () => <RiskAssessmentWidget governments={governments} />;
