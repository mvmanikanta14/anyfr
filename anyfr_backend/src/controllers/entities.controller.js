// Create new entity
const createEntity = async (req, res) => {
    try {
        //const entity = await EntitiesRaw.create(req.body);
        const { EntitiesRaw } = req.models; // Assuming you're attaching models to req
        const entity = await EntitiesRaw.create(req.body);

        res.status(201).json(entity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit entity by ID
const editEntity = async (req, res) => {
    try {
        const { EntitiesRaw } = req.models; // Assuming you're attaching models to req
        const entity = await EntitiesRaw.edit(req.params.id, req.body);
        res.json(entity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Soft delete entity
const deleteEntity = async (req, res) => {
    try {
        const { EntitiesRaw } = req.models; // Assuming you're attaching models to req
        const entity = await EntitiesRaw.softDelete(req.params.id);
        res.json(entity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all entities with pagination
const getAllEntities = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;
        const { EntitiesRaw } = req.models; // Assuming you're attaching models to req
        const entities = await EntitiesRaw.getAll(page, limit);
        res.json(entities);
    } catch (err) {
        console.error("❌ Error in /create:", err);
        res.status(500).json({ error: err.message });
    }
};

// Search entities
const searchEntities = async (req, res) => {
    try {
        const { query } = req.query;
        const entities = await EntitiesRaw.search(query);
        res.json(entities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntity,
    editEntity,
    deleteEntity,
    getAllEntities,
    searchEntities
};