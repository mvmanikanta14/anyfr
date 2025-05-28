const { getSubdomain } = require('../../subdomainHelper');

const getAllFssParamEntityVouchers = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityVouchersRaw) {
            throw new Error("Model FssParamEntityVouchersRaw is missing in req.models");
        }

        const FssParamEntityVouchersRawInstance = req.models.FssParamEntityVouchersRaw;

        const data = await FssParamEntityVouchersRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssParamEntityVouchers = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityVouchersRaw) {
            throw new Error("Model FssParamEntityVouchersRaw is missing in req.models");
        }

        const { entity_id, custom_voucher_name, standard_voucher_id, is_active, created_by } = req.body;
        if (!entity_id || !custom_voucher_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityVouchersRawInstance = req.models.FssParamEntityVouchersRaw;
        const newVoucher = await FssParamEntityVouchersRawInstance.create({ entity_id, custom_voucher_name, standard_voucher_id, is_active, created_by });

        res.json({ success: true, data: newVoucher });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Edit Voucher (PUT)**
const editFssParamEntityVouchers = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityVouchersRaw) {
            throw new Error("Model FssParamEntityVouchersRaw is missing in req.models");
        }

        const { id } = req.params;
        const { custom_voucher_name, standard_voucher_id, is_active } = req.body;

        if (!custom_voucher_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntityVouchersRawInstance = req.models.FssParamEntityVouchersRaw;
        const updatedVoucher = await FssParamEntityVouchersRawInstance.edit(id, { custom_voucher_name, standard_voucher_id, is_active });

        res.json({ success: true, data: updatedVoucher });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Delete Voucher (Soft Delete)**
const deleteFssParamEntityVouchers = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityVouchersRaw) {
            throw new Error("Model FssParamEntityVouchersRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssParamEntityVouchersRawInstance = req.models.FssParamEntityVouchersRaw;
        const deletedVoucher = await FssParamEntityVouchersRawInstance.softDelete(id);

        res.json({ success: true, data: deletedVoucher });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search Voucher**
const searchFssParamEntityVouchers = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityVouchersRaw) {
            throw new Error("Model FssParamEntityVouchersRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssParamEntityVouchersRawInstance = req.models.FssParamEntityVouchersRaw;
        const searchResults = await FssParamEntityVouchersRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssParamEntityVouchers = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntityVouchersRaw) {
            throw new Error("Model FssParamEntityTransactionNatureRaw is missing in req.models");
        }

        const FssParamEntityVouchersRaw = req.models.FssParamEntityVouchersRaw;

        await FssParamEntityVouchersRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParamEntityVouchers,
    createFssParamEntityVouchers,
    editFssParamEntityVouchers,
    deleteFssParamEntityVouchers,
    searchFssParamEntityVouchers,
    truncateFssParamEntityVouchers,
};