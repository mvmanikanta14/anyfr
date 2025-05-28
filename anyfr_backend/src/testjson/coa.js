const coa_chart_of_accounts = {
    success: true,
    mapped: [
      {
        sub_gl_code: "4001",
        sub_gl_name: "Sales Revenue",
        fsli_code: "P&L-REV",
        fsli_name: "Revenue",
        special_classifications: ["None"]
      }
    ],
    unmapped: [
      {
        sub_gl_code: "4002",
        sub_gl_name: "Other Income"
      },
      {
        sub_gl_code: "5101",
        sub_gl_name: "CSR Expense"
      }
    ]
  };
  
  const map_sub_gl_to_fsli = {
    success: true,
    message: "Sub GL mapped successfully"
  };
  
  const add_custom_line_item = {
    success: true,
    message: "Line item added and mapped successfully"
  };
  
  const set_special_classification = {
    success: true,
    message: "Classification saved"
  };
  
  const fsli_list = {
    success: true,
    fsli_list: [
      { code: "P&L-REV", name: "Revenue" },
      { code: "P&L-EXP", name: "Operating Expenses" },
      { code: "P&L-OTH", name: "Other Income" },
      { code: "BS-CASH", name: "Cash & Bank" }
    ]
  };
  
  const common_error = {
    success: false,
    error: "Invalid GL Code or FSLI Mapping"
  };
  
  module.exports = {
    coa_chart_of_accounts,
    map_sub_gl_to_fsli,
    add_custom_line_item,
    set_special_classification,
    fsli_list,
    common_error
  };
  