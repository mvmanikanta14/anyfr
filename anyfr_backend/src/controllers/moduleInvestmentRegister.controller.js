
const createInvestmentRegister = async (req, res) => {
    try {
        const organisation_id = req.user.org_id; 

        const entityData = {
            ...req.body,
            organisation_id
        }; 
        const response = await req.models.moduleInvestmentRegisterRaw.create(entityData);



        if (response.status && response.status !== 200) {
            return res.status(response.status).json({
                error: response.error,
                details: response.details
            });
        }

        return res.status(201).json({
            message: 'created successfully',
            response
        });
    } catch (error) {

        if (error.errors && Array.isArray(error.errors)) {
            const formattedErrors = error.errors.map(err => ({
                column: err.path,
                message: err.message,
                value: err.value
            }));
            return res.status(400).json({
                error: "Validation Error",
                details: formattedErrors
            });
        }
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
};


const editInvestmentRegister = async (req, res) => {
    try {
        const id = req.params.id;

        const organisation_id = req.user.org_id;
 
        
        const updateData = {
            ...req.body,
            organisation_id
            
        };

        const updatedMapping = await req.models.moduleInvestmentRegisterRaw.edit(updateData, id );
        
        if (updatedMapping.status && updatedMapping.status !== 200) {
            return res.status(updatedMapping.status).json({
                error: updatedMapping.error,
                details: updatedMapping.details
            });
        }

        
        return res.status(200).json({
            message: 'Updated successfully',
            updatedMapping
        });
    } catch (error) {
        if (error.errors && Array.isArray(error.errors)) {
            const formattedErrors = error.errors.map((err) => ({
                column: err.path,
                message: err.message,
                value: err.value
            }));
            return res.status(400).json({
                error: 'Validation Error',
                details: formattedErrors
            });
        }
        console.error("Error editing mapping:", error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
};


/*
const getAllRegisters = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;
        const { entity_id , key , value , sortOn ,sortDir} = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.moduleInvestmentRegisterRaw.getAll(page, limit, entity_id, organisation_id, key, value, sortOn, sortDir);

        res.json({
            success: true,
            Page_name: "Investment Register",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
*/
const getAllRegisters = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { entity_id, searchFilters = {}, sortOn = '', sortDir = '' } = req.body;
  
      const organisation_id = req.user.org_id;
  
      const result = await req.models.moduleInvestmentRegisterRaw.getAll(
        page,
        limit,
        entity_id,
        organisation_id,
        searchFilters,
        sortOn,
        sortDir
      );
  
      res.json({
        success: true,
        Page_name: "Investment Register",
        message: 'fetched successfully',
        ...result
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  

// code for getting investee types dropdown
const getAllInvesteeTypes = async (req, res) => {
    try { 

        const result = await req.models.moduleInvestmentRegisterRaw.getAllInvesteeTypes();

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};




const getAllDropdown = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOEMappingGlFsliRaw.getAllDropdown( entity_id, organisation_id);

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllInactiveMappings = async (req, res) => {
    try {
        const { page = 1, limit = 10  } = req.query;

        const { entity_id , key , value , sortOn ,sortDir} = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOEMappingGlFsliRaw.getAllInactive(page, limit, entity_id, organisation_id, key, value, sortOn, sortDir);

        res.json({
            success: true,
            Page_name: "Chart of Accounts",
            message: 'Inactive mappings fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get mapping by ID
const getMappingById = async (req, res) => {
    try {
        const { id } = req.params;
        const mapping = await req.models.FssParamOEMappingGlFsliRaw.getById(id);

        if (!mapping) {
            return res.status(404).json({ error: 'Mapping not found.' });
        }

        res.json({
            success: true,
            message: 'Mapping fetched successfully',
            data: mapping
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Soft delete (deactivate) a mapping
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await req.models.moduleInvestmentRegisterRaw.softDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Mapping not found.' });
        }

        res.json({ message: 'Mapping deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Restore (reactivate) a mapping
const restoreItem = async (req, res) => {
    try {
        const { id } = req.params;
        const restoredMapping = await req.models.moduleInvestmentRegisterRaw.restore(id);

        if (!restoredMapping) {
            return res.status(404).json({ error: 'Mapping not found or cannot be restored.' });
        }

        res.json({ message: 'Mapping restored successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const searchfsli = async (req, res) => {
    try {
  

        const { key , value , sortOn ,sortDir } = req.body;

        const data = await req.models.FssParamOEMappingGlFsliRaw.searchdata(key , value ,sortOn ,sortDir );
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const bulkfsli = async (req, res) => {
    try {
        const organisation_id = req.user.org_id;

        console.log('Bulk data:', req.body); // Debugging line
        const Data = {
            ...req.body,
            organisation_id
        };

        const updatedData = await req.models.FssParamOEMappingGlFsliRaw.bulkUpdate(Data);

        return res.status(200).json({ message: "updated successfully", updatedData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllfssview = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;

        const result = await req.models.FssParamOEMappingGlFsliRaw.getAllfssview(entity_id, organisation_id);

        res.json({
            success: true,
            Page_name: "Chart of Accounts",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllgroupview = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;

        const result = await req.models.FssParamOEMappingGlFsliRaw.getAllgroupview(entity_id, organisation_id);

        res.json({
            success: true,
            Page_name: "group view",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getAllmapid = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;

        const { entity_id , map_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOEMappingGlFsliRaw.getAllbymapid(page, limit, entity_id, organisation_id , map_id);

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllgroupid = async (req, res) => {
    try {

        

        const { entity_id , map_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.FssParamOEMappingGlFsliRaw.getAllgroupbyid(entity_id, organisation_id , map_id);

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllInstruementsTypes = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;


        const result = await req.models.moduleInvestmentRegisterRaw.getAllInstruementsTypes();

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllMeasurementsTypes = async (req, res) => {
    try {

        const { entity_id } = req.body;
        const organisation_id = req.user.org_id;
        const result = await req.models.moduleInvestmentRegisterRaw.getAllMeasurementsTypes();
        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createInvestmentRegister,
    editInvestmentRegister,
    getAllRegisters,
    getAllInvesteeTypes,
    getMappingById,
    deleteItem,
    getAllInactiveMappings,
    restoreItem,
    searchfsli,
    bulkfsli,
    getAllfssview,
    getAllgroupview,
    getAllmapid,
    getAllgroupid,
    getAllDropdown,
    getAllInstruementsTypes,
    getAllMeasurementsTypes
};
