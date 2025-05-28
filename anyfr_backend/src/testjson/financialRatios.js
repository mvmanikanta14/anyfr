const financial_ratios = {
    success: true,
    year: {
      current: "2024-25",
      previous: "2023-24"
    },
    ratios: [
      {
        id: "ratio-001",
        category: "Profitability",
        name: "Net Profit Margin",
        formula: "Net Profit / Revenue",
        unit: "%",
        value_current: 8.2,
        value_previous: 12.5,
        highlight: true,
        highlight_reason: "Drop > 3%",
        note: "Drop due to increase in raw material prices"
      },
      {
        id: "ratio-002",
        category: "Liquidity",
        name: "Current Ratio",
        formula: "Current Assets / Current Liabilities",
        unit: "",
        value_current: 1.8,
        value_previous: 1.5,
        highlight: false,
        note: ""
      }
    ],
    summary_note: "The profitability margins have declined due to increased input costs, partially offset by reduced admin overhead."
  };
  
  const add_or_update_ratio_note = {
    success: true,
    message: "Note updated"
  };
  
  const add_or_update_summary_note = {
    success: true,
    message: "Summary note saved"
  };
  
  module.exports = {
    financial_ratios,
    add_or_update_ratio_note,
    add_or_update_summary_note
  };
  