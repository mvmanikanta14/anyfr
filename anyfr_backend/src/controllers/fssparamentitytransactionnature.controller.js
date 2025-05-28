const { getSubdomain } = require('../../subdomainHelper');

const getAllFssParamEntityTransactionNature = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityTransactionNatureRaw) {
            throw new Error("Model FssParamEntityTransactionNatureRaw is missing in req.models");
        }

        const FssParamEntityTransactionNatureRawInstance = req.models.FssParamEntityTransactionNatureRaw;

        const data = await FssParamEntityTransactionNatureRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssParamEntityTransactionNature = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityTransactionNatureRaw) {
            throw new Error("Model FssParamEntityTransactionNatureRaw is missing in req.models");
        }

        const { entity_id, transaction_nature_name, is_active, created_by } = req.body;
        if (!entity_id || !transaction_nature_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityTransactionNatureRawInstance = req.models.FssParamEntityTransactionNatureRaw;
        const newTransactionNature = await FssParamEntityTransactionNatureRawInstance.create({ entity_id, transaction_nature_name, is_active, created_by });

        res.json({ success: true, data: newTransactionNature });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Edit Transaction Nature (PUT)**
const editFssParamEntityTransactionNature = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityTransactionNatureRaw) {
            throw new Error("Model FssParamEntityTransactionNatureRaw is missing in req.models");
        }

        const { id } = req.params;
        const { transaction_nature_name, is_active } = req.body;

        if (!transaction_nature_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityTransactionNatureRawInstance = req.models.FssParamEntityTransactionNatureRaw;
        const updatedTransactionNature = await FssParamEntityTransactionNatureRawInstance.edit(id, { transaction_nature_name, is_active });

        res.json({ success: true, data: updatedTransactionNature });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Delete Transaction Nature (Soft Delete)**
const deleteFssParamEntityTransactionNature = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityTransactionNatureRaw) {
            throw new Error("Model FssParamEntityTransactionNatureRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssParamEntityTransactionNatureRawInstance = req.models.FssParamEntityTransactionNatureRaw;
        const deletedTransactionNature = await FssParamEntityTransactionNatureRawInstance.softDelete(id);

        res.json({ success: true, data: deletedTransactionNature });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search Transaction Nature**
const searchFssParamEntityTransactionNature = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityTransactionNatureRaw) {
            throw new Error("Model FssParamEntityTransactionNatureRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssParamEntityTransactionNatureRawInstance = req.models.FssParamEntityTransactionNatureRaw;
        const searchResults = await FssParamEntityTransactionNatureRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssParamEntityTransactionNature = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityTransactionNatureRaw) {
            throw new Error("Model FssParamEntityTransactionNatureRaw is missing in req.models");
        }

        const FssParamEntityTransactionNatureRaw = req.models.FssParamEntityTransactionNatureRaw;

        await FssParamEntityTransactionNatureRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParamEntityTransactionNature,
    createFssParamEntityTransactionNature,
    editFssParamEntityTransactionNature,
    deleteFssParamEntityTransactionNature,
    searchFssParamEntityTransactionNature,
    truncateFssParamEntityTransactionNature,
};