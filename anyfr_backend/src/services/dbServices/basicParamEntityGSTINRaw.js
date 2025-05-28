const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicParamEntityGSTINRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new GSTIN record (RAW SQL)
  async create({ entity_id, gstin, gstin_name, authorised_signatory, phone, email }) {
    const query = `
      INSERT INTO basic_param_entity_gstin (entity_id, gstin, gstin_name, authorised_signatory, phone, email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;

    const replacements = [entity_id, gstin, gstin_name, authorised_signatory, phone, email];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit GSTIN details
  async edit(id, { gstin, gstin_name, authorised_signatory, phone, email }) {
    const query = `
      UPDATE basic_param_entity_gstin
      SET gstin = $1, gstin_name = $2, authorised_signatory = $3, phone = $4, email = $5
      WHERE id = $6
      RETURNING *`;

    const replacements = [gstin, gstin_name, authorised_signatory, phone, email, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Delete GSTIN record
  async delete(id) {
    const query = `
      DELETE FROM basic_param_entity_gstin
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE
    });

    return result;
  }

  // Get all GSTIN records for a specific entity (Paginated)
  async getAll(entity_id, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, gstin, gstin_name, authorised_signatory, phone, email
      FROM basic_param_entity_gstin
      WHERE entity_id = $1
      ORDER BY id DESC
      LIMIT $2 OFFSET $3`;

    const replacements = [entity_id, limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search GSTIN records by name or GSTIN
  async search(searchTerm) {
    const query = `
      SELECT id, gstin, gstin_name, authorised_signatory, phone, email
      FROM basic_param_entity_gstin
      WHERE gstin ILIKE $1 OR gstin_name ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicParamEntityGSTINRaw;
