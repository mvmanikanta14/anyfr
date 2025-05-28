const { getSubdomain } = require('../../subdomainHelper');

const getAllFssMastPartyRelationshipTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyRelationshipTypesRaw) {
            throw new Error("Model FssMastPartyRelationshipTypesRaw is missing in req.models");
        }

        const FssMastPartyRelationshipTypesRawInstance = req.models.FssMastPartyRelationshipTypesRaw;

        const data = await FssMastPartyRelationshipTypesRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFssMastPartyRelationshipTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyRelationshipTypesRaw) {
            throw new Error("Model FssMastPartyRelationshipTypesRaw is missing in req.models");
        }

        const { relationship_name, created_by } = req.body;
        if (!relationship_name || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastPartyRelationshipTypesRawInstance = req.models.FssMastPartyRelationshipTypesRaw;
        const newRelationshipType = await FssMastPartyRelationshipTypesRawInstance.create({ relationship_name, created_by });

        res.json({ success: true, data: newRelationshipType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const editFssMastPartyRelationshipTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyRelationshipTypesRaw) {
            throw new Error("Model FssMastPartyRelationshipTypesRaw is missing in req.models");
        }

        const { id } = req.params;
        const { relationship_name } = req.body;

        if (!relationship_name) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const FssMastPartyRelationshipTypesRawInstance = req.models.FssMastPartyRelationshipTypesRaw;
        const updatedRelationshipType = await FssMastPartyRelationshipTypesRawInstance.edit(id, { relationship_name });

        res.json({ success: true, data: updatedRelationshipType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deleteFssMastPartyRelationshipTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyRelationshipTypesRaw) {
            throw new Error("Model FssMastPartyRelationshipTypesRaw is missing in req.models");
        }

        const { id } = req.params;

        const FssMastPartyRelationshipTypesRawInstance = req.models.FssMastPartyRelationshipTypesRaw;
        const deletedRelationshipType = await FssMastPartyRelationshipTypesRawInstance.softDelete(id);

        res.json({ success: true, data: deletedRelationshipType });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchFssMastPartyRelationshipTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyRelationshipTypesRaw) {
            throw new Error("Model FssMastPartyRelationshipTypesRaw is missing in req.models");
        }

        // const { term } = req.query;
        //
        // if (!term) {
        //     return res.status(400).json({ success: false, error: "Search term is required" });
        // }

        const FssMastPartyRelationshipTypesRawInstance = req.models.FssMastPartyRelationshipTypesRaw;
        const searchResults = await FssMastPartyRelationshipTypesRawInstance.search(req.query.query);

        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const truncateFssMastPartyRelationshipTypes = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.FssMastPartyRelationshipTypesRaw) {
            throw new Error("Model FssMastPartyRelationshipTypesRaw is missing in req.models");
        }

        const FssMastPartyRelationshipTypesRawInstance = req.models.FssMastPartyRelationshipTypesRaw;

        await FssMastPartyRelationshipTypesRawInstance.truncateData();
        res.json({ message: "Party Relationship Types table truncated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFssMastPartyRelationshipTypes,
    createFssMastPartyRelationshipTypes,
    editFssMastPartyRelationshipTypes,
    deleteFssMastPartyRelationshipTypes,
    searchFssMastPartyRelationshipTypes,
    truncateFssMastPartyRelationshipTypes,
};