const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicParamEntityTANRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new TAN record (RAW SQL)
  async create({ entity_id, tan_number, concerned_officer }) {
    const query = `
      INSERT INTO basic_param_entity_tan (entity_id, tan_number, concerned_officer)
      VALUES ($1, $2, $3)
      RETURNING *`;

    const replacements = [entity_id, tan_number, concerned_officer];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit TAN details
  async edit(id, { tan_number, concerned_officer }) {
    const query = `
      UPDATE basic_param_entity_tan
      SET tan_number = $1, concerned_officer = $2
      WHERE id = $3
      RETURNING *`;

    const replacements = [tan_number, concerned_officer, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Delete TAN record
  async delete(id) {
    const query = `
      DELETE FROM basic_param_entity_tan
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE
    });

    return result;
  }

  // Get all TAN records for a specific entity (Paginated)
  async getAll(entity_id, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, tan_number, concerned_officer
      FROM basic_param_entity_tan
      WHERE entity_id = $1
      ORDER BY id DESC
      LIMIT $2 OFFSET $3`;

    const replacements = [entity_id, limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search TAN records by number or officer name
  async search(searchTerm) {
    const query = `
      SELECT id, tan_number, concerned_officer
      FROM basic_param_entity_tan
      WHERE tan_number ILIKE $1 OR concerned_officer ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicParamEntityTANRaw;
