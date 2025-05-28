const { Sequelize, Op } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

const FssParamOEMappingGlFsliModel = require('../../models/fssParamOEMappingGlFsliOrm');


class FssParamOeMappingGlFsliRaw {


  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
    this.initializeModels();  // Initialize models asynchronously
  }

  // Initialize models asynchronously
  async initializeModels() {
    try {
      this.FssParamOEMappingGlFsli = await FssParamOEMappingGlFsliModel(this.sequelize);

      console.log('Models initialized successfully.');
    } catch (error) {
      console.error('Error initializing models:', error);
    }
  }



  async create({ entity_id, gl_name, gl_code, falling_under, mappted_to_fsli_id, is_party = false, has_subsidiary = false, organisation_id, created_by, created_on = new Date(), is_active = true }) {


    if (!falling_under) {
      falling_under = null;
    }

    if (!mappted_to_fsli_id) {
      mappted_to_fsli_id = 0;
    }

    const query = `
            INSERT INTO fss_param_oe_mapping_gl_fsli (entity_id ,gl_name, gl_code, falling_under, mappted_to_fsli_id, is_party, has_subsidiary, organisation_id, created_by, created_on, is_active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          
            RETURNING *`;

    const replacements = [entity_id, gl_name, gl_code, falling_under, mappted_to_fsli_id, is_party, has_subsidiary, organisation_id, created_by, created_on, is_active];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }


  async bulkUpdate({ ids, mappted_to_fsli_id, organisation_id }) {
    // Check if the ids array and mappted_to_fsli_id are provided
    if (!ids || ids.length === 0 || !mappted_to_fsli_id) {
      throw new Error("Missing required fields: ids and mappted_to_fsli_id");
    }


    const query = `
        UPDATE fss_param_oe_mapping_gl_fsli
        SET mappted_to_fsli_id = $1
        WHERE id = ANY($2)  -- Using ANY for array matching
        AND organisation_id = $3
        RETURNING *`;

    // Prepare replacements
    const replacements = [mappted_to_fsli_id, ids, organisation_id];

    // Execute the query
    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }




  async edit(id, {
    entity_id,
    gl_name,
    gl_code,
    falling_under,
    mappted_to_fsli_id,
    is_party = false,
    has_subsidiary = false,
    created_by,
    created_on = new Date(),
    is_active = true
  }) {
    try {
      const duplicate = await this.FssParamOEMappingGlFsli.findOne({
        where: {
          gl_code,
          id: {
            [Op.ne]: id
          }
        }
      });
      if (duplicate) {
        return {
          status: 400,
          error: "Validation Error",
          details: [{
            column: "gl_code",
            message: "gl_code must be unique.",
            value: gl_code
          }]
        };
      }

      // Fetch the record to be updated by its primary key (id)
      const record = await this.FssParamOEMappingGlFsli.findByPk(id);
      if (!record) {
        return { status: 404, error: 'Mapping not found' };
      }

      // Update record fields with the incoming data
      record.entity_id = entity_id;
      record.gl_name = gl_name;
      record.gl_code = gl_code;
      record.falling_under = falling_under;
      record.mappted_to_fsli_id = mappted_to_fsli_id;
      record.is_party = is_party;
      record.has_subsidiary = has_subsidiary;
      record.created_by = created_by;
      record.created_on = created_on;
      record.is_active = is_active;

      await record.validate();

      // Save the updated record to the database
      const savedRecord = await record.save();
      return savedRecord;
    } catch (error) {
      // Check for validation errors from Sequelize
      if (error.errors && Array.isArray(error.errors)) {
        const formattedErrors = error.errors.map(err => ({
          column: err.path,
          message: err.message,
          value: err.value,
        }));
        console.error("Validation errors in edit:", formattedErrors);
        return {
          status: 400,
          error: "Validation Error",
          details: formattedErrors
        };
      }
      console.error("Error in edit:", error);
      return {
        status: 500,
        error: "Internal Server Error",
        details: "Validation or database update failed"
      };
    }
  }



  // Soft delete (deactivate) a mapping
  async softDelete(id) {
    const query = `
      UPDATE fss_param_oe_mapping_gl_fsli
      SET is_active = FALSE
      WHERE id = $1
      RETURNING *`;
    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Restore (reactivate) a mapping
  async restore(id) {
    const query = `
      UPDATE fss_param_oe_mapping_gl_fsli
      SET is_active = TRUE
      WHERE id = $1
      RETURNING *`;
    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Retrieve all active mappings (Paginated)
  async getAllDropdown(entity_id, organisation_id) {



    const dataQuery = `
        SELECT
      a.*,
      b.flsi_master_name,
      b.custom_name,
      parent.gl_name AS falling_under_name
    FROM fss_param_oe_mapping_gl_fsli a
    LEFT JOIN fss_param_oe_fsli b
      ON a.mappted_to_fsli_id = b.id
    LEFT JOIN fss_param_oe_mapping_gl_fsli parent
      ON parent.id = a.falling_under
  
    WHERE a.is_active = True AND a.entity_id = $1 AND a.organisation_id = $2
    ORDER BY a.created_on DESC
      `;


    const data = await this.sequelize.query(dataQuery, {
      bind: [entity_id, organisation_id],
      type: Sequelize.QueryTypes.SELECT
    });


    return { data };
  }

  // async getAll(page = 1, limit = 10, entity_id, organisation_id) {
  //   const offset = (page - 1) * limit;


  //   const countQuery = `
  //     SELECT COUNT(*) AS total
  //     FROM fss_param_oe_mapping_gl_fsli
  //     WHERE is_active = TRUE AND entity_id = $1 AND organisation_id = $2`;

  //   const countResult = await this.sequelize.query(countQuery, {
  //     bind: [entity_id, organisation_id],
  //     type: Sequelize.QueryTypes.SELECT
  //   });


  //   const total = countResult?.[0]?.total ?? 0;

  //   const dataQuery = `
  //       SELECT
  //     a.*,
  //     b.flsi_master_name,
  //     b.custom_name,
  //     parent.gl_name AS falling_under_name
  //   FROM fss_param_oe_mapping_gl_fsli a
  //   LEFT JOIN fss_param_oe_fsli b
  //     ON a.mappted_to_fsli_id = b.id
  //   LEFT JOIN fss_param_oe_mapping_gl_fsli parent
  //     ON parent.id = a.falling_under
  
  //   WHERE a.is_active = True AND a.entity_id = $1 AND a.organisation_id = $2
  //   ORDER BY a.created_on DESC
  //   LIMIT $3 OFFSET $4`;


  //   const data = await this.sequelize.query(dataQuery, {
  //     bind: [entity_id, organisation_id, limit, offset],
  //     type: Sequelize.QueryTypes.SELECT
  //   });


  //   return { total, page, limit, data };
  // }


  async getAll(
    page               = 1,
    limit              = 10,
    entity_id,
    organisation_id,
    key     = '',        
    value   = '',      
    sortOn  = 'id', 
    sortDir = 'DESC'
  ) {
    // 1. Pagination math
     const offset = (page - 1) * limit;
  
    // 2. Whitelist sortable columns (with aliases)
    const columnsMap = {
      id:                   'a.id',
      gl_name:              'a.gl_name',
      mappted_to_fsli_id:   'a.mappted_to_fsli_id',
      flsi_master_name:     'b.flsi_master_name',
      custom_name:          'b.custom_name',
      falling_under_name:   'parent.gl_name',
      created_on:           'a.created_on'
    };
    const sortColumn = columnsMap[sortOn] || 'a.id';
    const direction  = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  
    // 3. Build WHERE clause & bind parameters
    const whereClauses = [
      'a.is_active = TRUE',
      'a.entity_id = $1',
      'a.organisation_id = $2'
    ];
    const replacements = [entity_id, organisation_id];
  
    if (key && value) {
      const placeholder = `$${replacements.length + 1}`;
      if (key === 'falling_under_name') {
        whereClauses.push(`parent.gl_name ILIKE ${placeholder}`);
      } else {
        // determine which table alias to use
        const alias = ['flsi_master_name','custom_name'].includes(key) ? 'b' : 'a';
        whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
      }
      replacements.push(`%${value}%`);
    }
  
    const whereSQL = whereClauses.length
      ? 'WHERE ' + whereClauses.join(' AND ')
      : '';
  
    // 4. Count total matching rows (with same joins + where)
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM fss_param_oe_mapping_gl_fsli a
      LEFT JOIN fss_param_oe_fsli b
        ON a.mappted_to_fsli_id = b.id
      LEFT JOIN fss_param_oe_mapping_gl_fsli parent
        ON parent.id = a.falling_under
      ${whereSQL}
    `;
    const countResult = await this.sequelize.query(countQuery, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
    const total = parseInt(countResult[0].total, 10) || 0;
  
    // 5. Fetch page of data
    const dataQuery = `
      SELECT
        a.*,
        b.flsi_master_name,
        b.custom_name,
        parent.gl_name AS falling_under_name
      FROM fss_param_oe_mapping_gl_fsli a
      LEFT JOIN fss_param_oe_fsli b
        ON a.mappted_to_fsli_id = b.id
      LEFT JOIN fss_param_oe_mapping_gl_fsli parent
        ON parent.id = a.falling_under
      ${whereSQL}
      ORDER BY ${sortColumn} ${direction}
      LIMIT $${replacements.length + 1}
      OFFSET $${replacements.length + 2}
    `;
    const data = await this.sequelize.query(dataQuery, {
      bind: [...replacements, limit, offset],
      type: Sequelize.QueryTypes.SELECT
    });
  
    // 6. Return unified result
    return {
      total,
      page,
      limit,
      data
    };
  }


  async getAllInactive(
    page               = 1,
    limit              = 10,
    entity_id,
    organisation_id,
    key     = '',        
    value   = '',      
    sortOn  = 'id', 
    sortDir = 'DESC'
  ) {
    // 1. Pagination math
     const offset = (page - 1) * limit;
  
    // 2. Whitelist sortable columns (with aliases)
    const columnsMap = {
      id:                   'a.id',
      gl_name:              'a.gl_name',
      mappted_to_fsli_id:   'a.mappted_to_fsli_id',
      flsi_master_name:     'b.flsi_master_name',
      custom_name:          'b.custom_name',
      falling_under_name:   'parent.gl_name',
      created_on:           'a.created_on'
    };
    const sortColumn = columnsMap[sortOn] || 'a.id';
    const direction  = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  
    // 3. Build WHERE clause & bind parameters
    const whereClauses = [
      'a.is_active = False',
      'a.entity_id = $1',
      'a.organisation_id = $2'
    ];
    const replacements = [entity_id, organisation_id];
  
    if (key && value) {
      const placeholder = `$${replacements.length + 1}`;
      if (key === 'falling_under_name') {
        whereClauses.push(`parent.gl_name ILIKE ${placeholder}`);
      } else {
        // determine which table alias to use
        const alias = ['flsi_master_name','custom_name'].includes(key) ? 'b' : 'a';
        whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
      }
      replacements.push(`%${value}%`);
    }
  
    const whereSQL = whereClauses.length
      ? 'WHERE ' + whereClauses.join(' AND ')
      : '';
  
    // 4. Count total matching rows (with same joins + where)
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM fss_param_oe_mapping_gl_fsli a
      LEFT JOIN fss_param_oe_fsli b
        ON a.mappted_to_fsli_id = b.id
      LEFT JOIN fss_param_oe_mapping_gl_fsli parent
        ON parent.id = a.falling_under
      ${whereSQL}
    `;
    const countResult = await this.sequelize.query(countQuery, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
    const total = parseInt(countResult[0].total, 10) || 0;
  
    // 5. Fetch page of data
    const dataQuery = `
      SELECT
        a.*,
        b.flsi_master_name,
        b.custom_name,
        parent.gl_name AS falling_under_name
      FROM fss_param_oe_mapping_gl_fsli a
      LEFT JOIN fss_param_oe_fsli b
        ON a.mappted_to_fsli_id = b.id
      LEFT JOIN fss_param_oe_mapping_gl_fsli parent
        ON parent.id = a.falling_under
      ${whereSQL}
      ORDER BY ${sortColumn} ${direction}
      LIMIT $${replacements.length + 1}
      OFFSET $${replacements.length + 2}
    `;
    const data = await this.sequelize.query(dataQuery, {
      bind: [...replacements, limit, offset],
      type: Sequelize.QueryTypes.SELECT
    });
  
    // 6. Return unified result
    return {
      total,
      page,
      limit,
      data
    };
  }
  



  // Retrieve a mapping by ID
  async getById(id) {
    const query = `
      SELECT *
      FROM fss_param_oe_mapping_gl_fsli
      WHERE id = $1
      LIMIT 1`;
    const replacements = [id];

    const result = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });

    return result.length > 0 ? result[0] : null;
  }



  async searchdata(
    key     = '',
    value   = '',
    sortOn  = 'id',
    sortDir = 'DESC'
  ) {
    // 1. Whitelist sortable columns (with table aliases)
    const columnsMap = {
      id:                  'a.id',
      gl_name:             'a.gl_name',
      mappted_to_fsli_id:  'a.mappted_to_fsli_id',
      flsi_master_name:    'b.flsi_master_name',
      custom_name:         'b.custom_name',
      falling_under_name:  'parent.gl_name'
    };
  
    // 2. Build WHERE
    let whereClause = 'WHERE a.is_active = TRUE';
    const replacements = [];
  
    if (key && value) {
      if (key === 'falling_under_name') {
        // only filter on parent.gl_name
        whereClause += ` AND parent.gl_name ILIKE $1`;
      } else {
        // pick correct alias for real columns on a or b
        const alias = ['flsi_master_name', 'custom_name'].includes(key) ? 'b' : 'a';
        whereClause += ` AND CAST(${alias}.${key} AS TEXT) ILIKE $1`;
      }
      // single bind for either case
      replacements.push(`%${value}%`);
    }
  
    // 3. Pick sort column & direction (always)
    const sortColumn = columnsMap[sortOn] || columnsMap.id;
    const direction  = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  
    // 4. Final SQL
    const sql = `
      SELECT
        a.*,
        b.flsi_master_name,
        b.custom_name,
        parent.gl_name AS falling_under_name
      FROM fss_param_oe_mapping_gl_fsli a
      LEFT JOIN fss_param_oe_fsli b
        ON a.mappted_to_fsli_id = b.id
      LEFT JOIN fss_param_oe_mapping_gl_fsli parent
        ON parent.id = a.falling_under
      ${whereClause}
      ORDER BY ${sortColumn} ${direction}
    `;
  
    // (optional) debug
    console.debug('searchdata →', sql.trim(), replacements);
  
    // 5. Execute
    return this.sequelize.query(sql, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
  

  async getAllfssview(entity_id, organisation_id) {
    // subquery to count how many mappings each fsli has
    const sql = `
      SELECT
        a.*,
        COALESCE(m.cnt, 0) AS gl_count
      FROM public.fss_param_oe_fsli a
      LEFT JOIN (
        SELECT
          mappted_to_fsli_id,
          COUNT(*) AS cnt
        FROM public.fss_param_oe_mapping_gl_fsli
        WHERE entity_id      = $1
          AND organisation_id = $2
          and is_active = true
        GROUP BY mappted_to_fsli_id
      ) m
        ON a.id = m.mappted_to_fsli_id
      WHERE
        a.entity_id      = $1
        AND a.organisation_id = $2
        AND a.is_active = true
      ORDER BY a.node_code ASC;
    `;

    const rows = await this.sequelize.query(sql, {
      bind: [entity_id, organisation_id],
      type: Sequelize.QueryTypes.SELECT
    });

    return {

      rows
    };
  }


  async getAllbymapid(page = 1, limit = 10, entity_id, organisation_id, map_id) {
    const offset = (page - 1) * limit;


    const countQuery = `
      SELECT COUNT(*) AS total
      FROM fss_param_oe_mapping_gl_fsli
      WHERE is_active = TRUE AND entity_id = $1 AND organisation_id = $2 and mappted_to_fsli_id = $3`;


    const countResult = await this.sequelize.query(countQuery, {
      bind: [entity_id, organisation_id, map_id],
      type: Sequelize.QueryTypes.SELECT
    });


    const total = countResult?.[0]?.total ?? 0;

    const dataQuery = `
     SELECT a.*, b.flsi_master_name , b.custom_name
    FROM fss_param_oe_mapping_gl_fsli a left join fss_param_oe_fsli b on a.mappted_to_fsli_id = b.id 
    WHERE a.is_active = True AND a.entity_id = $1 AND a.organisation_id = $2 and a.mappted_to_fsli_id = $3
    ORDER BY a.created_on DESC
    LIMIT $4 OFFSET $5`;


    const data = await this.sequelize.query(dataQuery, {
      bind: [entity_id, organisation_id, map_id, limit, offset],
      type: Sequelize.QueryTypes.SELECT
    });


    return { total, page, limit, data };
  }


  async getAllgroupview(entity_id, organisation_id) {
    // 1. Fetch parents
    const parentsSql = `
      SELECT *
      FROM public.fss_param_oe_mapping_gl_fsli
      WHERE organisation_id = $1
        AND entity_id       = $2
        and is_active = true
        AND id IN (
          SELECT DISTINCT falling_under
          FROM public.fss_param_oe_mapping_gl_fsli
          WHERE organisation_id = $1
            AND entity_id       = $2
            AND falling_under IS NOT NULL
            AND is_active = true
        )
      ORDER BY id;
    `;
    const parents = await this.sequelize.query(parentsSql, {
      bind: [organisation_id, entity_id],
      type: Sequelize.QueryTypes.SELECT
    });

    // 2. For each parent, count its children
    const parentsWithCounts = await Promise.all(
      parents.map(async parent => {
        const countSql = `
          SELECT COUNT(*) AS child_count
          FROM public.fss_param_oe_mapping_gl_fsli
          WHERE organisation_id = $1
            AND entity_id       = $2
            AND falling_under   = $3
            AND is_active = true;
        `;
        const [countRow] = await this.sequelize.query(countSql, {
          bind: [organisation_id, entity_id, parent.id],
          type: Sequelize.QueryTypes.SELECT
        });

        return {
          ...parent,
          child_count: parseInt(countRow.child_count, 10)
        };
      })
    );

    return { data: parentsWithCounts };
  }

  async getAllgroupbyid(entity_id, organisation_id, map_id) {

    const dataQuery = `SELECT a.*, b.flsi_master_name , b.custom_name
    FROM fss_param_oe_mapping_gl_fsli a left join fss_param_oe_fsli b on a.mappted_to_fsli_id = b.id 
    WHERE a.is_active = True and a.falling_under = $1 and a.entity_id = $2 and a.organisation_id = $3
      ORDER BY id ASC 
    `;

    const data = await this.sequelize.query(dataQuery, {
      bind: [map_id, entity_id, organisation_id],
      type: Sequelize.QueryTypes.SELECT
    });


    return { data };
  }
  // async getAllfssview2(entity_id, organisation_id) {
  //   // 1. fetch flat rows
  //   const dataQuery = `
  //     SELECT b.gl_code , b.gl_name, b.id as gl_id ,a.* FROM public.fss_param_oe_fsli a left join fss_param_oe_mapping_gl_fsli b on a.id = b.mappted_to_fsli_id where a.entity_id = $1
  //        AND a.organisation_id = $2
  //       ORDER BY node_code ASC 
  //       ;
  //   `;

  //   const rows = await this.sequelize.query(dataQuery, {
  //     bind: [entity_id, organisation_id],
  //     type: Sequelize.QueryTypes.SELECT
  //   });

  //   // 2. helper to group into parent/child
  //   function nestByFsli(data) {
  //     const groups = data.reduce((acc, row) => {
  //       const key = `${row.flsi_master_name}__${row.mappted_to_fsli_id}`;
  //       if (!acc[key]) {
  //         acc[key] = {
  //           flsi_master_name: row.flsi_master_name,
  //           mappted_to_fsli_id: row.mappted_to_fsli_id,
  //           children: []
  //         };
  //       }
  //       acc[key].children.push({
  //         id:            row.id,
  //         gl_name:       row.gl_name.trim(),
  //         falling_under: row.falling_under,
  //         gl_code:       row.gl_code
  //       });
  //       return acc;
  //     }, {});

  //     return Object.values(groups);
  //   }

  //   // 3. run the grouping
  //   const nested = nestByFsli(rows);

  //   // 4. return it
  //   return {

  //     data: nested
  //   };
  // }



  // async getAllgroupview(entity_id, organisation_id) {
  //   // 1. pull back the flat list
  //   const sql = `
  //     SELECT b.flsi_master_name,
  //            a.id,
  //            a.gl_name,
  //            a.falling_under,
  //            a.mappted_to_fsli_id,

  //            a.is_active,

  //            a.organisation_id,
  //            a.gl_code
  //       FROM public.fss_param_oe_mapping_gl_fsli a
  //       LEFT JOIN public.fss_param_oe_fsli b
  //         ON b.id = a.mappted_to_fsli_id
  //      WHERE a.entity_id      = $1
  //        AND a.organisation_id = $2
  //      ORDER BY a.id;
  //   `;
  //   const rows = await this.sequelize.query(sql, {
  //     bind: [entity_id, organisation_id],
  //     type: Sequelize.QueryTypes.SELECT
  //   });

  //   // 2. build the tree
  //   function buildTree(items) {
  //     const lookup = {};
  //     // first pass: create a map of id → node (and give each an empty children array)
  //     items.forEach(item => {
  //       lookup[item.id] = { 
  //         ...item,
  //         gl_name: item.gl_name.trim(),
  //         children: []
  //       };
  //     });

  //     // second pass: link children into their parent, or collect roots
  //     const roots = [];
  //     items.forEach(item => {
  //       const node = lookup[item.id];
  //       if (item.falling_under != null && lookup[item.falling_under]) {
  //         lookup[item.falling_under].children.push(node);
  //       } else {
  //         roots.push(node);
  //       }
  //     });

  //     return roots;
  //   }

  //   const tree = buildTree(rows);

  //    return {
  //     success: true,
  //     message: "fetched successfully",
  //     data: tree
  //   };
  // }




}




module.exports = FssParamOeMappingGlFsliRaw;
