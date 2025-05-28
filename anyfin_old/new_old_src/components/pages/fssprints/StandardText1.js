import React, { useEffect, useState } from "react";
import axios from "axios";
import commonService from "../../../services/common.service";
import apiUrlsService from "../../../services/apiUrls.service";

const StandardText1 = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = commonService.getAll(apiUrlsService.getstandardText1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await (API_URL);
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
            <h6>Standard Text</h6>
            <div className="standard-text-box">
                {data.Details.map((item, index) => (
                    <p key={index}>{item.text}</p>
                ))}
            </div>
        </div>
    );
};

export default StandardText1;
