const right = {
  footer:  {
    company: "Abc Limited",
    directors: [
      {
        name: "Director 1",
        designation: "Managing Director",
        directory_no: "DIN 1234567"
      },
      {
        name: "Director 2",
        designation: "Executive Director",
        directory_no: "DIN 7654321"
      }
    ]
  }
};

const left = {
  footer: {
    data: [
      {
        ca_firm_name: "For LMN & Associates",
        info: "Chartered Accountants",
        ca_firm_reg_no: "Firm Registration No. 123455",
        ca_name: "CA Super",
        ca_title: "Partner",
        ca_no: "Membership No. 234567"
      },
      {
        ca_firm_name: "For LMN & Associates",
        info: "Chartered Accountants",
        ca_firm_reg_no: "Firm Registration No. 123455",
        ca_name: "CA Super",
        ca_title: "Partner",
        ca_no: "Membership No. 234567"
      }
    ],
    place: "Guntur",
    date: "31st March 2024",
    head: "This is the Balance Sheet referred to in our report of even date."
  }
};

module.exports = { right, left };
