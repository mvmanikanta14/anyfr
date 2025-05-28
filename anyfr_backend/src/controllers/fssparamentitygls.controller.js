const { getSubdomain } = require('../../subdomainHelper');

const getAllFssParamEntityGls = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityGlsRaw) {
            throw new Error("Model FssParamEntityGlsRaw is missing in req.models");
        }

        const FssParamEntityGlsRawInstance = req.models.FssParamEntityGlsRaw;

        const data = await FssParamEntityGlsRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssParamEntityGls = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityGlsRaw) {
            throw new Error("Model FssParamEntityGlsRaw is missing in req.models");
        }

        const { entity_id, gl_name, gl_code, falling_under, mapped_to, is_party, has_subsidiary, is_active, created_by } = req.body;
        if (!entity_id || !gl_name || !gl_code || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityGlsRawInstance = req.models.FssParamEntityGlsRaw;
        const newGL = await FssParamEntityGlsRawInstance.create({ entity_id, gl_name, gl_code, falling_under, mapped_to, is_party, has_subsidiary, is_active, created_by });

        res.json({ success: true, data: newGL });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Edit GL Account (PUT)**
const editFssParamEntityGls = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityGlsRaw) {
            throw new Error("Model FssParamEntityGlsRaw is missing in req.models");
        }

        const { id } = req.params;
        const { gl_name, gl_code, is_party, has_subsidiary, is_active } = req.body;

        if (!gl_name || !gl_code) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityGlsRawInstance = req.models.FssParamEntityGlsRaw;
        const updatedGL = await FssParamEntityGlsRawInstance.edit(id, { gl_name, gl_code, is_party, has_subsidiary, is_active });

        res.json({ success: true, data: updatedGL });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Delete GL Account (Soft Delete)**
const deleteFssParamEntityGls = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityGlsRaw) {
            throw new Error("Model FssParamEntityGlsRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssParamEntityGlsRawInstance = req.models.FssParamEntityGlsRaw;
        const deletedGL = await FssParamEntityGlsRawInstance.softDelete(id);

        res.json({ success: true, data: deletedGL });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search GL Account**
const searchFssParamEntityGls = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityGlsRaw) {
            throw new Error("Model FssParamEntityGlsRaw is missing in req.models");
        }

        const { term } = req.query;

        if (!term) {
            return res.status(400).json({ success: false, error: "Search term is required" });
        }

        const FssParamEntityGlsRawInstance = req.models.FssParamEntityGlsRaw;
        const searchResults = await FssParamEntityGlsRawInstance.search(term);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssParamEntityGls = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityGlsRaw) {
            throw new Error("Model FssParamEntityGlsRaw is missing in req.models");
        }

        const FssParamEntityGlsRaw = req.models.FssParamEntityGlsRaw;

        await FssParamEntityGlsRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParamEntityGls,
    createFssParamEntityGls,
    editFssParamEntityGls,
    deleteFssParamEntityGls,
    searchFssParamEntityGls,
    truncateFssParamEntityGls,
};