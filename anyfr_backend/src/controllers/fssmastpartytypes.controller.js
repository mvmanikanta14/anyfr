const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastPartyTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyTypesRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const FssMastPartyTypesRawInstance = req.models.FssMastPartyTypesRaw;

        const data = await FssMastPartyTypesRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastPartyTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyTypesRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const { party_type_name, created_by } = req.body;
        if (!party_type_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastPartyTypesRawInstance = req.models.FssMastPartyTypesRaw;
        const newPartyType = await FssMastPartyTypesRawInstance.create({ party_type_name, created_by });

        res.json({ success: true, data: newPartyType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const editFssMastPartyTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyTypesRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const { id } = req.params;
        const { party_type_name } = req.body;

        if (!party_type_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastPartyTypesRawInstance = req.models.FssMastPartyTypesRaw;
        const updatedPartyType = await FssMastPartyTypesRawInstance.edit(id, { party_type_name });

        res.json({ success: true, data: updatedPartyType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteFssMastPartyTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyTypesRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastPartyTypesRawInstance = req.models.FssMastPartyTypesRaw;
        const deletedPartyType = await FssMastPartyTypesRawInstance.softDelete(id);

        res.json({ success: true, data: deletedPartyType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastPartyTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyTypesRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssMastPartyTypesRawInstance = req.models.FssMastPartyTypesRaw;
        const searchResults = await FssMastPartyTypesRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssMastPartyTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyTypesRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const FssMastPartyTypesRaw = req.models.FssMastPartyTypesRaw;

        await FssMastPartyTypesRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastPartyTypes,
    createFssMastPartyTypes,
    editFssMastPartyTypes,
    deleteFssMastPartyTypes,
    searchFssMastPartyTypes,
    truncateFssMastPartyTypes,
};