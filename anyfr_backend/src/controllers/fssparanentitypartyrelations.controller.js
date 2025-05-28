const {getSubdomain} = require("../../subdomainHelper");

const getAllFssParanEntityPartyRelations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParanEntityPartyRelationsRaw) {
            throw new Error("Model FssParanEntityPartyRelationsRaw is missing in req.models");
        }

        const FssParanEntityPartyRelationsRawInstance = req.models.FssParanEntityPartyRelationsRaw;

        const data = await FssParanEntityPartyRelationsRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssParanEntityPartyRelations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParanEntityPartyRelationsRaw) {
            throw new Error("Model FssParanEntityPartyRelationsRaw is missing in req.models");
        }

        const { entity_id, party_id, relationship_type_id, relation_start_date, relation_end_date, remarks, is_active, created_by } = req.body;
        if (!entity_id || !party_id || !relationship_type_id || !relation_start_date || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssParanEntityPartyRelationsRawInstance = req.models.FssParanEntityPartyRelationsRaw;
        const newRelation = await FssParanEntityPartyRelationsRawInstance.create({ entity_id, party_id, relationship_type_id, relation_start_date, relation_end_date, remarks, is_active, created_by });

        res.json({ success: true, data: newRelation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Edit Party Relation (PUT)**
const editFssParanEntityPartyRelations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParanEntityPartyRelationsRaw) {
            throw new Error("Model FssParanEntityPartyRelationsRaw is missing in req.models");
        }

        const { id } = req.parans;
        const { relation_end_date, remarks, is_active } = req.body;

        const FssParanEntityPartyRelationsRawInstance = req.models.FssParanEntityPartyRelationsRaw;
        const updatedRelation = await FssParanEntityPartyRelationsRawInstance.edit(id, { relation_end_date, remarks, is_active });

        res.json({ success: true, data: updatedRelation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Delete Party Relation (Soft Delete)**
const deleteFssParanEntityPartyRelations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParanEntityPartyRelationsRaw) {
            throw new Error("Model FssParanEntityPartyRelationsRaw is missing in req.models");
        }

        const { id } = req.parans;

        const FssParanEntityPartyRelationsRawInstance = req.models.FssParanEntityPartyRelationsRaw;
        const deletedRelation = await FssParanEntityPartyRelationsRawInstance.softDelete(id);

        res.json({ success: true, data: deletedRelation });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 🔹 **Search Party Relation**
const searchFssParanEntityPartyRelations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParanEntityPartyRelationsRaw) {
            throw new Error("Model FssParanEntityPartyRelationsRaw is missing in req.models");
        }

        const { term } = req.query;

        if (!term) {
            return res.status(400).json({ success: false, error: "Search term is required" });
        }

        const FssParanEntityPartyRelationsRawInstance = req.models.FssParanEntityPartyRelationsRaw;
        const searchResults = await FssParanEntityPartyRelationsRawInstance.search(term);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssParanEntityPartyRelations = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssParanEntityPartyRelationsRaw) {
            throw new Error("Model FssParanEntityPartyRelationsRaw is missing in req.models");
        }

        const FssParanEntityPartyRelationsRaw = req.models.FssParanEntityPartyRelationsRaw;

        await FssParanEntityPartyRelationsRaw.truncateData();
        res.json({ message: " Table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssParanEntityPartyRelations,
    createFssParanEntityPartyRelations,
    editFssParanEntityPartyRelations,
    deleteFssParanEntityPartyRelations,
    searchFssParanEntityPartyRelations,
    truncateFssParanEntityPartyRelations,
};