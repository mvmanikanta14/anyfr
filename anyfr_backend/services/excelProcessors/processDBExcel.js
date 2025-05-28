const { s3 } = require('../../services/s3Client');
const XLSX = require('xlsx');

//const moduleAssetsDepnRawDBService = require('../../src/services/dbServices/moduleAssetsDepnRaw');
const ModuledataTbDbRawService = require('../../src/services/dbServices/dataTbDbRaw');
const moduledataTbDbRawService = new ModuledataTbDbRawService(); // Add subdomain if needed


//const organisation_id = 2;
//const entity_id = 186;
//const created_by = 3;



const processExcelAssetsDepn = async ({ fileKey ,organisation_id, entity_id, created_by,period_id,batch_name,location_id,batch_type,is_loaded,tmp_tblname   }) => {
  console.log(`Processing file: ${fileKey}`);

  const s3Data = await s3.getObject({
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: fileKey
  }).promise();

  const workbook = XLSX.read(s3Data.Body, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  for (const row of data) {
    console.log('Processing row:', row);
    


    const category_id = await moduleAssetsDepnRawService.getOrCreateCategoryId(row.category);
    const sub_category_id = await moduleAssetsDepnRawService.getOrCreateSubCategoryId(category_id, row.sub_category);
    const block_id = await moduleAssetsDepnRawService.getOrCreateBlockId(row.block);
    /*const location_id = await moduleAssetsDepnRawService.getOrCreateLocationId(
  row.location,
  organisation_id,
  entity_id
);
*/

  const entityData = {
    asset_code: row.asset_code,
    asset_description: row.asset_description,
    category_id: category_id,
    sub_category_id: sub_category_id,
    block_id: block_id,
    purchase_date: row.purchase_date,
    purchase_cost: row.purchase_cost,
    salvage_value: row.salvage_value,
    useful_life: row.useful_life,
    location: row.location,
    remarks: row.remarks,
    organisation_id,
    entity_id,
    created_by
  };
console.log('Processing entityData:', entityData);
  try {
    await moduleAssetsDepnRawService.create(entityData); // Use your DB service
    console.log('Inserted:', entityData.asset_code || '[no code]');
  } catch (err) {
    console.error('Insert failed for:', entityData.asset_code || '[no code]', 'Error:', err.message);
  }
    // Insert into DB logic here
  }

  console.log(`Finished processing ${data.length} rows`);
};

module.exports = { processExcelAssetsDepn };
