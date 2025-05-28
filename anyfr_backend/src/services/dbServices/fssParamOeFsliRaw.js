const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

class FssParamOeFsliRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }
  
    async getAll(entity_id, framework_id, organisation_id) {
        try {

            const dataQuery = `
           SELECT * FROM fss_param_oe_fsli where is_active = True  and organisation_id = $1 and entity_id  = $2 and  framework_id = $3
            ORDER BY node_code ASC`;

            const data = await this.sequelize.query(dataQuery, {
                bind: [organisation_id, entity_id, framework_id],
                type: Sequelize.QueryTypes.SELECT
            });

            return { data };
        } catch (error) {
            console.error("Error in getAll:", error);
            throw new Error("Database query failed");
        }
    }


    async create({ custom_name, is_added = true, is_active = true, is_hidden = false, organisation_id, entity_id, falling_under_mast = null, falling_under, fsli_master_id = null,position_after, created_by }) {

        if (!position_after) {
            position_after = null;
        }
        
        const dataQuery = `
        SELECT node_level , flsi_master_name , framework_id , fsli_master_id FROM fss_param_oe_fsli where is_active = True  and organisation_id = $1 and entity_id  = $2 and  id = $3
         ORDER BY node_code ASC`;

        const data = await this.sequelize.query(dataQuery, {
            bind: [organisation_id, entity_id, falling_under],
            type: Sequelize.QueryTypes.SELECT
        });

        const node_level = data[0].node_level + 1;
        const flsi_master_name = data[0].flsi_master_name;
        
        const framework_id = data[0].framework_id;


        const query = `
          INSERT INTO fss_param_oe_fsli (custom_name , is_added , is_active , is_hidden , organisation_id , entity_id , falling_under_mast , falling_under , fsli_master_id, created_by, node_level ,flsi_master_name,framework_id ,node_sequence, created_on)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 ,$11 ,$12 ,  $13 ,$14 ,NOW())
        
          RETURNING *`;

        const replacements = [custom_name, is_added, is_active, is_hidden, organisation_id, entity_id, falling_under_mast, falling_under, fsli_master_id, created_by, node_level, flsi_master_name, framework_id , position_after];

        const [result] = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.INSERT
        });

        return result;
    }



    async update({ custom_name, is_added = true, is_active , is_hidden = false, organisation_id, entity_id, falling_under_mast = null, falling_under, fsli_master_id = null, position_after, id }) {

        const dataQuery = `
            SELECT node_level , flsi_master_name , framework_id , fsli_master_id FROM fss_param_oe_fsli 
            WHERE is_active = True  
            AND organisation_id = $1 
            AND entity_id = $2 
            AND id = $3
            ORDER BY node_code ASC
        `;
    
        const data = await this.sequelize.query(dataQuery, {
            bind: [organisation_id, entity_id, falling_under],
            type: Sequelize.QueryTypes.SELECT
        });

        console.log("data", data);
    
        // Ensure there is a record found
        if (data.length === 0) {
            throw new Error("No record found to update");
        }
    
        const node_level = data[0].node_level + 1;
        const flsi_master_name = data[0].flsi_master_name;
        const framework_id = data[0].framework_id;
    
        const updateQuery = `
            UPDATE fss_param_oe_fsli
            SET custom_name = $1,
                is_added = $2,
                is_active = $3,
                is_hidden = $4,
                organisation_id = $5,
                entity_id = $6,
                falling_under_mast = $7,
                falling_under = $8,
                fsli_master_id = $9,
               
                node_level = $10,
                flsi_master_name = $11,
                framework_id = $12,
                node_sequence = $13
            WHERE organisation_id = $5
            AND entity_id = $6
            AND id = $14
            RETURNING *`;
    
        const replacements = [custom_name, is_added, is_active, is_hidden, organisation_id, entity_id, falling_under_mast, falling_under, fsli_master_id, node_level, flsi_master_name, framework_id, position_after, id];
    
        const [result] = await this.sequelize.query(updateQuery, {
            bind: replacements,
            type: Sequelize.QueryTypes.UPDATE
        });
    
        return result;
    }
    


    async getAllpa(entity_id, falling_under , organisation_id) {
        try {


            // console.log("entity_id", entity_id, "organisation_id", organisation_id, "falling_under", falling_under);
            const dataQuery = `
            SELECT * FROM fss_param_oe_fsli where is_active = True  and organisation_id = $1 and entity_id  = $2 and  falling_under = $3
             ORDER BY node_code ASC`;
    
            const data = await this.sequelize.query(dataQuery, {
                bind: [organisation_id, entity_id, falling_under],
                type: Sequelize.QueryTypes.SELECT
            });

            return { data };
        } catch (error) {
            console.error("Error in getAll:", error);
            throw new Error("Database query failed");
        }
    }


}

module.exports = FssParamOeFsliRaw;
