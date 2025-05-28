const tbupload = {
  "header": {
    "curr_aid": 300,
    "requesting_user_id": 101,
    "response_time": "2025-03-27T18:49:00Z",
    "wpr_id": 300001000,
    "wpr_name": "trial balance upload",
    "incharge_user_id": 102,
    "incharge_user_name": "rahul mehta",
    "signoff_user_id": 103,
    "signoff_user_name": "nisha gupta",
    "review_user_id": 104,
    "review_user_name": "amit sharma"
  },
  "loaded_batches": [
    {
      "sno": 1,
      "trial_balance_or_daybook": "tb",
      "status": "completed",
      "batch_name": "tb cy",
      "location": "head office",
      "map": "mapped",
      "uploaded_by": "nishanth",
      "uploaded_date": "2025-03-26",
      "actions": ["download", "replace", "rollback"]
    },
    {
      "sno": 2,
      "trial_balance_or_daybook": "daybook",
      "status": "completed",
      "batch_name": "db",
      "location": "head office",
      "map": "mapped",
      "uploaded_by": "nishanth",
      "uploaded_date": "2025-03-26",
      "actions": ["download", "replace", "rollback"]
    }
  ],
  "unloaded_batches": [
    {
      "sno": 3,
      "trial_balance_or_daybook": "tb",
      "status": "completed",
      "batch_name": "tb",
      "location": "head office",
      "map": "mapped",
      "uploaded_by": "nishanth",
      "uploaded_date": "2025-03-26",
      "actions": ["upload"]
    }
  ]
};

const tbdata = {
  "header": {
    "curr_aid": 300,
    "requesting_user_id": 101,
    "response_time": "2025-03-27T19:15:00Z",
    "wpr_id": 300001000,
    "wpr_name": "trial balance",
    "incharge_user_id": 102,
    "incharge_user_name": "rahul mehta",
    "signoff_user_id": 103,
    "signoff_user_name": "nisha gupta",
    "review_user_id": 104,
    "review_user_name": "amit sharma"
  },
  "mapping_percentage": 91.0,
  "data": [
    {
      "gl_id": 1,
      "gl_name": "audit fees",
      "mapped_to": "audit fee",
      "opening": 0.00,
      "debit": 0.00,
      "credit": 0.00,
      "closing": 0.00,
      "rectification": 0.00,
      "iu": 0.00,
      "net": 0.00
    },
    {
      "gl_id": 2,
      "gl_name": "bala pvt ltd",
      "mapped_to": "trade receivables",
      "opening": 0.00,
      "debit": 140000.00,
      "credit": 103816.00,
      "closing": 36183.00,
      "rectification": 0.00,
      "iu": 0.00,
      "net": 36183.00
    },
    {
      "gl_id": 3,
      "gl_name": "bank deposits",
      "mapped_to": "long term trade receivables",
      "opening": 2300000.00,
      "debit": 0.00,
      "credit": 0.00,
      "closing": 2300000.00,
      "rectification": 0.00,
      "iu": 0.00,
      "net": 2300000.00
    },
    {
      "gl_id": 4,
      "gl_name": "buildings",
      "mapped_to": "long term trade receivables",
      "opening": 4550000.00,
      "debit": 374560.00,
      "credit": 0.00,
      "closing": 4924560.00,
      "rectification": 0.00,
      "iu": 0.00,
      "net": 4924560.00
    },
    {
      "gl_id": 5,
      "gl_name": "capital reserve",
      "mapped_to": "capital redemption reserve",
      "opening": 665750.00,
      "debit": 0.00,
      "credit": 0.00,
      "closing": 665750.00,
      "rectification": 0.00,
      "iu": 0.00,
      "net": 665750.00
    },
    {
      "gl_id": 6,
      "gl_name": "cash",
      "mapped_to": "long term trade receivables",
      "opening": 560000.00,
      "debit": 4628783.00,
      "credit": 2116589.00,
      "closing": 3072194.00,
      "rectification": 0.00,
      "iu": 0.00,
      "net": 3072194.00
    },
    {
      "gl_id": 7,
      "gl_name": "cgst input",
      "mapped_to": "",
      "opening": 0.00,
      "debit": 6856676.79,
      "credit": 0.00,
      "closing": 6856676.79,
      "rectification": 0.00,
      "iu": 0.00,
      "net": 6856676.79
    }
  ]
};




const comparative_fss = {
  "header": {
    "curr_aid": 300,
    "requesting_user_id": 101,
    "response_time": "2025-03-27T19:30:00Z",
    "wpr_id": 300003000,
    "wpr_name": "comparative financial statements",
    "incharge_user_id": 102,
    "incharge_user_name": "rahul mehta",
    "signoff_user_id": 103,
    "signoff_user_name": "nisha gupta",
    "review_user_id": 104,
    "review_user_name": "amit sharma"
  },
  "data": [
    {
      "fsli_id": 1,
      "fsli_name": "equity and liabilities",
      "prev_amount": 34891000.00,
      "curr_amount": 222989177.90,
      "diff_amt": 188098177.90,
      "diff_pcent": 539.1,
      "prev_parent": 0.00,
      "curr_parent": 0.00,
      "diff_parent": 0.00,
      "remarks": ""
    },
    {
      "fsli_id": 2,
      "fsli_name": "shareholders' funds",
      "prev_amount": 26791000.00,
      "curr_amount": 52647470.00,
      "diff_amt": 25856470.00,
      "diff_pcent": 96.51,
      "prev_parent": 76.78,
      "curr_parent": 23.61,
      "diff_parent": -53.17,
      "remarks": ""
    },
    {
      "fsli_id": 3,
      "fsli_name": "share capital",
      "prev_amount": 14235800.00,
      "curr_amount": 5280000.00,
      "diff_amt": -8945800.00,
      "diff_pcent": -62.81,
      "prev_parent": 53.46,
      "curr_parent": 10.03,
      "diff_parent": -43.43,
      "remarks": "the difference is due to..."
    },
    {
      "fsli_id": 4,
      "fsli_name": "reserves and surplus",
      "prev_amount": 12456700.00,
      "curr_amount": 47467470.00,
      "diff_amt": 35010770.00,
      "diff_pcent": 280.99,
      "prev_parent": 46.54,
      "curr_parent": 89.97,
      "diff_parent": 43.43,
      "remarks": ""
    },
    {
      "fsli_id": 5,
      "fsli_name": "capital reserve",
      "prev_amount": 0.00,
      "curr_amount": 0.00,
      "diff_amt": 0.00,
      "diff_pcent": 0.00,
      "prev_parent": 0.00,
      "curr_parent": 0.00,
      "diff_parent": 0.00,
      "remarks": ""
    },
    {
      "fsli_id": 6,
      "fsli_name": "capital redemption reserve",
      "prev_amount": 265750.00,
      "curr_amount": 0.00,
      "diff_amt": -265750.00,
      "diff_pcent": -100.00,
      "prev_parent": 1.00,
      "curr_parent": 0.00,
      "diff_parent": -1.00,
      "remarks": ""
    },
    {
      "fsli_id": 7,
      "fsli_name": "securities premium",
      "prev_amount": 0.00,
      "curr_amount": 3222.00,
      "diff_amt": 3222.00,
      "diff_pcent": 100.00,
      "prev_parent": 0.00,
      "curr_parent": 0.01,
      "diff_parent": 0.01,
      "remarks": ""
    },
    {
      "fsli_id": 8,
      "fsli_name": "debenture redemption reserve",
      "prev_amount": 0.00,
      "curr_amount": 0.00,
      "diff_amt": 0.00,
      "diff_pcent": 0.00,
      "prev_parent": 0.00,
      "curr_parent": 0.00,
      "diff_parent": 0.00,
      "remarks": ""
    },
    {
      "fsli_id": 9,
      "fsli_name": "revaluation reserve",
      "prev_amount": 0.00,
      "curr_amount": 0.00,
      "diff_amt": 0.00,
      "diff_pcent": 0.00,
      "prev_parent": 0.00,
      "curr_parent": 0.00,
      "diff_parent": 0.00,
      "remarks": ""
    }
  ]
};


const pageheader =
{

  "wpr_id": 300001000,
  "assignment": "abc enterprises - statutory audit - 2023-24",
  "current_step": "trial balance",
  "user_name": "nishanth"
}

const tbuplbar =
{

  "steps": ["acceptance", "trial balance", "facts", "lead questions", "planner"],

  "active_step": "trial balance",

  "navigation": {

    "previous": {

      "label": "acceptance",

      "href": "/audit/300001000/acceptance"

    },

    "next": {

      "label": "facts",

      "href": "/audit/300001000/facts"

    }

  }

}


const tbuplactions =
{

  "actions": [

    {

      "id": 1,

      "type": "upload",

      "icon": "plus",

      "action": "open_upload_modal"

    },

    {

      "id": 2,

      "type": "delete",

      "icon": "trash",

      "action": "open_delete_modal"

    }

  ]

}


const tbuploption =
{
  "upload_options": [
    {
      "id": 1,
      "label": "tb as excel",
      "type": "tb",
      "format": "excel",
      "action": "upload_tb_excel"
    },
    {
      "id": 2,
      "label": "db as excel",
      "type": "db",
      "format": "excel",
      "action": "upload_db_excel"
    },
    {
      "id": 3,
      "label": "tb as json",
      "type": "tb",
      "format": "json",
      "action": "upload_tb_json"
    },
    {
      "id": 4,
      "label": "db as json",
      "type": "db",
      "format": "json",
      "action": "upload_db_json"
    },
    {
      "id": 5,
      "label": "tb map",
      "type": "tb",
      "action": "upload_tb_map"
    }
  ]
}


const tbuplLoad = [
  {
    id: 1,
    type: "tb",
    status: "completed",
    batch_name: "tb cy",
    location: "head office",
    map: "mapped",
    uploaded_by: "user1",
    uploaded_date: "2025-03-25",
    actions: ["download", "replace", "rollback"]
  },
  {
    id: 2,
    type: "daybook",
    status: "completed",
    batch_name: "db",
    location: "head office",
    map: "mapped",
    uploaded_by: "user1",
    uploaded_date: "2025-03-25",
    actions: ["download", "replace", "rollback"]
  }
];


const tbuplUnload = [
  {

    "id": 3,
    "type": "tb",
    "status": "completed",
    "batch_name": "",
    "location": "head office",
    "map": "mapped",
    "uploaded_by": "",
    "uploaded_date": "",
    "actions": ["upload", "delete"]

  }]

const tbuplmodel = [
  {

    "id": 3,
    "type": "tb",
    "status": "completed",
    "batch_name": "",
    "location": "head office",
    "map": "mapped",
    "uploaded_by": "",
    "uploaded_date": "",
    "actions": ["upload", "delete"]

  }]



  
  const tbuplview = {

    "supported_formats": ["excel", "json"],
    
    "max_file_size_mb": 10,
    
    "fields": ["type", "location", "batch_name"]
    };


module.exports = {
  tbupload,
  tbdata,
  comparative_fss,
  pageheader,
  tbuplLoad,
  tbuplactions,
  tbuplbar,
  tbuploption,
  tbuplmodel,
  tbuplview,
  tbuplUnload
};
