// Create new entity GSTIN
const createEntityGroup = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present

        // const basicParamEntityGroupsRawInstance = new req.models.basicParamEntityGroupsRaw.constructor(subdomain);
        // console.log("✅ Debug: Class instance created successfully");
     
        const entity = await req.models.basicParamEntityGroupsRaw.create(req.body);
       // res.status(201).json(entity);
       res.status(201).json({ status: true, message: "Record created successfully", data: entity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit entity GSTIN
const editEntityGroup = async (req, res) => {
    try {
        const { basicParamEntityGroupsRaw } = req.models;
        const gstin = await basicParamEntityGroupsRaw.edit(req.params.id, req.body);
        res.json(gstin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete entity GSTIN
const deleteEntityGroup = async (req, res) => {
    try {
        const { basicParamEntityGroupsRaw } = req.models;
        const gstin = await basicParamEntityGroupsRaw.delete(req.params.id);
        res.json(gstin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all entity TANs
const viewAllEntityGroups = async (req, res) => {
    try {
       
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present

        // const basicParamEntityGroupsRawInstance = new req.models.basicParamEntityGroupsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");


        const tans = await req.models.basicParamEntityGroupsRaw.getAll();
        res.json(tans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search entity GSTINs
const searchEntityGroups = async (req, res) => {
    try {
        const { basicParamEntityGroupsRaw } = req.models;
        const gstins = await basicParamEntityGroupsRaw.search(req.query.query);
        res.json(gstins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntityGroup,
    editEntityGroup,
    deleteEntityGroup,
    viewAllEntityGroups,
    searchEntityGroups,
};