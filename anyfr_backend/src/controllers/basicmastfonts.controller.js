// Create a new font
const fontCreate = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req);
        // const models = await initModels(subdomain);
        const font = await req.models.basicmastfontsRaw.create(req.body);
        res.status(201).json({ message: "Font created successfully", data: font });
    } catch (err) {
        console.error('Error creating font:', err);
        res.status(500).json({ error: err.message });
    }
};

// Update an existing font
const fontUpdate = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req);
        // const models = await initModels(subdomain);
        const updatedFont = await req.models.basicmastfontsRaw.update(req.params.id, req.body);
        res.json({ message: "Font updated successfully", data: updatedFont });
    } catch (err) {
        console.error('Error updating font:', err);
        res.status(500).json({ error: err.message });
    }
};

// Delete a font
const fontDelete = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req);
        // const models = await initModels(subdomain);
        const deletedFont = await req.models.basicmastfontsRaw.delete(req.params.id);
        res.json({ message: "Font deleted successfully", data: deletedFont });
    } catch (err) {
        console.error('Error deleting font:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get all fonts
const fontGetAll = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req);
        // const models = await initModels(subdomain);
        console.log(req.models);
        const fonts = await req.models.basicmastfontsRaw.getAll();
        res.json({ message: "Fonts retrieved successfully", data: fonts });
    } catch (err) {
        console.error('Error fetching fonts:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get a font by ID
const fontGetById = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req);
        // const models = await initModels(subdomain);
        const font = await req.models.basicmastfontsRaw.getById(req.params.id);
        if (!font) {
            return res.status(404).json({ message: "Font not found" });
        }
        res.json({ message: "Font retrieved successfully", data: font });
    } catch (err) {
        console.error('Error fetching font by ID:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    fontCreate,
    fontUpdate,
    fontDelete,
    fontGetAll,
    fontGetById
};