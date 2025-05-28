const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path

// Create new subscription framework
const createSubscriptionFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        const basicTranSubscriptionFrameworksRawInstance = new req.models.basicTranSubscriptionFrameworksRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const entity = await basicTranSubscriptionFrameworksRawInstance.create(req.body);
        res.status(201).json({ status: true, message: "created successfully", data: entity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit subscription framework
const editSubscriptionFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        const basicTranSubscriptionFrameworksRawInstance = new req.models.basicTranSubscriptionFrameworksRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const framework = await basicTranSubscriptionFrameworksRawInstance.edit(req.params.id, req.body);
        res.json(framework);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete subscription framework
const deleteSubscriptionFramework = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        const basicTranSubscriptionFrameworksRawInstance = new req.models.basicTranSubscriptionFrameworksRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");
        const framework = await basicTranSubscriptionFrameworksRawInstance.softDelete(req.params.id);
        res.json(framework);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all subscription frameworks
const getAllSubscriptionFrameworks = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        const basicTranSubscriptionFrameworksRawInstance = new req.models.basicTranSubscriptionFrameworksRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const frameworks = await basicTranSubscriptionFrameworksRawInstance.getAll();
        res.json(frameworks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search subscription frameworks
const searchSubscriptionFrameworks = async (req, res) => {
    try {
        const { basicTranSubscriptionFrameworksRaw } = req.models;
        const frameworks = await basicTranSubscriptionFrameworksRaw.search(req.query.query);
        res.json(frameworks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createSubscriptionFramework,
    editSubscriptionFramework,
    deleteSubscriptionFramework,
    getAllSubscriptionFrameworks,
    searchSubscriptionFrameworks,
};