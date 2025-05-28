const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastCoreLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastCoreLineMasterRaw) {
            throw new Error("Model FssMastCoreLineMasterRaw is missing in req.models");
        }

        const FssMastCoreLineMasterRawInstance = req.models.FssMastCoreLineMasterRaw;

        const data = await FssMastCoreLineMasterRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastCoreLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastCoreLineMasterRaw) {
            throw new Error("Model FssMastCoreLineMasterRaw is missing in req.models");
        }

        const { core_master_name, falling_under, polarity, description, created_by } = req.body;
        if (!core_master_name || !polarity || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastCoreLineMasterRawInstance = req.models.FssMastCoreLineMasterRaw;
        const newCoreLine = await FssMastCoreLineMasterRawInstance.create({ core_master_name, falling_under, polarity, description, created_by });

        res.json({ success: true, data: newCoreLine });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const editFssMastCoreLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastCoreLineMasterRaw) {
            throw new Error("Model FssMastCoreLineMasterRaw is missing in req.models");
        }

        const { id } = req.params;
        const { core_master_name, polarity, description } = req.body;

        if (!core_master_name || !polarity) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastCoreLineMasterRawInstance = req.models.FssMastCoreLineMasterRaw;
        const updatedCoreLine = await FssMastCoreLineMasterRawInstance.edit(id, { core_master_name, polarity, description });

        res.json({ success: true, data: updatedCoreLine });
    } catch (err) {
        console.error("❌ Error in /edit:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteFssMastCoreLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastCoreLineMasterRaw) {
            throw new Error("Model FssMastCoreLineMasterRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastCoreLineMasterRawInstance = req.models.FssMastCoreLineMasterRaw;
        const deletedCoreLine = await FssMastCoreLineMasterRawInstance.softDelete(id);

        res.json({ success: true, data: deletedCoreLine });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastCoreLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastCoreLineMasterRaw) {
            throw new Error("Model FssMastCoreLineMasterRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssMastCoreLineMasterRawInstance = req.models.FssMastCoreLineMasterRaw;
        const searchResults = await FssMastCoreLineMasterRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const truncateFssMastCoreLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastCoreLineMasterRaw) {
            throw new Error("Model FssMastCoreLineMasterRaw is missing in req.models");
        }

        const FssMastCoreLineMasterRawInstance = req.models.FssMastCoreLineMasterRaw;

        await FssMastCoreLineMasterRawInstance.truncateData();
        res.json({ message: "Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastCoreLineMaster,
    createFssMastCoreLineMaster,
    editFssMastCoreLineMaster,
    deleteFssMastCoreLineMaster,
    searchFssMastCoreLineMaster,
    truncateFssMastCoreLineMaster,
};