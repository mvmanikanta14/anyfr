const fssParamOepDaybookRaw = require('../services/dbServices/fssParamOepDaybookRaw');


function validateDebitCreditBalance(records) {
    let debitTotal = 0;
    let creditTotal = 0;
  
    records.forEach(record => {
      const amount = parseFloat(record.amount || 0);
      const crdr = record.cr_dr?.value;
  
      if (crdr === '2') {
        debitTotal += amount;
      } else if (crdr === '1') {
        creditTotal += amount;
      }
    });
  
    const netAmount = debitTotal - creditTotal;
  
    return {
      isValid: netAmount === 0,
      debitTotal,
      creditTotal,
      netAmount
    };
  }

  


const createDaybook = async (req, res) => {


    const result = validateDebitCreditBalance(req.body);

if (!result.isValid) {
  return res.status(400).json({
    error: "Debit and Credit amounts must balance.",
    details: {
      debit: result.debitTotal,
      credit: result.creditTotal,
      difference: result.netAmount
    }
  });
}



    const subdomain = req.subdomain || "default";
    const interUnitModel = new fssParamOepDaybookRaw(subdomain);
    const transaction = await interUnitModel.sequelize.transaction();
  
    try {
      const organisation_id = req.user.org_id;
      const records = req.body;
  
      if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ error: "Invalid input data" });
      }
  
      const detailRecords = records.map(detail => ({
        gl_id: detail.gl_id.value,
        location_id: detail.location_id.value,
        amount: detail.amount,
        cr_dr: detail.cr_dr.value,
        organisation_id,
      }));
  
      const mainRecord = {
        ...records[0],
        organisation_id,
      };
  
      /*const totalAmount = detailRecords.reduce((sum, rec) => sum + parseFloat(rec.amount || 0), 0);
  
      if (totalAmount !== 0) {
        return res.status(400).json({
          error: 'Error',
          details: "New Amount should be Zero"
        });
      }
      */

      const master = await interUnitModel.create(mainRecord, transaction);
      const transId = master[0].id;
      console.log("tid",mainRecord)
  
      if (detailRecords.length > 0) {
        await interUnitModel.bulkCreate(transId, detailRecords, transaction,mainRecord.entity_id,mainRecord.period_id);      }
  
      await transaction.commit();
  
      return res.status(201).json({
        message: "Records created successfully",
        data: { master_id: master.id }
      });
    } catch (error) {
      await transaction.rollback();
  
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
        error: "Internal Server Error",
        details: error.message
      });
    }
  };

 

  const editDaybook = async (req, res) => {

    const result = validateDebitCreditBalance(req.body);

    if (!result.isValid) {
      return res.status(400).json({
        error: "Debit and Credit amounts must balance.",
        details: {
          debit: result.debitTotal,
          credit: result.creditTotal,
          difference: result.netAmount
        }
      });
    }



    const subdomain = req.subdomain || "default";
    const id = req.params.id; 
    const interUnitModel = new fssParamOepDaybookRaw(subdomain);
    const transaction = await interUnitModel.sequelize.transaction();
  
    try {
      const organisation_id = req.user.org_id;
      const records = req.body;
  
      // Validate if records are provided and it's an array
      if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ error: "Invalid input data" });
      }
  
      // Extract main record and detail records
      const detailRecords = records.map(detail => ({
        gl_id: detail.gl_id.value,
        location_id: detail.location_id.value,
        cr_dr: detail.cr_dr.value,
        amount: detail.amount,
        organisation_id,
      }));
  
      const mainRecord = {
        ...records[0], // Extract the first record for the main (master) record
        organisation_id,
      };
  
      /*const totalAmount = detailRecords.reduce(
        (sum, rec) => sum + parseFloat(rec.amount || 0), 0
      );
  
      if (totalAmount !== 0) {
        return res.status(400).json({
          error: 'Error',
          details: "Amount should be Zero"
        });
      }
        */

  
     




      const updated = await interUnitModel.updateMain(mainRecord, transaction,id);
if (!updated || updated.length === 0) {
  return res.status(404).json({
    error: "Record not found",
    details: `No record found with ID: ${mainRecord.id}`
  });
}

await interUnitModel.deleteDetails(id, transaction);

await interUnitModel.bulkCreate(
    id,
  detailRecords,
  transaction,
  mainRecord.entity_id,
  mainRecord.period_id
);


      // Commit the transaction
      await transaction.commit();
  
      return res.status(200).json({
        message: "Records updated successfully",
        data: { master_id: mainRecord.id }
      });
    } catch (error) {
      // Rollback transaction if something goes wrong
      await transaction.rollback();
  
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
        error: "Internal Server Error",
        details: error.message
      });
    }
  };
  



  const getAllDaybook = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { entity_id, period_id } = req.body;
      const organisation_id = req.user.org_id;
      const subdomain = req.subdomain || "default";
  
      // ✅ Instantiate your custom model service class
      const interUnitModel = new fssParamOepDaybookRaw(subdomain);
  
      const result = await interUnitModel.getAll(page, limit, entity_id, organisation_id, period_id);
  
      res.json({
        success: true,
        Page_name: "InterUnit",
        message: 'Fetched successfully',
        ...result
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  // controller.js
const getDaybookById = async (req, res) => {
    try {
      const { id } = req.params;
      const subdomain = req.subdomain || "default";
      const organisation_id = req.user.org_id;
  
      const interUnitModel = new fssParamOepDaybookRaw(subdomain);
  
      // Fetch main record
      const [main] = await interUnitModel.sequelize.query(
        `SELECT *
         FROM fss_tran_oepl_transaction_master
         WHERE id = :id AND organisation_id = :org_id`,
        {
          replacements: { id, org_id: organisation_id },
          type: interUnitModel.sequelize.QueryTypes.SELECT
        }
      );
  
      if (!main) return res.status(404).json({ error: "Transaction not found" });
  
      // Fetch detail records
      const details = await interUnitModel.sequelize.query(
        `SELECT gl_id, location_id, net_amount AS amount,debit_or_credit as cr_dr
         FROM fss_tran_oepl_transaction_values
         WHERE transaction_id = :id`,
        {
          replacements: { id },
          type: interUnitModel.sequelize.QueryTypes.SELECT
        }
      );
  
      return res.json({ main, details });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  const deleteDaybook = async (req, res) => {
    const subdomain = req.subdomain || 'default'; // Adjust as necessary
    const interUnitModel = new fssParamOepDaybookRaw(subdomain);
    const sequelize = interUnitModel.sequelize;
    const t = await sequelize.transaction();
  
    try {
        const transactionId = req.params.id; // Get ID from request params
      //const transactionId = req.params.id; // Get ID from request params
  
      // Step 1: Delete the detail records using raw SQL
      await interUnitModel.deleteDetails(transactionId, t);
  
      // Step 2: Delete the master record using raw SQL
      const [result] = await interUnitModel.deleteMaster(transactionId, t);
  
      // Step 3: If no master record is found, rollback and return 404
      if (!result || result.length === 0) {
        await t.rollback();
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      // Step 4: Commit the transaction if both delete operations are successful
      await t.commit();
      return res.status(200).json({ message: 'Transaction deleted successfully', deletedId: transactionId });
    } catch (err) {
      // Rollback in case of an error
      await t.rollback();
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  };


  

  module.exports = {
    createDaybook,
    editDaybook,
    getAllDaybook,
    getDaybookById,
    deleteDaybook,
  };
  