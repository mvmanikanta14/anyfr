import React from 'react';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import { Business, CorporateFare, Public, Group } from '@mui/icons-material';

// Function to choose the icon and color based on entity type
const getEntityIcon = (type) => {
  switch (type) {
    case 'Private Limited':
      return { icon: <CorporateFare sx={{ color: '#1976d2' }} />, color: '#e3f2fd' };
    case 'Public Limited':
      return { icon: <Public sx={{ color: '#388e3c' }} />, color: '#e8f5e9' };
    case 'LLC':
      return { icon: <Business sx={{ color: '#d32f2f' }} />, color: '#ffebee' };
    case 'Partnership':
      return { icon: <Group sx={{ color: '#fbc02d' }} />, color: '#fffde7' };
    default:
      return { icon: <Business sx={{ color: '#757575' }} />, color: '#f5f5f5' };
  }
};

const FinancialStatementAnalysisWidget = ({ entities }) => {
  return (
    <Box
      sx={{
        width: '102%',
        padding: '20px',
        borderRadius: '20px',
        // background: 'linear-gradient(145deg, #af7cc3, #ffffff)',
        background:"#d1b0e682",
        // boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Business sx={{ fontSize: 80, color: '#1E88E5', position: 'absolute', top: -10, right: 10, opacity: 0.1 , padding:'10px' }} />
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
        Business Entities
      </Typography>
      {/* <Typography variant="subtitle1" style={{ color: '#555', marginBottom: '20px' }}>
        Total Count: {entities.length}
      </Typography> */}
      <Grid container spacing={2}>
        {entities.map((entity, index) => {
          const { icon, color } = getEntityIcon(entity.type);
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
              <Typography variant="subtitle2" style={{ color: '#333', fontWeight: '600' }}>{entity.name}</Typography>
              <Typography variant="body2" style={{ color: '#666' }}>{entity.location}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// Example Usage
const entities = [
  { name: 'ABC Corporation', type: 'Private Limited', location: 'New York' },
  { name: 'XYZ Ltd.', type: 'Public Limited', location: 'London' },
  { name: 'Global Tech', type: 'LLC', location: 'USA' },
  { name: 'Innovate Inc.', type: 'Partnership', location: 'India' },
];

export default () => <FinancialStatementAnalysisWidget entities={entities} />;
