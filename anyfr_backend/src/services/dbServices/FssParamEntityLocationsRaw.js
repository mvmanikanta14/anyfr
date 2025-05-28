const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssParamEntityLocationsRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ entity_id, location_name, is_active, created_by }) {
        const query = `
            INSERT INTO fss_param_entity_locations (entity_id, location_name, is_active, created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        
        return await this.sequelize.query(query, { bind: [entity_id, location_name, is_active, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { location_name, is_active }) {
        const query = `
            UPDATE fss_param_entity_locations
            SET location_name = $1, is_active = $2
            WHERE id = $3
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [location_name, is_active, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_param_entity_locations
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM fss_param_entity_locations
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_param_entity_locations
            WHERE location_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_param_entity_locations RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}   

module.exports = FssParamEntityLocationsRaw;
