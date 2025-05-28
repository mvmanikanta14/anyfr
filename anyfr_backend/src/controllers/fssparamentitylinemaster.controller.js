const { getSubdomain } = require('../../subdomainHelper');

const getAllFssParamEntityLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLineMasterRaw) {
            throw new Error("Model FssParamEntityLineMasterRaw is missing in req.models");
        }

        const FssParamEntityLineMasterRawInstance = req.models.FssParamEntityLineMasterRaw;

        const data = await FssParamEntityLineMasterRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssParamEntityLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLineMasterRaw) {
            throw new Error("Model FssParamEntityLineMasterRaw is missing in req.models");
        }

        const { entity_id, fss_line_master_id, custom_name, is_added, is_hidden, is_active, created_by } = req.body;
        if (!entity_id || !fss_line_master_id || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityLineMasterRawInstance = req.models.FssParamEntityLineMasterRaw;
        const newEntityLine = await FssParamEntityLineMasterRawInstance.create({ entity_id, fss_line_master_id, custom_name, is_added, is_hidden, is_active, created_by });

        res.json({ success: true, data: newEntityLine });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Edit Line Master (PUT)**
const editFssParamEntityLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLineMasterRaw) {
            throw new Error("Model FssParamEntityLineMasterRaw is missing in req.models");
        }

        const { id } = req.params;
        const { custom_name, is_added, is_hidden, is_active } = req.body;

        const FssParamEntityLineMasterRawInstance = req.models.FssParamEntityLineMasterRaw;
        const updatedEntityLine = await FssParamEntityLineMasterRawInstance.edit(id, { custom_name, is_added, is_hidden, is_active });

        res.json({ success: true, data: updatedEntityLine });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Delete Line Master (Soft Delete)**
const deleteFssParamEntityLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLineMasterRaw) {
            throw new Error("Model FssParamEntityLineMasterRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssParamEntityLineMasterRawInstance = req.models.FssParamEntityLineMasterRaw;
        const deletedEntityLine = await FssParamEntityLineMasterRawInstance.softDelete(id);

        res.json({ success: true, data: deletedEntityLine });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search Line Master**
const searchFssParamEntityLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLineMasterRaw) {
            throw new Error("Model FssParamEntityLineMasterRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssParamEntityLineMasterRawInstance = req.models.FssParamEntityLineMasterRaw;
        const searchResults = await FssParamEntityLineMasterRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssParamEntityLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLineMasterRaw) {
            throw new Error("Model FssParamEntityLineMasterRaw is missing in req.models");
        }

        const FssParamEntityLineMasterRaw = req.models.FssParamEntityLineMasterRaw;

        await FssParamEntityLineMasterRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParamEntityLineMaster,
    createFssParamEntityLineMaster,
    editFssParamEntityLineMaster,
    deleteFssParamEntityLineMaster,
    searchFssParamEntityLineMaster,
    truncateFssParamEntityLineMaster,
};