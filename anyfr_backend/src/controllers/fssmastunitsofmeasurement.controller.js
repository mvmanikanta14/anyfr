const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastUnitsOfMeasurement = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitsOfMeasurementRaw) {
            throw new Error("Model FssMastUnitsOfMeasurementRaw is missing in req.models");
        }

        const FssMastUnitsOfMeasurementRawInstance = req.models.FssMastUnitsOfMeasurementRaw;

        const data = await FssMastUnitsOfMeasurementRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastUnitsOfMeasurement = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitsOfMeasurementRaw) {
            throw new Error("Model FssMastUnitsOfMeasurementRaw is missing in req.models");
        }

        const { unit_name, unit_type_id, created_by } = req.body;
        if (!unit_name || !unit_type_id || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastUnitsOfMeasurementRawInstance = req.models.FssMastUnitsOfMeasurementRaw;
        const newUnit = await FssMastUnitsOfMeasurementRawInstance.create({ unit_name, unit_type_id, created_by });

        res.json({ success: true, data: newUnit });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const updateFssMastUnitsOfMeasurement = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitsOfMeasurementRaw) {
            throw new Error("Model FssMastUnitsOfMeasurementRaw is missing in req.models");
        }

        const { id } = req.params;
        const { unit_name } = req.body;

        if (!unit_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastUnitsOfMeasurementRawInstance = req.models.FssMastUnitsOfMeasurementRaw;
        const updatedUnit = await FssMastUnitsOfMeasurementRawInstance.edit(id, { unit_name });

        res.json({ success: true, data: updatedUnit });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteFssMastUnitsOfMeasurement = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitsOfMeasurementRaw) {
            throw new Error("Model FssMastUnitsOfMeasurementRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastUnitsOfMeasurementRawInstance = req.models.FssMastUnitsOfMeasurementRaw;
        const deletedUnit = await FssMastUnitsOfMeasurementRawInstance.softDelete(id);

        res.json({ success: true, data: deletedUnit });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastUnitsOfMeasurement = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitsOfMeasurementRaw) {
            throw new Error("Model FssMastUnitsOfMeasurementRaw is missing in req.models");
        }

        const FssMastUnitsOfMeasurementRawInstance = req.models.FssMastUnitsOfMeasurementRaw;

        const searchResults = await FssMastUnitsOfMeasurementRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssMastUnitsOfMeasurement = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastUnitsOfMeasurementRaw) {
            throw new Error("Model FssMastPartyTypesRaw is missing in req.models");
        }

        const FssMastUnitsOfMeasurementRaw = req.models.FssMastUnitsOfMeasurementRaw;

        await FssMastUnitsOfMeasurementRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastUnitsOfMeasurement,
    createFssMastUnitsOfMeasurement,
    updateFssMastUnitsOfMeasurement,
    deleteFssMastUnitsOfMeasurement,
    searchFssMastUnitsOfMeasurement,
    truncateFssMastUnitsOfMeasurement,
};