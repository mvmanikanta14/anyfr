const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

class PpeFormBookRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create(data) {
        const query = `
            INSERT INTO ppe_form_book (particular, gb_year_st, gb_addition, gb_deletions, gb_acquisition, gb_change_due, gb_year_end, ad_year_st, ad_year_value, ad_schedule, ad_deletions, ad_year_end, nt_year_end, nt_year_st, entity_id, created_by, created_on)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())
            RETURNING *`;

        return await this.sequelize.query(query, {
            bind: Object.values(data),
            type: Sequelize.QueryTypes.INSERT
        });
    }

    async edit(id, data) {
        const query = `
            UPDATE ppe_form_book
            SET ${Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ')}
            WHERE id = $${Object.keys(data).length + 1}
            RETURNING *`;

        return await this.sequelize.query(query, {
            bind: [...Object.values(data), id],
            type: Sequelize.QueryTypes.UPDATE
        });
    }

    async softDelete(id) {
        const query = `DELETE FROM ppe_form_book WHERE id = $1 RETURNING *`;
        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.DELETE });
    }

    async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM ppe_form_book ORDER BY created_on DESC LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `SELECT * FROM ppe_form_book WHERE particular ILIKE $1`;
        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }
}

module.exports = PpeFormBookRaw;
