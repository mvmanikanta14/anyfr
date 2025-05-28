/*const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL);

const excelQueue = new Queue('excelQueue', { connection });

module.exports = excelQueue;
*/
const { Queue } = require('bullmq');
const IORedis = require('ioredis');

//const connection = new IORedis(process.env.REDIS_URL);
const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null // Required by BullMQ
});

const excelQueue = new Queue('excelQueue', { connection });

module.exports = excelQueue;
