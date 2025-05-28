const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

class ShareFormReconciliationRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ particular, previous_year, previous_year_amt, previous_year_shares, current_year, current_year_amt, current_year_shares, entity_id, created_by }) {
        const query = `
            INSERT INTO share_form_reconciliation (particular, previous_year, previous_year_amt, previous_year_shares, current_year, current_year_amt, current_year_shares, entity_id, created_by, created_on)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [particular, previous_year, previous_year_amt, previous_year_shares, current_year, current_year_amt, current_year_shares, entity_id, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, updateFields) {
        const allowedFields = ["particular", "previous_year", "previous_year_amt", "previous_year_shares", "current_year", "current_year_amt", "current_year_shares"];
        
        // Filter only the fields that are allowed and provided in the request
        const fieldsToUpdate = Object.keys(updateFields).filter(field => allowedFields.includes(field));
    
        if (fieldsToUpdate.length === 0) {
            throw new Error("No valid fields provided for update.");
        }
    
        const setClause = fieldsToUpdate.map((field, index) => `${field} = $${index + 1}`).join(", ");
        const values = fieldsToUpdate.map(field => updateFields[field]);
        values.push(id);
    
        const query = `
            UPDATE share_form_reconciliation
            SET ${setClause}
            WHERE id = $${values.length}
            RETURNING *`;
    
        return await this.sequelize.query(query, { 
            bind: values, 
            type: Sequelize.QueryTypes.UPDATE 
        });
    }
    

    async softDelete(id) {
        const query = `
            DELETE FROM share_form_reconciliation
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.DELETE });
    }

    async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM share_form_reconciliation
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM share_form_reconciliation
            WHERE particular ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }
    async truncateData() {
        const query = `TRUNCATE TABLE share_form_reconciliation RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }

}

module.exports = ShareFormReconciliationRaw;
