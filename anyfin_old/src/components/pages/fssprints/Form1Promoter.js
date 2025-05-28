import React, { useEffect, useState } from "react";
import axios from "axios";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";

const From1Promoter = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = commonService.getAll(apiUrlsService.getform1);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await(API_URL);
                setData(response.data); // Store API response
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <h6>{data.title}</h6>
            <table className="table-custom table-regular">
                <thead>
                    <tr>
                        {data.columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.sl_no}</td>
                            <td>{item.particulars}</td>
                            <td>{item.no_of_shares_last_year.toLocaleString()}</td>
                            <td>{item.value_of_shares_last_year.toLocaleString()}</td>
                            <td>{item.no_of_shares_current_year.toLocaleString()}</td>
                            <td>{item.value_of_shares_current_year.toLocaleString()}</td>
                        </tr>
                    ))}
                    {/* Totals Row */}
                    <tr className="total-row">
                        <td colSpan="2">Total</td>
                        <td>{data.totals.total_no_of_shares_last_year.toLocaleString()}</td>
                        <td>{data.totals.total_value_of_shares_last_year.toLocaleString()}</td>
                        <td>{data.totals.total_no_of_shares_current_year.toLocaleString()}</td>
                        <td>{data.totals.total_value_of_shares_current_year.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default From1Promoter;
