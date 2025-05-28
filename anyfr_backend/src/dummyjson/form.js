const form = [
  {
    "form": [
      {
        "Argument": 1,
        "title": "Promoter Shareholding Disclosure",
        "name": "share_capital_disclosure",
        "columns": [
          "Sl. No",
          "particulars",
          "No. of Shares (Last Year)",
          "Value of Shares (Last Year)",
          "No. of Shares (Current Year)",
          "Value of Shares (Current Year)"
        ],
        "data": [
          {
            "sl_no": 1,
            "particulars": "John Doe",
            "no_of_shares_last_year": 50000,
            "value_of_shares_last_year": 5000000,
            "no_of_shares_current_year": 60000,
            "value_of_shares_current_year": 6000000,
            "style": 2
          },
          {
            "sl_no": 2,
            "particulars": "Jane Smith",
            "no_of_shares_last_year": 75000,
            "value_of_shares_last_year": 7500000,
            "no_of_shares_current_year": 80000,
            "value_of_shares_current_year": 8500000,
            "style": 2
          },
          {
            "sl_no": 3,
            "particulars": "XYZ Holdings Ltd.",
            "no_of_shares_last_year": 100000,
            "value_of_shares_last_year": 10000000,
            "no_of_shares_current_year": 95000,
            "value_of_shares_current_year": 9500000,
            "style": 2
          }
        ],
        "totals": {
          "total_no_of_shares_last_year": 225000,
          "total_value_of_shares_last_year": 22500000,
          "total_no_of_shares_current_year": 235000,
          "total_value_of_shares_current_year": 24000000,
          "style": 4
        }
      },
      {
        "Argument": 92,
        "title": "Related Party Transactions Disclosure",
        "name": "related_party_transactions",
        "columns": [
          "Name of the Party",
          "Nature of Relationship",
          "Type of Transaction",
          "Transaction Value (Last Year)",
          "Transaction Value (Current Year)",
          "Outstanding Balance (Last Year)",
          "Outstanding Balance (Current Year)"
        ],
        "data": [
          {
            "party_name": "ABC Pvt Ltd",
            "relationship": "Holding Company",
            "transaction_type": "Loan Given",
            "transaction_value_last_year": 5000000,
            "transaction_value_current_year": 5500000,
            "outstanding_balance_last_year": 2000000,
            "outstanding_balance_current_year": 2500000,
            "style": 2
          },
          {
            "party_name": "XYZ Ltd",
            "relationship": "Subsidiary",
            "transaction_type": "Sale of Goods",
            "transaction_value_last_year": 3000000,
            "transaction_value_current_year": 3500000,
            "outstanding_balance_last_year": 1500000,
            "outstanding_balance_current_year": 1700000,
            "style": 2
          },
          {
            "party_name": "John Doe",
            "relationship": "Director",
            "transaction_type": "Remuneration",
            "transaction_value_last_year": 1200000,
            "transaction_value_current_year": 1400000,
            "outstanding_balance_last_year": 0,
            "outstanding_balance_current_year": 0,
            "style": 2
          }
        ],
        "totals": {
          "total_transaction_value_last_year": 9200000,
          "total_transaction_value_current_year": 10400000,
          "total_outstanding_balance_last_year": 3500000,
          "total_outstanding_balance_current_year": 4200000,
          "style": 4
        }
      }
    ]
  }
];

module.exports = form;
