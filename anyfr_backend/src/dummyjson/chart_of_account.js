const coa_bar = {
    steps: [
      "mapping",
      "adjustments",
      "comparatives",
      "materiality",
      "misstatements",
      "ratios",
      "scrutiny"
    ],
    active_step: "mapping",
    navigation: {
      previous: null,
      next: {
        label: "adjustments",
        href: "/audit/300008000/adjustments"
      }
    }
  };
  
  const coa_data = [
    {
      id: 1,
      gl_name: "accumulated depreciation",
      gl_group: "fixed assets",
      mapped_to_fss: "",
      considered_as_party: "",
      actions: ["edit"]
    },
    {
      id: 2,
      gl_name: "audit fees",
      gl_group: "indirect expenses",
      mapped_to_fss: "audit fee",
      considered_as_party: "",
      actions: ["edit"]
    },
    {
      id: 3,
      gl_name: "bala pvt ltd",
      gl_group: "sundry debtors",
      mapped_to_fss: "trade receivables",
      considered_as_party: "yes",
      actions: ["edit"]
    }
  ];
  
  const coa_ramc = {
    edit: {
      modal_title: "edit gl details",
      fields: ["gl_name", "gl_group", "mapped_to_fss", "considered_as_party"]
    }
  };
  
  const coa_action = {
    actions: [
      {
        id: 1,
        label: "error log",
        icon: "alert",
        action: "open_error_log_modal"
      },
      {
        id: 2,
        label: "refresh",
        icon: "refresh",
        action: "refresh_table"
      },
      {
        id: 3,
        label: "amount in rupees",
        icon: "currency",
        action: "toggle_currency_display"
      },
      {
        id: 4,
        label: "gl view",
        icon: "grid",
        action: "toggle_gl_group_view"
      },
      {
        id: 5,
        label: "excel upload",
        icon: "upload",
        action: "open_excel_upload_modal"
      },
      {
        id: 6,
        label: "run mapping rules",
        icon: "play",
        action: "run_mapping_rules"
      },
      {
        id: 7,
        label: "add gl",
        icon: "plus",
        action: "open_add_gl_modal"
      }
    ]
  };
  
  const coa_mapping = {
    mapping_percentage: 80
  };
  
  module.exports = {
    coa_bar,
    coa_data,
    coa_ramc,
    coa_action,
    coa_mapping
  };
  