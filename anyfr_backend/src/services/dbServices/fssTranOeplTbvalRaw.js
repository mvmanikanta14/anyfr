const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssTranOeplTbvalRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }
    async createValue({
        entity_id,
        location_id = null,
        period_id,
        opening_amount,
        debit_amount,
        credit_amount,
        narration = null,
        is_valid = true,
        created_by,
        updated_by = null,
        is_active = true,
        is_archived = false,
        is_approved = false,
        approved_by = null,
        organisation_id,
        gl_id,
        batch_id
    }) {

        const net_amount = opening_amount + debit_amount - credit_amount;

        const query = `
          INSERT INTO public.fss_tran_oepl_tb_values
            (entity_id,
             location_id,
             period_id,
             opening_amount,
             debit_amount,
             credit_amount,
             narration,
             is_valid,
             created_by,
             created_on,
             updated_by,
             updated_on,
             is_active,
             is_archived,
             is_approved,
             approved_by,
             approved_on,
             organisation_id,
             gl_id,
             batch_id,
             net_amount)
          VALUES
            ($1,  $2,   $3,   $4,
             $5,  $6,   $7,   $8,
             $9,  now(), $10,  now(),
             $11, $12,  $13,  $14, now(),
             $15, $16,  $17,  $18)
          RETURNING *;
        `;

        const replacements = [
            entity_id,      // $1
            location_id,    // $2
            period_id,      // $3
            opening_amount, // $4
            debit_amount,   // $5
            credit_amount,  // $6
            narration,      // $7
            is_valid,       // $8
            created_by,     // $9
            updated_by,     // $10
            is_active,      // $11
            is_archived,    // $12
            is_approved,    // $13
            approved_by,    // $14
            organisation_id,// $15
            gl_id,          // $16
            batch_id,       // $17
            net_amount
        ];

        const [result] = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.INSERT
        });

        return result;
    }



    async updateValue({
        id,  
        entity_id,
        location_id,
        period_id,
        opening_amount,
        debit_amount,
        credit_amount,
        narration = null,
        updated_by = null,
        is_active = true,
        organisation_id,
        gl_id,
        batch_id
    }) {
    
        const net_amount = opening_amount + debit_amount - credit_amount;
    
         const query = `
            UPDATE public.fss_tran_oepl_tb_values
            SET 
                entity_id = $1,
                location_id = $2,
                period_id = $3,
                opening_amount = $4,
                debit_amount = $5,
                credit_amount = $6,
                narration = $7,
                updated_by = $8,  -- Fixed position of updated_by
                updated_on = now(),
                is_active = $9,   -- Fixed position of is_active
                organisation_id = $10,
                gl_id = $11,
                batch_id = $12,
                net_amount = $13
            WHERE 
                id = $14  -- Update the record with the given ID
            RETURNING *;  -- Ensure we return the updated record
        `;
    
         const replacements = [
            entity_id,      // $1
            location_id,    // $2
            period_id,      // $3
            opening_amount, // $4
            debit_amount,   // $5
            credit_amount,  // $6
            narration,      // $7
            updated_by,     // $8
            is_active,      // $9
            organisation_id,// $10
            gl_id,          // $11
            batch_id,       // $12
            net_amount,     // $13
            id              // $14 (ID of the record to update)
        ];
    
         const [result] = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.UPDATE
        });
    
        return result;
    }
    

    // async getAllbybatch(entity_id, batch_id, organisation_id, period_id) {
    //     try {



    //         const dataQuery = `
    //                 SELECT 
    //             v.*, 
    //             b.location_name 
    //         FROM 
    //             fss_tran_oepl_tb_values v
    //         LEFT JOIN 
    //             fss_tran_oepl_tb_batches a 
    //             ON v.batch_id = a.id
    //         LEFT JOIN 
    //             basic_param_oe_locations b 
    //             ON a.location_id = b.id
    //         WHERE 
    //             v.is_active = TRUE
    //             AND a.organisation_id = $1
    //             AND a.entity_id = $2
    //             AND a.period_id = $3
    //             AND v.batch_id = $4
    //          ORDER BY 
    //             v.id ASC;
    //         `;




    //         const data = await this.sequelize.query(dataQuery, {
    //             bind: [organisation_id, entity_id, period_id, batch_id],
    //             type: Sequelize.QueryTypes.SELECT
    //         });

    //         return { data };
    //     } catch (error) {
    //         console.error("Error in getAll:", error);
    //         throw new Error("Database query failed");
    //     }
    // }

    async getAllbybatch(
        page               = 1,
        limit              = 10,
        entity_id,
        batch_id,
        organisation_id,
        period_id,
        key     = '',       // column to search on, e.g. 'opening_amount' or 'location_name'
        value   = '',       // search term
        sortOn  = 'id',     // column to sort by, e.g. 'opening_amount', 'created_on'
        sortDir = 'ASC'     // 'ASC' or 'DESC'
      ) {
        try {
           const offset = (page - 1) * limit;
      
           const columnsMap = {
            id:             'v.id',
            opening_amount: 'v.opening_amount',
            debit_amount:   'v.debit_amount',
            credit_amount:  'v.credit_amount',
            net_amount:     'v.net_amount',
            location_name:  'b.location_name',
            
            gl_name:     'g.gl_name,'
           
          };
          const sortColumn = columnsMap[sortOn] || columnsMap.id;
          const direction  = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      
           const where = [
            'v.is_active = TRUE',
            'a.organisation_id = $1',
            'a.entity_id       = $2',
            'a.period_id       = $3',
            'v.batch_id        = $4'
          ];
          const binds = [organisation_id, entity_id, period_id, batch_id];
      
          if (key && value) {
            const placeholder = `$${binds.length + 1}`;
            if (key === 'location_name') {
              where.push(`b.location_name ILIKE ${placeholder}`);
            } else if (key === 'gl_name') {
              where.push(`g.gl_name ILIKE ${placeholder}`);
            }
            else  {
              where.push(`CAST(v.${key} AS TEXT) ILIKE ${placeholder}`);
            }
            binds.push(`%${value}%`);
          }
      
          const whereSQL = 'WHERE ' + where.join(' AND ');
      
           const countSQL = `
            SELECT COUNT(*) AS total
            FROM fss_tran_oepl_tb_values v
            LEFT JOIN fss_tran_oepl_tb_batches a ON v.batch_id = a.id
            left join fss_param_oe_mapping_gl_fsli g ON v.gl_id = g.id
            LEFT JOIN basic_param_oe_locations b   ON a.location_id = b.id
            ${whereSQL}
          `;
          const countRes = await this.sequelize.query(countSQL, {
            bind: binds,
            type: Sequelize.QueryTypes.SELECT
          });
          const total = parseInt(countRes[0].total, 10) || 0;
      
           const dataSQL = `
            SELECT 
              v.*,
              b.location_name,
              g.gl_name
            FROM fss_tran_oepl_tb_values v
            LEFT JOIN fss_tran_oepl_tb_batches a ON v.batch_id = a.id
            left join fss_param_oe_mapping_gl_fsli g ON v.gl_id = g.id
            LEFT JOIN basic_param_oe_locations b   ON a.location_id = b.id
            ${whereSQL}
            ORDER BY ${sortColumn} ${direction}
            LIMIT $${binds.length + 1}
            OFFSET $${binds.length + 2}
          `;
          const data = await this.sequelize.query(dataSQL, {
            bind: [...binds, limit, offset],
            type: Sequelize.QueryTypes.SELECT
          });
      
          return { total, page, limit, data };
        } catch (error) {
          console.error("Error in getAllbybatch:", error);
          throw new Error("Database query failed");
        }
      }
      
      



}

module.exports = FssTranOeplTbvalRaw;
