const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicTranSubscriptionModulesRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new subscription module record (RAW SQL)
  async create({ subscription_id, module_id, is_active, created_by }) {
    const query = `
      INSERT INTO basic_tran_subscription_modules (subscription_id, module_id, is_active, created_by, created_on)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *`;

    const replacements = [subscription_id, module_id, is_active, created_by];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit subscription module details
  async edit(id, { is_active }) {
    const query = `
      UPDATE basic_tran_subscription_modules
      SET is_active = $1
      WHERE id = $2
      RETURNING *`;

    const replacements = [is_active, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete subscription module (Set is_active = false)
  async softDelete(id) {
    const query = `
      UPDATE basic_tran_subscription_modules
      SET is_active = FALSE
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Get all subscription modules (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, subscription_id, module_id, is_active, created_on
      FROM basic_tran_subscription_modules
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search subscription modules by subscription_id or module_id
  async search(searchTerm) {
    const query = `
      SELECT id, subscription_id, module_id, is_active, created_on
      FROM basic_tran_subscription_modules
      WHERE CAST(subscription_id AS TEXT) ILIKE $1 
         OR CAST(module_id AS TEXT) ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicTranSubscriptionModulesRaw;
