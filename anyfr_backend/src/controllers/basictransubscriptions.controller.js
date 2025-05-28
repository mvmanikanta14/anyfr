const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path

// Create new subscription
const createSubscription = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicTranSubscriptionsRawInstance = new req.models.basicTranSubscriptionsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const subscription = await basicTranSubscriptionsRawInstance.create(req.body);
        return res.status(201).json(subscription);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Edit subscription
const editSubscription = async (req, res) => {
    try {
        const { id } = req.params; // Extract `id` from URL params
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        const basicTranSubscriptionsRawInstance = new req.models.basicTranSubscriptionsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const subscription = await basicTranSubscriptionsRawInstance.edit(req.params.id, req.body);
        return res.json(subscription);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete subscription
const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params; // Extract `id` from URL params
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        const basicTranSubscriptionsRawInstance = new req.models.basicTranSubscriptionsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const subscription = await basicTranSubscriptionsRawInstance.softDelete(req.params.id);
        return res.json(subscription);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// View all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        const basicTranSubscriptionsRawInstance = new req.models.basicTranSubscriptionsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const subscriptions = await basicTranSubscriptionsRawInstance.getAll();
        return res.json(subscriptions);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Search subscriptions
const searchSubscriptions = async (req, res) => {
    try {
        const { basicTranSubscriptionsRaw } = req.models;
        const subscriptions = await basicTranSubscriptionsRaw.search(req.query.query);
        return res.json(subscriptions);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createSubscription,
    editSubscription,
    deleteSubscription,
    getAllSubscriptions,
    searchSubscriptions,
};