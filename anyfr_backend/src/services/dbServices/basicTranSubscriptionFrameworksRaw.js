const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicTranSubscriptionFrameworksRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new subscription framework record (RAW SQL)
  async create({ subscription_id, framework_id, is_active, created_by }) {
    const query = `
      INSERT INTO basic_tran_subscription_frameworks (subscription_id, framework_id, is_active, created_by, created_on)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *`;

    const replacements = [subscription_id, framework_id, is_active, created_by];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit subscription framework details
  async edit(id, { is_active }) {
    const query = `
      UPDATE basic_tran_subscription_frameworks
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

  // Soft delete subscription framework (Set is_active = false)
  async softDelete(id) {
    const query = `
      UPDATE basic_tran_subscription_frameworks
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

  // Get all subscription frameworks (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, subscription_id, framework_id, is_active, created_on
      FROM basic_tran_subscription_frameworks
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search subscription frameworks by subscription_id or framework_id
  async search(searchTerm) {
    const query = `
      SELECT id, subscription_id, framework_id, is_active, created_on
      FROM basic_tran_subscription_frameworks
      WHERE CAST(subscription_id AS TEXT) ILIKE $1 
         OR CAST(framework_id AS TEXT) ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicTranSubscriptionFrameworksRaw;
