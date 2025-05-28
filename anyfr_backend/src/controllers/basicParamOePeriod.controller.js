
const createOePeriod = async (req, res) => {
    try {


        const organisation_id = req.user.org_id;

        const entityData = {
            ...req.body,
            organisation_id
        };

        const newPeriod = await req.models.BasicParamOePeriodRaw.create(entityData);
        if (newPeriod.status && newPeriod.status !== 201) {
            return res.status(newPeriod.status).json({ error: newPeriod.error, details: newPeriod.details });
        }

        return res.status(201).json({ message: "OE Period created successfully", data: newPeriod });
    } catch (error) {
        console.error("Error in createOePeriod:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Edit existing OE Period
const editOePeriod = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };



        const updated = await req.models.BasicParamOePeriodRaw.edit(id, updateData);
        if (updated.status && updated.status !== 200) {
            return res.status(updated.status).json({ error: updated.error, details: updated.details });
        }

        return res.status(200).json({ message: "OE Period updated successfully", data: updated });
    } catch (error) {
        console.error("Error in editOePeriod:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


const getAllOePeriods = async (req, res) => {
    try {
        const { page = 1, limit = 500 } = req.query;


        const result = await req.models.BasicParamOePeriodRaw.getAll(page, limit);

        return res.json({ success: true, Page_name: "OE Periods", message: "OE Periods fetched successfully", ...result });
    } catch (error) {
        console.error("Error in getAllOePeriods:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
// Get all active OE Periods
const getAllOePeriodseid = async (req, res) => {
    try {
        const { page = 1, limit = 500 } = req.query;
        const { entity_id } = req.body;

        // console.log(req.models); // Debugging line

        const result = await req.models.BasicParamOePeriodRaw.getAllbye_id(page, limit, entity_id);

        return res.json({ success: true, Page_name: "OE Periods", message: "OE Periods fetched successfully", ...result });
    } catch (error) {
        console.error("Error in getAllOePeriods:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Get all inactive OE Periods
const getAllOePeriodsInactive = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const { entity_id } = req.body;

        const result = await req.models.BasicParamOePeriodRaw.getAllInactive(page, limit, entity_id);

        return res.json({ success: true, Page_name: "OE Periods (Inactive)", message: "Inactive OE Periods fetched successfully", ...result });
    } catch (error) {
        console.error("Error in getAllOePeriodsInactive:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Get single OE Period by ID
const getOePeriodById = async (req, res) => {
    try {
        const { id } = req.params;
        const period = await req.models.BasicParamOePeriodRaw.getById(id);
        if (!period) {
            return res.status(404).json({ error: "OE Period not found." });
        }
        return res.json({ success: true, message: "OE Period fetched successfully", data: period });
    } catch (error) {
        console.error("Error in getOePeriodById:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Soft delete OE Period
const deleteOePeriod = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await req.models.BasicParamOePeriodRaw.softDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "OE Period not found." });
        }
        return res.json({ message: "OE Period deleted successfully" });
    } catch (error) {
        console.error("Error in deleteOePeriod:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

module.exports = {
    createOePeriod,
    editOePeriod,
    getAllOePeriods,
    getAllOePeriodsInactive,
    getOePeriodById,
    deleteOePeriod,
    getAllOePeriodseid
};
