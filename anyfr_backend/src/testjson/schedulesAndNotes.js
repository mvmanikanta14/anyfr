const financials_schedules_and_notes = {
    success: true,
    schedules: [
      {
        id: "schedule-001",
        fsli_code: "BS-FA",
        fsli_name: "Property, Plant & Equipment",
        title: "Schedule I: Fixed Assets",
        content: "<p>Breakdown of assets including machinery, office equipment, etc.</p>",
        last_updated: "2025-04-01T10:32:00Z"
      },
      {
        id: "schedule-002",
        fsli_code: "BS-INV",
        fsli_name: "Inventory - Raw Materials",
        title: "Schedule II: Inventory",
        content: "<p>Raw material breakdown (Wood, Graphite) as per stock register.</p>",
        last_updated: "2025-04-01T10:35:00Z"
      }
    ],
    notes: [
      {
        id: "note-001",
        fsli_code: "PL-EXP-DEPR",
        fsli_name: "Depreciation",
        title: "Note 1: Depreciation Policy",
        content: "<p>Depreciation is charged using the straight-line method over a useful life of 5 years.</p>",
        last_updated: "2025-04-01T11:00:00Z"
      },
      {
        id: "note-002",
        fsli_code: "PL-TAX",
        fsli_name: "Income Tax",
        title: "Note 2: Tax Computation",
        content: "<p>Tax calculated as per applicable Income Tax Act provisions for FY 2024–25.</p>",
        last_updated: "2025-04-01T11:02:00Z"
      }
    ]
  };
  
  const save_or_update_schedule = {
    success: true,
    message: "Schedule saved"
  };
  
  const save_or_update_note = {
    success: true,
    message: "Note saved"
  };
  
  const get_fsli_disclosures = {
    success: true,
    schedule: {
      title: "Schedule II: Inventory",
      content: "<p>Raw material breakdown...</p>"
    },
    note: {
      title: "Note 1: Inventory Valuation",
      content: "<p>Inventory is valued at lower of cost or NRV.</p>"
    }
  };
  
  module.exports = {
    financials_schedules_and_notes,
    save_or_update_schedule,
    save_or_update_note,
    get_fsli_disclosures
  };
  