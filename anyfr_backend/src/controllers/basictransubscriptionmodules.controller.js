const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path

// Create new subscription module
const createSubscriptionModule = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicTranSubscriptionModulesRawInstance = new req.models.basicTranSubscriptionModulesRaw.constructor(subdomain);
        const module = await basicTranSubscriptionModulesRawInstance.create(req.body);
        res.status(201).json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit subscription module
const editSubscriptionModule = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicTranSubscriptionModulesRawInstance = new req.models.basicTranSubscriptionModulesRaw.constructor(subdomain);

        const module = await basicTranSubscriptionModulesRawInstance.edit(req.params.id, req.body);
        res.json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete subscription module
const deleteSubscriptionModule = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicTranSubscriptionModulesRawInstance = new req.models.basicTranSubscriptionModulesRaw.constructor(subdomain);

        const module = await basicTranSubscriptionModulesRawInstance.softDelete(req.params.id);
        res.json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all subscription modules
const getAllSubscriptionModules = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicTranSubscriptionModulesRawInstance = new req.models.basicTranSubscriptionModulesRaw.constructor(subdomain);
        const modules = await basicTranSubscriptionModulesRawInstance.getAll();
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search subscription modules
const searchSubscriptionModules = async (req, res) => {
    try {
        const { basicTranSubscriptionModulesRaw } = req.models;
        const modules = await basicTranSubscriptionModulesRaw.search(req.query.query);
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createSubscriptionModule,
    editSubscriptionModule,
    deleteSubscriptionModule,
    getAllSubscriptionModules,
    searchSubscriptionModules,
};