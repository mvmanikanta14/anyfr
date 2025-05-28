const {getSubdomain} = require("../../subdomainHelper");

const getAllShareParamModeOfIssues = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareParamModeOfIssuesRaw) {
            throw new Error("Model ShareParamModeOfIssuesRaw is missing in req.models");
        }

        const ShareParamModeOfIssuesRawInstance = req.models.ShareParamModeOfIssuesRaw;

        const data = await ShareParamModeOfIssuesRawInstance.getAll();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// 🔹 Create a new mode of issue (POST)
const createShareParamModeOfIssues = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareParamModeOfIssuesRaw) {
            throw new Error("Model ShareParamModeOfIssuesRaw is missing in req.models");
        }

        const { mode_of_issue_name, created_by } = req.body;
        if (!mode_of_issue_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const ShareParamModeOfIssuesRawInstance = req.models.ShareParamModeOfIssuesRaw;
        const newModeOfIssue = await ShareParamModeOfIssuesRawInstance.create({ mode_of_issue_name, created_by });

        return res.json({ success: true, data: newModeOfIssue });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const editShareParamModeOfIssues = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareParamModeOfIssuesRaw) {
            throw new Error("Model ShareParamModeOfIssuesRaw is missing in req.models");
        }

        const { id } = req.params;
        const { mode_of_issue_name } = req.body;

        if (!mode_of_issue_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const ShareParamModeOfIssuesRawInstance = req.models.ShareParamModeOfIssuesRaw;
        const updatedModeOfIssue = await ShareParamModeOfIssuesRawInstance.edit(id, { mode_of_issue_name });

        return res.json({ success: true, data: updatedModeOfIssue });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const deleteShareParamModeOfIssues = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareParamModeOfIssuesRaw) {
            throw new Error("Model ShareParamModeOfIssuesRaw is missing in req.models");
        }

        const { id } = req.params;

        const ShareParamModeOfIssuesRawInstance = req.models.ShareParamModeOfIssuesRaw;
        const deletedModeOfIssue = await ShareParamModeOfIssuesRawInstance.softDelete(id);

        return res.json({ success: true, data: deletedModeOfIssue });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const searchShareParamModeOfIssues = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareParamModeOfIssuesRaw) {
            throw new Error("Model ShareParamModeOfIssuesRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const ShareParamModeOfIssuesRawInstance = req.models.ShareParamModeOfIssuesRaw;
        const searchResults = await ShareParamModeOfIssuesRawInstance.search(req.query.query);

        return res.json({ success: true, data: searchResults });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    getAllShareParamModeOfIssues,
    createShareParamModeOfIssues,
    editShareParamModeOfIssues,
    deleteShareParamModeOfIssues,
    searchShareParamModeOfIssues,
};