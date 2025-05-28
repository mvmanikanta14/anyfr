const ModuledataTbDbRawService = require('../../src/services/dbServices/dataTbDbRaw');
const moduledataTbDbRawService = new ModuledataTbDbRawService(); // Add subdomain if needed


const processLoadTBExcelByBatchId = async ({organisation_id, entity_id, created_by,period_id,batch_id
     }) => {
 

try {
  //await moduledataTbDbRawService.insertGLsAndValuesFromBatchId( batch_id, entity_id, organisation_id, period_id);
    await moduledataTbDbRawService.insertGLsAndValuesFromBatchId({
  batch_id,
  entity_id,
  organisation_id,
  period_id
});

  console.log('Inserted batch ID:', batch_id || '[no batch]');
} catch (err) {
  console.error('Batch insert failed:', err);
}

  


  console.log(`Finished processing rows`);
};

module.exports = { processLoadTBExcelByBatchId };
