/*const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const { processExcelAssetsDepn } = require('../../services/excelProcessors/processExcelAssetsDepn');

// Redis connection
const connection = new IORedis(process.env.REDIS_URL);

// Register Worker on 'excelQueue'
const worker = new Worker('excelQueue', async (job) => {
  if (job.name === 'processAssetsDepnExcel') {
    await processExcelAssetsDepn(job.data);
  }
}, { connection });

// Optional logging
worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});
*/
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });



const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const { processExcelAssetsDepn } = require('../../services/excelProcessors/processExcelAssetsDepn');
const { processTBExcel } = require('../../services/excelProcessors/processTBExcel');
const { processLoadTBExcelByBatchId } = require('../../services/excelProcessors/processLoadTBExcelByBatchId');
const { processUnLoadTBExcelByBatchId } = require('../../services/excelProcessors/processUnLoadTBExcelByBatchId');
const { processDBExcel } = require('../../services/excelProcessors/processDBExcel');

// Redis connection
//const connection = new IORedis(process.env.REDIS_URL);
// Reuse the same Redis connection config with `maxRetriesPerRequest: null`
const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

// Register Worker on 'excelQueue'
const worker = new Worker('excelQueue', async (job) => {
  if (job.name === 'processAssetsDepnExcel') {
    await processExcelAssetsDepn(job.data);
  }
  else if (job.name === 'processTBExcel') {
    await processTBExcel(job.data);
  }
  else if (job.name === 'processLoadTBExcelByBatchId') {
    await processLoadTBExcelByBatchId(job.data);
  }
  else if (job.name === 'processUnLoadTBExcelByBatchId') {
    await processUnLoadTBExcelByBatchId(job.data);
  }
  else if (job.name === 'processDBExcel') {
    await processDBExcel(job.data);
  }

  




}, { connection });

// Optional logging
worker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});
