const { Sequelize, Op } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

class FssParamOepInterUnitRaw {

  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);    
  }
  
  async create(mainRecord, transaction) {
    const [result] = await this.sequelize.query(
      `INSERT INTO fss_tran_oepl_transaction_master 
       (source_type,transaction_type,entity_id, period_id, created_by, transaction_name, transaction_date, voucher_type, organisation_id)
       VALUES (:source_type,:transaction_type,:entity_id, :period_id, :created_by, :transaction_name, :transaction_date, :voucher_type,:organisation_id)
       RETURNING id`,
      {
        replacements: {
          source_type: 1,
          transaction_type: 1,
          entity_id: mainRecord.entity_id,
          period_id: mainRecord.period_id,
          created_by: mainRecord.created_by,
          transaction_name: mainRecord.TransactionName,
          transaction_date: mainRecord.TransactionDate,
          voucher_type: mainRecord.voucher_type.value,          
          organisation_id: mainRecord.organisation_id
        },
        type: Sequelize.QueryTypes.INSERT,
        transaction
      }
    );
    return result;
  }

  async bulkCreate(transId, detailRecords, transaction,entity_id,period_id) {
    const insertDetailPromises = detailRecords.map(record => {
      return this.sequelize.query(
        `INSERT INTO fss_tran_oepl_transaction_values 
         (transaction_id, gl_id, location_id, net_amount, organisation_id,entity_id,period_id,debit_or_credit)
         VALUES (:transaction_id, :gl_id, :location_id, :amount, :organisation_id,:entity_id,:period_id,:debit_or_credit)`,
        {
          replacements: {
            transaction_id: transId,
            gl_id: record.gl_id,
            location_id: record.location_id,
            amount: record.amount,
            organisation_id: record.organisation_id,
            entity_id: entity_id,
            period_id: period_id,
            debit_or_credit: record.cr_dr,
          },
          type: Sequelize.QueryTypes.INSERT,
          transaction
        }
      );
    });

    await Promise.all(insertDetailPromises);
  }


  // Retrieve all active mappings (Paginated)
  async getAll(page = 1, limit = 10,entity_id, organisation_id, period_id) {
    const offset = (page - 1) * limit;

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM fss_tran_oepl_transaction_master
      WHERE  transaction_type=1 AND  entity_id = $1 AND organisation_id = $2 and period_id = $3`;

    const countResult = await this.sequelize.query(countQuery, {
      bind: [entity_id, organisation_id, period_id],
      type: Sequelize.QueryTypes.SELECT
    });


    const total = countResult?.[0]?.total ?? 0;

    const dataQuery = `
      SELECT *
      FROM fss_tran_oepl_transaction_master
      WHERE  transaction_type=1 AND entity_id = $1 AND organisation_id = $2 and period_id = $3
      ORDER BY created_on DESC
      LIMIT $4 OFFSET $5`;

    const data = await this.sequelize.query(dataQuery, {
      bind: [entity_id, organisation_id,period_id, limit, offset],
      type: Sequelize.QueryTypes.SELECT
    });


    return { total, page, limit, data };
  }


  async updateMain(mainRecord, transaction,id) {
    const [result] = await this.sequelize.query(
      `UPDATE fss_tran_oepl_transaction_master
       SET transaction_name = :transaction_name,
           transaction_date = :transaction_date,
           voucher_type = :voucher_type
       WHERE id = :id 
       RETURNING id`,
      {
        replacements: {
          id: id,
          transaction_name: mainRecord.TransactionName,
          transaction_date: mainRecord.TransactionDate,
          voucher_type: mainRecord.voucher_type.value
        },
        type: Sequelize.QueryTypes.UPDATE,
        transaction
      }
    );
    return result;
  }

  async deleteDetails(transId, transaction) {
    await this.sequelize.query(
      `DELETE FROM fss_tran_oepl_transaction_values
       WHERE transaction_id = :transaction_id`,
      {
        replacements: {
          transaction_id: transId
        },
        type: Sequelize.QueryTypes.DELETE,
        transaction
      }
    );
  }
   // Delete master row using raw query
   async deleteMaster(transactionId, t) {
    return await this.sequelize.query(
      `DELETE FROM fss_tran_oepl_transaction_master WHERE id = :transactionId RETURNING id`,
      {
        replacements: { transactionId },
        type: Sequelize.QueryTypes.DELETE,
        transaction: t,
      }
    );
  }


  
}
module.exports = FssParamOepInterUnitRaw;
