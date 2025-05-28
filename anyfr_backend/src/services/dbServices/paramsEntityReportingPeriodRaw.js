const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class ParamsEntityReportingPeriodRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new entity reporting period record (RAW SQL)
  async create({ entity_id, reporting_year, period_name, start_date, end_date }) {
    const query = `
      INSERT INTO params_entity_reporting_period (entity_id, reporting_year, period_name, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;

    const replacements = [entity_id, reporting_year, period_name, start_date, end_date];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit entity reporting period record
  async edit(id, { reporting_year, period_name, start_date, end_date }) {
    const query = `
      UPDATE params_entity_reporting_period
      SET reporting_year = $1, period_name = $2, start_date = $3, end_date = $4
      WHERE id = $5
      RETURNING *`;

    const replacements = [reporting_year, period_name, start_date, end_date, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Delete entity reporting period record
  async delete(id) {
    const query = `
      DELETE FROM params_entity_reporting_period
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE
    });

    return result;
  }

  // Get all entity reporting periods (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, entity_id, reporting_year, period_name, start_date, end_date
      FROM params_entity_reporting_period
      ORDER BY reporting_year DESC, start_date DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search entity reporting periods by entity ID or reporting year
  async search(searchTerm) {
    const query = `
      SELECT id, entity_id, reporting_year, period_name, start_date, end_date
      FROM params_entity_reporting_period
      WHERE CAST(entity_id AS TEXT) ILIKE $1 
         OR CAST(reporting_year AS TEXT) ILIKE $1
         OR period_name ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = ParamsEntityReportingPeriodRaw;
