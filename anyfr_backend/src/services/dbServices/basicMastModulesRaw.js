const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicMastModulesRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new module (RAW SQL)
  async create({ module_name, created_by }) {
    const query = `
      INSERT INTO basic_mast_modules (module_name, created_by)
      VALUES ($1, $2)
      RETURNING *`;

    const replacements = [module_name, created_by];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit module details
  async edit(id, { module_name }) {
    const query = `
      UPDATE basic_mast_modules
      SET module_name = $1
      WHERE id = $2
      RETURNING *`;

    const replacements = [module_name, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete module
  async softDelete(id) {
    const query = `
      UPDATE basic_mast_modules
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

  // Get all modules (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, module_name, is_active
      FROM basic_mast_modules
      ORDER BY id DESC
      `;

    return await this.sequelize.query(query, {
      
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search modules
  async search(searchTerm) {
    const query = `
      SELECT id, module_name, is_active
      FROM basic_mast_modules
      WHERE module_name ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicMastModulesRaw;
