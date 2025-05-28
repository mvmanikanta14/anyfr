import React, { useState, useEffect } from 'react';
import axios from 'axios';
import commonService from '../../../services/common.service';
import apiUrlsService from '../../../services/apiUrls.service';

const ProfitLoss = () => {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);

      try {
         const response = await commonService.getAll(apiUrlsService.getFinancialsPL); 
        
        if (response.data.success) {
          setFinancialData(response.data.lines); // Store the lines of P&L
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
    <div className="profit-loss-container">
      <h4>Profit & Loss Statement</h4>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((line, index) => (
            <tr key={index}>
              <td>{line.fsli_code}</td>
              <td>{line.fsli_name}</td>
              <td>{line.amount}</td>
              <td>
                {line.hover_preview.length > 0 ? (
                  <ul>
                    {line.hover_preview.map((preview, previewIndex) => (
                      <li key={previewIndex}>
                        <strong>{preview.name}:</strong> {preview.amount} (Sub GL: {preview.sub_gl})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No details available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfitLoss;
