import React, { useState, useEffect, useContext } from "react";
import { Container, Modal, Tabs, Tab } from "react-bootstrap";


import swal from "sweetalert";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";
import { ApiContext } from "../../services/ApiProvider";
import tokenService from "../../services/token.service";
import apiUrlsModulesService from "../../services/apiUrlsModules.service";


const Borrowings = ({ datas }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColObj, setsearchColObj] = useState("");
  const [Id, setId] = useState("");
  const [EntityID, setEntityID] = useState("");
  const [FrameworkID, setFrameworkID] = useState("");
  const [Finyear, setFinYear] = useState("");
  const [PeriodId, setPeriodId] = useState("");
  const [isManualPaging, setIsManualPaging] = useState(false);
  const [pageno, setPageNo] = useState(1);
  const records = 10;
  const [totalElements, setTotalElements] = useState(0);
  const [OthersMap, setOthersMap] = useState([]);
  const [showActive, setShowActive] = useState(true);
  const active = OthersMap.filter(item => item.is_active);
  const inactive = OthersMap.filter(item => !item.is_active);
  const displayed = showActive ? active : inactive;
  const [sortOn, setSortOn] = useState('');
  const [sortDir, setSortDir] = useState('');
  const [ShowTan, setShowTan] = useState(false);
  const handleShowTan = () => setShowTan(true);
  const handleCloseTan = () => setShowTan(false);


  useEffect(() => {
    setId(tokenService.getEID());
    setEntityID(tokenService.getEntityID());
    setFrameworkID(tokenService.getFrameworkID());
    setFinYear(tokenService.getPeriodName());
    setPeriodId(tokenService.getEID());
    if (EntityID) {
      if (!isManualPaging) {
        getAllListings();
      }
    }
  }, [EntityID, pageno, records]);



  const getAllListings = (key = "", value = "", passedSortOn = sortOn, passedSortDir = sortDir) => {
    setPageNo(1);
    // Use direct values instead of waiting for state to update       
    const requestData = {
      entity_id: EntityID,
      key: key,
      value: value,
      searchFilters: {
        // investment_name: key === "investment_name" ? value.trim() : searchInvestmentName.trim(),
        // instrument_from: key === "instrument_from" ? value.trim() : searchInstrumentFrom.trim(),
        // instrument_to: key === "instrument_to" ? value.trim() : searchInstrumentTo.trim(),
        // investment_date: key === "investment_date" ? value.trim() : searchInvestmentDate.trim(),
        // gross_value_invested: key === "gross_value_invested" ? value.trim() : searchGVI.trim(),
        // provision_for_diminution: key === "provision_for_diminution" ? value.trim() : searchPFD.trim(),
        // carrying_value: key === "carrying_value" ? value.trim() : searchCV.trim(),
        // investee_type_name: key === "investee_type_name" ? value.trim() : searchIT.trim(),
        // instrument_type_name: key === "instrument_type_name" ? value.trim() : searchInsT.trim(),
        // measurement_type_name: key === "measurement_type_name" ? value.trim() : searchMT.trim(),
      },
      sortOn: passedSortOn,
      sortDir: passedSortDir,
    };
    // searchColObj = requestData;
    const status = showActive ? 1 : 0;
    setsearchColObj(requestData);

    commonService.add(`${apiUrlsModulesService.getAllBorrowingsList}?page=${pageno}&limit=${records}&is_active=${status}`, requestData)
      .then((response) => {
        console.log("API:", response.data);

        if (response && response.data) {
          if (Array.isArray(response.data.data)) {

            setOthersMap(response.data.data);
            setTotalElements(response.data.total);
          } else {
            swal(response.data.error);
            setOthersMap([]);
          }
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
      });
  };


  const handlePageChange = (newPageNumber) => {
    setIsManualPaging(true); // 🔥 tell React: I'm handling manually now
    setPageNo(newPageNumber);


    const status = showActive ? 1 : 0;

    commonService.add(`${apiUrlsModulesService.getAllBorrowingsList}?page=${newPageNumber}&limit=${records}&is_active=${status}`, searchColObj)
      .then((response) => {
        console.log("API:", response.data);

        if (response && response.data) {
          if (Array.isArray(response.data.data)) {

            setOthersMap(response.data.data);
            setTotalElements(response.data.total);
            setIsManualPaging(false); // ✅ After success, allow default API again
          } else {
            swal(response.data.error);
            setOthersMap([]);
          }
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
      });
  };




  return (
    <div className="">
      <div className="d-flex justify-content-end custom-table-search">
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-25"
          value={searchTerm}
        // onChange={handleSearch}
        />

        <button className="btn-sm btn-primary btn" onClick={handleShowTan}> popup </button>

      </div>

      {/* Table for Section Questions */}
      <div className="table-responsive">
        <table className="table table-bordered  table-design-1">
          <thead>
            <tr className="bg-light">
              <th width="5%">S.No.</th>
              <th width="50%">Question</th>
              <th width="20%">Reference</th>
              <th> User Response </th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>


      {/* Tan pop up */}
      <div className="model_box ">
        <Modal
          show={ShowTan}
          onHide={handleCloseTan}
          size="xl"
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          className="modalcustomise custom-modal-popup-1" // corrected: `className` not `ClassName`
        >
          <Modal.Header closeButton>
            <Modal.Title> Details of   </Modal.Title>

          </Modal.Header>

          <Modal.Body className="custom-modal-body p-0">

            <Tabs defaultActiveKey="disbursal" id="entity-tabs" className="popup-tabs">
              {/* === TAB 1: BASIC DETAILS === */}


              <Tab eventKey="disbursal" title="Disbursal Release">
                <div className="tab-form-body">
                  <div className="table-responsive">
                    <table className="table table-bordered  table-design-1">
                      <thead>
                        <tr className="bg-light">
                          <th width="5%">S.No.</th>
                          <th width="50%">Question</th>
                          <th width="20%">Reference</th>
                          <th> User Response </th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>

                </div>
              </Tab>

              <Tab eventKey="security" title="Security">
                <div className="tab-form-body">
                  <div className="table-responsive">
                    <table className="table table-bordered  table-design-1">
                      <thead>
                        <tr className="bg-light">
                          <th width="5%">S.No.</th>
                          <th width="50%">Question</th>
                          <th width="20%">Reference</th>
                          <th> User Response </th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>

                </div>
              </Tab>


              <Tab eventKey="repayment" title="Repayment Schedule">
                <div className="tab-form-body">
                  <div className="table-responsive">
                    <table className="table table-bordered  table-design-1">
                      <thead>
                        <tr className="bg-light">
                          <th width="5%">S.No.</th>
                          <th width="50%">Question</th>
                          <th width="20%">Reference</th>
                          <th> User Response </th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>

                </div>
              </Tab>


              {/* === TAB 3: ADDITIONAL DETAILS === */}
              <Tab eventKey="actual" title="Actual Repayment">
                <div className="tab-form-body">
                  <div className="table-responsive">
                    <table className="table table-bordered  table-design-1">
                      <thead>
                        <tr className="bg-light">
                          <th width="5%">S.No.</th>
                          <th width="50%">Question</th>
                          <th width="20%">Reference</th>
                          <th> User Response </th>
                        </tr>
                      </thead>
                      <tbody>

                      </tbody>
                    </table>
                  </div>

                </div>
              </Tab>




            </Tabs>
          </Modal.Body>
        </Modal>
      </div>

    </div>
  );
};

export default Borrowings;

