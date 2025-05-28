const borrowings =  [
    {
      "borrowal_code": "B001",
      "date_of_borrowing": "2024-01-10",
      "lender_name": "XYZ Bank",
      "sanctioned_amount": 5000000,
      "secured": "Secured",
      "loan_type": "Term Loan",
      "rate_of_interest": "8.5%"
    },
    {
      "borrowal_code": "B002",
      "date_of_borrowing": "2023-06-20",
      "lender_name": "ABC Finance Ltd",
      "sanctioned_amount": 3000000,
      "secured": "Unsecured",
      "loan_type": "OD",
      "rate_of_interest": "7.2%"
    },
    {
      "borrowal_code": "B003",
      "date_of_borrowing": "2023-09-15",
      "lender_name": "PQR Capital",
      "sanctioned_amount": 10000000,
      "secured": "Secured",
      "loan_type": "FITL",
      "rate_of_interest": "9.1%"
    },
    {
      "borrowal_code": "B004",
      "date_of_borrowing": "2022-12-05",
      "lender_name": "XYZ Bank",
      "sanctioned_amount": 2500000,
      "secured": "Unsecured",
      "loan_type": "Key Loan",
      "rate_of_interest": "7.8%"
    },
    {
      "borrowal_code": "B005",
      "date_of_borrowing": "2021-07-19",
      "lender_name": "LMN Investments",
      "sanctioned_amount": 7000000,
      "secured": "Secured",
      "loan_type": "SOD",
      "rate_of_interest": "8.0%"
    },
    {
      "borrowal_code": "B006",
      "date_of_borrowing": "2023-03-22",
      "lender_name": "OPQ Bank",
      "sanctioned_amount": 5500000,
      "secured": "Secured",
      "loan_type": "Term Loan",
      "rate_of_interest": "6.9%"
    },
    {
      "borrowal_code": "B007",
      "date_of_borrowing": "2022-09-18",
      "lender_name": "UVW Capital",
      "sanctioned_amount": 12000000,
      "secured": "Unsecured",
      "loan_type": "OCC",
      "rate_of_interest": "8.3%"
    },
    {
      "borrowal_code": "B008",
      "date_of_borrowing": "2021-11-07",
      "lender_name": "XYZ Bank",
      "sanctioned_amount": 4500000,
      "secured": "Secured",
      "loan_type": "FITL",
      "rate_of_interest": "9.5%"
    },
    {
      "borrowal_code": "B009",
      "date_of_borrowing": "2024-02-14",
      "lender_name": "RST Bank",
      "sanctioned_amount": 6000000,
      "secured": "Unsecured",
      "loan_type": "Key Loan",
      "rate_of_interest": "7.6%"
    },
    {
      "borrowal_code": "B010",
      "date_of_borrowing": "2023-05-11",
      "lender_name": "ABC Finance Ltd",
      "sanctioned_amount": 8000000,
      "secured": "Secured",
      "loan_type": "SOD",
      "rate_of_interest": "8.9%"
    },
    {
      "borrowal_code": "B011",
      "date_of_borrowing": "2022-08-30",
      "lender_name": "PQR Capital",
      "sanctioned_amount": 9500000,
      "secured": "Secured",
      "loan_type": "OCC",
      "rate_of_interest": "6.7%"
    },
    {
      "borrowal_code": "B012",
      "date_of_borrowing": "2021-04-12",
      "lender_name": "XYZ Bank",
      "sanctioned_amount": 700000,
      "secured": "Unsecured",
      "loan_type": "Term Loan",
      "rate_of_interest": "7.1%"
    },
    {
      "borrowal_code": "B013",
      "date_of_borrowing": "2020-10-25",
      "lender_name": "LMN Investments",
      "sanctioned_amount": 13500000,
      "secured": "Secured",
      "loan_type": "OD",
      "rate_of_interest": "9.4%"
    },
    {
      "borrowal_code": "B014",
      "date_of_borrowing": "2019-12-18",
      "lender_name": "OPQ Bank",
      "sanctioned_amount": 4000000,
      "secured": "Unsecured",
      "loan_type": "FITL",
      "rate_of_interest": "7.9%"
    },
    {
      "borrowal_code": "B015",
      "date_of_borrowing": "2023-07-05",
      "lender_name": "UVW Capital",
      "sanctioned_amount": 5600000,
      "secured": "Secured",
      "loan_type": "Key Loan",
      "rate_of_interest": "8.2%"
    },
    {
      "borrowal_code": "B016",
      "date_of_borrowing": "2022-06-15",
      "lender_name": "RST Bank",
      "sanctioned_amount": 3000000,
      "secured": "Unsecured",
      "loan_type": "SOD",
      "rate_of_interest": "7.3%"
    },
    {
      "borrowal_code": "B017",
      "date_of_borrowing": "2021-09-29",
      "lender_name": "ABC Finance Ltd",
      "sanctioned_amount": 950000,
      "secured": "Secured",
      "loan_type": "OCC",
      "rate_of_interest": "9.0%"
    },
    {
      "borrowal_code": "B018",
      "date_of_borrowing": "2020-07-23",
      "lender_name": "XYZ Bank",
      "sanctioned_amount": 1500000,
      "secured": "Unsecured",
      "loan_type": "Term Loan",
      "rate_of_interest": "8.1%"
    },
    {
      "borrowal_code": "B019",
      "date_of_borrowing": "2019-03-14",
      "lender_name": "PQR Capital",
      "sanctioned_amount": 4200000,
      "secured": "Secured",
      "loan_type": "OD",
      "rate_of_interest": "7.5%"
    },
    {
      "borrowal_code": "B020",
      "date_of_borrowing": "2022-02-28",
      "lender_name": "LMN Investments",
      "sanctioned_amount": 6000000,
      "secured": "Secured",
      "loan_type": "FITL",
      "rate_of_interest": "9.2%"
    },
    {
      "borrowal_code": "B021",
      "date_of_borrowing": "2021-10-30",
      "lender_name": "UVW Capital",
      "sanctioned_amount": 7800000,
      "secured": "Unsecured",
      "loan_type": "Key Loan",
      "rate_of_interest": "8.6%"
    },
    {
      "borrowal_code": "B022",
      "date_of_borrowing": "2020-05-17",
      "lender_name": "XYZ Bank",
      "sanctioned_amount": 5000000,
      "secured": "Secured",
      "loan_type": "SOD",
      "rate_of_interest": "7.7%"
    }
  ]

module.exports = borrowings;


