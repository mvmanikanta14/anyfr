const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class ParamsEntityGroupDetailsRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new entity group detail record (RAW SQL)
  async create({ group_id, parent_entity_id, child_entity_id, relationship_type }) {
    const query = `
      INSERT INTO params_entity_group_details (group_id, parent_entity_id, child_entity_id, relationship_type)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

    const replacements = [group_id, parent_entity_id, child_entity_id, relationship_type];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit entity group detail record
  async edit(id, { group_id, parent_entity_id, child_entity_id, relationship_type }) {
    const query = `
      UPDATE params_entity_group_details
      SET group_id = $1, parent_entity_id = $2, child_entity_id = $3, relationship_type = $4
      WHERE id = $5
      RETURNING *`;

    const replacements = [group_id, parent_entity_id, child_entity_id, relationship_type, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Delete entity group detail record
  async delete(id) {
    const query = `
      DELETE FROM params_entity_group_details
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE
    });

    return result;
  }

  // Get all entity group details (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, group_id, parent_entity_id, child_entity_id, relationship_type
      FROM params_entity_group_details
      ORDER BY id DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search entity group details by relationship type
  async search(searchTerm) {
    const query = `
      SELECT id, group_id, parent_entity_id, child_entity_id, relationship_type
      FROM params_entity_group_details
      WHERE relationship_type ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = ParamsEntityGroupDetailsRaw;
