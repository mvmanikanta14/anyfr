const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastLineMasterRaw) {
            throw new Error("Model FssMastLineMasterRaw is missing in req.models");
        }

        const FssMastLineMasterRawInstance = req.models.FssMastLineMasterRaw;

        const data = await FssMastLineMasterRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastLineMasterRaw) {
            throw new Error("Model FssMastLineMasterRaw is missing in req.models");
        }

        const { framework_id, core_master_id, line_name, falling_under, created_by } = req.body;
        if (!framework_id || !line_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastLineMasterRawInstance = req.models.FssMastLineMasterRaw;
        const newLineMaster = await FssMastLineMasterRawInstance.create({ framework_id, core_master_id, line_name, falling_under, created_by });

        res.json({ success: true, data: newLineMaster });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// router.put('/edit/:id', async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);

//         if (!req.models || !req.models.FssMastLineMasterRaw) {
//             throw new Error("Model FssMastLineMasterRaw is missing in req.models");
//         }

//         const { id } = req.params;
//         const { line_name, framework_id } = req.body;

//         if (!line_name || !framework_id) {
//             return res.status(400).json({ success: false, error: "Missing required fields" });
//         }

//         const FssMastLineMasterRawInstance = req.models.FssMastLineMasterRaw;
//         const updatedLineMaster = await FssMastLineMasterRawInstance.edit(id, { line_name, framework_id });

//         res.json({ success: true, data: updatedLineMaster });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

const editFssMastLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastLineMasterRaw) {
            throw new Error("Model FssMastLineMasterRaw is missing in req.models");
        }

        const { id } = req.params;
        const { framework_id, core_master_id, line_name, falling_under } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, error: "Missing required fields (id)" });
        }

        const FssMastLineMasterRawInstance = req.models.FssMastLineMasterRaw;
        const updatedLineMaster = await FssMastLineMasterRawInstance.edit(id, { framework_id, core_master_id, line_name, falling_under });

        if (!updatedLineMaster) {
            return res.status(404).json({ success: false, error: "Record not found or not updated" });
        }

        res.json({ success: true, data: updatedLineMaster });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const deleteFssMastLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastLineMasterRaw) {
            throw new Error("Model FssMastLineMasterRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastLineMasterRawInstance = req.models.FssMastLineMasterRaw;
        const deletedLineMaster = await FssMastLineMasterRawInstance.softDelete(id);

        res.json({ success: true, data: deletedLineMaster });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastLineMasterRaw) {
            throw new Error("Model FssMastLineMasterRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssMastLineMasterRawInstance = req.models.FssMastLineMasterRaw;
        const searchResults = await FssMastLineMasterRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssMastLineMaster = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastLineMasterRaw) {
            throw new Error("Model FssMastLineMasterRaw is missing in req.models");
        }

        const FssMastLineMasterRawInstance = req.models.FssMastLineMasterRaw;

        await FssMastLineMasterRawInstance.truncateData();
        res.json({ message: "Line Master table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastLineMaster,
    createFssMastLineMaster,
    editFssMastLineMaster,
    deleteFssMastLineMaster,
    searchFssMastLineMaster,
    truncateFssMastLineMaster,
};