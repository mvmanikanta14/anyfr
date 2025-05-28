const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssMastUnitsOfMeasurementRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ unit_name, unit_type_id, created_by }) {
        const query = `
            INSERT INTO fss_mast_units_of_measurement (unit_name, unit_type_id, created_by,created_on)
            VALUES ($1, $2, $3,NOW())
            RETURNING *`;
        
        return await this.sequelize.query(query, { bind: [unit_name, unit_type_id, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { unit_name }) {
        const query = `
            UPDATE fss_mast_units_of_measurement
            SET unit_name = $1
            WHERE id = $2
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [unit_name, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_mast_units_of_measurement
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT a.*,b.unit_type_name FROM fss_mast_units_of_measurement a left join fss_mast_unit_types b on b.id = a.unit_type_id
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_mast_units_of_measurement
            WHERE unit_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_mast_units_of_measurement RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssMastUnitsOfMeasurementRaw;
