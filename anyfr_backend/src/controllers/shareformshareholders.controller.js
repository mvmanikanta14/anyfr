const { getSubdomain } = require('../../subdomainHelper');

const getAllShareFormShareholders = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShareholdersRaw) {
            throw new Error("Model ShareFormShareholdersRaw is missing in req.models");
        }

        const ShareFormShareholdersRawInstance = req.models.ShareFormShareholdersRaw;

        const data = await ShareFormShareholdersRawInstance.getAll();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const createShareFormShareholders = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShareholdersRaw) {
            throw new Error("Model ShareFormShareholdersRaw is missing in req.models");
        }

        const { name_of_shareholder, previous_year, previous_year_amt, previous_year_percentage, current_year, current_year_amt, current_year_percentage, entity_id, created_by } = req.body;

        if (!name_of_shareholder || !previous_year || !previous_year_amt || !previous_year_percentage || !current_year || !current_year_amt || !current_year_percentage || !entity_id || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const ShareFormShareholdersRawInstance = req.models.ShareFormShareholdersRaw;
        const newEntry = await ShareFormShareholdersRawInstance.create({ name_of_shareholder, previous_year, previous_year_amt, previous_year_percentage, current_year, current_year_amt, current_year_percentage, entity_id, created_by });

        return  res.json({ success: true, data: newEntry });
    } catch (err) {
        return  res.status(500).json({ success: false, error: err.message });
    }
};

const editShareFormShareholders = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShareholdersRaw) {
            throw new Error("Model ShareFormShareholdersRaw is missing in req.models");
        }

        const { id } = req.params;
        const updateFields = req.body; // Contains only the fields that need to be updated

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, error: "No fields provided for update" });
        }

        const ShareFormShareholdersRawInstance = req.models.ShareFormShareholdersRaw;
        const updatedEntry = await ShareFormShareholdersRawInstance.edit(id, updateFields);

        return  res.json({ success: true, data: updatedEntry });
    } catch (err) {
        return  res.status(500).json({ success: false, error: err.message });
    }
};

const deleteShareFormShareholders = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShareholdersRaw) {
            throw new Error("Model ShareFormShareholdersRaw is missing in req.models");
        }

        const { id } = req.params;

        const ShareFormShareholdersRawInstance = req.models.ShareFormShareholdersRaw;
        const deletedEntry = await ShareFormShareholdersRawInstance.softDelete(id);

        return res.json({ success: true, data: deletedEntry });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const searchShareFormShareholders = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShareholdersRaw) {
            throw new Error("Model ShareFormShareholdersRaw is missing in req.models");
        }

        const ShareFormShareholdersRawInstance = req.models.ShareFormShareholdersRaw;
        const searchResults = await ShareFormShareholdersRawInstance.search(req.query.query);

        return res.json({ success: true, data: searchResults });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    getAllShareFormShareholders,
    createShareFormShareholders,
    editShareFormShareholders,
    deleteShareFormShareholders,
    searchShareFormShareholders,
};