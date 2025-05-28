const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastUnitTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitTypesRaw) {
            throw new Error("Model FssMastUnitTypesRaw is missing in req.models");
        }

        const FssMastUnitTypesRawInstance = req.models.FssMastUnitTypesRaw;

        const data = await FssMastUnitTypesRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastUnitTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitTypesRaw) {
            throw new Error("Model FssMastUnitTypesRaw is missing in req.models");
        }

        const { unit_type_name, created_by } = req.body;
        if (!unit_type_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastUnitTypesRawInstance = req.models.FssMastUnitTypesRaw;
        const newUnitType = await FssMastUnitTypesRawInstance.create({ unit_type_name, created_by });

        res.json({ success: true, data: newUnitType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const updateFssMastUnitTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitTypesRaw) {
            throw new Error("Model FssMastUnitTypesRaw is missing in req.models");
        }

        const { id } = req.params;
        const { unit_type_name } = req.body;

        if (!unit_type_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastUnitTypesRawInstance = req.models.FssMastUnitTypesRaw;
        const updatedUnitType = await FssMastUnitTypesRawInstance.edit(id, { unit_type_name });

        res.json({ success: true, data: updatedUnitType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteFssMastUnitTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitTypesRaw) {
            throw new Error("Model FssMastUnitTypesRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastUnitTypesRawInstance = req.models.FssMastUnitTypesRaw;
        const deletedUnitType = await FssMastUnitTypesRawInstance.softDelete(id);

        res.json({ success: true, data: deletedUnitType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastUnitTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitTypesRaw) {
            throw new Error("Model FssMastUnitTypesRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssMastUnitTypesRawInstance = req.models.FssMastUnitTypesRaw;
        const searchResults = await FssMastUnitTypesRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssMastUnitTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitTypesRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const FssMastUnitTypesRaw = req.models.FssMastUnitTypesRaw;

        await FssMastUnitTypesRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastUnitTypes,
    createFssMastUnitTypes,
    updateFssMastUnitTypes,
    deleteFssMastUnitTypes,
    searchFssMastUnitTypes,
    truncateFssMastUnitTypes,
};