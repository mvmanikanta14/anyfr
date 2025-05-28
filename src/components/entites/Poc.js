import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import commonService from "../../services/common.service";
import apiUrlsService from "../../services/apiUrls.service";

// Dynamic import for components based on API response
// const DynamicComponent = React.lazy(() => import("./DynamicComponent"));

const Poc = () => {
  const [Poc, setPoc] = useState([]); // State to store the Poc data
  const [selectedComponent, setSelectedComponent] = useState(null); // State to track selected component

  useEffect(() => {
    getAllPoc();
  }, []); // Run once on component mount

  const getAllPoc = () => {
    commonService
      .getAll(`${apiUrlsService.getAllPoc}`)
      .then((response) => {
        console.log("API Response:", response.data[0].sections); // Debugging

        if (response && response.data) {
          if (Array.isArray(response.data)) {
            const pocData = response.data
              .map((module) => {
                return module.sections.map((section) => ({
                  title: section.title,
                  enabled: section.enabled === "yes", // true/false based on "yes"
                  components: section.components,
                  path: section.path,
                }));
              })
              .flat(); // Flatten the array to get a flat list of sections

            setPoc(pocData); // Store the mapped data in state
          } else {
            console.error("Unexpected response format:", response.data);
            setPoc([]); // Set Poc to empty if format is unexpected
          }
        }
      })
      .catch((error) => {
        console.error("API call failed: ", error);
      });
  };

  // Handle section title click to set the selected component
  const handleSectionClick = (componentName) => {
    setSelectedComponent(componentName); // Set the selected component from the API response
  };

  return (
    <div className="page-content-full d-flex">
      <div className="table-responsive col-2">
        <table className="table table-bordered table-design-1">
          <thead>
            <tr className="bg-light">
              <th>S.No</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(Poc) && Poc.length > 0 ? (
              Poc.map((section, index) => {
                return (
                  <tr key={section.id}>
                    <td>{index + 1}</td>
                    <td>
                      <button
                        onClick={() => handleSectionClick(section.components)}
                      >
                        {section.title}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="2">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="col-lg-10">
        {/* Dynamically render the selected component */}
        {selectedComponent ? (
          <Suspense fallback={<div>Loading...</div>}>
            {selectedComponent && React.createElement(
              require(`./${selectedComponent}`).default
            )}
          </Suspense>
        ) : (
          <div>Select a section to display its component</div>
        )}
      </div>
    </div>
  );
};

export default Poc;
