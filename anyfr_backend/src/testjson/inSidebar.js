const inSidebar = [
  {
    success: true,
    module: "Data",
    sections: [
      {
        title: "Chart of Accounts",
        enabled: "yes",
      },
     
      {
        title: "FSLI Master",
        enabled: "yes",
      },
      {
        title: "Trial Balance",
        enabled: "yes",
      },
      {
        title: "Upload Json",
        enabled: "yes",
      },
      {
        title: "Upload Excel",
        enabled: "yes",
      },
    ],
  },
  {
    module: "Map",
    sections: [
      {
        title: "Fsli Master",
        enabled: "yes",
      },
      // {
      //   title: "Trial balance",
      //   enabled: "yes",
      // },
      {
        title: "Chart of Accounts",
        enabled: "yes",
      },
    ],
  },
  {
    module: "jvs",
    sections: [
      {
        title: "Rectification",
        enabled: "yes",
      },
      {
        title: "DayBook",
        enabled: "yes",
      },
      {
        title: "InterUnit",
        enabled: "yes",
      },
       
      { 
        title: "split",
        enabled: "yes",
      },
    ],
  },
  {
    module: "SDs",
    sections: [
      {
        title: "Companies Act",
        enabled: "yes",
        id: "1",
      },
      {
        title: "Partnership Act",
        enabled: "yes",
        id: "2",
      },
      {
        title: "Schedule III",
        enabled: "yes",
        id: "3",
      },
      {
        title: "Accounting Standards",
        enabled: "yes",
        id: "4",
      },
      {
        title: "FRRB",
        enabled: "yes",
        id: "5",
      },
    ],
  },
  {
    module: "FR",
    sections: [
      {
        title: "Balance Sheet",
        enabled: "yes",
      },
      {
        title: "Profit and Loss Statement",
        enabled: "yes",
      },
      {
        title: "Cash Flow",
        enabled: "no",
      },
      {
        title: "Accounting Policies",
        enabled: "no",
      },
      {
        title: "Notes to Accounts",
        enabled: "no",
      },
    ],
  },
  {
    module: "Modules",
    
  },
  {
    module: "PD",
    sections: [
      {
        title: "Subcategory 1",
        enabled: "no",
      },
      {
        title: "Subcategory 2",
        enabled: "no",
      },
    ],
  },
];

module.exports = {
  inSidebar,
};
