import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CalendarWithHighlights = () => {
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      setLoading(true);

      try {
        const response = await axios.get('http://localhost:3100/testApis/dashboard/calendar');
        
        if (response.data.success) {
          setHighlightedDates(response.data.highlighted_dates); // Store highlighted dates from API
        } else {
          setError('Failed to fetch calendar data');
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const getHighlightedDates = () => {
    return highlightedDates.map(item => new Date(item.date));
  };

  if (loading) {
    return <div>Loading calendar...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="calendar-container">
      <h4></h4>
      <Calendar
        tileClassName={({ date, view }) => {
          // Mark the highlighted dates with a custom class
          const isHighlighted = highlightedDates.some(item => new Date(item.date).toDateString() === date.toDateString());
          return isHighlighted ? 'highlighted-tile' : null;
        }}
        tileContent={({ date, view }) => {
          // Add labels on the highlighted dates
          const highlightedDate = highlightedDates.find(item => new Date(item.date).toDateString() === date.toDateString());
          if (highlightedDate) {
            return <span className="date-label">{highlightedDate.label}</span>;
          }
          return null;
        }}
      />
    </div>
  );
};

export default CalendarWithHighlights;
