const report = {
  wpr_id: 10001,
  report_id: 401,
  report_name: "Governance Review Q4",
  questions: [
    {
      question_id: 1001,
      question_name: "Are all statutory board meetings held on time?",
      answer_name: "Yes, all meetings were conducted within the required timelines for Q4.",
      maker_id: 201,
      checker_id: 301,
      approval_status: 1,
      status_id: 1
    },
    {
      question_id: 1002,
      question_name: "Was quorum maintained in all meetings?",
      answer_name: "Yes, quorum was met in every instance. Attendance sheets are attached.",
      maker_id: 202,
      checker_id: 301,
      approval_status: 0,
      status_id: 1
    },
    {
      question_id: 1003,
      question_name: "Were any board resolutions missing documentation?",
      answer_name: "Two resolutions in January lacked signed minutes; follow-up initiated.",
      maker_id: 203,
      checker_id: 301,
      approval_status: 2,
      status_id: 1
    },
    {
      question_id: 1004,
      question_name: "Have all director declarations been received and disclosed?",
      answer_name: "All declarations except one from Mr. Sharma were received and disclosed.",
      maker_id: 204,
      checker_id: 301,
      approval_status: 1,
      status_id: 0
    }
  ]
};

const baseAnswer = {
  wpr_id: 10001,
  question_id: 1002,
  question_name: "Was quorum maintained in all meetings?",
  approval_status: 1,
  answer_description: "Yes, quorum was met in every instance. Attendance sheets are attached."
};

const modelAnswers = [
  {
    model_answer_id: 501,
    model_answer_description: "Quorum must be present for every board meeting. Provide evidence such as attendance registers and minutes."
  },
  {
    model_answer_id: 502,
    model_answer_description: "Quorum is required under Section 173 of the Companies Act, 2013. Non-compliance should be flagged and explained."
  },
  {
    model_answer_id: 503,
    model_answer_description: "Check quorum for each board meeting. If any meeting lacked quorum, note exceptions with justification."
  }
];

const variableDropdowns = [
  {
    fact_id: 901,
    fact_name: "Total Board Meetings Conducted"
  },
  {
    fact_id: 902,
    fact_name: "Meetings with Quorum Maintained"
  },
  {
    fact_id: 903,
    fact_name: "Director Attendance Summary"
  }
];

const currentFindings = [
  {
    maker_id: 202,
    maker_name: "Rahul Iyer",
    observation_date: "2025-03-10",
    location_id: 301,
    location_name: "HO - Mumbai",
    memo_id: 110,
    memo_code: "MEMO-2024-010",
    memo_description: "Board process compliance and documentation",
    status_finalisation_id: 3,
    status_finalisation_name: "Finalised"
  },
  {
    maker_id: 203,
    maker_name: "Sneha Kapoor",
    observation_date: "2025-03-12",
    location_id: 302,
    location_name: "Branch - Delhi",
    memo_id: 111,
    memo_code: "MEMO-2024-011",
    memo_description: "Governance irregularities at regional office",
    status_finalisation_id: 2,
    status_finalisation_name: "Reviewed"
  }
];

const previousFindings = [
  {
    maker_id: 198,
    maker_name: "Kavita Rao",
    observation_date: "2024-03-08",
    location_id: 301,
    location_name: "HO - Mumbai",
    memo_id: 95,
    memo_code: "MEMO-2023-095",
    memo_description: "Board meeting compliance - FY23",
    status_finalisation_id: 3,
    status_finalisation_name: "Finalised"
  }
];

const previousAnswer = {
  question_id: 1002,
  answer_description: "Yes, quorum was achieved in all meetings. Records are available in the statutory register."
};


const industryPractices = [
  {
    industry_practice_id: 301,
    company_name: "ABC Ltd.",
    period_name: "FY 2022-23",
    industry_practice_description: "ABC Ltd. ensures quorum is met through pre-scheduled board calendars and mandatory director participation policies."
  },
  {
    industry_practice_id: 302,
    company_name: "XYZ Industries",
    period_name: "FY 2023-24",
    industry_practice_description: "XYZ follows a compliance dashboard approach to track quorum and meeting attendance in real-time."
  },
  {
    industry_practice_id: 303,
    company_name: "Beta Corp",
    period_name: "FY 2021-22",
    industry_practice_description: "Board meetings are conducted via hybrid mode and attendance is digitally tracked for quorum compliance."
  }
];

const guidanceNotes = [
  {
    guidance_note_id: 501,
    guidance_note_no: "GN-2023-04",
    guidance_head_name: "Board Governance & Compliance",
    guidance_note_reference: "ICAI Guidance Note on Board Meetings",
    guidance_note_reference_no: "Section 2.1",
    guidance_note_description: "A board meeting must meet the minimum quorum requirements as per the Companies Act, 2013. Documentation of director presence is mandatory."
  },
  {
    guidance_note_id: 502,
    guidance_note_no: "GN-2022-07",
    guidance_head_name: "Audit Documentation Standards",
    guidance_note_reference: "SA 230 - Audit Documentation",
    guidance_note_reference_no: "Para 12",
    guidance_note_description: "When assessing compliance with quorum, sufficient and appropriate audit evidence should be obtained, including meeting minutes and attendance registers."
  }
];




module.exports = { report, baseAnswer, modelAnswers , variableDropdowns , currentFindings , previousFindings , previousAnswer , industryPractices ,guidanceNotes};
