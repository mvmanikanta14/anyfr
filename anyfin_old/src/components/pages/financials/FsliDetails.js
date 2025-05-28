import React, { useState, useEffect } from 'react';
import axios from 'axios';
import commonService from '../../../services/common.service';
import apiUrlsService from '../../../services/apiUrls.service';

const FsliDetails = () => {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);

      try {
         const response = await commonService.getAll(apiUrlsService.getFinancialFslidetails); 
        if (response.data.success) {
          setFinancialData(response.data); // Store the fsli code, name, and line items
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!financialData) {
    return <div>No data available</div>;
  }

  return (
    <div className="fsli-details-container">
      <h4>FSLI Details</h4>
      <div className="fsli-section">
        <h6>{financialData.fsli_name} (Code: {financialData.fsli_code})</h6>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Sub GL</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {financialData.line_items.map((item, index) => (
              <tr key={index}>
                <td>{item.sub_gl}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FsliDetails;
