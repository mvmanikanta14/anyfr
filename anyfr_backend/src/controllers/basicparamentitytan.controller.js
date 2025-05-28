// Create new entity TAN
const createEntityTAN = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        //
        // const basicParamEntityTANRawInstance = new req.models.basicParamEntityTANRaw.constructor(subdomain);
        // console.log("✅ Debug: Class instance created successfully");

        const entity = await req.models.basicParamEntityTANRaw.create(req.body);
        // res.status(201).json(entity);
        return res.status(201).json({ status: true, message: "Entities created successfully", data: entity });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// Edit entity TAN
const editEntityTAN = async (req, res) => {
    try {
        // const { id } = req.params; // Extract `id` from URL params
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        // //const { basicParamEntityLocationsRaw } = req.models;
        // const basicParamEntityTANRawInstance = new req.models.basicParamEntityTANRaw.constructor(subdomain);
        // console.log("✅ Debug: Class instance created successfully");

        const tan = await req.models.basicParamEntityTANRaw.edit(req.params.id, req.body);
        return res.json(tan);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Delete entity TAN
const deleteEntityTAN = async (req, res) => {
    try {
        // const { id } = req.params; // Extract `id` from URL params
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        // //const { basicParamEntityLocationsRaw } = req.models;
        // const basicParamEntityTANRawInstance = new req.models.basicParamEntityTANRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");
        const tan = await req.models.basicParamEntityTANRaw.delete(req.params.id);
        return res.json(tan);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// View all entity TANs
const getAllEntityTANs = async (req, res) => {
    try {
        const { id } = req.body; // Extract `id` from URL params
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        // const basicParamEntityTANRawInstance = new req.models.basicParamEntityTANRaw.constructor(subdomain);
        // console.log("✅ Debug: Class instance created successfully");
        const tans = await req.models.basicParamEntityTANRaw.getAll(id);
        return res.json(tans);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Search entity TANs
const searchEntityTANs = async (req, res) => {
    try {
        const { basicParamEntityTANRaw } = req.models;
        const tans = await basicParamEntityTANRaw.search(req.query.query);
        return res.json(tans);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntityTAN,
    editEntityTAN,
    deleteEntityTAN,
    getAllEntityTANs,
    searchEntityTANs,
};