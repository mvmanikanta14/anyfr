const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class ShareParamModeOfIssuesRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new mode of issue (RAW SQL)
  async create({ mode_of_issue_name, created_by }) {
    console.log("INSERT INTO share_param_mode_of_issues");

    const query = `
      INSERT INTO share_param_mode_of_issues (mode_of_issue_name, created_by)
      VALUES ($1, $2)
      RETURNING *`;

    const replacements = [mode_of_issue_name, created_by];

    // 🔍 Log the final SQL query for debugging
    const formattedQuery = query.replace(/\$(\d+)/g, (_, i) => `'${replacements[i - 1]}'`);
    console.log("🛠 RAW SQL QUERY:", formattedQuery);

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit a mode of issue
  async edit(id, { mode_of_issue_name }) {
    const query = `
      UPDATE share_param_mode_of_issues
      SET mode_of_issue_name = $1
      WHERE id = $2
      RETURNING *`;

    const replacements = [mode_of_issue_name, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete a mode of issue (mark as inactive)
  async softDelete(id) {
    const query = `
      UPDATE share_param_mode_of_issues
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

  // Get all modes of issue (Paginated)
  async getAll(page = 1, limit = 100) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, mode_of_issue_name, is_active
      FROM share_param_mode_of_issues
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    console.log(query);

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search modes of issue by name
  async search(searchTerm) {
    const query = `
      SELECT id, mode_of_issue_name, is_active
      FROM share_param_mode_of_issues
      WHERE mode_of_issue_name ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = ShareParamModeOfIssuesRaw;
