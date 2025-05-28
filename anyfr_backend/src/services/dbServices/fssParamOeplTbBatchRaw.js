const { Sequelize, Op } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");



class FssParamOeplTbBatch {


  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }


  async createBatch({
    organisation_id,
    entity_id,
    period_id,
    location_id = null,
    batch_name,
    source_type = 1,
    source_address = null,
    source_data_table = null,
    created_by,
    approved_by = null,
    deactived_by = null,
    is_active = true
  }) {
    const query = `
          INSERT INTO public.fss_tran_oepl_tb_batches
            (organisation_id, entity_id, period_id, location_id,
             batch_name, source_type, source_address, source_data_table,
             is_active, created_by, created_on,
             approved_by, approved_on,
             deactived_by, deactived_on)
          VALUES
            ($1, $2, $3, $4,
             $5, $6, $7, $8,
             $9, $10, now(),
             $11, now(),  -- if approving immediately
             $12, now()   -- if deactivating immediately
            )
          RETURNING *;
        `;

    const replacements = [
      organisation_id,
      entity_id,
      period_id,
      location_id,
      batch_name,
      source_type,
      source_address,
      source_data_table,
      is_active,
      created_by,
      approved_by,
      deactived_by
    ];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }




  async update({ id, batch_name, location_id, deactived_by }) {

    if (!deactived_by) {
      deactived_by = null;
    }

    const updateSql = `
          UPDATE public.fss_tran_oepl_tb_batches
             SET batch_name = $1,
                 location_id         = $2,
                 deactived_by     = $3
           WHERE id = $4
          RETURNING *;
        `;

    const bind = [
      batch_name,
      location_id,
      deactived_by,
      id
    ];

    const [result] = await this.sequelize.query(updateSql, {
      bind,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }



  async getAll(entity_id, organisation_id , period_id) {
    try {



      const dataQuery = `
            SELECT  a.*,b.location_name FROM fss_tran_oepl_tb_batches a left join basic_param_oe_locations  b on a.location_id = b.id
            WHERE a.is_active = True
            AND a.organisation_id = $1
            AND a.entity_id = $2
            And a.Period_id = $3
          
            ORDER BY id ASC`;


      const data = await this.sequelize.query(dataQuery, {
        bind: [organisation_id, entity_id, period_id],
        type: Sequelize.QueryTypes.SELECT
      });

      return { data };
    } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
    }
  }

  async getAllInactive(entity_id, organisation_id , period_id) {
    try {

      const dataQuery = `
            SELECT  a.*,b.location_name FROM fss_tran_oepl_tb_batches a left join basic_param_oe_locations  b on a.location_id = b.id
            WHERE a.is_active = False
            AND a.organisation_id = $1
            AND a.entity_id = $2
            And a.Period_id = $3
          
            ORDER BY id ASC`;


      const data = await this.sequelize.query(dataQuery, {
        bind: [organisation_id, entity_id, period_id],
        type: Sequelize.QueryTypes.SELECT
      });

      return { data };
    } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
    }
  }

  
  async getlocbyentity(entity_id, organisation_id) {
    try {



      const dataQuery = `
            SELECT  * FROM basic_param_oe_locations   
            WHERE is_active = True
            AND organisation_id = $1
            AND entity_id = $2
             ORDER BY id ASC`;


      const data = await this.sequelize.query(dataQuery, {
        bind: [organisation_id, entity_id ],
        type: Sequelize.QueryTypes.SELECT
      });

      return { data };
    } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
    }
  }




}

module.exports = FssParamOeplTbBatch;
