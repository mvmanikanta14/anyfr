const ytd_fss_bar = {
    steps: ["mapping", "adjustments", "comparatives", "materiality", "misstatements", "ratios", "scrutiny"],
    active_step: "comparatives",
    navigation: {
      previous: {
        label: "ratios",
        href: "/audit/300004000/ratios"
      },
      next: {
        label: "scrutiny",
        href: "/audit/300004000/scrutiny"
      }
    }
  };
  
  const ytd_fss_data = [
    {
      id: 1,
      description: "equity and liabilities",
      corresponding_prev_balance: 3489100.0,
      prev_aggregate: "-",
      opening_balance: 0.0,
      months: {
        may: 0.0,
        july: 0.0,
        september: 0.0,
        october: 0.0
      },
      aggregate: 0.0,
      actions: ["view", "comment", "edit"]
    },
    {
      id: 2,
      description: "shareholders' funds",
      corresponding_prev_balance: 2679100.0,
      prev_aggregate: "-",
      opening_balance: 0.0,
      months: {
        may: 0.0,
        july: 0.0,
        september: 0.0,
        october: 0.0
      },
      aggregate: 0.0,
      actions: ["view", "comment", "edit"]
    }
  ];
  
  const ytd_fss_ramc = {
    view: {
      modal_title: "view ytd details",
      fields: ["description", "corresponding_prev_balance", "aggregate", "months"]
    },
    comment: {
      modal_title: "add comment",
      fields: ["comment"]
    },
    edit: {
      modal_title: "edit monthly values",
      fields: ["opening_balance", "months"]
    }
  };
  
  const ytd_fss_action = {
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
      }
    ]
  };
  
  module.exports = {
    ytd_fss_bar,
    ytd_fss_data,
    ytd_fss_ramc,
    ytd_fss_action
  };
  