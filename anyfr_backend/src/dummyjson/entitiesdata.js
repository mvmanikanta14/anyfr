const entitiesdata = [];

const companyNames = [
  "Tata Consultancy Services",
  "Reliance Industries",
  "Infosys Technologies",
  "HDFC Bank",
  "ICICI Bank",
  "Larsen & Toubro",
  "Wipro Limited",
  "State Bank of India",
  "Bharti Airtel",
  "Hindustan Unilever",
  "Mahindra & Mahindra",
  "Maruti Suzuki",
  "Adani Ports",
  "Sun Pharma",
  "Bajaj Auto",
  "ITC Limited",
  "Axis Bank",
  "Tata Motors",
  "Kotak Mahindra Bank",
  "Nestle India",
  "Britannia Industries",
  "Tata Steel",
  "UltraTech Cement",
  "Cipla Limited",
  "Hero MotoCorp",
  "Dr. Reddy's Laboratories",
  "Indian Oil Corporation",
  "Power Grid Corporation",
  "Grasim Industries",
  "Motherson Sumi Systems",
  "ITC Limited",
  "Asian Paints",
  "Marico Limited",
  "Lupin Pharmaceuticals",
  "JSW Steel",
  "HCL Technologies",
  "SBI Life Insurance",
  "IndusInd Bank",
  "Tech Mahindra",
  "Bharat Petroleum Corporation",
  "Coal India",
  "Tata Power",
  "Shree Cement",
  "Avenue Supermarts",
  "Zee Entertainment",
  "Bank of Baroda",
  "Eicher Motors",
  "TVS Motor Company",
  "Divi's Laboratories",
  "Godrej Consumer Products",
  "Bharti Infratel",
  "Muthoot Finance",
  "L&T Finance",
  "NMDC Limited",
  "Kotak Mahindra Bank",
  "Indraprastha Medical Corporation",
  "Havells India",
  "Patanjali Ayurved",
  "Dabur India",
  "Bajaj Finserv",
  "Adani Green Energy",
  "Tata Chemicals",
  "ICICI Prudential Life Insurance",
  "United Breweries",
  "PVR Limited",
  "Biocon",
  "Wipro Consumer Care",
  "Hindalco Industries",
  "United Spirits",
  "Alkem Laboratories",
  "Borosil Renewables",
  "Sundaram Finance",
  "Ambuja Cements",
  "Jubilant FoodWorks",
  "Motherson Sumi Systems",
  "Cholamandalam Investment",
  "Hindustan Zinc",
  "Krispy Kreme",
  "Piramal Enterprises",
  "Axis Capital",
  "South Indian Bank",
  "Sree Rayalaseema Hi-Strength Hypo Limited",
  "Indo Count Industries",
  "TVS Electronics",
  "Zydus Cadila",
  "Mahanagar Gas Limited"
];


for (let i = 1; i <= 100; i++) {
  entitiesdata.push({
    s_no: i,
    entity_name: companyNames[i % companyNames.length], // Assign real company names cyclically
    reporting_frequency: i % 2 === 0 ? "Quarterly" : "Annually",
    financial_year: `202${Math.floor(i / 10)}-${2025 - Math.floor(i / 10)}`,
    pan: `ABCDE${Math.floor(Math.random() * 10000)}${String.fromCharCode(65 + (i % 26))}`,
    cin: `U${Math.floor(Math.random() * 99999)}${['MH', 'DL', 'TN', 'KA', 'WB'][i % 5]}${Math.floor(Math.random() * 999999)}`,
    constitution: ["Private Limited", "Public Limited", "LLP", "One Person Company"][i % 4],
    framework: ["IFRS", "GAAP", "Ind AS", "AS", "Other"][i % 5],
    cfs_applicable: i % 2 === 0 ? "Yes" : "No"
  });
}

module.exports = entitiesdata;




// const entitiesdata = [
//   {
//     "s_no": 1,
//     "entity_name": "ABC Corp",
//     "reporting_frequency": "Quarterly",
//     "financial_year": "2024-25",
//     "pan": "ABCDE1234F",
//     "cin": "U12345MH2024PTC123456",
//     "constitution": "Private Limited",
//     "framework": "IFRS",
//     "cfs_applicable": "Yes"
//   },
//   {
//     "s_no": 2,
//     "entity_name": "XYZ Ltd",
//     "reporting_frequency": "Monthly",
//     "financial_year": "2023-24",
//     "pan": "XYZDE5678G",
//     "cin": "U67890DL2023PLC789012",
//     "constitution": "Public Limited",
//     "framework": "GAAP",
//     "cfs_applicable": "No"
//   },
//   {
//     "s_no": 3,
//     "entity_name": "Tech Innovators",
//     "reporting_frequency": "Annually",
//     "financial_year": "2022-23",
//     "pan": "LMNOP1234H",
//     "cin": "U34567KA2022OPC345678",
//     "constitution": "One Person Company",
//     "framework": "Ind AS",
//     "cfs_applicable": "Yes"
//   },
//   {
//     "s_no": 4,
//     "entity_name": "Finance Solutions",
//     "reporting_frequency": "Half-Yearly",
//     "financial_year": "2021-22",
//     "pan": "QRSTU5678J",
//     "cin": "U45678TN2021LLP456789",
//     "constitution": "LLP",
//     "framework": "AS",
//     "cfs_applicable": "No"
//   },
//   {
//     "s_no": 5,
//     "entity_name": "Retail Hub",
//     "reporting_frequency": "Quarterly",
//     "financial_year": "2020-21",
//     "pan": "VWXYZ1234K",
//     "cin": "U56789WB2020PTC567890",
//     "constitution": "Private Limited",
//     "framework": "Other",
//     "cfs_applicable": "Yes"
//   },
  
// ];

// module.exports = entitiesdata;