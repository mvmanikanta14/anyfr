const comp_bar = {
  "steps": ["mapping", "adjustments", "comparatives", "materiality", "misstatements", "ratios", "scrutiny"],
  "active_step": "comparatives",
  "navigation": {
    "previous": {
      "label": "adjustments",
      "href": "/audit/300003000/adjustments"
    },
    "next": {
      "label": "materiality",
      "href": "/audit/300003000/materiality"
    }
  }
};


const comp_data = [
  {
    "id": 1,
    "description": "equity and liabilities",
    "prev_amount": 34891000.00,
    "curr_amount": 222989177.90,
    "diff": 188098177.90,
    "percent_diff": 539.1,
    "prev_parent": 0,
    "curr_parent": 0,
    "parent_diff": 0,
    "remarks": "",
    "actions": []
  },
  {
    "id": 2,
    "description": "shareholders' funds",
    "prev_amount": 26791000.00,
    "curr_amount": 52647470.00,

    "diff": 25856470.00,

    "percent_diff": 96.51,

    "prev_parent": 76.78,

    "curr_parent": 121.1,

    "parent_diff": -53.17,

    "remarks": "",

    "actions": ["edit", "comment", "view"]

  },

  {

    "id": 3,

    "description": "share capital",

    "prev_amount": 14235800.00,

    "curr_amount": 5280000.00,

    "diff": -8958000.00,

    "percent_diff": -62.91,

    "prev_parent": 53.46,

    "curr_parent": 10.03,

    "parent_diff": -43.43,

    "remarks": "the difference is due to...",

    "actions": ["edit", "comment", "view"]

  }

];

const comp_rmc =

{

  "edit": {

    "modal_title": "edit row",

    "fields": ["prev_amount", "curr_amount", "remarks"]

  },

  "comment": {

    "modal_title": "add comment",

    "fields": ["remarks"]

  },

  "view": {

    "modal_title": "view row details",

    "fields": ["description", "prev_amount", "curr_amount", "percent_diff", "remarks"]

  }

}


const comp_action =
{

  "actions": [

    {

      "id": 1,

      "label": "error log",

      "icon": "alert",

      "action": "open_error_log_modal"

    },

    {

      "id": 2,

      "label": "refresh",

      "icon": "refresh",

      "action": "refresh_table"

    },

    {

      "id": 3,

      "label": "amount in rupees",

      "icon": "currency",

      "action": "toggle_currency_display"

    }

  ]

}


//location level view

const comp_loc_fbar = {

  "search_placeholder": "search by location(s)...",

  "search_field": "location",

  "tabs": ["all", "location-wise"],

  "actions": [

    {

      "label": "search",

      "icon": "search",

      "action": "search_by_location"

    }

  ]

};


const comp_loc_data = [

  {

    "id": 1,

    "description": "equity and liabilities",

    "prev_amount": 0,

    "curr_amount": 22815888.00,

    "percent_diff": 0,

    "prev_parent": 0,

    "curr_parent": 0,

    "parent_diff": 0

  },

  {

    "id": 2,

    "description": "shareholders' funds",

    "prev_amount": 0,

    "curr_amount": 5208033.00,

    "percent_diff": 23.14,

    "prev_parent": 0,

    "curr_parent": 23.14,

    "parent_diff": 23.14

  }]


const comp_loc_action = {
  actions: [
    {
      id: 1,
      label: "download excel",
      icon: "excel",
      action: "download_excel"
    },
    {
      id: 2,
      label: "download pdf",
      icon: "pdf",
      action: "download_pdf"
    },
    {
      id: 3,
      label: "error log",
      icon: "alert",
      action: "open_error_log_modal"
    },
    {
      id: 4,
      label: "refresh",
      icon: "refresh",
      action: "refresh_table"
    },
    {
      id: 5,
      label: "amount in rupees",
      icon: "currency",
      action: "toggle_currency_display"
    }
  ]
};



//cash flow statement comparative data

const comp_cf_data =

  [

    {

      "id": 1,

      "group": "cash flow from operating activities",

      "rows": [

        {

          "id": 101,

          "description": "net profit before tax and extraordinary items",

          "current_year": 3174232.00,

          "previous_year": 6536000.00

        },

        {

          "id": 102,

          "description": "depreciation",

          "current_year": 0.00,

          "previous_year": 0.00

        },

        {

          "id": 103,

          "description": "interest on borrowings",

          "current": 200000.00,

          "previous": 0.00

        }

      ]

    }

  ];


const comp_cf_action = {

  "actions": [

    {

      "id": 1,

      "label": "print financials",

      "icon": "print",

      "action": "open_print_modal"

    },

    {

      "id": 2,

      "label": "fss notes",

      "icon": "note", 

      "action": "open_fss_notes_modal"

    },

    {

      "id": 3,

      "label": "ratio analysis",

      "icon": "bar-chart",

      "action": "open_ratio_analysis_modal"

    },

    {

      "id": 4,

      "label": "parameters",

      "icon": "sliders",

      "action": "open_parameters_modal"

    },

    {

      "id": 5,

      "label": "adjustments",

      "icon": "settings",

      "action": "open_adjustments_modal"

    },

    {

      "id": 6,

      "label": "refresh",

      "icon": "refresh",

      "action": "refresh_table"

    }

  ]

}






module.exports = {
  comp_bar,
  comp_data,
  comp_rmc,
  comp_action,
  comp_loc_fbar,
  comp_loc_data,
  comp_loc_action,
  comp_cf_data, comp_cf_action
};
