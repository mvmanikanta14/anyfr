const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssParamEntitiesProductsRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ entity_id, product_name, unit_of_measurement_id, is_active, created_by }) {

        let unit_type_id = null;
    
        if (unit_of_measurement_id) {
            const query1 = `
                SELECT unit_type_id FROM fss_mast_units_of_measurement 
                WHERE id = $1 
                ORDER BY created_on DESC 
                LIMIT 1
            `;
    
            const [result1] = await this.sequelize.query(query1, { 
                bind: [unit_of_measurement_id], 
                type: Sequelize.QueryTypes.SELECT 
            });
    
            unit_type_id = result1 ? result1.unit_type_id : null; // Ensure framework_id is assigned
        }
    
        // console.log(unit_type_id);
        const query = `
            INSERT INTO fss_param_entities_products (entity_id, product_name, unit_type_id, unit_of_measurement_id, is_active, created_by)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`;
        
        return await this.sequelize.query(query, { bind: [entity_id, product_name, unit_type_id, unit_of_measurement_id, is_active, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { product_name, unit_of_measurement_id, is_active }) {

        let unit_type_id = null;
    
        // console.log(framework_id, "dataframework_id");
    
        if (unit_of_measurement_id) {
            const query1 = `
                SELECT unit_type_id FROM fss_mast_units_of_measurement 
                WHERE id = $1 
                ORDER BY created_on DESC 
                LIMIT 1
            `;
    
            const [result1] = await this.sequelize.query(query1, { 
                bind: [unit_of_measurement_id], 
                type: Sequelize.QueryTypes.SELECT 
            });
    
            unit_type_id = result1 ? result1.unit_type_id : null; // Ensure framework_id is assigned
        }
        const query = `
            UPDATE fss_param_entities_products
            SET product_name = $1, unit_type_id = $2, unit_of_measurement_id = $3, is_active = $4
            WHERE id = $5
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [product_name, unit_type_id, unit_of_measurement_id, is_active, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_param_entities_products
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT a.*,b.unit_type_name,c.unit_name FROM fss_param_entities_products a left join fss_mast_unit_types b on a.unit_type_id=b.id left join fss_mast_units_of_measurement c on a.unit_of_measurement_id=c.id
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_param_entities_products
            WHERE product_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_param_entities_products RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssParamEntitiesProductsRaw;
