const calculators_list = {
  "success": true,
  "calculators": [
    { "id": 1, "name": "depreciation", "description": "Depreciation Calculator" },
    { "id": 2, "name": "share-capital", "description": "Share Capital Calculator" },
    { "id": 3, "name": "eps", "description": "Earnings Per Share (EPS) Calculator" },
    { "id": 4, "name": "roi", "description": "Return on Investment (ROI)" },
    { "id": 5, "name": "working-capital", "description": "Working Capital Calculator" },
    { "id": 6, "name": "net-worth", "description": "Net Worth Calculator" },
    { "id": 7, "name": "tax-liability", "description": "Tax Liability Estimator" },
    { "id": 8, "name": "interest", "description": "Simple/Compound Interest Calculator" },
    { "id": 9, "name": "net-profit", "description": "Net Profit Margin Calculator" },
    { "id": 10, "name": "inventory-turnover", "description": "Inventory Turnover Ratio" }
  ]
};



const depreciation_calculator = {
  success: true,
  annual_depreciation: 18000,
  method: "Straight Line Method"
};

const common_error = {
  success: false,
  error: "Missing or invalid inputs",
  details: ["Useful life must be greater than 0"]
};

module.exports = {
  calculators_list,
  depreciation_calculator,
  common_error
};