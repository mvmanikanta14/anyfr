const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastVoucherTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastVoucherTypesRaw) {
            throw new Error("Model FssMastVoucherTypesRaw is missing in req.models");
        }

        const FssMastVoucherTypesRawInstance = req.models.FssMastVoucherTypesRaw;

        const data = await FssMastVoucherTypesRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllDropdown = async (req, res) => {
    try {
        

        const FssMastVoucherTypesRawInstance = req.models.FssMastVoucherTypesRaw;

        const data = await FssMastVoucherTypesRawInstance.getAlldrop();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastVoucherTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastVoucherTypesRaw) {
            throw new Error("Model FssMastVoucherTypesRaw is missing in req.models");
        }

        const { voucher_type_name, created_by } = req.body;
        if (!voucher_type_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastVoucherTypesRawInstance = req.models.FssMastVoucherTypesRaw;
        const newVoucherType = await FssMastVoucherTypesRawInstance.create({ voucher_type_name, created_by });

        res.json({ success: true, data: newVoucherType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const updateFssMastVoucherTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastVoucherTypesRaw) {
            throw new Error("Model FssMastVoucherTypesRaw is missing in req.models");
        }

        const { id } = req.params;
        const { voucher_type_name } = req.body;

        if (!voucher_type_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastVoucherTypesRawInstance = req.models.FssMastVoucherTypesRaw;
        const updatedVoucherType = await FssMastVoucherTypesRawInstance.edit(id, { voucher_type_name });

        res.json({ success: true, data: updatedVoucherType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteFssMastVoucherTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastVoucherTypesRaw) {
            throw new Error("Model FssMastVoucherTypesRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastVoucherTypesRawInstance = req.models.FssMastVoucherTypesRaw;
        const deletedVoucherType = await FssMastVoucherTypesRawInstance.softDelete(id);

        res.json({ success: true, data: deletedVoucherType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastVoucherTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastVoucherTypesRaw) {
            throw new Error("Model FssMastVoucherTypesRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssMastVoucherTypesRawInstance = req.models.FssMastVoucherTypesRaw;
        const searchResults = await FssMastVoucherTypesRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssMastVoucherTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastVoucherTypesRaw) {
            throw new Error("Model FssMastVoucherTypesRaw is missing in req.models");
        }

        const FssMastPartyTypesRaw = req.models.FssMastVoucherTypesRaw;

        await FssMastPartyTypesRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastVoucherTypes,
    createFssMastVoucherTypes,
    updateFssMastVoucherTypes,
    deleteFssMastVoucherTypes,
    searchFssMastVoucherTypes,
    truncateFssMastVoucherTypes,
    getAllDropdown
};