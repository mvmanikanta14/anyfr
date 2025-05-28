const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path

// Create new reporting print
const createReportPrint = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingPrintRawInstance = new req.models.basicParamReportingPrintRaw.constructor(subdomain);
        const report = await basicParamReportingPrintRawInstance.create(req.body);
        return res.status(201).json(report);
    } catch (err) {
        console.error("❌ Error in /create:", err);
        return res.status(500).json({ error: err.message });
    }
};

// Edit reporting print
const editReportPrint = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingPrintRawInstance = new req.models.basicParamReportingPrintRaw.constructor(subdomain);
        const report = await basicParamReportingPrintRawInstance.edit(req.params.id, req.body);
        return res.json(report);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete reporting print
const deleteReportPrint = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingPrintRawInstance = new req.models.basicParamReportingPrintRaw.constructor(subdomain);
        const report = await basicParamReportingPrintRawInstance.delete(req.params.id);
        return res.json(report);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// View all reporting prints
const getAllReportPrints = async (req, res) => {
    try {
        const { id } = req.body
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        const basicParamReportingPrintRawInstance = new req.models.basicParamReportingPrintRaw.constructor(subdomain);
        const reports = await basicParamReportingPrintRawInstance.getAll(id);
        return res.json(reports);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
};

// Search reporting prints
const searchReportPrints = async (req, res) => {
    try {
        const { basicParamReportingPrintRaw } = req.models;
        const reports = await basicParamReportingPrintRaw.search(req.query.query);
        return res.json(reports);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createReportPrint,
    editReportPrint,
    deleteReportPrint,
    getAllReportPrints,
    searchReportPrints,
};