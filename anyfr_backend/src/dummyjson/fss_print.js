

const fss_print_bar = {
    steps: ["mapping", "adjustments", "comparatives", "materiality", "misstatements", "ratios", "scrutiny"],
    active_step: "comparatives",
    navigation: {
      previous: {
        label: "ratios",
        href: "/audit/300007000/ratios"
      },
      next: {
        label: "scrutiny",
        href: "/audit/300007000/scrutiny"
      }
    }
  };
  
  const fss_print_data = [
    {
      id: 1,
      group: "equity and liabilities",
      rows: [
        {
          id: 101,
          description: "shareholders' funds",
          note_no: 0,
          previous: 2679100.0,
          current: 5264747.0,
          actions: ["edit"]
        },
        {
          id: 102,
          description: "share capital",
          note_no: 0,
          previous: 1432350.0,
          current: 528000.0,
          actions: ["edit"]
        },
        {
          id: 103,
          description: "reserves and surplus",
          note_no: 6,
          previous: 1246750.0,
          current: 4736747.0,
          actions: ["edit"]
        }
      ]
    },
    {
      id: 2,
      group: "non-current liabilities",
      rows: [
        {
          id: 201,
          description: "non-current liabilities",
          note_no: 2,
          previous: 810000.0,
          current: 7858093.98,
          actions: ["edit"]
        }
      ]
    }
  ];
  
  const fss_print_ramc = {
    edit: {
      modal_title: "edit line item",
      fields: ["description", "note_no", "previous", "current"]
    }
  };
  
  const fss_print_action = {
    actions: [
      {
        id: 1,
        label: "fss notes",
        icon: "note",
        action: "open_fss_notes_modal"
      },
      {
        id: 2,
        label: "cash flow statement",
        icon: "dollar-sign",
        action: "open_cash_flow_modal"
      },
      {
        id: 3,
        label: "ratio analysis",
        icon: "bar-chart",
        action: "open_ratio_analysis_modal"
      },
      {
        id: 4,
        label: "parameters",
        icon: "sliders",
        action: "open_parameters_modal"
      },
      {
        id: 5,
        label: "refresh",
        icon: "refresh",
        action: "refresh_table"
      }
    ]
  };
  
  module.exports = {
    fss_print_bar,
    fss_print_data,
    fss_print_ramc,
    fss_print_action
  };
  