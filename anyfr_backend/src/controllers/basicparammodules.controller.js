const createModule = async (req, res) => {
    try {
        const { module_id, entity_id, created_by } = req.body;

             

        const newModule = await req.models.BasicParamModulesRaw.create({ module_id, entity_id, created_by });

        if (newModule.status) {
            return res.status(newModule.status).json(newModule);
        }
        res.status(201).json({ message: 'Module created successfully', newModule });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { entity_id, module_id } = req.body;

        // console.log(req.models); // Log the ID for debugging
        const updated = await req.models.BasicParamModulesRaw.edit(id, { entity_id, module_id });

        if (updated.status) return res.status(updated.status).json(updated);
        res.json({ message: 'Module updated successfully', updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllModules = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const { entity_id } = req.body;

        
        const modules = await req.models.BasicParamModulesRaw.getAll(page, limit , entity_id);


        // console.log('Modules:', modules);


        res.json({ message: 'Modules fetched', modules });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await req.models.BasicParamModulesRaw.getById(id);
        if (!module) return res.status(404).json({ error: 'Module not found' });
        res.json({ module });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteModule = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await req.models.BasicParamModules.softDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Module not found or already deleted' });
        res.json({ message: 'Module deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createModule,
    editModule,
    getAllModules,
    getModuleById,
    deleteModule
};
