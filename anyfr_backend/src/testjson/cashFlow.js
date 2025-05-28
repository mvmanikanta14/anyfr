const cash_flow_statement = {
    success: true,
    method: "Indirect", // or "Direct"
    sections: [
      {
        title: "Cash Flows from Operating Activities",
        lines: [
          { id: "cfs-001", fsli_code: "CFO-NP", fsli_name: "Net Profit Before Tax", amount: 360000, adjusted_amount: 360000 },
          { id: "cfs-002", fsli_code: "CFO-DEPR", fsli_name: "Add: Depreciation", amount: 120000, adjusted_amount: 120000 },
          { id: "cfs-003", fsli_code: "CFO-CHG-WC", fsli_name: "Change in Working Capital", amount: -75000, adjusted_amount: -75000 }
        ]
      },
      {
        title: "Cash Flows from Investing Activities",
        lines: [
          { id: "cfs-004", fsli_code: "CFI-CAPEX", fsli_name: "Purchase of Fixed Assets", amount: -100000, adjusted_amount: -100000 }
        ]
      },
      {
        title: "Cash Flows from Financing Activities",
        lines: [
          { id: "cfs-005", fsli_code: "CFF-LOAN", fsli_name: "Proceeds from Loans", amount: 150000, adjusted_amount: 150000 }
        ]
      }
    ],
    net_cash_flow: 455000,
    opening_cash_balance: 100000,
    closing_cash_balance: 555000,
    notes: [
      {
        line_item_id: "cfs-003",
        note: "Increase in inventory led to higher working capital usage."
      }
    ]
  };
  
  const adjust_line_item = {
    success: true,
    message: "Adjustment saved"
  };
  
  const add_or_update_note = {
    success: true,
    message: "Note updated"
  };
  
  module.exports = {
    cash_flow_statement,
    adjust_line_item,
    add_or_update_note
  };
  