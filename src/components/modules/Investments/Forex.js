import React, { useState, useEffect, useContext } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";



const Forex = () => {


    return (
        <div className="">
            <div className="d-flex justify-content-end custom-table-search">
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control w-25"

                // onChange={handleSearch}
                />


            </div>

            {/* Table for Section Questions */}
            <div className="table-responsive">
                <table className="table table-bordered  table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th width="5%">S.No.</th>
                            <th width="20%">Name</th>
                            <th>Closing Balance (Forex)</th>
                            <th>Currency</th>
                            <th>Exchange Rate</th>
                            <th>Closing Balance (INR)</th>
                        </tr>
                    </thead>

                    <tbody>

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Forex;

