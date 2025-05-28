import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);

      try {
        const response = await axios.get('http://localhost:3100/testApis/dashboard/announcements');
        
        if (response.data.success) {
          setAnnouncements(response.data.announcements); // Store the announcements
        } else {
          setError('Failed to fetch announcements');
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading announcements...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="announcements-container">
      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <ul className="announcement-list">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="announcement-item">
              <h4>{announcement.title}</h4>
              <p><strong>Date:</strong> {announcement.date}</p>
              <p>{announcement.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
