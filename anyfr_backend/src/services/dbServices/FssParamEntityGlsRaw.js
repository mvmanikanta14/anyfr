const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssParamEntityGlsRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ entity_id, gl_name, gl_code, falling_under, mapped_to, is_party, has_subsidiary, is_active, created_by }) {
        const query = `
            INSERT INTO fss_param_entity_gls (entity_id, gl_name, gl_code, falling_under, mapped_to, is_party, has_subsidiary, is_active, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`;
        
        return await this.sequelize.query(query, { bind: [entity_id, gl_name, gl_code, falling_under, mapped_to, is_party, has_subsidiary, is_active, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { gl_name, gl_code, is_party, has_subsidiary, is_active }) {
        const query = `
            UPDATE fss_param_entity_gls
            SET gl_name = $1, gl_code = $2, is_party = $3, has_subsidiary = $4, is_active = $5
            WHERE id = $6
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [gl_name, gl_code, is_party, has_subsidiary, is_active, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_param_entity_gls
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM fss_param_entity_gls
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_param_entity_gls
            WHERE gl_name ILIKE $1 OR gl_code ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_param_entity_gls RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssParamEntityGlsRaw;
