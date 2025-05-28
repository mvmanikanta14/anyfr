const { getSubdomain } = require('../../subdomainHelper');

const getAllPpeFormBook = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.PpeFormBookRaw) {
            throw new Error("Model PpeFormBookRaw is missing in req.models");
        }

        const PpeFormBookRawInstance = req.models.PpeFormBookRaw;

        const data = await PpeFormBookRawInstance.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createPpeFormBook = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.PpeFormBookRaw) {
            throw new Error("Model PpeFormBookRaw is missing in req.models");
        }

        const data = req.body;
        const PpeFormBookRawInstance = req.models.PpeFormBookRaw;
        const newEntry = await PpeFormBookRawInstance.create(data);

        res.json({ success: true, data: newEntry });
    } catch (err) {
        console.error("❌ Error in /create:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

const editPpeFormBook = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.PpeFormBookRaw) {
            throw new Error("Model PpeFormBookRaw is missing in req.models");
        }

        const { id } = req.params;
        const data = req.body;

        const PpeFormBookRawInstance = req.models.PpeFormBookRaw;
        const updatedEntry = await PpeFormBookRawInstance.edit(id, data);

        res.json({ success: true, data: updatedEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const deletePpeFormBook = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.PpeFormBookRaw) {
            throw new Error("Model PpeFormBookRaw is missing in req.models");
        }

        const { id } = req.params;

        const PpeFormBookRawInstance = req.models.PpeFormBookRaw;
        const deletedEntry = await PpeFormBookRawInstance.softDelete(id);

        res.json({ success: true, data: deletedEntry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const searchPpeFormBook = async (req, res) => {
    try {
        if (!req.models || !req.models.PpeFormBookRaw) {
            throw new Error("Model PpeFormBookRaw is missing in req.models");
        }

        const searchResults = await req.models.PpeFormBookRaw.search(req.query.query);
        res.json({ success: true, data: searchResults });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    getAllPpeFormBook,
    createPpeFormBook,
    editPpeFormBook,
    deletePpeFormBook,
    searchPpeFormBook,
};