const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

class FssMastCoreLineMasterRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ core_master_name, falling_under, polarity, description, created_by }) {
        const query = `
            INSERT INTO fss_mast_core_line_master (core_master_name, falling_under, polarity, description, created_by)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;

        const replacements = [core_master_name, falling_under, polarity, description, created_by];
        return await this.sequelize.query(query, { bind: replacements, type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { core_master_name, polarity, description }) {
        const query = `
            UPDATE fss_mast_core_line_master
            SET core_master_name = $1, polarity = $2, description = $3
            WHERE id = $4
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [core_master_name, polarity, description, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_mast_core_line_master
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM fss_mast_core_line_master
            LIMIT $1 OFFSET $2;
            `;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_mast_core_line_master
            WHERE core_master_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_mast_core_line_master RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
    
}

module.exports = FssMastCoreLineMasterRaw;
