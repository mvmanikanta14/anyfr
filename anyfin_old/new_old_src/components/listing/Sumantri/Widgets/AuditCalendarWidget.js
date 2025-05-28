import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Chip } from '@mui/material';
import { CheckCircle, PendingActions, Error } from '@mui/icons-material';

// Function to choose the icon and color based on event status
const getEventStatusStyle = (status) => {
  switch (status) {
    case 'Completed':
      return { icon: <CheckCircle />, color: '#4caf50' };
    case 'Pending':
      return { icon: <PendingActions />, color: '#ff9800' };
    case 'Issues Found':
      return { icon: <Error />, color: '#f44336' };
    default:
      return { icon: <CheckCircle />, color: '#757575' };
  }
};

const AuditCalendarWidget = ({ auditEvents }) => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        // background: 'linear-gradient(145deg, #6987b7, #ffffff)',
        // boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxHeight: '400px',
        overflowY: 'auto', // Allows scrolling if there are too many events
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#444', marginBottom: '20px' }}>
        Upcoming Audit Events
      </Typography>
      <List sx={{ padding: 0 }}>
        {auditEvents.map((event, index) => {
          const { icon, color } = getEventStatusStyle(event.status);
          return (
            <ListItem key={index} sx={{ alignItems: 'flex-start', marginBottom: '10px', borderRadius: '10px',  }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: color }}>
                  {icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: '600', color: '#333' }}>
                    {event.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" sx={{ display: 'block', color: '#777' }}>
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'block', color: '#555', marginTop: '5px' }}>
                      {event.description}
                    </Typography>
                    <Chip
                      label={event.status}
                      sx={{
                        backgroundColor: color,
                        color: '#fff',
                        fontWeight: 'bold',
                        marginTop: '5px',
                      }}
                    />
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

// Example Usage
const auditEvents = [
  { title: 'HDFC Bank Annual Audit', date: '2023-09-04', status: 'Completed', description: 'Annual audit completed with no significant findings.' },
  { title: 'ICICI Bank Internal Review', date: '2023-09-12', status: 'Pending', description: 'Scheduled for next week. Awaiting team allocation.' },
  { title: 'Axis Bank Follow-up Audit', date: '2023-09-18', status: 'Issues Found', description: 'Minor compliance issues to be reviewed.' },
  { title: 'Final Report Submission for SBI', date: '2023-09-22', status: 'Completed', description: 'Audit report submitted to the board.' },
];

export default () => <AuditCalendarWidget auditEvents={auditEvents} />;
