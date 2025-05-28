const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../config/database"); // Adjust path if needed

class EntityRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create entity (RAW SQL)
  async create({ entity_name, entity_pan, created_by }) {
    console.log("INSERT TABLE VENKAT 123");

    const query = `
      INSERT INTO basic_param_entities (entity_name, entity_pan, created_by)
      VALUES ($1, $2, $3)
      RETURNING *`;

    const replacements = [entity_name, entity_pan, created_by];

    // 🔍 Log the final SQL query for debugging
    const formattedQuery = query.replace(/\$(\d+)/g, (_, i) => `'${replacements[i - 1]}'`);
    console.log("🛠 RAW SQL QUERY:", formattedQuery);

    const [result] = await this.sequelize.query(query, {
      bind: replacements,  // Use "bind" instead of "replacements" for $1, $2, $3
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit entity
  async edit(id, { entity_name, entity_pan }) {
    const query = `
      UPDATE basic_param_entities
      SET entity_name = $1, entity_pan = $2
      WHERE id = $3
      RETURNING *`;

    const replacements = [entity_name, entity_pan, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete entity
  async softDelete(id) {
    const query = `
      UPDATE basic_param_entities
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

  // Get all entities (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT entity_name, entity_pan, is_active
      FROM basic_param_entities
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search entities
  async search(searchTerm) {
    const query = `
      SELECT entity_name, entity_pan, is_active
      FROM basic_param_entities
      WHERE entity_name ILIKE $1 OR entity_pan ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = EntityRaw;
