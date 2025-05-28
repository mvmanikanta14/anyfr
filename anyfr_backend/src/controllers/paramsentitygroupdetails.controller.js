const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path

// Create new entity group detail
const createEntityGroupDetail = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const paramsEntityGroupDetailsRawInstance = new req.models.paramsEntityGroupDetailsRaw.constructor(subdomain);
        const groupDetail = await paramsEntityGroupDetailsRawInstance.create(req.body);
        res.status(201).json(groupDetail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit entity group detail
const editEntityGroupDetail = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const paramsEntityGroupDetailsRawInstance = new req.models.paramsEntityGroupDetailsRaw.constructor(subdomain);
        const groupDetail = await paramsEntityGroupDetailsRawInstance.edit(req.params.id, req.body);
        res.json(groupDetail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete entity group detail
const deleteEntityGroupDetail = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const paramsEntityGroupDetailsRawInstance = new req.models.paramsEntityGroupDetailsRaw.constructor(subdomain);
        const groupDetail = await paramsEntityGroupDetailsRawInstance.delete(req.params.id);
        res.json(groupDetail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all entity group details
const getAllEntityGroupDetails = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const paramsEntityGroupDetailsRawInstance = new req.models.paramsEntityGroupDetailsRaw.constructor(subdomain);
        const groupDetails = await paramsEntityGroupDetailsRawInstance.getAll();
        res.json(groupDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search entity group details
const searchEntityGroupDetails = async (req, res) => {
    try {
        const { paramsEntityGroupDetailsRaw } = req.models;
        const groupDetails = await paramsEntityGroupDetailsRaw.search(req.query.query);
        res.json(groupDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntityGroupDetail,
    editEntityGroupDetail,
    deleteEntityGroupDetail,
    getAllEntityGroupDetails,
    searchEntityGroupDetails
};