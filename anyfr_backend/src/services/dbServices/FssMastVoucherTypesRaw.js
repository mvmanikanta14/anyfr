const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssMastVoucherTypesRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ voucher_type_name, created_by }) {
        const query = `
            INSERT INTO fss_mast_voucher_types (voucher_type_name, created_by)
            VALUES ($1, $2)
            RETURNING *`;
        
        return await this.sequelize.query(query, { bind: [voucher_type_name, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { voucher_type_name }) {
        const query = `
            UPDATE fss_mast_voucher_types
            SET voucher_type_name = $1
            WHERE id = $2
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [voucher_type_name, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_mast_voucher_types
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM fss_mast_voucher_types
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async getAlldrop() {
         const query = `
            SELECT * FROM fss_mast_voucher_types
            WHERE is_active = TRUE
            oRDER BY id DESC
            `;

        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_mast_voucher_types
            WHERE voucher_type_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_mast_voucher_types RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssMastVoucherTypesRaw;
