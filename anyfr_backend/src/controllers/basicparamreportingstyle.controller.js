const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path

// Create new reporting style
const createReportingStyle = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingStyleRawInstance = new req.models.basicParamReportingStyleRaw.constructor(subdomain);
        const style = await basicParamReportingStyleRawInstance.create(req.body);
        return res.status(201).json(style);
    } catch (err) {
        console.error("❌ Error in /create:", err);
        return res.status(500).json({ error: err.message });
    }
};

// Edit reporting style
const editReportingStyle = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingStyleRawInstance = new req.models.basicParamReportingStyleRaw.constructor(subdomain);
        const style = await basicParamReportingStyleRawInstance.edit(req.params.id, req.body);
        return res.json(style);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete reporting style
const deleteReportingStyle = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingStyleRawInstance = new req.models.basicParamReportingStyleRaw.constructor(subdomain);
        const style = await basicParamReportingStyleRawInstance.delete(req.params.id);
        return res.json(style);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// View all reporting styles
const getAllReportingStyles = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingStyleRawInstance = new req.models.basicParamReportingStyleRaw.constructor(subdomain);
        const styles = await basicParamReportingStyleRawInstance.getAll();
        return res.json(styles);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Search reporting styles
const searchReportingStyles = async (req, res) => {
    try {
        const { basicParamReportingStyleRaw } = req.models;
        const styles = await basicParamReportingStyleRaw.search(req.query.query);
        return res.json(styles);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createReportingStyle,
    editReportingStyle,
    deleteReportingStyle,
    getAllReportingStyles,
    searchReportingStyles,
};