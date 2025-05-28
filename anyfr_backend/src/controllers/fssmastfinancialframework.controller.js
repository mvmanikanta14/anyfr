const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastFinancialFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastFinancialFrameworkRaw) {
            throw new Error("Model FssMastFinancialFrameworkRaw is missing in req.models");
        }

        const FssMastFinancialFrameworkRawInstance = req.models.FssMastFinancialFrameworkRaw;

        const data = await FssMastFinancialFrameworkRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastFinancialFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastFinancialFrameworkRaw) {
            throw new Error("Model FssMastFinancialFrameworkRaw is missing in req.models");
        }

        const { framework_name, created_by } = req.body;
        if (!framework_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastFinancialFrameworkRawInstance = req.models.FssMastFinancialFrameworkRaw;
        const newFramework = await FssMastFinancialFrameworkRawInstance.create({ framework_name, created_by , created_on: new Date()});

        res.json({ success: true, data: newFramework });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const editFssMastFinancialFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastFinancialFrameworkRaw) {
            throw new Error("Model FssMastFinancialFrameworkRaw is missing in req.models");
        }

        const { id } = req.params;
        const { framework_name } = req.body;

        if (!framework_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastFinancialFrameworkRawInstance = req.models.FssMastFinancialFrameworkRaw;
        const updatedFramework = await FssMastFinancialFrameworkRawInstance.edit(id, { framework_name });

        res.json({ success: true, data: updatedFramework });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteFssMastFinancialFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastFinancialFrameworkRaw) {
            throw new Error("Model FssMastFinancialFrameworkRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastFinancialFrameworkRawInstance = req.models.FssMastFinancialFrameworkRaw;
        const deletedFramework = await FssMastFinancialFrameworkRawInstance.softDelete(id);

        res.json({ success: true, data: deletedFramework });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastFinancialFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastFinancialFrameworkRaw) {
            throw new Error("Model FssMastFinancialFrameworkRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssMastFinancialFrameworkRawInstance = req.models.FssMastFinancialFrameworkRaw;
        const searchResults = await FssMastFinancialFrameworkRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const truncateFssMastFinancialFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastFinancialFrameworkRaw) {
            throw new Error("Model FssMastFinancialFrameworkRaw is missing in req.models");
        }

        const FssMastFinancialFrameworkRawInstance = req.models.FssMastFinancialFrameworkRaw;

        await FssMastFinancialFrameworkRawInstance.truncateData();
        res.json({ message: "Financial Framework table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastFinancialFramework,
    createFssMastFinancialFramework,
    editFssMastFinancialFramework,
    deleteFssMastFinancialFramework,
    searchFssMastFinancialFramework,
    truncateFssMastFinancialFramework,
};