const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicParamEntityGroupsRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new entity group (RAW SQL)
  async create({ group_name,is_active, created_by }) {
    const query = `
      INSERT INTO basic_param_entity_groups (group_name,is_active, created_by)
      VALUES ($1, $2,$3)
      RETURNING *`;

    const replacements = [group_name, is_active,created_by];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit entity group details
  async edit(id, { group_name }) {
    const query = `
      UPDATE basic_param_entity_groups
      SET group_name = $1
      WHERE id = $2
      RETURNING *`;

    const replacements = [group_name, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete entity group
  async softDelete(id) {
    const query = `
      UPDATE basic_param_entity_groups
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

  // Get all entity groups (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, group_name, is_active
      FROM basic_param_entity_groups
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search entity groups
  async search(searchTerm) {
    const query = `
      SELECT id, group_name, is_active
      FROM basic_param_entity_groups
      WHERE group_name ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicParamEntityGroupsRaw;
