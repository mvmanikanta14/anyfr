const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssMastLineMasterRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ framework_id, core_master_id, line_name, falling_under, created_by }) {
         const query1 = `
            SELECT polarity FROM fss_mast_core_line_master 
            WHERE id = $1 
            ORDER BY created_on DESC 
            LIMIT 1
        `;
    
        const [result1] = await this.sequelize.query(query1, { 
            bind: [core_master_id], 
            type: Sequelize.QueryTypes.SELECT 
        });
    
         const polarity = result1 ? result1.polarity : null;
    
         const query = `
            INSERT INTO fss_mast_line_master 
            (framework_id, core_master_id, line_name, falling_under, polarity, created_by,created_on)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
            RETURNING *
        `;
    
        return await this.sequelize.query(query, { 
            bind: [framework_id, core_master_id, line_name, falling_under, polarity, created_by], 
            type: Sequelize.QueryTypes.INSERT 
        });
    }
    

    // async edit(id, { line_name, framework_id }) {
    //     const query = `
    //         UPDATE fss_mast_line_master
    //         SET line_name = $1, framework_id = $2
    //         WHERE id = $3
    //         RETURNING *`;

    //     return await this.sequelize.query(query, { bind: [line_name, framework_id, id], type: Sequelize.QueryTypes.UPDATE });
    // }

    async edit(id, { framework_id, core_master_id, line_name, falling_under }) {
         let polarity = null;
        
        if (core_master_id) {
            const query1 = `
                SELECT polarity FROM fss_mast_core_line_master 
                WHERE id = $1 
                ORDER BY created_on DESC 
                LIMIT 1
            `;
    
            const [result1] = await this.sequelize.query(query1, { 
                bind: [core_master_id], 
                type: Sequelize.QueryTypes.SELECT 
            });
    
            polarity = result1 ? result1.polarity : null;
        }
    
         const query2 = `
            UPDATE fss_mast_line_master
            SET 
                framework_id = COALESCE($1, framework_id), 
                core_master_id = COALESCE($2, core_master_id),
                line_name = COALESCE($3, line_name), 
                falling_under = COALESCE($4, falling_under), 
                polarity = COALESCE($5, polarity)
              
            
            WHERE id = $6
            RETURNING *;
        `;
    
        const [updatedRecord] = await this.sequelize.query(query2, { 
            bind: [framework_id, core_master_id, line_name, falling_under, polarity,  id], 
            type: Sequelize.QueryTypes.UPDATE 
        });

        
    
        return updatedRecord;
    }
    
    

    async softDelete(id) {
        const query = `
            UPDATE fss_mast_line_master
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
             SELECT a.*,b.core_master_name,b.id,c.framework_name,c.id FROM fss_mast_line_master a left join fss_mast_core_line_master b on a.core_master_id = b.id left join fss_mast_financial_framework c on c.id = a.framework_id
            
            LIMIT $1 OFFSET $2
                            `;


            // SELECT a.*,b.core_master_name,b.id,c.framework_name,c.id FROM fss_mast_line_master a left join fss_mast_core_line_master b on a.core_master_id = b.id left join fss_mast_financial_framework c on c.id = a.framework_id
            // ORDER BY created_on DESC
            // LIMIT $1 OFFSET $2

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_mast_line_master
            WHERE line_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_mast_line_master RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssMastLineMasterRaw;
