const financials_assignment_meta = {
    success: true,
    assignment_id: "fin-2025-001",
    client_id: "client-001",
    status: "Draft",
    framework: "Indian GAAP",
    font: "Roboto",
    rounding: "Nearest 100",
    totals_placement: "Bottom",
    notes_linked: true,
    schedules_linked: false,
    footer_signatories: {
      auditor: "M/s Auditor LLP",
      director_1: "Jane D'Souza",
      director_2: "Amit Rao",
      place: "Hyderabad",
      date: "2025-04-01"
    },
    can_generate_udin: false
  };
  
  // const financials_balance_sheet = {
  //   success: true,
  //   fsli_sections: [
  //     {
  //       section: "Assets",
  //       lines: [
  //         {
  //           fsli_code: "BS-FA",
  //           fsli_name: "Property, Plant & Equipment",
  //           amount: 1500000,
  //           hover_preview: [
  //             { sub_gl: "FA001", name: "Machinery", amount: 1300000 },
  //             { sub_gl: "FA002", name: "Office Equipment", amount: 200000 }
  //           ],
  //           has_more: false
  //         },
  //         {
  //           fsli_code: "BS-INV",
  //           fsli_name: "Inventory - Raw Materials",
  //           amount: 400000,
  //           hover_preview: [
  //             { sub_gl: "INV001", name: "Wood", amount: 250000 },
  //             { sub_gl: "INV002", name: "Graphite", amount: 150000 }
  //           ],
  //           has_more: false
  //         }
  //       ]
  //     },
  //     {
  //       section: "Liabilities & Equity",
  //       lines: [
  //         {
  //           fsli_code: "BS-EQ",
  //           fsli_name: "Equity Share Capital",
  //           amount: 1000000,
  //           hover_preview: [],
  //           has_more: false
  //         },
  //         {
  //           fsli_code: "BS-RP",
  //           fsli_name: "Reserves & Surplus",
  //           amount: 200000,
  //           hover_preview: [],
  //           has_more: false
  //         }
  //       ]
  //     }
  //   ]
  // };

  const financials_balance_sheet = {
    success: true,
    fsli_sections: [
      {
        section: "Assets",
        current_year: 2025,
        previous_year: 2024,
        lines: [
          {
            fsli_code: "BS-FA",
            fsli_name: "Property, Plant & Equipment",
            current_year: 1500000,
            previous_year: 1400000,
            hover_preview: [
              { sub_gl: "FA001", name: "Machinery", current_year: 1300000, previous_year: 1200000 },
              { sub_gl: "FA002", name: "Office Equipment", current_year: 200000, previous_year: 180000 }
            ],
            has_more: false
          },
          {
            fsli_code: "BS-INV",
            fsli_name: "Inventory - Raw Materials",
            current_year: 400000,
            previous_year: 350000,
            hover_preview: [
              { sub_gl: "INV001", name: "Wood", current_year: 250000, previous_year: 230000 },
              { sub_gl: "INV002", name: "Graphite", current_year: 150000, previous_year: 120000 }
            ],
            has_more: false
          },
          {
            fsli_code: "BS-FA",
            fsli_name: "Property, Plant & Equipment",
            current_year: 980063,
            previous_year: 920000,
            hover_preview: [
              { sub_gl: "FA001", name: "Machinery", current_year: 212677, previous_year: 200000 },
              { sub_gl: "FA002", name: "Office Equipment", current_year: 633450, previous_year: 600000 }
            ],
            has_more: true
          },
          {
            fsli_code: "BS-INV",
            fsli_name: "Inventory - Raw Materials",
            current_year: 809176,
            previous_year: 760000,
            hover_preview: [
              { sub_gl: "INV001", name: "Wood", current_year: 465228, previous_year: 450000 },
              { sub_gl: "INV002", name: "Graphite", current_year: 477246, previous_year: 310000 }
            ],
            has_more: false
          },
          {
            fsli_code: "BS-FA",
            fsli_name: "Property, Plant & Equipment",
            current_year: 980063,
            previous_year: 920000,
            hover_preview: [
              { sub_gl: "FA001", name: "Machinery", current_year: 212677, previous_year: 200000 },
              { sub_gl: "FA002", name: "Office Equipment", current_year: 633450, previous_year: 600000 }
            ],
            has_more: true
          },
          {
            fsli_code: "BS-INV",
            fsli_name: "Inventory - Raw Materials",
            current_year: 809176,
            previous_year: 760000,
            hover_preview: [
              { sub_gl: "INV001", name: "Wood", current_year: 465228, previous_year: 450000 },
              { sub_gl: "INV002", name: "Graphite", current_year: 477246, previous_year: 310000 }
            ],
            has_more: false
          },
          // Repeat similar entries to complete 25 assets
          // ...
  
          {
            fsli_code: "BS-FA",
            fsli_name: "Property, Plant & Equipment",
            current_year: 212677,
            previous_year: 200000,
            hover_preview: [
              { sub_gl: "FA001", name: "Machinery", current_year: 1300000, previous_year: 1200000 },
              { sub_gl: "FA002", name: "Office Equipment", current_year: 200000, previous_year: 180000 }
            ],
            has_more: true
          }
        ]
      },
      {
        section: "Liabilities & Equity",
        current_year: 10000,
        previous_year: 10000,
        lines: [
          {
            fsli_code: "BS-EQ",
            fsli_name: "Equity Share Capital",
            current_year: 1000000,
            previous_year: 900000,
            hover_preview: [],
            has_more: false
          },
          {
            fsli_code: "BS-RP",
            fsli_name: "Reserves & Surplus",
            current_year: 200000,
            previous_year: 180000,
            hover_preview: [],
            has_more: false
          },
          {
            fsli_code: "BS-EQ",
            fsli_name: "Equity Share Capital",
            current_year: 488236,
            previous_year: 450000,
            hover_preview: [
              { sub_gl: "BS-EQ001", name: "Sub Equity Share Capital 1", current_year: 213981, previous_year: 210000 },
              { sub_gl: "BS-EQ002", name: "Sub Equity Share Capital 2", current_year: 303763, previous_year: 240000 }
            ],
            has_more: true
          },
          {
            fsli_code: "BS-RP",
            fsli_name: "Reserves & Surplus",
            current_year: 711054,
            previous_year: 690000,
            hover_preview: [
              { sub_gl: "BS-RP001", name: "Sub Reserves & Surplus 1", current_year: 625272, previous_year: 600000 },
              { sub_gl: "BS-RP002", name: "Sub Reserves & Surplus 2", current_year: 589847, previous_year: 500000 }
            ],
            has_more: true
          },
          {
            fsli_code: "BS-EQ",
            fsli_name: "Equity Share Capital",
            current_year: 488236,
            previous_year: 450000,
            hover_preview: [
              { sub_gl: "BS-EQ001", name: "Sub Equity Share Capital 1", current_year: 213981, previous_year: 210000 },
              { sub_gl: "BS-EQ002", name: "Sub Equity Share Capital 2", current_year: 303763, previous_year: 240000 }
            ],
            has_more: true
          },
          {
            fsli_code: "BS-RP",
            fsli_name: "Reserves & Surplus",
            current_year: 711054,
            previous_year: 690000,
            hover_preview: [
              { sub_gl: "BS-RP001", name: "Sub Reserves & Surplus 1", current_year: 625272, previous_year: 600000 },
              { sub_gl: "BS-RP002", name: "Sub Reserves & Surplus 2", current_year: 589847, previous_year: 500000 }
            ],
            has_more: true
          },
          // Repeat similar entries to complete 25 liabilities
          // ...
  
          {
            fsli_code: "BS-EQ",
            fsli_name: "Equity Share Capital",
            current_year: 488236,
            previous_year: 450000,
            hover_preview: [
              { sub_gl: "BS-EQ001", name: "Sub Equity Share Capital 1", current_year: 213981, previous_year: 210000 },
              { sub_gl: "BS-EQ002", name: "Sub Equity Share Capital 2", current_year: 303763, previous_year: 240000 }
            ],
            has_more: true
          }
        ]
      }
    ]
  };
  
  
  const financials_profit_loss = {
    success: true,
    lines: [
      {
        fsli_code: "PL-REV",
        fsli_name: "Revenue from Operations",
        amount: 1800000,
        hover_preview: [
          { sub_gl: "REV001", name: "Domestic Sales", amount: 1200000 },
          { sub_gl: "REV002", name: "Exports", amount: 600000 }
        ],
        has_more: false
      },
      {
        fsli_code: "PL-EXP-MAT",
        fsli_name: "Cost of Raw Materials",
        amount: 500000,
        hover_preview: [],
        has_more: false
      }
    ]
  };
  
  const financials_fsli_details = {
    success: true,
    fsli_code: "BS-INV",
    fsli_name: "Inventory - Raw Materials",
    line_items: [
      { sub_gl: "INV001", name: "Wood", amount: 250000, source: "TB" },
      { sub_gl: "INV002", name: "Graphite", amount: 150000, source: "TB" },
      { sub_gl: "INV999", name: "Unclassified", amount: 0, source: "ZeroBalance" }
    ]
  };
  

  const clients_list = {
    success: true,
    clients: [
      { id: "1", name: "XYZ Pvt Ltd" },
      { id: "2", name: "ABC & Co" }
    ]
  };
  
  const create_client = {
    success: true,
    client_id: "3",
    message: "Client created successfully"
  };
  
  const upload_daybook_trial_balance = {
    success: true,
    data: [
      {
        entry_id: "entry-001",
        account: "Sales",
        debit: 0,
        credit: 100000,
        source: "upload",
        validated: true
      }
    ]
  };
  
  const upload_validation_error = {
    success: false,
    errors: [
      { row: 5, error: "Missing debit or credit column" },
      { row: 9, error: "Invalid account head" }
    ]
  };
  
  const frameworks_list = {
    success: true,
    frameworks: [
      { id: "1", name: "IFRS" },
      { id: "2", name: "Indian Accounting Standards" }
    ]
  };
  
  const add_custom_line_item = {
    success: true,
    message: "Line item added successfully"
  };
  
  const add_manual_journal_entry = {
    success: true,
    message: "Journal entry added",
    entry_id: "1"
  };
  
  const all_uploaded_entries = {
    success: true,
    entries: [
      {
        entry_id: "1",
        account: "Sales",
        debit: 0,
        credit: 100000,
        source: "upload",
        validated: true
      },
      {
        entry_id: "2",
        account: "Bank",
        debit: 100000,
        credit: 0,
        source: "manual",
        validated: true
      }
    ]
  };
  
  const common_error = {
    success: false,
    error: "Validation failed",
    details: [
      "Missing account name in row 3",
      "Debit/Credit mismatch in row 4"
    ]
  };


  const financials_business_overview = {
    success: true,
    business_overview: {
      title: "Business Overview",
      content: "<p>The Company is engaged in the manufacture and sale of wooden pencils under the brand name ‘SmartWrite’...</p>",
      last_updated: "2025-04-01T10:30:00Z"
    },
    accounting_policies: {
      title: "Significant Accounting Policies",
      content: "<ul><li>Revenue is recognized upon dispatch of goods...</li><li>Inventory is valued at cost or net realizable value, whichever is lower...</li></ul>",
      last_updated: "2025-04-01T10:45:00Z"
    }
  };
  
  const save_business_overview = {
    success: true,
    message: "Business overview saved"
  };
  
  const save_accounting_policies = {
    success: true,
    message: "Accounting policies saved"
  };
  
  
  module.exports = {
    financials_assignment_meta,
    financials_balance_sheet,
    financials_profit_loss,
    financials_fsli_details,
    clients_list,
    create_client,
    upload_daybook_trial_balance,
    upload_validation_error,
    frameworks_list,
    add_custom_line_item,
    add_manual_journal_entry,
    all_uploaded_entries,
    common_error, 
    financials_business_overview,
    save_business_overview,
    save_accounting_policies
  };
  