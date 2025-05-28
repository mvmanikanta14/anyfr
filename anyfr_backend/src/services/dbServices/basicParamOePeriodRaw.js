const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require('../../config/database');
const BasicParamOePeriod = require('../../models/basicParamOePeriodOrm');


class BasicParamOePeriodRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
    this.initializeModels();
  }

  async initializeModels() {
    try {
      this.BasicParamOePeriod = await BasicParamOePeriod(this.sequelize);
       
      console.log('BasicParamOePeriodRaw models initialized.');
    } catch (error) {
      console.error('Error initializing models:', error);
    }
  }

  async create({ organisation_id, entity_id, period_id, period_type, created_by }) {
    try {

      const dataQuery = `
                SELECT * FROM public.basic_param_oe_period
                where entity_id = $1 and period_id = $2
            `;

      const data = await this.sequelize.query(dataQuery, {
        bind: [entity_id, period_id],
        type: Sequelize.QueryTypes.SELECT
      });

      if (data && data.length > 0) {
         console.log('Record already exists:', data);
        // return data;

        return { status: 400, error: 'validation error', details: 'Record already exists' };
      }
      const rec = this.BasicParamOePeriod.build({ organisation_id, entity_id, period_id, period_type, created_by });
      await rec.validate();
      return await rec.save();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const details = error.errors.map(e => ({ column: e.path, message: e.message, value: e.value }));
        return { status: 400, error: 'Validation Error', details };
      }
      console.error('Error in create:', error);
      return { status: 500, error: 'Internal Server Error', details: error.message };
    }
  }

  async edit(id, data) {
    try {
      const rec = await this.BasicParamOePeriod.findByPk(id);
      if (!rec) {
        return { status: 404, error: 'Not Found', details: `OE period with ID ${id} not found` };
      }
       
       
      await rec.update(data);
      return rec;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const details = error.errors.map(e => ({ column: e.path, message: e.message, value: e.value }));
        return { status: 400, error: 'Validation Error', details };
      }
      console.error('Error in edit:', error);
      return { status: 500, error: 'Internal Server Error', details: error.message };
    }
  }

  async softDelete(id) {
    try {
      const result = await this.sequelize.query(
        `UPDATE basic_param_oe_period SET is_active = FALSE WHERE id = $1 RETURNING *`,
        { bind: [id], type: Sequelize.QueryTypes.UPDATE }
      );
      return result[0];
    } catch (error) {
      console.error('Error in softDelete:', error);
      throw error;
    }
  }

  async getAll(page = 1, limit = 500 ) {
    const offset = (page - 1) * limit;
    try {
      const countRes = await this.sequelize.query(
        `SELECT COUNT(*) AS total FROM basic_param_oe_period WHERE is_active = TRUE`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      const total = parseInt(countRes[0].total, 10);
      const data = await this.sequelize.query(
        `SELECT p.*, e.entity_name,e.financial_framework_id, rp.period AS reporting_periods
         FROM basic_param_oe_period p
         LEFT JOIN basic_param_entities e ON p.entity_id = e.id
         LEFT JOIN basic_mast_periods rp ON p.period_id = rp.id
         WHERE p.is_active = TRUE 
         ORDER BY p.id DESC LIMIT $1 OFFSET $2`,
        { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT }
      );
      return { total, page, limit, data };
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getAllbye_id(page = 1, limit = 500 , entity_id) {
    const offset = (page - 1) * limit;
    try {
      const countRes = await this.sequelize.query(
        `SELECT COUNT(*) AS total FROM basic_param_oe_period WHERE is_active = TRUE`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      const total = parseInt(countRes[0].total, 10);
      const data = await this.sequelize.query(
        `SELECT p.*, e.entity_name,e.financial_framework_id, rp.period AS reporting_periods
         FROM basic_param_oe_period p
         LEFT JOIN basic_param_entities e ON p.entity_id = e.id
         LEFT JOIN basic_mast_periods rp ON p.period_id = rp.id
         WHERE p.is_active = TRUE and p.entity_id = $1
         ORDER BY p.id DESC LIMIT $2 OFFSET $3`,
        { bind: [entity_id,limit, offset], type: Sequelize.QueryTypes.SELECT }
      );
      return { total, page, limit, data };
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  

  async getAllInactive(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    try {
      const countRes = await this.sequelize.query(
        `SELECT COUNT(*) AS total FROM basic_param_oe_period WHERE is_active = False`,
        { type: Sequelize.QueryTypes.SELECT }
      );
      const total = parseInt(countRes[0].total, 10);
      const data = await this.sequelize.query(
        `SELECT p.*, e.entity_name,e.financial_framework_id, rp.period AS reporting_periods
         FROM basic_param_oe_period p
         LEFT JOIN basic_param_entities e ON p.entity_id = e.id
         LEFT JOIN basic_mast_periods rp ON p.period_id = rp.id
         WHERE p.is_active = False
         ORDER BY p.id DESC LIMIT $1 OFFSET $2`,
        { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT }
      );
      return { total, page, limit, data };
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const res = await this.sequelize.query(
        `SELECT p.*, e.entity_name, rp.period_type AS reporting_period_type
         FROM basic_param_oe_period p
         LEFT JOIN basic_param_entities e ON p.entity_id = e.id
         LEFT JOIN basic_param_reporting_period rp ON p.period_id = rp.id
         WHERE p.id = $1 AND p.is_active = TRUE LIMIT 1`,
        { bind: [id], type: Sequelize.QueryTypes.SELECT }
      );
      return res[0] || null;
    } catch (error) {
      console.error('Error in getById:', error);
      throw error;
    }
  }
}

module.exports = BasicParamOePeriodRaw;