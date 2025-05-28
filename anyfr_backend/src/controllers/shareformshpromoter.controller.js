const { getSubdomain } = require('../../subdomainHelper');

const getAllShareFormShPromoter = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShPromoterRaw) {
            throw new Error("Model ShareFormShPromoterRaw is missing in req.models");
        }

        const ShareFormShPromoterRawInstance = req.models.ShareFormShPromoterRaw;

        const data = await ShareFormShPromoterRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createShareFormShPromoter = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShPromoterRaw) {
            throw new Error("Model ShareFormShPromoterRaw is missing in req.models");
        }

        const { name_of_promoter, previous_year, previous_year_amt, previous_year_percentage, current_year, current_year_amt, current_year_percentage, entity_id, created_by } = req.body;

        if (!name_of_promoter || !previous_year || !previous_year_amt || !previous_year_percentage || !current_year || !current_year_amt || !current_year_percentage || !entity_id || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const ShareFormShPromoterRawInstance = req.models.ShareFormShPromoterRaw;
        const newEntry = await ShareFormShPromoterRawInstance.create({ name_of_promoter, previous_year, previous_year_amt, previous_year_percentage, current_year, current_year_amt, current_year_percentage, entity_id, created_by });

        res.json({ success: true, data: newEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const editShareFormShPromoter = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShPromoterRaw) {
            throw new Error("Model ShareFormShPromoterRaw is missing in req.models");
        }

        const { id } = req.params;
        const updateFields = req.body; // Contains only the fields that need to be updated

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, error: "No fields provided for update" });
        }

        const ShareFormShPromoterRawInstance = req.models.ShareFormShPromoterRaw;
        const updatedEntry = await ShareFormShPromoterRawInstance.edit(id, updateFields);

        res.json({ success: true, data: updatedEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const deleteShareFormShPromoter = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShPromoterRaw) {
            throw new Error("Model ShareFormShPromoterRaw is missing in req.models");
        }

        const { id } = req.params;

        const ShareFormShPromoterRawInstance = req.models.ShareFormShPromoterRaw;
        const deletedEntry = await ShareFormShPromoterRawInstance.softDelete(id);

        res.json({ success: true, data: deletedEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchShareFormShPromoter = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormShPromoterRaw) {
            throw new Error("Model ShareFormShPromoterRaw is missing in req.models");
        }

        const ShareFormShPromoterRawInstance = req.models.ShareFormShPromoterRaw;
        const searchResults = await ShareFormShPromoterRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    getAllShareFormShPromoter,
    createShareFormShPromoter,
    editShareFormShPromoter,
    deleteShareFormShPromoter,
    searchShareFormShPromoter,
};