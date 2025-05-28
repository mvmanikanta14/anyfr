const { getSubdomain } = require('../../subdomainHelper')

// Create new entity location
const createEntityLocation = async (req, res) => {
    try {
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present

        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }

          // ✅ Check if `req.models` is correctly set
          if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
        }

      
        if (typeof req.models.basicMasterUsersRaw.create !== 'function') {
            return res.status(500).json({ error: "❌ `create` method not found in basicMasterUsersRaw." });
        }


        // const basicParamEntityLocationsRawInstance = new req.models.basicParamEntityLocationsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");


     
        const entity = await req.models.basicParamEntityLocationsRaw.create(req.body);
       // res.status(201).json(entity);
       return res.status(201).json({ status: true, message: "Entities created successfully", data: entity });
    } catch (err) {
        console.error("❌ Error in createEntityLocation:", err);
        return res.status(500).json({ error: err.message });
    }
};

// Edit entity location
const editEntityLocation = async (req, res) => {
    try {

        const { id } = req.params; // Extract `id` from URL params
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        const basicParamEntityLocationsRawInstance = new req.models.basicParamEntityLocationsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");



       // const { basicParamEntityLocationsRaw } = req.models;
        const location = await basicParamEntityLocationsRawInstance.edit(req.params.id, req.body);
        res.json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete entity location
const deleteEntityLocation = async (req, res) => {
    try {
        const { id } = req.params; // Extract `id` from URL params
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        const basicParamEntityLocationsRawInstance = new req.models.basicParamEntityLocationsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const location = await basicParamEntityLocationsRawInstance.delete(req.params.id);
        res.json(location);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// View all entity locations
const getAllEntityLocations = async (req, res) => {
    try {
        console.log(req, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        const { id } = req.body; // Extract `id` from URL params
        const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        console.log("🔍 Debug: Checking `req.models` inside route.");
        console.log(req.models); // Log models to verify if they are present

        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "❌ Models not initialized properly." });
        }

            // ✅ Check if `req.models` is correctly set
            if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "❌ Models not initialized properly.", models: req.models });
        }

        
        if (typeof req.models.basicMasterUsersRaw.create !== 'function') {
            return res.status(500).json({ error: "❌ `create` method not found in basicMasterUsersRaw." });
        }

    // ✅ Extract `id` safely

        // const basicParamEntityLocationsRawInstance = new req.models.basicParamEntityLocationsRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");

        const locations = await req.models.basicParamEntityLocationsRaw.getAll(id);
        return res.json(locations);
    } catch (err) {
        console.error("Error in getAllEntityLocations:", err);
        return res.status(500).json({ error: err.message });
    }
};

// Search entity locations
const searchEntityLocations = async (req, res) => {
    try {
        const { basicParamEntityLocationsRaw } = req.models;
        const locations = await basicParamEntityLocationsRaw.search(req.query.query);
        return res.json(locations);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createEntityLocation,
    editEntityLocation,
    deleteEntityLocation,
    getAllEntityLocations,
    searchEntityLocations,
};