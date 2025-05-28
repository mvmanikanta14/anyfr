const filter_bar = {
  tabs: ["all", "unmapped"],
  search_fields: [
    { placeholder: "search by gl name", name: "gl_name" },
    { placeholder: "search by mapped to", name: "mapped_to" }
  ],
  actions: [
    {
      type: "reset",
      label: "reset",
      icon: "refresh",
      action: "reset_filters"
    }
  ]
};

const tbviewactions = {
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
      label: "download pdf",
      icon: "pdf",
      action: "download_pdf"
    },
    {
      id: 4,
      label: "amount in rupees",
      icon: "currency",
      action: "toggle_currency_display"
    },
    {
      id: 5,
      label: "fss",
      icon: "table",
      action: "toggle_view_fss"
    },
    {
      id: 6,
      label: "coa",
      icon: "list",
      action: "view_chart_of_accounts"
    },
    {
      id: 7,
      label: "upload",
      icon: "upload",
      action: "open_upload_modal"
    }
  ]
};

const tbviewdata = [
  {
    id: 1,
    gl_name: "audit fees",
    mapped_to: "audit fee",
    opening: 0,
    debit: 0,
    credit: 0,
    closing: 0,
    rectification: 0,
    iu: "dr",
    net: 0,
    actions: ["edit", "comment", "view"]
  },
  {
    id: 2,
    gl_name: "bala pvt ltd",
    mapped_to: "trade receivables",
    opening: 0,
    debit: 140000,
    credit: 103814,
    closing: 36186.03,
    rectification: 0,
    iu: "dr",
    net: 36186.03,
    actions: ["edit", "comment", "view"]
  }
];

const tbviewpb = {
  status: "91% completed",
  color: "green"
};

const tbviewaramc = {
  edit: {
    fields: ["gl_name", "mapped_to", "rectification"],
    modal_title: "edit gl mapping"
  },
  comment: {
    fields: ["comment"],
    modal_title: "add comment"
  },
  view: {
    fields: ["gl_name", "mapped_to", "audit_trail"],
    modal_title: "view gl details"
  }
};




module.exports = {
  filter_bar,
  tbviewactions,
  tbviewdata,
  tbviewpb,
  tbviewaramc
};
