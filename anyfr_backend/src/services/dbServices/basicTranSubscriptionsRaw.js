const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicTranSubscriptionsRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new subscription record (RAW SQL)
  async create({ license_id, start_date, end_date, no_of_users, max_mass_storage, max_db_storage, is_active, created_by }) {
    const query = `
      INSERT INTO basic_tran_subscriptions (license_id, start_date, end_date, no_of_users, max_mass_storage, max_db_storage, is_active, created_by, created_on)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING *`;

    const replacements = [license_id, start_date, end_date, no_of_users, max_mass_storage, max_db_storage, is_active, created_by];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit subscription details
  async edit(id, { start_date, end_date, no_of_users, max_mass_storage, max_db_storage, is_active }) {
    const query = `
      UPDATE basic_tran_subscriptions
      SET start_date = $1, end_date = $2, no_of_users = $3, max_mass_storage = $4, max_db_storage = $5, is_active = $6
      WHERE id = $7
      RETURNING *`;

    const replacements = [start_date, end_date, no_of_users, max_mass_storage, max_db_storage, is_active, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete subscription (Set is_active = false)
  async softDelete(id) {
    const query = `
      UPDATE basic_tran_subscriptions
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

  // Get all subscriptions (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, license_id, start_date, end_date, no_of_users, max_mass_storage, max_db_storage, is_active, created_on
      FROM basic_tran_subscriptions
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search subscriptions by license_id
  async search(searchTerm) {
    const query = `
      SELECT id, license_id, start_date, end_date, no_of_users, max_mass_storage, max_db_storage, is_active, created_on
      FROM basic_tran_subscriptions
      WHERE license_id ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicTranSubscriptionsRaw;
