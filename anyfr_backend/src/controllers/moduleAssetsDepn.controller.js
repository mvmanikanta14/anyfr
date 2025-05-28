const path = require('path');
const filePath = path.join(__dirname, '../../samplefiles/sample_asset_depn.xlsx');


///const crypto = require('crypto');
///const multer = require('multer');
///const { s3 } = require('../../services/s3Client');
///const excelQueue = require('../../queue'); // BullMQ Queue instance

// Use multer memory storage so we don't save locally
///const upload = multer({ storage: multer.memoryStorage() });

// Excel Upload Controller for Assets Depreciation
/*
const uploadexcelAssetsDepn = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Generate unique key: "assetsDepn/1712345678_abcd1234.xlsx"
    const fileKey = `assetsDepn/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;

    // Upload to DigitalOcean Spaces
    await s3.putObject({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ACL: 'private',
      ContentType: file.mimetype,
    }).promise();

    // Add job to BullMQ queue
    await excelQueue.add('processAssetsDepnExcel', {
      fileKey,
      module: 'assetsDepn'
    });

    return res.status(201).json({
      message: 'File uploaded and processing started',
      fileKey,
    });
  } catch (error) {
    console.error('Upload Error:', error);

    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
};
*/




const createAssetsDepn = async (req, res) => {
    try {
        const organisation_id = req.user.org_id; 
        

        const entityData = {
            ...req.body,
            organisation_id
        }; 
        console.log(entityData,"DDDDD")
        const response = await req.models.moduleAssetsDepnRaw.create(entityData);



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


const updateAssetsDepn = async (req, res) => {
    try {
          const id = req.params.id;
        const organisation_id = req.user.org_id; 
        

        const entityData = {
            ...req.body,
            organisation_id
        }; 
        console.log(entityData,"DDDDD")
        const response = await req.models.moduleAssetsDepnRaw.update(id,entityData);



        if (response.status && response.status !== 200) {
            return res.status(response.status).json({
                error: response.error,
                details: response.details
            });
        }

        return res.status(201).json({
            message: 'updated successfully',
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

        const updatedMapping = await req.models.moduleAssetsDepnRaw.edit(updateData, id );
        
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


        const result = await req.models.moduleAssetsDepnRaw.getAll(page, limit, entity_id, organisation_id, key, value, sortOn, sortDir);

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
const getAllAssetsDepn = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { entity_id, searchFilters = {}, sortOn = '', sortDir = '' } = req.body;
  
      const organisation_id = req.user.org_id;
  
      const result = await req.models.moduleAssetsDepnRaw.getAll(
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

        const result = await req.models.moduleAssetsDepnRaw.getAllInvesteeTypes();

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



const downloadsamplefile = (req, res) => {

res.download(filePath, 'sample_asset_depn.xlsx', (err) => {
  if (err) {
    console.error('Download error:', err);
    res.status(500).json({ message: 'Failed to download file', error: err.message });
  }
});

}

// Soft delete (deactivate) a mapping


const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await req.models.moduleAssetsDepnRaw.softDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Mapping not found.' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Restore (reactivate) a mapping
const restoreItem = async (req, res) => {
    try {
        const { id } = req.params;
        const restoredMapping = await req.models.moduleAssetsDepnRaw.restore(id);

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

const getAllCategory = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;

        console.log(req.models,"data by madhu")


        const result = await req.models.moduleAssetsDepnRaw.getAllCategory();

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


const getAllBlock = async (req, res) => {
    try {

        const { entity_id } = req.body;

        const organisation_id = req.user.org_id;

        console.log(req.models,"data by madhu")


        const result = await req.models.moduleAssetsDepnRaw.getAllBlock();

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


const getAllSubCategory = async (req, res) => {
    try {
        const { category_id } = req.body;
        const organisation_id = req.user.org_id;

        if (!category_id) {
            return res.status(400).json({ success: false, message: 'category_id is required' });
        }

        const result = await req.models.moduleAssetsDepnRaw.getAllSubCategory(category_id, organisation_id);

        res.json({
            success: true,
            Page_name: "",
            message: 'fetched successfully',
            ...result
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


const getAllMeasurementsTypes = async (req, res) => {
    try {

        const { entity_id } = req.body;
        const organisation_id = req.user.org_id;
        const result = await req.models.moduleAssetsDepnRaw.getAllMeasurementsTypes();
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
   
    getAllCategory,
    getAllSubCategory,
    getAllBlock,
    createAssetsDepn,
    getAllAssetsDepn,
    updateAssetsDepn,
    deleteItem,
    downloadsamplefile,
    //uploadexcelAssetsDepn,
    //uploadExcelMulter: upload.single('excel_file') // Export multer middleware separately
};
