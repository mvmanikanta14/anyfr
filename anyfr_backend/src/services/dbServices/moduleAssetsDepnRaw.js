const { Sequelize, Op } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");

const FssParamOEMappingGlFsliModel = require('../../models/fssParamOEMappingGlFsliOrm');


class moduleInvestmentRegisterRaw {


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



  async create( record) {
    const is_active = true;
    const created_on = new Date(); // Current timestamp

    const query = `
        INSERT INTO ppe_tran_oe_register (
            organisation_id, entity_id, asset_code, asset_description,
            category_id, sub_category_id, block_id, purchase_date,
            purchase_cost, salvage_value, useful_life, location, 
            remarks, created_by, created_on, is_active
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13, $14, $15, $16
        )
        RETURNING *
    `;

    const replacements = [
        record.organisation_id, record.entity_id, record.asset_code, record.asset_description,
        record.category_id, record.sub_category_id, record.block_id, record.purchase_date,
        record.purchase_cost, record.salvage_value, record.useful_life, record.location,
        record.remarks, record.created_by, created_on, is_active
    ];

    const [result] = await this.sequelize.query(query, {
        bind: replacements,
        type: Sequelize.QueryTypes.INSERT
      });
  
    return result;


}

//for excel upload
async getOrCreateCategoryId(categoryName) {
  const created_on = new Date();
  const is_active = true;

  // Step 1: Check if category already exists
  const [existing] = await this.sequelize.query(
    `SELECT id FROM ppe_mast_categories WHERE category_name = $1 LIMIT 1`,
    {
      bind: [categoryName],
      type: Sequelize.QueryTypes.SELECT
    }
  );

  if (existing) {
    return existing.id;
  }

  // Step 2: If not found, insert new category and return its ID
  /*const [inserted] = await this.sequelize.query(
    `
      INSERT INTO ppe_mast_categories (category_name, created_on, is_active)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
    {
      bind: [categoryName, created_on, is_active],
      type: Sequelize.QueryTypes.INSERT
    }
  );

  return inserted.id;
  */
 const [_, insertedRows] = await this.sequelize.query(
  `
    INSERT INTO ppe_mast_categories (category_name, created_on, is_active)
    VALUES ($1, $2, $3)
    RETURNING id
  `,
  {
    bind: [categoryName, created_on, is_active],
    type: Sequelize.QueryTypes.INSERT
  }
);

return insertedRows[0].id;
}

//for excel upload
async getOrCreateSubCategoryId(category_id, subCategoryName) {
  const created_on = new Date();
  const is_active = true;
 const block_id = 1;
  // Step 1: Check if sub-category exists under the given category
  const [existing] = await this.sequelize.query(
    `SELECT id FROM ppe_mast_sub_categories 
     WHERE category_id = $1 AND sub_category_name = $2 LIMIT 1`,
    {
      bind: [category_id, subCategoryName],
      type: Sequelize.QueryTypes.SELECT
    }
  );

  if (existing) {
    return existing.id;
  }

  // Step 2: Insert sub-category if not found
 const [_, insertedRows] = await this.sequelize.query(
  `
    INSERT INTO ppe_mast_sub_categories 
      (category_id, sub_category_name, created_on, is_active, block_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `,
  {
    bind: [category_id, subCategoryName, created_on, is_active, block_id],
    type: Sequelize.QueryTypes.INSERT
  }
);

return insertedRows[0].id; // ✅ Correct way to get inserted ID
}

//for excel upload
async getOrCreateBlockId(blockName) {
  const created_on = new Date();
  const is_active = true;

  // Step 1: Check if block already exists
  const [existing] = await this.sequelize.query(
    `SELECT id FROM ppe_mast_blocks WHERE block_name = $1 LIMIT 1`,
    {
      bind: [blockName],
      type: Sequelize.QueryTypes.SELECT
    }
  );

  if (existing) {
    return existing.id;
  }

  // Step 2: If not found, insert new block and return its ID
  const [_, insertedRows] = await this.sequelize.query(
    `
      INSERT INTO ppe_mast_blocks (block_name, created_on, is_active)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
    {
      bind: [blockName, created_on, is_active],
      type: Sequelize.QueryTypes.INSERT
    }
  );

  return insertedRows[0].id; // ✅ Return correct ID
}


async getOrCreateBlockIdOLDS(blockName) {
  const created_on = new Date();
  const is_active = true;

  // Step 1: Check if block exists
  const [existing] = await this.sequelize.query(
    `SELECT id FROM ppe_mast_blocks 
     WHERE block_name = $1 LIMIT 1`,
    {
      bind: [blockName],
      type: Sequelize.QueryTypes.SELECT
    }
  );

  if (existing) {
    return existing.id;
  }

  // Step 2: Insert block if not found
  const [inserted] = await this.sequelize.query(
    `
      INSERT INTO ppe_mast_blocks 
        (block_name, created_on, is_active)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
    {
      bind: [blockName, created_on, is_active],
      type: Sequelize.QueryTypes.INSERT
    }
  );

  return inserted.id;
}

//for excel upload
async getOrCreateLocationId(locationName, organisation_id, entity_id) {
  const created_on = new Date();
  const is_active = true;

  // Step 1: Check if the location exists for the given org and entity
  const [existing] = await this.sequelize.query(
    `SELECT id FROM basic_param_oe_locations 
     WHERE location_name = $1 AND organisation_id = $2 AND entity_id = $3 
     LIMIT 1`,
    {
      bind: [locationName, organisation_id, entity_id],
      type: Sequelize.QueryTypes.SELECT
    }
  );

  if (existing) {
    return existing.id;
  }

  // Step 2: Insert if not found
  const [inserted] = await this.sequelize.query(
    `
      INSERT INTO basic_param_oe_locations 
        (location_name, organisation_id, entity_id, created_on, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `,
    {
      bind: [locationName, organisation_id, entity_id, created_on, is_active],
      type: Sequelize.QueryTypes.INSERT
    }
  );

  return inserted.id;
}






async update(id, record) {
    const updated_on = new Date(); // Timestamp

    const query = `
        UPDATE ppe_tran_oe_register
        SET
            asset_code = $1,
            asset_description = $2,
            purchase_date = $3,
            purchase_cost = $4,
            salvage_value = $5,
            useful_life = $6,
            remarks = $7,
            category_id = $8,
            sub_category_id = $9,
            block_id = $10,
            location = $11,
            entity_id = $12,
            organisation_id = $13,
            updated_by = $14,
            updated_on = $15
            WHERE id = $16
        RETURNING *
    `;

    const replacements = [
        record.asset_code,
        record.asset_description,
        record.purchase_date,
        record.purchase_cost,
        record.salvage_value,
        record.useful_life,
        record.remarks,
        record.category_id,
        record.sub_category_id,
        record.block_id,
        record.location,
        record.entity_id,
        record.organisation_id,
        record.created_by, // assuming created_by = updated_by
        updated_on,       
        record.id // ID for WHERE clause
    ];

    const [result] = await this.sequelize.query(query, {
        bind: replacements,
        type: Sequelize.QueryTypes.UPDATE
    });

    return result;
}



  async edit({ organisation_id, entity_id, period_id, is_current, investee_type_id, instrument_type_id, measurement_type_id, is_fully_paid = false, is_exercised, investment_name, instrument_from, instrument_to, investment_date, gross_value_invested, provision_for_diminution, carrying_value, id }) {



    const updateQuery = `
       UPDATE inv_tran_register
        SET 
            organisation_id = $1,
            entity_id = $2,
            period_id = $3,
            is_current = $4,
            investee_type_id = $5,
            instrument_type_id = $6,
            measurement_type_id = $7,
            is_fully_paid = $8,
            is_exercised = $9,
            investment_name = $10,
            instrument_from = $11,
            instrument_to = $12,
            investment_date = $13,
            gross_value_invested = $14,
            provision_for_diminution = $15,
            carrying_value = $16
        WHERE 
            organisation_id = $1
            AND entity_id = $2
            AND id = $17
        RETURNING *;
        `;

    const replacements = [organisation_id, entity_id, period_id, is_current, investee_type_id, instrument_type_id, measurement_type_id, is_fully_paid, is_exercised, investment_name, instrument_from, instrument_to, investment_date, gross_value_invested, provision_for_diminution, carrying_value, id];

 
    const [result] = await this.sequelize.query(updateQuery, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }


  // Soft delete (deactivate) a mapping
  async softDelete(id) {
    const query = `
      UPDATE ppe_tran_oe_register
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
      UPDATE inv_tran_register
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

/*
  async getAll(
    page = 1,
    limit = 10,
    entity_id,
    organisation_id,
    key = '',
    value = '',
    sortOn = 'id',
    sortDir = 'DESC'
  ) {
    // 1. Pagination math
    const offset = (page - 1) * limit;

    // 2. Whitelist sortable columns (with aliases)
    const columnsMap = {
      id: 'a.id',
      gl_name: 'a.gl_name',
      mappted_to_fsli_id: 'a.mappted_to_fsli_id',
      flsi_master_name: 'b.flsi_master_name',
      custom_name: 'b.custom_name',
      falling_under_name: 'parent.gl_name',
      created_on: 'a.created_on'
    };
    const sortColumn = columnsMap[sortOn] || 'a.id';
    const direction = sortDir.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // 3. Build WHERE clause & bind parameters
    const whereClauses = [
      'a.is_active = TRUE',
      'a.entity_id = $1',
      'a.organisation_id = $2'
    ];
    const replacements = [entity_id, organisation_id];
  
  //  if (key && value) {
  //     const placeholder = `$${replacements.length + 1}`;
  //     if (key === 'falling_under_name') {
  //       whereClauses.push(`parent.gl_name ILIKE ${placeholder}`);
  //     } else {
  //       // determine which table alias to use
  //       const alias = ['flsi_master_name','custom_name'].includes(key) ? 'b' : 'a';
  //       whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
  //     }
  //     replacements.push(`%${value}%`);
  //   }

  if (key && value) {
    const placeholder = `$${replacements.length + 1}`;
    
    // Determine which alias to use based on the key
    let alias = 'a';  // Default alias
    
    // Check if the key matches any of the specified ones
    if (['investee_type_name'].includes(key)) {
      alias = 'b';  // If the key is 'investee_type_name', use alias 'b'
    } else if (['instrument_type_name'].includes(key)) {
      alias = 'c';  // If the key is 'instrument_type_name', use alias 'c'
    } else if (['measurement_type_name'].includes(key)) {
      alias = 'd';  // If the key is 'measurement_type_name', use alias 'd'
    } else if (key === 'falling_under_name') {
      // Special case for 'falling_under_name'
      whereClauses.push(`parent.gl_name ILIKE ${placeholder}`);
      replacements.push(`%${value}%`);
      return;  
    }
  
    // For all other cases, build the WHERE clause for the key
    whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
    replacements.push(`%${value}%`);
  }
  
    const whereSQL = whereClauses.length
      ? 'WHERE ' + whereClauses.join(' AND ')
      : '';

    // 4. Count total matching rows (with same joins + where)
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM inv_tran_register a    
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
        b.investee_type_name,
		c.instrument_type_name,
		d.measurement_type_name
      FROM inv_tran_register a
      LEFT JOIN ppe_mast_categories b ON a.investee_type_id = b.id
	  LEFT JOIN inv_mast_instrument_types c ON a.instrument_type_id = c.id
	  LEFT JOIN inv_mast_measurement_types d ON a.measurement_type_id = d.id
	  
      ${whereSQL}
      ORDER BY ${sortColumn} ${direction}
      LIMIT $${replacements.length + 1}
      OFFSET $${replacements.length + 2}
    `;

    const finalQuery = dataQuery.replace(/\$(\d+)/g, (_, index) => {
      return `'${replacements[parseInt(index, 10) - 1]}'`; // Replace placeholders with actual values
  });
   
   console.log("Final SQL Query:", finalQuery);




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
*/
async getAll(
  page = 1,
  limit = 10,
  entity_id,
  organisation_id,
  searchFilters = {},
  sortOn = 'id',
  sortDir = 'ASC'
) {
  const offset = (page - 1) * limit;

  const columnsMap = {
    id: 'a.id'
    };

  const sortColumn = columnsMap[sortOn] || 'a.id';
  const direction = sortDir.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const whereClauses = [
    'a.is_active = TRUE',
    'a.entity_id = $1',
    'a.organisation_id = $2'
  ];
  const replacements = [entity_id, organisation_id];

  // ✅ Add dynamic filters from searchFilters object
  for (const [key, value] of Object.entries(searchFilters)) {
    if (!value) continue;

    let alias = 'a';

   
    if (['category_name'].includes(key)) {
      alias = 'b';
    } else if (['sub_category_name'].includes(key)) {
      alias = 'c';
    } else if (['block_name'].includes(key)) {
      alias = 'd';
    }
    else if (['location_name'].includes(key)) {
        alias = 'e';
      }

    const placeholder = `$${replacements.length + 1}`;
    whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
    replacements.push(`%${value}%`);
  }

  const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM ppe_tran_oe_register a
    LEFT JOIN ppe_mast_categories b ON a.category_id = b.id
    LEFT JOIN ppe_mast_sub_categories c ON a.sub_category_id = c.id
    LEFT JOIN ppe_mast_blocks d ON a.block_id = d.id
    LEFT JOIN basic_param_oe_locations e ON a.location = e.id
       
    ${whereSQL}
  `;

  const countResult = await this.sequelize.query(countQuery, {
    bind: replacements,
    type: Sequelize.QueryTypes.SELECT
  });

  const total = parseInt(countResult[0].total, 10) || 0;

  const dataQuery = `
    SELECT
      a.*,b.category_name,c.sub_category_name,d.block_name,e.location_name
    FROM ppe_tran_oe_register a
    LEFT JOIN ppe_mast_categories b ON a.category_id = b.id
    LEFT JOIN ppe_mast_sub_categories c ON a.sub_category_id = c.id
    LEFT JOIN ppe_mast_blocks d ON a.block_id = d.id
    LEFT JOIN basic_param_oe_locations e ON a.location = e.id
   
    ${whereSQL}
    ORDER BY ${sortColumn} ${direction}
    LIMIT $${replacements.length + 1}
    OFFSET $${replacements.length + 2}
  `;

  const data = await this.sequelize.query(dataQuery, {
    bind: [...replacements, limit, offset],
    type: Sequelize.QueryTypes.SELECT
  });

  return {
    total,
    page,
    limit,
    data
  };
}


  async getAllInactive(
    page = 1,
    limit = 10,
    entity_id,
    organisation_id,
    key = '',
    value = '',
    sortOn = 'id',
    sortDir = 'DESC'
  ) {
    // 1. Pagination math
    const offset = (page - 1) * limit;

    // 2. Whitelist sortable columns (with aliases)
    const columnsMap = {
      id: 'a.id',
      gl_name: 'a.gl_name',
      mappted_to_fsli_id: 'a.mappted_to_fsli_id',
      flsi_master_name: 'b.flsi_master_name',
      custom_name: 'b.custom_name',
      falling_under_name: 'parent.gl_name',
      created_on: 'a.created_on'
    };
    const sortColumn = columnsMap[sortOn] || 'a.id';
    const direction = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

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
        const alias = ['flsi_master_name', 'custom_name'].includes(key) ? 'b' : 'a';
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
      FROM inv_tran_register a   
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
        b.investee_type_name,
		c.instrument_type_name,
		d.measurement_type_name
      FROM inv_tran_register a
      LEFT JOIN ppe_mast_categories b ON a.investee_type_id = b.id
	  LEFT JOIN inv_mast_instrument_types c ON a.instrument_type_id = c.id
	  LEFT JOIN inv_mast_measurement_types d ON a.measurement_type_id = d.id
	  
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
    key = '',
    value = '',
    sortOn = 'id',
    sortDir = 'DESC'
  ) {
    // 1. Whitelist sortable columns (with table aliases)
    const columnsMap = {
      id: 'a.id',
      gl_name: 'a.gl_name',
      mappted_to_fsli_id: 'a.mappted_to_fsli_id',
      flsi_master_name: 'b.flsi_master_name',
      custom_name: 'b.custom_name',
      falling_under_name: 'parent.gl_name'
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
    const direction = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

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
  async getAllSubCategory(category_id, organisation_id) {
  

    const sql = `SELECT * FROM ppe_mast_sub_categories WHERE category_id =$1 AND is_active = true`;

    const data = await this.sequelize.query(sql, {
        bind: [category_id],
        type: Sequelize.QueryTypes.SELECT
      });

      return { data };
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

  async getAllCategory() {
    const dataQuery = ` SELECT  * FROM ppe_mast_categories a 
    WHERE a.is_active = true ORDER BY a.created_on DESC `;
    const data = await this.sequelize.query(dataQuery, {
      type: Sequelize.QueryTypes.SELECT
    });

    return { data };
  }
  async getAllBlock() {
    const dataQuery = ` SELECT  * FROM ppe_mast_blocks a 
    WHERE a.is_active = true ORDER BY a.created_on DESC `;
    const data = await this.sequelize.query(dataQuery, {
      type: Sequelize.QueryTypes.SELECT
    });

    return { data };
  }

  async getAllInstruementsTypes() {

    const dataQuery = `
        SELECT
        id,instrument_type_code,instrument_type_name
        FROM inv_mast_instrument_types
        WHERE is_active = True ORDER BY instrument_type_name ASC
      `;

    const data = await this.sequelize.query(dataQuery, {
      type: Sequelize.QueryTypes.SELECT
    });


    return { data };
  }

  async getAllMeasurementsTypes() {

    const dataQuery = `
        SELECT
        id,measurement_type_code,measurement_type_name
        FROM inv_mast_measurement_types
        WHERE is_active = True ORDER BY measurement_type_name ASC
      `;

    const data = await this.sequelize.query(dataQuery, {
      type: Sequelize.QueryTypes.SELECT
    });


    return { data };
  }





}




module.exports = moduleInvestmentRegisterRaw;
