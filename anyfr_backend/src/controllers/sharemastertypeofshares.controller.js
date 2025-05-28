const { getSubdomain } = require('../../subdomainHelper');

const getAllShareMasterTypeOfShares = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);
        if (!req.models || !req.models.ShareMasterTypeOfSharesRaw) {
            throw new Error("Model ShareMasterTypeOfSharesRaw is missing in req.models");
        }

        const ShareMasterTypeOfSharesRawInstance = req.models.ShareMasterTypeOfSharesRaw;

        const data = await ShareMasterTypeOfSharesRawInstance.getAll();
        res.json(data);
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};


// 🔹 Create a new share type (POST)
const createShareMasterTypeOfShares = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareMasterTypeOfSharesRaw) {
            throw new Error("Model ShareMasterTypeOfSharesRaw is missing in req.models");
        }

        const { type_of_share_name, created_by } = req.body;
        if (!type_of_share_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const ShareMasterTypeOfSharesRawInstance = req.models.ShareMasterTypeOfSharesRaw;
        const newShareType = await ShareMasterTypeOfSharesRawInstance.create({ type_of_share_name, created_by });

        res.json({ success: true, data: newShareType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const editShareMasterTypeOfShares = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareMasterTypeOfSharesRaw) {
            throw new Error("Model ShareMasterTypeOfSharesRaw is missing in req.models");
        }

        const { id } = req.params;
        const { type_of_share_name } = req.body;

        if (!type_of_share_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const ShareMasterTypeOfSharesRawInstance = req.models.ShareMasterTypeOfSharesRaw;
        const updatedShareType = await ShareMasterTypeOfSharesRawInstance.edit(id, { type_of_share_name });

        res.json({ success: true, data: updatedShareType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const deleteShareMasterTypeOfShares = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareMasterTypeOfSharesRaw) {
            throw new Error("Model ShareMasterTypeOfSharesRaw is missing in req.models");
        }

        const { id } = req.params;

        const ShareMasterTypeOfSharesRawInstance = req.models.ShareMasterTypeOfSharesRaw;
        const deletedShareType = await ShareMasterTypeOfSharesRawInstance.softDelete(id);

        res.json({ success: true, data: deletedShareType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};



const searchShareMasterTypeOfShares = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareMasterTypeOfSharesRaw) {
            throw new Error("Model ShareMasterTypeOfSharesRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const ShareMasterTypeOfSharesRawInstance = req.models.ShareMasterTypeOfSharesRaw;
        const searchResults = await ShareMasterTypeOfSharesRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    getAllShareMasterTypeOfShares,
    createShareMasterTypeOfShares,
    editShareMasterTypeOfShares,
    deleteShareMasterTypeOfShares,
    searchShareMasterTypeOfShares,
};