const { getSubdomain } = require('../../subdomainHelper');

const getAllShareFormReconciliation = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormReconciliationRaw) {
            throw new Error("Model ShareFormReconciliationRaw is missing in req.models");
        }

        const ShareFormReconciliationRawInstance = req.models.ShareFormReconciliationRaw;

        const data = await ShareFormReconciliationRawInstance.getAll();
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const createShareFormReconciliation = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormReconciliationRaw) {
            throw new Error("Model ShareFormReconciliationRaw is missing in req.models");
        }

        const { entity_id, created_by } = req.body;

        if (!entity_id || !created_by) {
            return res.status(400).json({ success: false, error: "Missing required fields: entity_id, created_by" });
        }

        const ShareFormReconciliationRawInstance = req.models.ShareFormReconciliationRaw;

        // const predefinedData = [
        //     { particular: "Shares outstanding opening", current_year: "31-03-25", previous_year: "31-03-24" },
        //     { particular: "Shares issued", current_year: "31-03-25", previous_year: "31-03-24" },
        //     { particular: "Shares bought back", current_year: "31-03-25", previous_year: "31-03-24" },
        //     { particular: "Shares outstanding closing", current_year: "31-03-25", previous_year: "31-03-24" }
        // ];
        //
        // const newEntries = [];
        //
        // for (const entry of predefinedData) {
        //     const newEntry = await ShareFormReconciliationRawInstance.create({
        //         particular: entry.particular,
        //         previous_year: entry.previous_year,
        //         previous_year_amt: 0,
        //         previous_year_shares: 0,
        //         current_year: entry.current_year,
        //         current_year_amt: 0,
        //         current_year_shares: 0,
        //         entity_id,
        //         created_by
        //     });
        //     newEntries.push(newEntry);
        // }
        // return  res.json({ success: true, data: newEntries });

        const newEntry = await ShareFormReconciliationRawInstance.create(req.body);

        return  res.json({ success: true, data: newEntry });
    } catch (err) {
        return  res.status(500).json({ success: false, error: err.message });
    }
};



const editShareFormReconciliation = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormReconciliationRaw) {
            throw new Error("Model ShareFormReconciliationRaw is missing in req.models");
        }

        const { id } = req.params;
        const updateFields = req.body;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ success: false, error: "No fields provided for update" });
        }

        const ShareFormReconciliationRawInstance = req.models.ShareFormReconciliationRaw;
        const updatedEntry = await ShareFormReconciliationRawInstance.edit(id, updateFields);

        return  res.json({ success: true, data: updatedEntry });
    } catch (err) {
        return  res.status(500).json({ success: false, error: err.message });
    }
};


const deleteShareFormReconciliation = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormReconciliationRaw) {
            throw new Error("Model ShareFormReconciliationRaw is missing in req.models");
        }

        const { id } = req.params;

        const ShareFormReconciliationRawInstance = req.models.ShareFormReconciliationRaw;
        const deletedEntry = await ShareFormReconciliationRawInstance.softDelete(id);

        return res.json({ success: true, data: deletedEntry });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const searchShareFormReconciliation = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormReconciliationRaw) {
            throw new Error("Model ShareFormReconciliationRaw is missing in req.models");
        }

        const searchResults = await req.models.ShareFormReconciliationRaw.search(req.query.query);
        return res.json({ success: true, data: searchResults });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

const truncateShareFormReconciliation = async (req, res) => {
    try {
        const subdomain = getSubdomain(req);

        if (!req.models || !req.models.ShareFormReconciliationRaw) {
            throw new Error("Model ShareFormReconciliationRaw is missing in req.models");
        }

        const ShareFormReconciliationRawInstance = req.models.ShareFormReconciliationRaw;

        await ShareFormReconciliationRawInstance.truncateData();
        return res.json({ message: " Table truncated successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllShareFormReconciliation,
    createShareFormReconciliation,
    editShareFormReconciliation,
    deleteShareFormReconciliation,
    searchShareFormReconciliation,
    truncateShareFormReconciliation
};