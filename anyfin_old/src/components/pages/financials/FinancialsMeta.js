import React, { useState, useEffect } from 'react';
import apiUrlsService from '../../../services/apiUrls.service';
import commonService from '../../../services/common.service';


const FinancialMeta = () => {
  const [financialMeta, setFinancialMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialMeta = async () => {
      setLoading(true);

      try {
        const response = await commonService.getAll(apiUrlsService.getFinancialsMeta); // Ensure you await the API call
        if (response.data && response.data.success) {
          setFinancialMeta(response.data); // Save the response data
        } else {
          setError('Failed to fetch data: ' + (response.data.error || 'Unknown error'));
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message); // Set the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFinancialMeta();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!financialMeta) {
    return <div>No data available</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Assignment ID</td>
            <td>{financialMeta.assignment_id}</td>
          </tr>
          <tr>
            <td>Client ID</td>
            <td>{financialMeta.client_id}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{financialMeta.status}</td>
          </tr>
          <tr>
            <td>Framework</td>
            <td>{financialMeta.framework}</td>
          </tr>
          <tr>
            <td>Font</td>
            <td>{financialMeta.font}</td>
          </tr>
          <tr>
            <td>Rounding</td>
            <td>{financialMeta.rounding}</td>
          </tr>
          <tr>
            <td>Totals Placement</td>
            <td>{financialMeta.totals_placement}</td>
          </tr>
          <tr>
            <td>Notes Linked</td>
            <td>{financialMeta.notes_linked ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Schedules Linked</td>
            <td>{financialMeta.schedules_linked ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Can Generate Udin</td>
            <td>{financialMeta.can_generate_udin ? 'Yes' : 'No'}</td>
          </tr>

          {/* Footer Signatories */}
          <tr>
            <td>Auditor</td>
            <td>{financialMeta.footer_signatories.auditor}</td>
          </tr>
          <tr>
            <td>Director 1</td>
            <td>{financialMeta.footer_signatories.director_1}</td>
          </tr>
          <tr>
            <td>Director 2</td>
            <td>{financialMeta.footer_signatories.director_2}</td>
          </tr>
          <tr>
            <td>Place</td>
            <td>{financialMeta.footer_signatories.place}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{financialMeta.footer_signatories.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FinancialMeta;
