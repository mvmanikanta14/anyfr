const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class ShareMasterTypeOfSharesRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new share type (RAW SQL)
  async create({ type_of_share_name, created_by }) {
    console.log("INSERT INTO share_master_type_of_shares");

    const query = `
      INSERT INTO share_master_type_of_shares (type_of_share_name, created_by)
      VALUES ($1, $2)
      RETURNING *`;

    const replacements = [type_of_share_name, created_by];

    // 🔍 Log the final SQL query for debugging
    const formattedQuery = query.replace(/\$(\d+)/g, (_, i) => `'${replacements[i - 1]}'`);
    console.log("🛠 RAW SQL QUERY:", formattedQuery);

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit a share type
  async edit(id, { type_of_share_name }) {
    const query = `
      UPDATE share_master_type_of_shares
      SET type_of_share_name = $1
      WHERE id = $2
      RETURNING *`;

    const replacements = [type_of_share_name, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete a share type (mark as inactive)
  async softDelete(id) {
    const query = `
      UPDATE share_master_type_of_shares
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

  // Get all share types (Paginated)
  async getAll(page = 1, limit = 100) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, type_of_share_name, is_active
      FROM share_master_type_of_shares
      ORDER BY created_on DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    console.log(query);

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search share types by name
  async search(searchTerm) {
    const query = `
      SELECT id, type_of_share_name, is_active
      FROM share_master_type_of_shares
      WHERE type_of_share_name ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = ShareMasterTypeOfSharesRaw;
