import React from 'react';
import { Typography, Box } from '@mui/material';
import { keyframes } from '@mui/system';

// Keyframe animation for horizontal marquee
const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const MarqueeWidget = ({ text, speed = 20 }) => {
  return (
    <Box
      sx={{
        width: '103%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        borderRadius: '10px',
        // backgroundColor: '#f0f0f0',
        backgroundColor:"#dabfec",
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '8px',
      }}
    >
      <Typography
        sx={{
          display: 'inline-block',
          paddingLeft: '100%',
          animation: `${marquee} ${speed}s linear infinite`,
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#333',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

// Example Usage
const MarqueeWidgets = () => {
  return (
    <div >
      {/* Marquee Widget */}
      <MarqueeWidget text="Bank Audit Updates: State Bank of India audit completed by Deloitte. HDFC Bank audit pending with PwC. ICICI Bank issues found by KPMG." speed={40} />
    </div>
  );
};

export default MarqueeWidgets;
