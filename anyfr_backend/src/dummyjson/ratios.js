const ratios_bar = {

  "steps": ["mapping", "adjustments", "comparatives", "materiality", "misstatements", "ratios", "scrutiny"],

  "active_step": "ratios",

  "navigation": {

    "previous": {

      "label": "misstatements",

      "href": "/audit/300006000/misstatements"

    },

    "next": {

      "label": "scrutiny",

      "href": "/audit/300006000/scrutiny"

    }

  }

}


const ratios_data = [

  {

    "id": 1,

    "category": "profitability ratios",

    "name": "gross profit ratio",

    "previous": 2.98,

    "current": 0.81,

    "actions": ["view", "comment", "edit"]

  },

  {

    "id": 2,

    "category": "profitability ratios",

    "name": "operating profit ratio",

    "previous": 2.98,

    "current": 0.80,

    "actions": ["view", "comment", "edit"]

  },

  {

    "id": 3,

    "category": "profitability ratios",

    "name": "ebidta ratio",

    "previous": 2.76,

    "current": 0.92,

    "actions": ["view", "comment", "edit"]

  },

  {

    "id": 4,

    "category": "profitability ratios",

    "name": "ebit ratio",

    "previous": 2.25,

    "current": 0.90,

    "actions": ["view", "comment", "edit"]

  },

  {

    "id": 5,

    "category": "profitability ratios",

    "name": "pbt ratio",

    "previous": 2.76,

    "current": 0.91,

    "actions": ["view", "comment", "edit"]

  },

  {

    "id": 6,

    "category": "profitability ratios",

    "name": "pat ratio",

    "previous": 2.76,

    "current": 0.91,

    "actions": ["view", "comment", "edit"]

  },

  {

    "id": 7,

    "category": "balance sheet ratios",

    "name": "debt-equity ratio",

    "previous": 0.30,

    "current": 2.41,

    "actions": ["view", "comment", "edit"]

  },

  {

    "id": 8,

    "category": "balance sheet ratios",

    "name": "tol/tnw ratio",

    "previous": 0.34,

    "current": 2.62,

    "actions": ["view", "comment", "edit"]

  }

]

const ratios_ramc = {

  "view": {

    "modal_title": "view ratio details",

    "fields": ["name", "previous", "current"]

  },

  "comment": {

    "modal_title": "add comment",

    "fields": ["comment"]

  },

  "edit": {

    "modal_title": "edit ratio",

    "fields": ["previous", "current"]

  }

};


const ratios_action = {

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

      "label": "cash flow statement",

      "icon": "dollar-sign",

      "action": "open_cash_flow_modal"

    },

    {

      "id": 4,

      "label": "parameters",

      "icon": "sliders",

      "action": "open_parameters_modal"

    },

    {

      "id": 5,

      "label": "refresh",

      "icon": "refresh",

      "action": "refresh_table"

    }

  ]

}



module.exports = {
  ratios_bar,
  ratios_data,
  ratios_ramc,
  ratios_action

};
