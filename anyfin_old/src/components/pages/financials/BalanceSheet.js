import React, { useState, useEffect } from 'react';
import axios from 'axios';
import commonService from '../../../services/common.service';
import apiUrlsService from '../../../services/apiUrls.service';

const BalanceSheet = () => {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);

      try {
         const response = await commonService.getAll(apiUrlsService.getFinancialsBS); 
        
        if (response.data.success) {
          setFinancialData(response.data.fsli_sections); // Store the sections of the balance sheet
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
    <div className="balance-sheet-container">
      {financialData.map((section, index) => (
        <div key={index} className="balance-sheet-section">
          <h4>{section.section}</h4> {/* Render section name (e.g., Assets, Liabilities & Equity) */}
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
              {section.lines.map((line, lineIndex) => (
                <tr key={lineIndex}>
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
      ))}
    </div>
  );
};

export default BalanceSheet;
