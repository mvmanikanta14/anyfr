const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssParamEntityVouchersRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ entity_id, custom_voucher_name, standard_voucher_id, is_active, created_by }) {
        const query = `
            INSERT INTO fss_param_entity_vouchers (entity_id, custom_voucher_name, standard_voucher_id, is_active, created_by)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`;
        
        return await this.sequelize.query(query, { bind: [entity_id, custom_voucher_name, standard_voucher_id, is_active, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { custom_voucher_name, standard_voucher_id, is_active }) {
        const query = `
            UPDATE fss_param_entity_vouchers
            SET custom_voucher_name = $1, standard_voucher_id = $2, is_active = $3
            WHERE id = $4
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [custom_voucher_name, standard_voucher_id, is_active, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_param_entity_vouchers
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT a.*,b.voucher_type_name FROM fss_param_entity_vouchers a left join fss_mast_voucher_types b on a.standard_voucher_id=b.id
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_param_entity_vouchers
            WHERE custom_voucher_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_param_entity_vouchers RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssParamEntityVouchersRaw;
