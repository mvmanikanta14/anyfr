// Create new entity
const createEntity = async (req, res) => {
    try {
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.user); // Log models to verify if they are present
        // console.log("🔍 Debug: Checking `req.models` inside data.");

        if (req.user == 0 || !req.organisation_id) {
            return res.status(400).json({ error: "  Subscriber ID missing in token." });
        }

        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "  Models not initialized properly." });
        }

          // ✅ Check if `req.models` is correctly set
          if (!req.models || !req.models.basicMasterUsersRaw) {
            return res.status(500).json({ error: "  Models not initialized properly.", models: req.models });
        }

      
        if (typeof req.models.basicMasterUsersRaw.create !== 'function') {
            return res.status(500).json({ error: "  `create` method not found in basicMasterUsersRaw." });
        }


        // const bbasicParamEntitiesRawInstance = new req.models.basicParamEntitiesRaw.constructor(subdomain);
        console.log("✅ Debug: Class instance created successfully");


        const organisation_id = req.user.org_id;

        // Add `organisation_id` to request body before insertion
        const entityData = {
            ...req.body,
            organisation_id
        };


     
    //     const entity = await req.models.basicParamEntitiesRaw.create(req.body);
    //    // res.status(201).json(entity);
    //    res.status(201).json({ status: true, message: "Entities created successfully", data: entity });

    try {
        const entity = await req.models.basicParamEntitiesRaw.create(entityData);
        // const entity = await req.models.basicParamEntitiesRaw.create(req.body);
        return res.status(201).json({ message: "Entity created successfully", entity });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            // Extract the duplicate field from the error object
            const duplicateField = error.errors.map(err => err.path).join(", ");
            return res.status(400).json({
                error: `Duplicate entry: ${duplicateField} already exists.`
            });
        }
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit entity
const editEntity = async (req, res) => {
    try {
        const { id } = req.params; // Extract `id` from URL params
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        // const basicParamEntitiesRawInstance = new req.models.basicParamEntitiesRaw.constructor(subdomain);
        // console.log("✅ Debug: Class instance created successfully");

        // const entity = await req.models.basicParamEntitiesRaw.edit(req.params.id, req.body);
        // res.json(entity);

        try {
            const entity = await req.models.basicParamEntitiesRaw.edit(req.params.id, req.body);
            return res.status(201).json({ message: "Entity created successfully", entity });
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                // Extract the duplicate field from the error object
                const duplicateField = error.errors.map(err => err.path).join(", ");
                return res.status(400).json({
                    error: `Duplicate entry: ${duplicateField} already exists.`
                });
            }
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const editEntityTan = async (req, res) => {
    try {
        const { id } = req.params; // Extract `id` from URL params
        

        try {
            const entity = await req.models.basicParamEntitiesRaw.addTan(req.params.id, req.body);
            return res.status(201).json({ message: "Entity created successfully", entity });
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                // Extract the duplicate field from the error object
                const duplicateField = error.errors.map(err => err.path).join(", ");
                return res.status(400).json({
                    error: `Duplicate entry: ${duplicateField} already exists.`
                });
            }
            return res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete entity
const deleteEntity = async (req, res) => {
    try {
        const { id } = req.params; // Extract `id` from URL params
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        // const basicParamEntitiesRawInstance = new req.models.basicParamEntitiesRaw.constructor(subdomain);
 
        const entity = await req.models.basicParamEntitiesRaw.softDelete(req.params.id);
        res.json(entity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const activeEntity = async (req, res) => {
    try {
        const { id } = req.params; // Extract `id` from URL params
        // const subdomain = getSubdomain(req); // 🔥 Extract subdomain dynamically
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models); // Log models to verify if they are present
        //const { basicParamEntityLocationsRaw } = req.models;
        // const basicParamEntitiesRawInstance = new req.models.basicParamEntitiesRaw.constructor(subdomain);
 
        const entity = await req.models.basicParamEntitiesRaw.softDeleteRemove(req.params.id);

        res.json({
            success: true,
            Page_name: "",
            message: 'Active entity successfully',
            ...entity
        });
        // res.json(entity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// View all entities
const getAllEntities = async (req, res) => {
    try {
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models);

        if (req.user == 0 || !req.organisation_id) {
            return res.status(400).json({ error: "organisation_id ID missing in token." });
        }

        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "  Models not initialized properly." });
        }

        if (!req.models.basicParamEntitiesRaw || typeof req.models.basicParamEntitiesRaw.getAll !== 'function') {
            return res.status(500).json({ error: "  `getAll` method not found in basicParamEntitiesRaw." });
        }

        const { key , value , sortOn ,sortDir} = req.body;

        // Get pagination parameters from request
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Fetch paginated data
         const result = await req.models.basicParamEntitiesRaw.getAll(page, limit , key , value , sortOn ,sortDir);

        // Check if `data` is an array before sending response
        if (!Array.isArray(result.data)) {
            return res.status(500).json({ error: "  Unexpected database response format." });
        }

        res.json({
            success: true,
            message: "Entities fetched successfully",
            Page_name: "Entities",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAllEntities:", err);
        res.status(500).json({ error: err.message });
    }
};

const getAllEntitiMast = async (req, res) => {
    try {
        const result = await req.models.basicParamEntitiesRaw.getAllMaster();
        res.json({
            success: true,
            message: "success",
            Page_name: "Entities",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAllEntities:", err);
        res.status(500).json({ error: err.message });
    }
};

const getAllEntitiesdrop = async (req, res) => {
    try {
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models);

        
        
        // Get pagination parameters from request
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Fetch paginated data
        const result = await req.models.basicParamEntitiesRaw.getAlldropdown(page, limit);

        // Check if `data` is an array before sending response
        if (!Array.isArray(result.data)) {
            return res.status(500).json({ error: "  Unexpected database response format." });
        }

        res.json({
            success: true,
            message: "Entities fetched successfully",
            Page_name: "Entities",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAllEntities:", err);
        res.status(500).json({ error: err.message });
    }
};


const getAllInactiveEntities = async (req, res) => {
    try {
        // console.log("🔍 Debug: Checking `req.models` inside route.");
        // console.log(req.models);

        if (req.user == 0 || !req.organisation_id) {
            return res.status(400).json({ error: "organisation_id ID missing in token." });
        }

        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "  Models not initialized properly." });
        }

        if (!req.models.basicParamEntitiesRaw || typeof req.models.basicParamEntitiesRaw.getAll !== 'function') {
            return res.status(500).json({ error: "  `getAll` method not found in basicParamEntitiesRaw." });
        }

        // Get pagination parameters from request
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Fetch paginated data
        const result = await req.models.basicParamEntitiesRaw.getAllInactive(page, limit);

        // Check if `data` is an array before sending response
        if (!Array.isArray(result.data)) {
            return res.status(500).json({ error: "  Unexpected database response format." });
        }

        res.json({
            success: true,
            Page_name: "Entities",
            message: "Entities fetched successfully",
            ...result
        });
    } catch (err) {
        console.error("  Error in getAllEntities:", err);
        res.status(500).json({ error: err.message });
    }
};


const getEntityById = async (req, res) => {
    try {
         

        if (req.user == 0 || !req.organisation_id) {
            return res.status(400).json({ error: "Subscriber ID missing in token." });
        }
        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "  Models not initialized properly." });
        }

        if (!req.models.basicParamEntitiesRaw || typeof req.models.basicParamEntitiesRaw.getById !== 'function') {
            return res.status(500).json({ error: "  `getById` method not found in basicParamEntitiesRaw." });
        }

        // Extract ID from request params
        const { id } = req.params;

        // Validate ID
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: "  Invalid entity ID." });
        }

        // Fetch entity by ID
        const entity = await req.models.basicParamEntitiesRaw.getById(id);

        if (!entity) {
            return res.status(404).json({ error: "  Entity not found." });
        }

        res.json({
            success: true,
            message: "Entity fetched successfully",
            data: entity
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getModule = async (req, res) => {
    try {
         

        if (req.user == 0 || !req.organisation_id) {
            return res.status(400).json({ error: "Subscriber ID missing in token." });
        }
        if (!req.models || Object.keys(req.models).length === 0) {
            return res.status(500).json({ error: "  Models not initialized properly." });
        }

        if (!req.models.basicParamEntitiesRaw || typeof req.models.basicParamEntitiesRaw.getById !== 'function') {
            return res.status(500).json({ error: "  `getById` method not found in basicParamEntitiesRaw." });
        }
  
        const { entities_id } = req.body; 


         const module = await req.models.basicParamEntitiesRaw.getModule(entities_id);

        if (!module) {
            return res.status(404).json({ error: "  Entity not found." });
        }

        res.json({
            success: true,
            module: "Modules",
            message: " fetched successfully",
            data: module
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Search entities
const searchEntities = async (req, res) => {
    try {
        const { basicParamEntitiesRaw } = req.models;
        const entities = await basicParamEntitiesRaw.search(req.query.query);
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
    getEntityById,
    searchEntities,
    editEntityTan,
    activeEntity,
    getAllInactiveEntities,
    getAllEntitiesdrop,
    getAllEntitiMast,
    getModule
    
};