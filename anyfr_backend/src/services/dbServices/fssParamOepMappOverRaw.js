const { Sequelize, Op } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");



class FssParamOepMappOverRaw {


    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }


    async create({ entity_id, period_id, override_mapped_to_fsli_id, gl_id, is_regroup_previous, organisation_id, created_by, is_active = true }) {



        const dataQuery = `
        SELECT mappted_to_fsli_id FROM fss_param_oe_mapping_gl_fsli where is_active = True and organisation_id = $1 and entity_id  = $2 and  id = $3
        `;

        const data = await this.sequelize.query(dataQuery, {
            bind: [organisation_id, entity_id, gl_id],
            type: Sequelize.QueryTypes.SELECT
        });

        const mappted_to_fsli_id = data[0].mappted_to_fsli_id;


        const query = `
            INSERT INTO fss_param_oep_mapping_override_gl_fsli (entity_id, period_id, override_mapped_to_fsli_id, gl_id, is_regroup_previous, mapped_to_fsli_id, organisation_id, created_by, created_on, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), $9)
          
            RETURNING *`;

        const replacements = [entity_id, period_id, override_mapped_to_fsli_id, gl_id, is_regroup_previous, mappted_to_fsli_id, organisation_id, created_by, is_active];



        const [result] = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.INSERT
        });

        return result;
    }

    async update({ id, override_mapped_to_fsli_id, is_regroup_previous }) {
        const updateSql = `
          UPDATE public.fss_param_oep_mapping_override_gl_fsli
             SET override_mapped_to_fsli_id = $1,
                 is_regroup_previous         = $2,
                 updated_on                  = now()
           WHERE id = $3
          RETURNING *;
        `;
      
        const bind = [
          override_mapped_to_fsli_id,
          is_regroup_previous,
          id
        ];
      
        const [result] = await this.sequelize.query(updateSql, {
          bind,
          type: Sequelize.QueryTypes.UPDATE
        });
      
        return result;
      }
      


    async getAll(entity_id, gl_id, organisation_id) {
        try {


            // console.log("entity_id", entity_id, "organisation_id", organisation_id, "falling_under", falling_under);
            const dataQuery = `
            SELECT a.*, b.gl_name , c.flsi_master_name as mapped_fsli_name ,d.flsi_master_name as override_name  FROM public.fss_param_oep_mapping_override_gl_fsli a left join  fss_param_oe_mapping_gl_fsli b 
        on b.id = a.gl_id left join   fss_param_oe_fsli c on c.id = a.mapped_to_fsli_id left join  fss_param_oe_fsli d on d.id = a.override_mapped_to_fsli_id where a.is_active = True and a.organisation_id = $1 and a.entity_id  = $2 and  a.gl_id = $3
        ORDER BY a.id ASC   `;


            const data = await this.sequelize.query(dataQuery, {
                bind: [organisation_id, entity_id, gl_id],
                type: Sequelize.QueryTypes.SELECT
            });

            return { data };
        } catch (error) {
            console.error("Error in getAll:", error);
            throw new Error("Database query failed");
        }
    }






}

module.exports = FssParamOepMappOverRaw;
