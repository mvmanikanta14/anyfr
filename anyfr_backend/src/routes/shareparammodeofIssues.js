const express = require('express');
const router = express.Router();

const shareparammodeofIssuesController = require('../controllers/shareparammodeofIssues.controller');
const authenticateToken = require('../middlewares/authMiddleware');

// 🔹 View all mode of issues (GET)
router.post('/view', authenticateToken, shareparammodeofIssuesController.getAllShareParamModeOfIssues);

// 🔹 Create a new mode of issue (POST)
router.post('/create', authenticateToken, shareparammodeofIssuesController.createShareParamModeOfIssues);

// 🔹 Edit a mode of issue (PUT)
router.put('/edit/:id', authenticateToken, shareparammodeofIssuesController.editShareParamModeOfIssues);

// 🔹 Delete a mode of issue (DELETE)
router.delete('/delete/:id', authenticateToken, shareparammodeofIssuesController.deleteShareParamModeOfIssues);

// 🔹 Search mode of issues
router.get('/search', authenticateToken, shareparammodeofIssuesController.searchShareParamModeOfIssues);

module.exports = router;
