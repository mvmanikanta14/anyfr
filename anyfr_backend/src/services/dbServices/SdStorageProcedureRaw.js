const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Ensure correct path

class SdStorageProcedureRaw {
    constructor(subdomain) {
      console.log("IN CONSTRUCTOR")
        if (!subdomain) throw new Error("❌ Subdomain is required to initialize DB connection.");
        this.sequelize = getSequelizeInstance(subdomain);
    }


 

    async runSd_SP_section(orgId, entityId, periodId) {
        const query = `CALL public.sp_create_oep_sds_sections(:orgId, :entityId, :periodId)`;
    
        const result = await this.sequelize.query(query, {
            replacements: {
                orgId,
                entityId,
                periodId
            },
            type: Sequelize.QueryTypes.RAW // or simply omit 'type' for CALL
        });
    
        return result; // Stored procedures typically return void or a message
    }



    async runSd_SP_section_que(orgId, entityId, periodId) {
        const query = `CALL public.sp_create_oep_sds_section_values(:orgId, :entityId, :periodId)`;
    
        const result = await this.sequelize.query(query, {
            replacements: {
                orgId,
                entityId,
                periodId
            },
            type: Sequelize.QueryTypes.RAW // or simply omit 'type' for CALL
        });
    
        return result; // Stored procedures typically return void or a message
    }
    

    async SP_section_que_list(org_id, entity_id , period_id ) {

        
        const query = `
            SELECT * 
            FROM sds_tran_oep_section_values
            WHERE organisation_id = $1 AND entity_id = $2 AND reporting_period_id = $3
            ORDER BY id ASC
        `;

        const replacements = [org_id, entity_id , period_id];

        const result = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        return result; // Return single user
    }


    async SP_section_list(org_id, entity_id , period_id ) {

        
        const query = `
            SELECT * FROM sds_tran_oep_sections
            WHERE organisation_id = $1 AND entity_id = $2 AND reporting_period_id = $3
            ORDER BY id ASC `;

        const replacements = [org_id, entity_id , period_id];

        const result = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        return result; // Return single user
    }

     async section_que_res(id, { user_response }) {
            const query = `
                UPDATE sds_tran_oep_section_values
                SET user_response = $1
                WHERE id = $2
                RETURNING *`;


                // const bindValues = [user_response, id];
                // console.log("Executing SQL:", query.trim());
                // console.log("With values:", bindValues);
    
            return await this.sequelize.query(query, { bind: [user_response, id], type: Sequelize.QueryTypes.UPDATE });
        }
    
 
     
}

module.exports = SdStorageProcedureRaw;
