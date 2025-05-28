import React from 'react';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import { Assignment, Description, Event, GroupWork } from '@mui/icons-material';

// Function to choose the icon and color based on assignment type
const getAssignmentIcon = (type) => {
  switch (type) {
    case 'Audit':
      return { icon: <Description sx={{ color: '#1976d2' }} />, color: '#e3f2fd' };
    case 'Review':
      return { icon: <Event sx={{ color: '#388e3c' }} />, color: '#e8f5e9' };
    case 'Consultation':
      return { icon: <GroupWork sx={{ color: '#d32f2f' }} />, color: '#ffebee' };
    case 'Tax Filing':
      return { icon: <Assignment sx={{ color: '#fbc02d' }} />, color: '#fffde7' };
    default:
      return { icon: <Assignment sx={{ color: '#757575' }} />, color: '#f5f5f5' };
  }
};

const AuditChecklistWidget = ({ assignments }) => {
  return (
    <Box
      sx={{
        width: '107%',
        padding: '20px',
        borderRadius: '20px',
        // background: 'linear-gradient(145deg, #6987b7, #ffffff)',
        background:"#b3cfeca1",
        // boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Assignment sx={{ fontSize: 80, color: '#1E88E5', position: 'absolute', top: -10, right: 10, opacity: 0.1 , padding:'10px' }}/>
      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
        Assignments
      </Typography>
      {/* <Typography variant="subtitle1" style={{ color: '#555', marginBottom: '20px' }}>
        Total Count: {assignments.length}
      </Typography> */}
      <Grid container spacing={2}>
        {assignments.map((assignment, index) => {
          const { icon, color } = getAssignmentIcon(assignment.type);
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
              <Typography variant="subtitle2" style={{ color: '#333', fontWeight: '600' }}>{assignment.name}</Typography>
              <Typography variant="body2" style={{ color: '#666' }}>{assignment.location}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// Example Usage
const assignments = [
  { name: 'Q1 Audit', type: 'Audit', location: 'New York' },
  { name: 'Annual Review', type: 'Review', location: 'London' },
  { name: 'Client ', type: 'Consultation', location: 'USA' },
  { name: 'Tax Filing ', type: 'Tax Filing', location: 'India' },
];

export default () => <AuditChecklistWidget assignments={assignments} />;
