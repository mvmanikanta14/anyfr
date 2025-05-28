// Create new entity GSTIN
const createEntityGSTIN = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present

        // const basicParamEntityGroupsRawInstance = new req.models.basicParamEntityGSTINRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");
     
        const entity = await req.models.basicParamEntityGSTINRaw.create(req.body);
       // res.status(201).json(entity);
       res.status(201).json({ status: true, message: "Record created successfully", data: entity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit entity GSTIN
const editEntityGSTIN = async (req, res) => {
    try {
        // Validate that both id and body are present
        if (!req.params.id) {
            return res.status(400).json({ error: 'ID parameter is required' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Request body is required' });
        }

        const { basicParamEntityGSTINRaw } = req.models;
        
        // Add logging to debug the values
        console.log('Updating GSTIN with ID:', req.params.id);
        console.log('Update data:', req.body);

        const gstin = await basicParamEntityGSTINRaw.edit(req.params.id, req.body);
        
        if (!gstin) {
            return res.status(404).json({ error: 'GSTIN not found' });
        }

        return res.status(200).json({
            status: true,
            message: "Record updated successfully",
            data: gstin
        });
    } catch (err) {
        console.error('Error updating entity GSTIN:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Delete entity GSTIN
const deleteEntityGSTIN = async (req, res) => {
    try {
        const { basicParamEntityGSTINRaw } = req.models;
        const gstin = await basicParamEntityGSTINRaw.delete(req.params.id);
        res.json(gstin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all entity TANs
const getAllEntitiesGSTINs = async (req, res) => {
    try {       
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present

        // const basicParamEntityGroupsRawInstance = new req.models.basicParamEntityGSTINRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const tans = await req.models.basicParamEntityGSTINRaw.getAll(req.params.entity_id, req.params.page, req.params.limit);
        res.json(tans);
    } catch (err) {
        console.error('Error fetching all entity TANs:', err);
        res.status(500).json({ error: err.message });
    }
};

// Search entity GSTINs
const searchEntitiesGSTINs = async (req, res) => {
    try {
        const { basicParamEntityGSTINRaw } = req.models;
        const gstins = await basicParamEntityGSTINRaw.search(req.query.query);
        res.json(gstins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntityGSTIN,
    editEntityGSTIN,
    deleteEntityGSTIN,
    getAllEntitiesGSTINs,
    searchEntitiesGSTINs
}