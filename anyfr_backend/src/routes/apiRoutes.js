const express = require('express');
const router = express.Router();
const people = require('../dummyjson/people');
const data2 = require('../dummyjson/data2');
const header = require('../dummyjson/header');
const balancesheet = require('../dummyjson/balancesheet');
const cashFlowStatement = require('../dummyjson/cashFlowStatement');
const footer = require('../dummyjson/footer');
const profitLoss = require('../dummyjson/profitLoss');
const heads = require('../dummyjson/heads');
const breakdown = require('../dummyjson/breakdown');
const standardText = require('../dummyjson/standardText');
const form = require('../dummyjson/form');
const entities = require('../dummyjson/entities');
const reporting_period = require('../dummyjson/reporting_period');
const checklistsl = require('../dummyjson/checklistsl');
const checklistNodes = require('../dummyjson/checklistNodes');
const sharecaptial = require('../dummyjson/sharecaptial');
const modules = require('../dummyjson/modules');
const mapping = require('../dummyjson/mapping');
const borrowings = require('../dummyjson/borrowings');
const debenture = require('../dummyjson/debenture');
const sc_report = require('../dummyjson/sc_report');
const debenturereport = require('../dummyjson/debentureReport');
const borrowing_report = require('../dummyjson/borrowing_report');
const standardReport = require('../dummyjson/standardReport');
const trialbalance = require('../dummyjson/trialbalance');
const coatrialbalance = require('../dummyjson/coatrialbalance');
const comparativefss = require('../dummyjson/comparativefss');
const ratios = require('../dummyjson/ratios');
const fss_print = require('../dummyjson/fss_print');
const ytd_fss = require('../dummyjson/ytd_fss');
const coa = require('../dummyjson/chart_of_account');
const entitiesdata = require('../dummyjson/entitiesdata');


router.get('/entities-value', (req, res) => {
  res.json(entitiesdata);
});


router.get('/coa-bar', (req, res) => {
  res.json(coa.coa_bar);
});

router.get('/coa-data', (req, res) => {
  res.json(coa.coa_data);
});

router.get('/coa-ramc', (req, res) => {
  res.json(coa.coa_ramc);
});

router.get('/coa-action', (req, res) => {
  res.json(coa.coa_action);
});

router.get('/coa-mapping', (req, res) => {
  res.json(coa.coa_mapping);
});


router.get('/ytd-fss-bar', (req, res) => {
  res.json(ytd_fss.ytd_fss_bar);
});

router.get('/ytd-fss-data', (req, res) => {
  res.json(ytd_fss.ytd_fss_data);
});

router.get('/ytd-fss-ramc', (req, res) => {
  res.json(ytd_fss.ytd_fss_ramc);
});

router.get('/ytd-fss-action', (req, res) => {
  res.json(ytd_fss.ytd_fss_action);
});


router.get('/fss-print-bar', (req, res) => {
  res.json(fss_print.fss_print_bar);
});

router.get('/fss-print-data', (req, res) => {
  res.json(fss_print.fss_print_data);
});

router.get('/fss-print-ramc', (req, res) => {
  res.json(fss_print.fss_print_ramc);
});

router.get('/fss-print-action', (req, res) => {
  res.json(fss_print.fss_print_action);
});


router.get('/ratios-bar', (req, res) => {
  res.json(ratios.ratios_bar);
});

router.get('/ratios-data', (req, res) => {
  res.json(ratios.ratios_data);
});

router.get('/ratios-ramc', (req, res) => {
  res.json(ratios.ratios_ramc);
});

router.get('/ratios-action', (req, res) => {
  res.json(ratios.ratios_action);
});


router.get('/comp-bar', (req, res) => {
  res.json(comparativefss.comp_bar);
});

 
router.get('/comp-data', (req, res) => {
  res.json(comparativefss.comp_data);
});


router.get('/comp-rmc', (req, res) => {
  res.json(comparativefss.comp_rmc);
});

router.get('/comp-action', (req, res) => {
  res.json(comparativefss.comp_action);
});


router.get('/comp-loc-fbar', (req, res) => {
  res.json(comparativefss.comp_loc_fbar);
});

router.get('/comp-loc-data', (req, res) => {
  res.json(comparativefss.comp_loc_data);
});

router.get('/comp-loc-action', (req, res) => {
  res.json(comparativefss.comp_loc_action);
});

router.get('/comp-cf-action', (req, res) => {
  res.json(comparativefss.comp_cf_action);
});


router.get('/comp-cf-data', (req, res) => {
  res.json(comparativefss.comp_cf_data);
});


router.get('/coatb-filterbar', (req, res) => {
  res.json(coatrialbalance.filter_bar);
});


router.get('/coatb-action', (req, res) => {
  res.json(coatrialbalance.tbviewactions);
});


router.get('/coatb-data', (req, res) => {
  res.json(coatrialbalance.tbviewdata);
});


router.get('/coatb-progessbar', (req, res) => {
  res.json(coatrialbalance.tbviewpb);
});


router.get('/coatb-ramc', (req, res) => {
  res.json(coatrialbalance.tbviewaramc);
});


router.get('/standardreport', (req, res) => {
  res.json(standardReport.report);
});

router.get('/standardreportans', (req, res) => {
  res.json(standardReport.baseAnswer);
});


router.get('/standardreportmodelans', (req, res) => {
  res.json(standardReport.modelAnswers);
});

router.get('/standardreportvari', (req, res) => {
  res.json(standardReport.variableDropdowns);
});

router.get('/standardreportcf', (req, res) => {
  res.json(standardReport.currentFindings);
});


router.get('/standardreportpf', (req, res) => {
  res.json(standardReport.previousFindings);
});


router.get('/standardreportpa', (req, res) => {
  res.json(standardReport.previousAnswer);
});

router.get('/standardreportip', (req, res) => {
  res.json(standardReport.industryPractices);
});

router.get('/standardreportgn', (req, res) => {
  res.json(standardReport.guidanceNotes);
});


router.get('/tbupload', (req, res) => {
  res.json(trialbalance.tbupload);
});


router.get('/tbupl-header', (req, res) => {
  res.json(trialbalance.pageheader);
});

router.get('/tbupl-bar', (req, res) => {
  res.json(trialbalance.tbuplbar);
});

router.get('/tbupl-opt', (req, res) => {
  res.json(trialbalance.tbuploption);
});

router.get('/tbupl-action', (req, res) => {
  res.json(trialbalance.tbuplactions);
});


router.get('/tbupl-load', (req, res) => {
  res.json(trialbalance.tbuplLoad);
});

router.get('/tbupl-unload', (req, res) => {
  res.json(trialbalance.tbuplUnload);
});


router.get('/tbupl-model', (req, res) => {
  res.json(trialbalance.tbuplmodel);
});



router.get('/tbupl-view', (req, res) => {
  res.json(trialbalance.tbuplview);
});


router.get('/tbdata', (req, res) => {
  res.json(trialbalance.tbdata);
});


router.get('/fss-comp', (req, res) => {
  res.json(trialbalance.comparative_fss);
});


//this change by madhukant
/**
 * @swagger
 * /api/apiroutes/people:
 *   get:
 *     summary: Get all people
 *     description: Returns a list of people
 *     responses:
 *       200:
 *         description: A successful response
 */

router.get('/people', (req, res) => {
  res.json(people);
});


/**
 * @swagger
 * /api/apiroutes/modules/{id}:
 *   get:
 *     summary: Get module data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Module ID (1 = sharecapital, 2 = debenture, etc.)
 *     responses:
 *       200:
 *         description: Module data
 */
// router.get('/modules/:id?', (req, res) => {
//   const Id = req.params.id ? parseInt(req.params.id, 10) : null;
//   let data;

//   if (Id === 1) {
//     data = sharecaptial;
//   } else if (Id === 2) {
//     data = debenture;
//   } else if (Id === 4) {
//     data = borrowings;
//   } else {
//     data = modules;
//   }


//   const page = parseInt(req.query.page, 100) || 1;
//   const limit = parseInt(req.query.limit, 100) || 100;
//   const offset = (page - 1) * limit;

//   const paginatedData = data.slice(offset, offset + limit);

//   res.json({
//     page,
//     limit,
//     totalRecords: data.length,
//     totalPages: Math.ceil(data.length / limit),
//     data: paginatedData
//   });
// });
router.get('/modules/:id?', (req, res) => {
  const Id = req.params.id ? parseInt(req.params.id, 10) : null;
  let data;

  if (Id === 1) {
    data = sharecaptial;
  } else if (Id === 2) {
    data = debenture;
  } else if (Id === 4) {
    data = borrowings;
  } else {
    data = modules;
  }

  res.json({
    data
  });
});




/**
 * @swagger
 * /api/apiroutes/mapping:
 *   get:
 *     summary: Get mapping data
 *     responses:
 *       200:
 *         description: Successfully retrieved mapping data
 */
router.get('/mapping', (req, res) => {
  res.json(mapping);
});


/**
 * @swagger
 * /api/apiroutes/sharecaptial:
 *   get:
 *     summary: Get share captial data
 *     responses:
 *       200:
 *         description: Successfully retrieved sharecaptial data
 */
router.get('/sharecaptial', (req, res) => {
  res.json(sharecaptial);
});


/**
 * @swagger
 * /api/apiroutes/screport:
 *   get:
 *     summary: Get share  share captial report data
 *     responses:
 *       200:
 *         description: Successfully retrieved  share captial report data
 */
router.get('/screport', (req, res) => {
  res.json(sc_report);
});


/**
 * @swagger
 * /api/apiroutes/debenturereport:
 *   get:
 *     summary: Get debenture report  data
 *     responses:
 *       200:
 *         description: Successfully retrieved   debenture report  data
 */
router.get('/debenturereport', (req, res) => {
  res.json(debenturereport);
});


/**
 * @swagger
 * /api/apiroutes/debenturereport:
 *   get:
 *     summary: Get borrowing report data
 *     responses:
 *       200:
 *         description: Successfully retrieved   dborrowing report data
 */
router.get('/borrowingreport', (req, res) => {
  res.json(borrowing_report);
});


/**
 * @swagger
 * /api/apiroutes/reporting/{id}:
 *   get:
 *     summary: Get reporting period by company ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the company
 *     responses:
 *       200:
 *         description: Reporting period data
 *       404:
 *         description: Reporting period not found
 */
router.get('/reporting/:id', (req, res) => {
  const Id = parseInt(req.params.id, 10);
  // const result = reporting_period.reporting_period.find(item => item.company_id == Id);
  const result = reporting_period.find(item => item.company_id == Id); // Fixing this line

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Standardtext not found" });
  }
});

/**
 * @swagger
 * /api/apiroutes/entities:
 *   get:
 *     summary: Get a paginated list of entities
 *     description: Retrieves a list of entities with optional pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         required: false
 *         description: The number of items per page.
 *     responses:
 *       200:
 *         description: A paginated list of entities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 100
 *                 totalRecords:
 *                   type: integer
 *                   example: 500
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Entity Name"
 */
router.get('/entities', (req, res) => {

  let data;
  data = entities;

  const page = parseInt(req.query.page, 100) || 1;
  const limit = parseInt(req.query.limit, 100) || 100;
  const offset = (page - 1) * limit;

  const paginatedData = data.slice(offset, offset + limit);

  res.json({
    page,
    limit,
    totalRecords: data.length,
    totalPages: Math.ceil(data.length / limit),
    data: paginatedData
  });
});


/**
 * @swagger
 * /api/apiroutes/data2:
 *   get:
 *     summary: Get data2 data
 *     responses:
 *       200:
 *         description: Successfully retrieved   data2  data
 */
router.get('/data2', (req, res) => {
  res.json(data2);
});


/**
 * @swagger
 * /api/apiroutes/header:
 *   get:
 *     summary: Get header data
 *     responses:
 *       200:
 *         description: Successfully retrieved   header report data
 */
router.get('/header', (req, res) => {
  res.json(header);
});


/**
 * @swagger
 * /api/apiroutes/balancesheet:
 *   get:
 *     summary: Get balancesheet data
 *     responses:
 *       200:
 *         description: Successfully retrieved balancesheet data
 */
router.get('/balancesheet', (req, res) => {
  res.json(balancesheet);
});


/**
 * @swagger
 * /api/apiroutes/cashflow:
 *   get:
 *     summary: Get cashflow data
 *     responses:
 *       200:
 *         description: Successfully retrieved cashflow data
 */
router.get('/cashflow', (req, res) => {
  res.json(cashFlowStatement);
});



/**
 * @swagger
 * /api/apiroutes/cashflow/{id}:
 *   get:
 *     summary: Get cashflow by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cashflow
 *     responses:
 *       200:
 *         description: cashflow found
 *       404:
 *         description: cashflow not found
 */
router.get('/cashflow/:id', (req, res) => {
  res.json(cashFlowStatement);
});

/**
 * @swagger
 * /api/apiroutes/balanceFooter:
 *   get:
 *     summary: Get balanceFooter data
 *     responses:
 *       200:
 *         description: Successfully retrieved balanceFooter data
 */
router.get('/balanceFooter', (req, res) => {
  res.json(footer);
});


/**
 * @swagger
 * /api/apiroutes/profitLoss:
 *   get:
 *     summary: Get profitLoss data
 *     responses:
 *       200:
 *         description: Successfully retrieved profitLoss data
 */
router.get('/profitLoss', (req, res) => {
  res.json(profitLoss);
});


/**
 * @swagger
 * /api/apiroutes/profitLoss/{id}:
 *   get:
 *     summary: Get profitLoss  by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the profitLoss
 *     responses:
 *       200:
 *         description: profitLoss  found
 *       404:
 *         description: profitLoss  not found
 */
router.get('/profitLoss/:id', (req, res) => {
  res.json(profitLoss);
});

/**
 * @swagger
 * /api/apiroutes/allheads:
 *   get:
 *     summary: Get allheads data
 *     responses:
 *       200:
 *         description: Successfully retrieved allheads data
 */
router.get('/allheads', (req, res) => {
  res.json(heads);
});


/**
 * @swagger
 * /api/apiroutes/standardtext:
 *   get:
 *     summary: Get standardtext data
 *     responses:
 *       200:
 *         description: Successfully retrieved standardtext data
 */
router.get('/standardtext', (req, res) => {
  res.json(standardText);
});


/**
 * @swagger
 * /api/apiroutes/standardtext/{id}:
 *   get:
 *     summary: Get standard text by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the standard text
 *     responses:
 *       200:
 *         description: Standard text found
 *       404:
 *         description: Standard text not found
 */
router.get('/standardtext/:id', (req, res) => {
  const argumentId = parseInt(req.params.id, 10);
  const result = standardText[0].standardText.find(item => item.Argument === argumentId);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Standardtext not found" });
  }
});



/**
 * @swagger
 * /api/apiroutes/notes/{id}:
 *   get:
 *     summary: Get notes by argument ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note
 *     responses:
 *       200:
 *         description: Successfully retrieved notes
 */
router.get('/notes/:id', (req, res) => {
  const argumentId = req.params.id;
  const notes = heads[3]?.notes || [];


  // console.log(`Received argumentId: ${argumentId}`);
  // console.log(`Notes: ${JSON.stringify(notes)}`);

  const filteredNotes = [];
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].name.startsWith(argumentId)) {
      filteredNotes.push(notes[i]);
    }
  }

  // console.log(`Filtered Notes: ${JSON.stringify(filteredNotes)}`);

  const result = [];
  for (const note of filteredNotes) {
    let foundItem;


    // console.log(`Processing note with argument: ${note.argument} and type: ${note.type}`);

    if (note.type === 'breakdown') {

      foundItem = breakdown[0].breakdown.find(item => item.Argument == note.argument);
    } else if (note.type === 'standard text') {
      foundItem = standardText[0].standardText.find(item => item.Argument == note.argument);

    } else if (note.type === 'form') {

      foundItem = form[0].form.find(item => item.Argument == note.argument);
    }

    if (foundItem) {
      foundItem.type = note.type;
      result.push(foundItem);

    } else {
      // console.log(`No match found for argument: ${note.argument}`);
    }
  }

  //
  res.json(result);
});



/**
 * @swagger
 * /api/apiroutes/balancesheet/{id}:
 *   get:
 *     summary: Get balancesheet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the balancesheet
 *     responses:
 *       200:
 *         description: balancesheet found
 *       404:
 *         description: balancesheet not found
 */
router.get('/balancesheet/:id', (req, res) => {

  const argumentId = parseInt(req.params.id, 10);


  const result = balancesheet.find(item => item.Argument === argumentId);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "balancesheet not found" });
  }


});



/**
 * @swagger
 * /api/apiroutes/breakdown:
 *   get:
 *     summary: Get breakdown data
 *     responses:
 *       200:
 *         description: Successfully retrieved breakdown data
 */
router.get('/breakdown', (req, res) => {
  res.json(breakdown);
});



/**
 * @swagger
 * /api/apiroutes/breakdown/{id}:
 *   get:
 *     summary: Get breakdown by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the breakdown  
 *     responses:
 *       200:
 *         description: breakdown  found
 *       404:
 *         description: breakdown  not found
 */
router.get('/breakdown/:id', (req, res) => {
  const argumentId = parseInt(req.params.id, 10);
  const result = breakdown[0].breakdown.find(item => item.Argument === argumentId);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Breakdown not found" });
  }
});




/**
 * @swagger
 * /api/apiroutes/form:
 *   get:
 *     summary: Get form data
 *     responses:
 *       200:
 *         description: Successfully retrieved form data
 */
router.get('/form', (req, res) => {
  res.json(form);
});



/**
 * @swagger
 * /api/apiroutes/form/{id}:
 *   get:
 *     summary: Get form by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the form
 *     responses:
 *       200:
 *         description: form found
 *       404:
 *         description: form not found
 */
router.get('/form/:id', (req, res) => {
  const argumentId = parseInt(req.params.id, 10);
  const result = form[0].form.find(item => item.Argument === argumentId);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Form not found" });
  }
});


// Route to get all checklist subjects
router.get('/checklistsl', (req, res) => {
  res.json({
    header: checklistsl.checklistsl.header,
    checklist_subjects: checklistsl.checklistsl.checklist_subjects
  });
  // res.json({checklistsl});
});

// Route to get one checklist subject by ID
router.get('/checklistsl/:id', (req, res) => {
  const Id = parseInt(req.params.id, 10);
  const result = checklistsl.checklistsl.checklist_subjects.find(item => item.id === Id);

  if (result) {
    res.json({
      header: checklistsl.checklistsl.header,
      checklist_subject: result
    });
  } else {
    res.status(404).json({ message: "Checklist item not found" });
  }
});

router.get('/checklistnodes/?', (req, res) => {

  res.json({
    data: checklistNodes.checklistNodes,
     
  });
   
});




module.exports = router;


// const express = require('express');
// const router = express.Router();

// const data = {
//   people: require('../data/people'),
//   data2: require('../data/data2'),
//   header: require('../data/header'),
//   balancesheet: require('../data/balancesheet'),
//   balanceFooter: require('../data/footer'),
//   profitLoss: require('../data/profitLoss')
// };

// Object.keys(data).forEach(route => {
//   router.get(`/${route}`, (req, res) => res.json(data[route]));
// });

// module.exports = router;
