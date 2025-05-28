const { getSubdomain } = require('../../subdomainHelper');

const getAllFssParamEntitiesProducts = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntitiesProductsRaw) {
            throw new Error("Model FssParamEntitiesProductsRaw is missing in req.models");
        }

        const FssParamEntitiesProductsRawInstance = req.models.FssParamEntitiesProductsRaw;

        const data = await FssParamEntitiesProductsRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssParamEntitiesProducts = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntitiesProductsRaw) {
            throw new Error("Model FssParamEntitiesProductsRaw is missing in req.models");
        }

        const { entity_id, product_name, unit_of_measurement_id, is_active, created_by } = req.body;
        if (!entity_id || !product_name || !unit_of_measurement_id || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntitiesProductsRawInstance = req.models.FssParamEntitiesProductsRaw;
        const newProduct = await FssParamEntitiesProductsRawInstance.create({ entity_id, product_name, unit_of_measurement_id, is_active, created_by });

        res.json({ success: true, data: newProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Edit Product (PUT)**
const editFssParamEntitiesProducts = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntitiesProductsRaw) {
            throw new Error("Model FssParamEntitiesProductsRaw is missing in req.models");
        }

        const { id } = req.params;
        const { product_name, unit_of_measurement_id, is_active } = req.body;

        if (!product_name  || !unit_of_measurement_id) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParamEntitiesProductsRawInstance = req.models.FssParamEntitiesProductsRaw;
        const updatedProduct = await FssParamEntitiesProductsRawInstance.edit(id, { product_name, unit_of_measurement_id, is_active });

        res.json({ success: true, data: updatedProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Delete Product (Soft Delete)**
const deleteFssParamEntitiesProducts = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntitiesProductsRaw) {
            throw new Error("Model FssParamEntitiesProductsRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssParamEntitiesProductsRawInstance = req.models.FssParamEntitiesProductsRaw;
        const deletedProduct = await FssParamEntitiesProductsRawInstance.softDelete(id);

        res.json({ success: true, data: deletedProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search Product**
const searchFssParamEntitiesProducts = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntitiesProductsRaw) {
            throw new Error("Model FssParamEntitiesProductsRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssParamEntitiesProductsRawInstance = req.models.FssParamEntitiesProductsRaw;
        const searchResults = await FssParamEntitiesProductsRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssParamEntitiesProducts = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParamEntitiesProductsRaw) {
            throw new Error("Model FssParamEntitiesProductsRaw is missing in req.models");
        }

        const FssParamEntitiesProductsRaw = req.models.FssParamEntitiesProductsRaw;

        await FssParamEntitiesProductsRaw.truncateData();
        res.json({ message: "Party Relationship Types table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParamEntitiesProducts,
    createFssParamEntitiesProducts,
    editFssParamEntitiesProducts,
    deleteFssParamEntitiesProducts,
    searchFssParamEntitiesProducts,
    truncateFssParamEntitiesProducts,
};