// Create new entity reporting period
const createEntityReportingPeriod = async (req, res) => {
    try {
        const { paramsEntityReportingPeriodRaw } = req.models;
        const period = await paramsEntityReportingPeriodRaw.create(req.body);
        return res.status(201).json(period);
    } catch (err) {
        console.error("❌ Error in /create:", err);
        return res.status(500).json({ error: err.message });
    }
};

// Edit entity reporting period
const editEntityReportingPeriod = async (req, res) => {
    try {
        const { paramsEntityReportingPeriodRaw } = req.models;
        const period = await paramsEntityReportingPeriodRaw.edit(req.params.id, req.body);
        return res.json(period);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete entity reporting period
const deleteEntityReportingPeriod = async (req, res) => {
    try {
        const { paramsEntityReportingPeriodRaw } = req.models;
        const period = await paramsEntityReportingPeriodRaw.delete(req.params.id);
        return res.json(period);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// View all entity reporting periods
const getAllEntityReportingPeriods = async (req, res) => {
    try {
        const { paramsEntityReportingPeriodRaw } = req.models;
        const periods = await paramsEntityReportingPeriodRaw.getAll();
        return res.json(periods);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Search entity reporting periods
const searchEntityReportingPeriods = async (req, res) => {
    try {
        const { paramsEntityReportingPeriodRaw } = req.models;
        const periods = await paramsEntityReportingPeriodRaw.search(req.query.query);
        return res.json(periods);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntityReportingPeriod,
    editEntityReportingPeriod,
    deleteEntityReportingPeriod,
    getAllEntityReportingPeriods,
    searchEntityReportingPeriods,
};