import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import commonService from "../../../services/common.service";
import apiUrlsModulesService from "../../../services/apiUrlsModules.service";
import swal from "sweetalert";
 
 
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Movements = () => {
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    {
      headerName: "S.No",
      valueGetter: "node.rowIndex + 1",
      pinned: "left",
      width: 80,
      
    },
    {
      headerName: "Inventory Name",
      field: "inv_name",
      pinned: "left",
      width: 200,
    },
    {
      headerName: "Opening (Qty / Value)",
      field: "opening_value",
    },
    {
      headerName: "Purchase (Qty / Value)",
      field: "purchase_value",
    },
    {
      headerName: "Products (Qty / Value)",
      field: "products_value",
    },
    {
      headerName: "Transfer (Qty / Value)",
      field: "transfer_value",
    },
    {
      headerName: "Total (Qty / Value)",
      field: "total_value",
    },
  ];

  useEffect(() => {
    commonService.getAll(apiUrlsModulesService.getAllmovement)
      .then((response) => {
        const firstItem = response?.data?.[0];
        if (firstItem && Array.isArray(firstItem.inventory)) {
          const mapped = firstItem.inventory.map((item) => ({
            inv_name: item.inv_name,
            opening_value: `${item.opening?.quality ?? 0} / ${item.opening?.value ?? 0}`,
            purchase_value: `${item.purchase?.quality ?? 0} / ${item.purchase?.value ?? 0}`,
            products_value: `${item.products?.quality ?? 0} / ${item.products?.value ?? 0}`,
            transfer_value: `${item.transfer?.quality ?? 0} / ${item.transfer?.value ?? 0}`,
            total_value: `${item.total?.quality ?? 0} / ${item.total?.value ?? 0}`,
          }));
          setRowData(mapped);
        } else {
          swal("No inventory data found");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        swal("Failed to fetch inventory data");
      });
  }, []);

  return (
       <div className="ag-theme-alpine grid-wrapper">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ resizable: true, sortable: true }}
          rowModelType="clientSide"
          domLayout="autoHeight" // important for inner height control
        />
      </div>
 
  );
};

export default Movements;
