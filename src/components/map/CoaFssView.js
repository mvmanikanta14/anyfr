import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Plus, Search } from "lucide-react";
import { Chart } from "chart.js";
import tokenService from "../../services/token.service";
import commonService from "../../services/common.service";
import Pagination from "../PaginationCommon";




const CoaFssView = () => {
    const [totalElements, setTotalElements] = useState(0); // Total elements for pagination
    const [pageno, setPageNo] = useState(1); // Current page for pagination
    const records = 10; // Number of records per page
    const [Id, setId] = useState("");
    const [EntityID, setEntityID] = useState("");
    const [Fsslist, setFsslist] = useState([]);
    const [Fsspoplist, setFsspoplist] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        const entityId = tokenService.getEntityID();
        if (entityId) {
          setEntityID(entityId); // this sets EntityID state
          getAllFssView(entityId);
        }
      }, []);
      


    const getAllFssView = (entityId) => {
        const requestData = { entity_id: entityId };
        commonService
            .add(apiUrlsService.getAllFssView, requestData)
            .then((response) => {
                if (response && response.data && Array.isArray(response.data.rows)) {
                    setFsslist(response.data.rows);
                }
            })
            .catch((error) => {
                console.error("Error fetching FSS view:", error);
            });
    };


    const getAllFsspopView = async (mapId, entityId) => {
        
         const eid = { map_id: mapId, entity_id: entityId  };
        try {
          const response = await commonService.add(apiUrlsService.getAllFsspopView, eid);
          console.log("API Response:", response); // 👈
      
          const records = response?.data?.data || [];
      
          if (records.length > 0) {
            setFsspoplist(records);
            setShowModal(true);
          } else {
            swal("No Records", "No GLs found for this FSS Name.", "info");
          }
        } catch (error) {
          console.error("API call failed:", error);
          swal("Error", "Unable to fetch mapped GLs", "error");
        }
      };
      
      
 


    return (
        <div className="">

            <div className="table-responsive">
                <table className="table table-bordered  table-design-1">
                    <thead>
                        <tr className="bg-light">
                            <th>ID</th>
                            <th>FSS Name</th>
                            <th> Custom Name </th>
                            <th>GL Count</th>
                        </tr>
                    </thead>


                    <tbody>
                        {Fsslist.length > 0 ? (
                            Fsslist.map((item) => (
                                <tr key={item.id} className="tr-hover-effect1"   onClick={() => getAllFsspopView(item.id, EntityID)}>
                                    <td>{item.id}</td>
                                    <td style={{ paddingLeft: `${5 + item.node_level * 20}px` }}>
                                        {item.flsi_master_name || "-"}
                                    </td>
                                    
                                    <td>{item.custom_name}</td>
                                    <td>{item.gl_count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Mapped GL Records</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-responsive">
                            <table className="table table-bordered  table-design-1">
                                <thead>
                                    <tr>
                                         <th>GL Name</th>
                                         <th>Custom Name</th>
                                         <th>GL Code</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {Fsspoplist.map((rec, index) => (
                                        <tr key={index}>
                                            <td>{rec.gl_name || "-"}</td>
                                            <td>{rec.custom_name }</td>
                                            <td>{rec.gl_code }</td>
                                          </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    
                </Modal>



            </div>





        </div>
    );
};

export default CoaFssView;
