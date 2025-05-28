const { s3 } = require('../../services/s3Client');
const XLSX = require('xlsx');

const ModuledataTbDbRawService = require('../../src/services/dbServices/dataTbDbRaw');
const moduledataTbDbRawService = new ModuledataTbDbRawService(); // Add subdomain if needed


const processTBExcel = async ({ fileKey , organisation_id, entity_id, created_by,period_id,batch_name,location_id,batch_type,is_loaded,tmp_tblname  }) => {
  console.log(`Processing file: ${fileKey}`);

  const s3Data = await s3.getObject({
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: fileKey
  }).promise();

  const workbook = XLSX.read(s3Data.Body, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  //const data = XLSX.utils.sheet_to_json(sheet);
  // Get raw rows including header
const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

// Get cleaned header
const rawHeader = rawData[0];
const cleanedHeader = rawHeader.map(h => (h || '').toString().trim());

// Convert rows to objects using cleaned header
const data = rawData.slice(1).map(row => {
  const obj = {};
  cleanedHeader.forEach((key, i) => {
    obj[key] = row[i];
  });
  return obj;
});

  try {
  await moduledataTbDbRawService.importdata(tmp_tblname, data);
  console.log(`Imported data into ${tmp_tblname}`);
} catch (err) {
  console.error('Importdata failed:', err);
}

try {
  const tbBatchRow = {
    batch_name,
    location_id,
    organisation_id,
    entity_id,
    created_by,
    period_id,
    source_type: 2,
    source_address: 'TB Excel',
    source_data_table: tmp_tblname,
    is_active: true,
    batch_type,
    is_loaded,
    created_on: new Date()
  };

  await moduledataTbDbRawService.createtbbatch(tbBatchRow);
  console.log('Inserted batch:', batch_name || '[no batch]');
} catch (err) {
  console.error('Batch insert failed:', err);
}

  


  console.log(`Finished processing ${data.length} rows`);
};

module.exports = { processTBExcel };
