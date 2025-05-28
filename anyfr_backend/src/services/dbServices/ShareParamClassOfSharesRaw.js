const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class ShareParamClassOfSharesRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  async create({ entity_id, class_of_share_name, created_by, organisation_id , is_active = true , is_approve = false}) {
    const query = `
        INSERT INTO share_param_class_of_share (entity_id,  class_of_share_name, created_by ,organisation_id, is_active, is_approve)
        VALUES ($1, $2, $3, $4 , $5, $6)
        RETURNING *`;

    const replacements = [entity_id, class_of_share_name, created_by, organisation_id , is_active, is_approve];
    return await this.sequelize.query(query, { bind: replacements, type: Sequelize.QueryTypes.INSERT });
  }

  async edit(id, { class_of_share_name }) {
    const query = `
        UPDATE share_param_class_of_share
        SET class_of_share_name = $1
        WHERE id = $2
        RETURNING *`;

    return await this.sequelize.query(query, { bind: [class_of_share_name, id], type: Sequelize.QueryTypes.UPDATE });
  }

  async softDelete(id) {
    const query = `
        UPDATE share_param_class_of_share
        SET is_active = FALSE
        WHERE id = $1
        RETURNING *`;

    return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
  }

  async getAll(page = 1, limit = 10, entity_id, organisation_id) {
    const offset = (page - 1) * limit;

 
    const query = `
        SELECT * FROM share_param_class_of_share where is_active = TRUE and organisation_id = $1 and entity_id = $2
        ORDER BY id DESC
        LIMIT $3 OFFSET $4`;

    const data = await this.sequelize.query(query, { bind: [organisation_id, entity_id, limit, offset], type: Sequelize.QueryTypes.SELECT });

    return { data };
  }

  async search(searchTerm) {
    const query = `
        SELECT * FROM share_param_class_of_share
        WHERE class_of_share_name ILIKE $1`;

    return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
  }
}

module.exports = ShareParamClassOfSharesRaw;