const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssParamEntityLineMasterRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }


    async create({ entity_id, fss_line_master_id, custom_name, is_added, is_hidden, is_active, created_by }) {
        let framework_id = null;
    
        console.log(framework_id, "dataframework_id");
    
        if (fss_line_master_id) {
            const query1 = `
                SELECT framework_id FROM fss_mast_line_master 
                WHERE id = $1 
                ORDER BY created_on DESC 
                LIMIT 1
            `;
    
            const [result1] = await this.sequelize.query(query1, { 
                bind: [fss_line_master_id], 
                type: Sequelize.QueryTypes.SELECT 
            });
    
            framework_id = result1 ? result1.framework_id : null; // Ensure framework_id is assigned
        }
    
        console.log(framework_id);
    
        const query = `
            INSERT INTO fss_param_entity_line_master (entity_id, framework_id, fss_line_master_id, custom_name, is_added, is_hidden, is_active, created_by,created_on)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8,NOW())
            RETURNING *`;
    
        return await this.sequelize.query(query, { 
            bind: [entity_id, framework_id, fss_line_master_id, custom_name, is_added, is_hidden, is_active, created_by], 
            type: Sequelize.QueryTypes.INSERT 
        });
    }
    

    async edit(id, { custom_name, is_added, is_hidden, is_active }) {
        const query = `
            UPDATE fss_param_entity_line_master
            SET custom_name = $1, is_added = $2, is_hidden = $3, is_active = $4
            WHERE id = $5
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [custom_name, is_added, is_hidden, is_active, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_param_entity_line_master
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT a.*,b.id,b.line_name,c.framework_name,c.id FROM fss_param_entity_line_master a left join fss_mast_line_master b on b.id = a.fss_line_master_id
            left join fss_mast_financial_framework c on c.id = a.framework_id
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_param_entity_line_master
            WHERE custom_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_param_entity_line_master RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssParamEntityLineMasterRaw;
