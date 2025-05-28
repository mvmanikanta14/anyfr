const { getSubdomain } = require('../../subdomainHelper');

const getAllFssParamEntityLocations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLocationsRaw) {
            throw new Error("Model FssParamEntityLocationsRaw is missing in req.models");
        }

        const FssParamEntityLocationsRawInstance = req.models.FssParamEntityLocationsRaw;

        const data = await FssParamEntityLocationsRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssParamEntityLocations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLocationsRaw) {
            throw new Error("Model FssParamEntityLocationsRaw is missing in req.models");
        }

        const { entity_id, location_name, is_active, created_by } = req.body;
        if (!entity_id || !location_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityLocationsRawInstance = req.models.FssParamEntityLocationsRaw;
        const newLocation = await FssParamEntityLocationsRawInstance.create({ entity_id, location_name, is_active, created_by });

        res.json({ success: true, data: newLocation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Edit Location (PUT)**
const editFssParamEntityLocations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLocationsRaw) {
            throw new Error("Model FssParamEntityLocationsRaw is missing in req.models");
        }

        const { id } = req.params;
        const { location_name, is_active } = req.body;

        if (!location_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityLocationsRawInstance = req.models.FssParamEntityLocationsRaw;
        const updatedLocation = await FssParamEntityLocationsRawInstance.edit(id, { location_name, is_active });

        res.json({ success: true, data: updatedLocation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Delete Location (Soft Delete)**
const deleteFssParamEntityLocations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLocationsRaw) {
            throw new Error("Model FssParamEntityLocationsRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssParamEntityLocationsRawInstance = req.models.FssParamEntityLocationsRaw;
        const deletedLocation = await FssParamEntityLocationsRawInstance.softDelete(id);

        res.json({ success: true, data: deletedLocation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search Location**
const searchFssParamEntityLocations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLocationsRaw) {
            throw new Error("Model FssParamEntityLocationsRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssParamEntityLocationsRawInstance = req.models.FssParamEntityLocationsRaw;
        const searchResults = await FssParamEntityLocationsRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssParamEntityLocations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityLocationsRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const FssParamEntityLocationsRaw = req.models.FssParamEntityLocationsRaw;

        await FssParamEntityLocationsRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParamEntityLocations,
    createFssParamEntityLocations,
    editFssParamEntityLocations,
    deleteFssParamEntityLocations,
    searchFssParamEntityLocations,
    truncateFssParamEntityLocations,
};