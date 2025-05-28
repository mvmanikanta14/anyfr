const express = require('express');
const router = express.Router();
const auth = require('../testjson/login');

const dashboard = require('../testjson/dashboard');
const financials = require('../testjson/financials');

const calculators = require('../testjson/calculators');

const coa = require('../testjson/coa');

const cashflow = require('../testjson/cashFlow');
const schedulesAndNotes = require('../testjson/schedulesAndNotes');

const financialRatios = require('../testjson/financialRatios');
const modulesPurchased = require('../testjson/modulesPurchased');
const inSidebar = require('../testjson/inSidebar');
const Poc = require('../testjson/poc');


router.get('/poc', (req, res) => {
    res.json(Poc.Poc);
});

router.get('/in-sidebar', (req, res) => {
    res.json(inSidebar.inSidebar);
});
// Get Sidebar Menu (Left Ribbon)
router.get('/purchased-report', (req, res) => {
    res.json(modulesPurchased.modulesPurchased);
});



// Validate Account ID
router.post('/auth/validate-account', (req, res) => {
    const { account_id } = req.body;
    if (account_id === "AF123456") {
        res.json(auth.auth_validate_account);
    } else {
        res.status(400).json(auth.auth_error_invalid_account);
    }
});

// Login
router.post('/auth/login', (req, res) => {
    const { account_id, user_id, password } = req.body;

    if (account_id === "AF123456" && user_id === "john.doe" && password === "MySecurePass@123") {
        res.json(auth.auth_login);
    } else {
        res.status(401).json(auth.auth_error_invalid_credentials);
    }
});





// Get Sidebar Menu (Left Ribbon)
router.get('/dashboard/sidebar', (req, res) => {
    res.json(dashboard.dashboard_sidebar);
});

// Get Calendar Events
router.get('/dashboard/calendar', (req, res) => {
    res.json(dashboard.dashboard_calendar);
});

// Get Announcements
router.get('/dashboard/announcements', (req, res) => {
    res.json(dashboard.dashboard_announcements);
});

// Get In-Tray Tasks
router.get('/dashboard/in-tray', (req, res) => {
    res.json(dashboard.dashboard_in_tray);
});

// Get Current Tray
router.get('/dashboard/current-tray', (req, res) => {
    res.json(dashboard.dashboard_current_tray);
});

// Get Out-Tray (Completed Tasks)
router.get('/dashboard/out-tray', (req, res) => {
    res.json(dashboard.dashboard_out_tray);
});

// Get Dashboard Metrics
router.get('/dashboard/metrics', (req, res) => {
    res.json(dashboard.dashboard_metrics);
});



// Financials Assignment Metadata //assignment_id
router.get('/financials/meta', (req, res) => {
    res.json(financials.financials_assignment_meta);
});

// Balance Sheet Data //assignment_id
router.get('/financials/balance-sheet', (req, res) => {
    res.json(financials.financials_balance_sheet);
});

// Profit & Loss Data //assignment_id
router.get('/financials/profit-loss', (req, res) => {
    res.json(financials.financials_profit_loss);
});

// FSLI Drill-Down //fsli_code
router.get('/financials/fsli/details', (req, res) => {
    res.json(financials.financials_fsli_details);
});

router.get('/financials/clients', (req, res) => {
    res.json(financials.clients_list);
});

// Create a New Client
router.post('/financials/clients', (req, res) => {
    res.json(financials.create_client);
});

// Upload DayBook / Trial Balance
router.post('/financials/upload', (req, res) => {
    const { type, client_id } = req.body;
    if (type && client_id) {
        res.json(financials.upload_daybook_trial_balance);
    } else {
        res.json(financials.upload_validation_error);
    }
});

// Select Financial Framework
router.get('/financials/frameworks', (req, res) => {
    res.json(financials.frameworks_list);
});

// Add Custom Line Items to Framework
router.post('/financials/frameworks/custom-lines', (req, res) => {
    res.json(financials.add_custom_line_item);
});

// Add Manual Journal Entry
router.post('/financials/manual-entry', (req, res) => {
    const { entries } = req.body;
    let debitTotal = 0;
    let creditTotal = 0;

    // Validate journal entry rules
    entries.forEach(entry => {
        debitTotal += entry.debit;
        creditTotal += entry.credit;
    });

    if (debitTotal === creditTotal && entries.length >= 2 && entries.length <= 10) {
        res.json(financials.add_manual_journal_entry);
    } else {
        res.json(financials.common_error);
    }
});

// Get All Uploaded Entries (Bulk + Manual)
router.get('/financials/entries', (req, res) => {
    const { client_id } = req.query;
    // res.json(req.query);

    if (client_id) {
        res.json(financials.all_uploaded_entries);
    } else {
        res.json(financials.common_error);
    }
});




// Get List of Available Calculators
router.get('/calculators', (req, res) => {
    res.json(calculators.calculators_list);
});

// Perform Calculation (Generic Handler)
router.post('/calculators/:id', (req, res) => {
    const { id } = req.params;
    const { cost, salvage_value, useful_life, method } = req.body;

    // Example: Depreciation Calculator
    if (id === "1") {
        if (useful_life > 0 && cost && salvage_value && method) {
            res.json(calculators.depreciation_calculator);
        } else {
            res.json(calculators.common_error);
        }
    }
    // Other calculators can be added similarly
    else {
        res.json(calculators.common_error);
    }
});




// Get Chart of Accounts (Mapped & Unmapped)
router.get('/coa', (req, res) => {
    const { client_id } = req.query;
    if (client_id) {
        res.json(coa.coa_chart_of_accounts);
    } else {
        res.json(coa.common_error);
    }
});

// Manually Map Sub GL to FSLI
router.post('/coa/map', (req, res) => {
    const { client_id, sub_gl_code, fsli_code } = req.body;
    if (client_id && sub_gl_code && fsli_code) {
        res.json(coa.map_sub_gl_to_fsli);
    } else {
        res.json(coa.common_error);
    }
});

// Add Custom Line Item to Chart of Accounts
router.post('/coa/custom-line', (req, res) => {
    const { client_id, sub_gl_code, sub_gl_name, fsli_code, fsli_name } = req.body;
    if (client_id && sub_gl_code && sub_gl_name && fsli_code && fsli_name) {
        res.json(coa.add_custom_line_item);
    } else {
        res.json(coa.common_error);
    }
});

// Set Special Classification for Sub GL
router.post('/coa/classify', (req, res) => {
    const { client_id, sub_gl_code, classifications } = req.body;
    if (client_id && sub_gl_code && classifications) {
        res.json(coa.set_special_classification);
    } else {
        res.json(coa.common_error);
    }
});

// Get All FSLIs (Dropdown for Manual Mapping)
router.get('/coa/fsli-list', (req, res) => {
    res.json(coa.fsli_list);
});


// Get Business Overview & Accounting Policies
router.get('/financials/disclosures/overview', (req, res) => {
    res.json(financials.financials_business_overview);
});

// Save or Update Business Overview
router.post('/financials/disclosures/business-overview', (req, res) => {
    const { assignment_id, content } = req.body;
    if (assignment_id && content) {
        res.json(financials.save_business_overview);
    } else {
        res.json({ success: false, error: "Invalid input" });
    }
});

// Save or Update Accounting Policies
router.post('/financials/disclosures/accounting-policies', (req, res) => {
    const { assignment_id, content } = req.body;
    if (assignment_id && content) {
        res.json(financials.save_accounting_policies);
    } else {
        res.json({ success: false, error: "Invalid input" });
    }
});





// Get Cash Flow Statement
router.get('/cash-flow', (req, res) => {
    res.json(cashflow.cash_flow_statement);
});

// Adjust a Line Item
router.post('/cash-flow/adjust', (req, res) => {
    const { assignment_id, line_item_id, adjusted_amount } = req.body;
    if (assignment_id && line_item_id && adjusted_amount !== undefined) {
        res.json(cashflow.adjust_line_item);
    } else {
        res.json({ success: false, error: "Invalid input" });
    }
});

// Add or Update a Note to a Line Item
router.post('/cash-flow/note', (req, res) => {
    const { assignment_id, line_item_id, note } = req.body;
    if (assignment_id && line_item_id && note) {
        res.json(cashflow.add_or_update_note);
    } else {
        res.json({ success: false, error: "Invalid input" });
    }
});


// Get All Schedules & Notes
router.get('/schedules-note/disclosures', (req, res) => {
    res.json(schedulesAndNotes.financials_schedules_and_notes);
});

// Save or Update a Schedule
router.post('/schedules-note/disclosures/schedule', (req, res) => {
    const { assignment_id, fsli_code, title, content } = req.body;
    if (assignment_id && fsli_code && title && content) {
        res.json(schedulesAndNotes.save_or_update_schedule);
    } else {
        res.json({ success: false, error: "Invalid input" });
    }
});

// Save or Update a Note
router.post('/schedules-note/disclosures/note', (req, res) => {
    const { assignment_id, fsli_code, title, content } = req.body;
    if (assignment_id && fsli_code && title && content) {
        res.json(schedulesAndNotes.save_or_update_note);
    } else {
        res.json({ success: false, error: "Invalid input" });
    }
});

// Get All Notes/Schedules Linked to a Specific FSLI
router.get('/schedules-note/disclosures/:fsli_code', (req, res) => {
    const { fsli_code } = req.params;
    if (fsli_code) {
        res.json(schedulesAndNotes.get_fsli_disclosures);
    } else {
        res.json({ success: false, error: "Invalid FSLI code" });
    }
});



// Get Financial Ratios
router.get('/financial-ratios/ratios', (req, res) => {
  res.json(financialRatios.financial_ratios);
});

// Add or Update Notes for a Specific Ratio
router.post('/financial-ratios/note', (req, res) => {
  const { assignment_id, ratio_id, note } = req.body;
  if (assignment_id && ratio_id && note) {
    res.json(financialRatios.add_or_update_ratio_note);
  } else {
    res.json({ success: false, error: "Invalid input" });
  }
});

// Add or Update Summary Note for Ratio Page
router.post('/financial-ratios/summary-note', (req, res) => {
  const { assignment_id, note } = req.body;
  if (assignment_id && note) {
    res.json(financialRatios.add_or_update_summary_note);
  } else {
    res.json({ success: false, error: "Invalid input" });
  }
});

// // Common Error Response (for Unauthorized or Internal Error)
// router.use((req, res) => {
//   res.status(401).json(dashboard.common_error);
// });

module.exports = router;
