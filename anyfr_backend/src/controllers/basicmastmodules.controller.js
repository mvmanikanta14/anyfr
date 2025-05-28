const modules = require("../dummyjson/modules");

// Create new module
const createModule = async (req, res) => {
    try {
        const { basicMastModulesRaw } = req.models;
        const module = await basicMastModulesRaw.create(req.body);
        res.status(201).json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit module
const updateModule = async (req, res) => {
    try {
        const { basicMastModulesRaw } = req.models;
        const module = await basicMastModulesRaw.edit(req.params.id, req.body);
        res.json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete module
const deleteModule = async (req, res) => {
    try {
        const { basicMastModulesRaw } = req.models;
        const module = await basicMastModulesRaw.softDelete(req.params.id);
        res.json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all modules
const getAllModule = async (req, res) => {
    try {
        const { basicMastModulesRaw } = req.models;
        const modules = await basicMastModulesRaw.getAll();
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search modules
const searchModule = async (req, res) => {
    try {
        const { basicMastModulesRaw } = req.models;
        const modules = await basicMastModulesRaw.search(req.query.query);
        res.json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module. exports = {
    createModule,
    updateModule,
    deleteModule,
    getAllModule,
    searchModule
};