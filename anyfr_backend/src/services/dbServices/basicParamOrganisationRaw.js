const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

class BasicParamorganisationRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ name, email }) {
        const organisation_id = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        const query = `
            INSERT INTO basic_mast_organisation (organisation_id, organisation_name, email, created_at)
            VALUES ($1, $2, $3, NOW())
            RETURNING *`;

        return await this.sequelize.query(query, {
            bind: [organisation_id, name, email],
            type: Sequelize.QueryTypes.INSERT
        });
    }

    async getAll() {
        const query = `SELECT * FROM basic_mast_organisation ORDER BY created_at DESC`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
    }

    async delete(id) {
        const query = `DELETE FROM basic_mast_organisation WHERE id = $1 RETURNING *`;
        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.DELETE });
    }
}

module.exports = BasicParamorganisationRaw;
