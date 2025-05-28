const path = require('path');
const filePath = path.join(__dirname, '../../samplefiles/sample_asset_depn.xlsx');



const excelQueue = require('../../queue/queue');
const UnloadExcelTByBatchId = async (req, res) => {

     try {

        const organisation_id = req.user.org_id; 
        const entity_id =  req.body.entity_id; // This is how you get entity_id;
        const created_by =  req.user.user_id;
        const period_id = req.body.period_id;
        const batch_id = req.body.id;


        // Skip queue if Redis not installed
     await excelQueue.add('processUnLoadTBExcelByBatchId', { organisation_id: organisation_id,
            entity_id: entity_id,
            created_by: created_by,
            period_id: period_id,
            batch_id: batch_id
            });



      
      res.json({
        success: true,
        Page_name: "Loaded",
        message: 'Data is processing it will take a while',
       
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    
}

const loadExcelTByBatchId = async (req, res) => {
    try {

        const organisation_id = req.user.org_id; 
        const entity_id =  req.body.entity_id; // This is how you get entity_id;
        const created_by =  req.user.user_id;
        const period_id = req.body.period_id;
        const batch_id = req.body.id;


        // Skip queue if Redis not installed
     await excelQueue.add('processLoadTBExcelByBatchId', { organisation_id: organisation_id,
            entity_id: entity_id,
            created_by: created_by,
            period_id: period_id,
            batch_id: batch_id
            });



      
      res.json({
        success: true,
        Page_name: "Loaded",
        message: 'Data is processing it will take a while',
       
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const getAllTbDb = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { entity_id, searchFilters = {}, sortOn = '', sortDir = '' } = req.body;
  
      const organisation_id = req.user.org_id;
  
      const result = await req.models.dataTbDbRaw.getAllTbDb(
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



  const getAllTbDbUnloaded = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { entity_id, searchFilters = {}, sortOn = '', sortDir = '' } = req.body;
  
      const organisation_id = req.user.org_id;
  
      const result = await req.models.dataTbDbRaw.getAllTbDbUnloaded(
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
  



const downloadsamplefile = (req, res) => {

res.download(filePath, 'sample_asset_depn.xlsx', (err) => {
  if (err) {
    console.error('Download error:', err);
    res.status(500).json({ message: 'Failed to download file', error: err.message });
  }
});

}





module.exports = {
    getAllTbDb,  
    getAllTbDbUnloaded, 
    downloadsamplefile,
    loadExcelTByBatchId,
    UnloadExcelTByBatchId,
   
};
