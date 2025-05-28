const { Sequelize, Op } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");
const FssParamOEMappingGlFsliModel = require('../../models/fssParamOEMappingGlFsliOrm');

class dataTbDbRaw {


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


 async importdata(tmp_tblname, data) {
    // Step 1: Create TEMP TABLE
    console.log(data)
    const createQuery = `
      CREATE TABLE IF NOT EXISTS "${tmp_tblname}" (
        id SERIAL PRIMARY KEY,
        GL_Name TEXT,
        OB NUMERIC(20,2),
        Debit NUMERIC(20,2),
        Credit NUMERIC(20,2),
        CB NUMERIC(20,2)
      ) ;
    `;

    await this.sequelize.query(createQuery);
    console.log(`table ${tmp_tblname} created.`);

    // Step 2: Prepare data
 // Helper function to safely parse numeric values
  const toNumericOrNull = (value) => {
    if (value === undefined || value === null || value === '') return null;
    const num = parseFloat(value.toString().replace(/,/g, '').trim());
    return isNaN(num) ? null : parseFloat(num.toFixed(2));
  };
  const toNumericOrZero = (value) => {
  const cleaned = value?.toString().replace(/,/g, '').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0.00 : Number(num.toFixed(2));
};


  // Step 2: Prepare data
  const rows = data.map(row => [
    row["GL_Name"]?.toString().trim() || null,
    toNumericOrZero(row["OB"]),
    toNumericOrZero(row["Debit"]),
    toNumericOrZero(row["Credit"]),
    toNumericOrZero(row["CB"])
   
  ]);
  //console.log("venkat")
  //console.log(rows);


    if (rows.length === 0) {
      console.warn('No rows found to insert');
      return;
    }

    // Step 3: Generate placeholders
    const placeholders = rows.map(
      (_, i) => `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`
    ).join(", ");

    const flatValues = rows.flat();

    // Step 4: Insert data
    const insertQuery = `
      INSERT INTO "${tmp_tblname}" (GL_Name, OB, Debit, Credit, CB)
      VALUES ${placeholders};
    `;

    //await this.sequelize.query(insertQuery, { bind: flatValues });
    try {
        await this.sequelize.query(insertQuery, { bind: flatValues });
        console.log(`Inserted ${rows.length} records into ${tmp_tblname}`);
        } catch (err) {
        console.error(`Insert failed for table ${tmp_tblname}`, err.message);
        }

    //console.log(`Inserted ${rows.length} records into ${tmp_tblname}`);
  }

async getAllTbDb(
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
    'a.is_loaded = 1',
    'a.entity_id = $1',
    'a.organisation_id = $2'
  ];
  const replacements = [entity_id, organisation_id];

  // ✅ Add dynamic filters from searchFilters object
  for (const [key, value] of Object.entries(searchFilters)) {
    if (!value) continue;

    let alias = 'a';

   
   
    if (['location_name'].includes(key)) {
        alias = 'e';
      }

    const placeholder = `$${replacements.length + 1}`;
    whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
    replacements.push(`%${value}%`);
  }

  const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM fss_tran_oepl_tb_batches a
   
    LEFT JOIN basic_param_oe_locations e ON a.location_id = e.id
       
    ${whereSQL}
  `;

  const countResult = await this.sequelize.query(countQuery, {
    bind: replacements,
    type: Sequelize.QueryTypes.SELECT
  });

  const total = parseInt(countResult[0].total, 10) || 0;

  const dataQuery = `
    SELECT
      a.*,e.location_name
    FROM fss_tran_oepl_tb_batches a
   
    LEFT JOIN basic_param_oe_locations e ON a.location_id = e.id
   
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


async getAllTbDbUnloaded(
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
    'a.is_loaded = 0',
    'a.entity_id = $1',
    'a.organisation_id = $2'
  ];
  const replacements = [entity_id, organisation_id];

  // ✅ Add dynamic filters from searchFilters object
  for (const [key, value] of Object.entries(searchFilters)) {
    if (!value) continue;

    let alias = 'a';

   
   
    if (['location_name'].includes(key)) {
        alias = 'e';
      }

    const placeholder = `$${replacements.length + 1}`;
    whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
    replacements.push(`%${value}%`);
  }

  const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM fss_tran_oepl_tb_batches a
   
    LEFT JOIN basic_param_oe_locations e ON a.location_id = e.id
       
    ${whereSQL}
  `;

  const countResult = await this.sequelize.query(countQuery, {
    bind: replacements,
    type: Sequelize.QueryTypes.SELECT
  });

  const total = parseInt(countResult[0].total, 10) || 0;

  const dataQuery = `
    SELECT
      a.*,e.location_name
    FROM fss_tran_oepl_tb_batches a
   
    LEFT JOIN basic_param_oe_locations e ON a.location_id = e.id
   
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


async createtbbatch( record) {
    const is_active = true;
    const created_on = new Date(); // Current timestamp

    const query = `
        INSERT INTO fss_tran_oepl_tb_batches (
            organisation_id, entity_id, period_id, location_id,
            batch_name, source_type, source_address, source_data_table,
            is_active, created_by, created_on,batch_type,is_loaded
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13
        )
        RETURNING *
    `;

    const replacements = [
        record.organisation_id, record.entity_id, record.period_id, record.location_id,
        record.batch_name, record.source_type, record.source_address, record.source_data_table,
        record.is_active, record.created_by, record.created_on, record.batch_type,
        record.is_loaded
    ];

    const [result] = await this.sequelize.query(query, {
        bind: replacements,
        type: Sequelize.QueryTypes.INSERT
      });
  
    return result;


}

/**
   * Get temporary table name and location_id using batch_id
   */
  async getBatchMetadata(batch_id) {
    const query = `
      SELECT source_data_table, location_id
      FROM fss_tran_oepl_tb_batches
      WHERE id = $1
    `;

    const [result] = await this.sequelize.query(query, {
      bind: [batch_id],
      type: Sequelize.QueryTypes.SELECT
    });

    if (!result) {
      throw new Error(`No batch found with ID: ${batch_id}`);
    }

    return {
      tmp_tblname: result.source_data_table,
      location_id: result.location_id
    };
  }

  /**
   * Main orchestrator: Insert missing GLs and corresponding values using batch_id
   */
 /* async insertGLsAndValuesFromBatchId({ batch_id, entity_id, organisation_id, period_id }) {
    const { tmp_tblname, location_id } = await this.getBatchMetadata(batch_id);

    if (!tmp_tblname) {
      throw new Error(`No temp table found for batch_id: ${batch_id}`);
    }

    await this.insertNewGLsIfNotExist({ tmp_tblname, entity_id, organisation_id });

    await this.insertGLValuesFromTmpTable({ tmp_tblname, entity_id, organisation_id, location_id, period_id });


     // Step 4: Update is_loaded = 1 for the batch
    const updateQuery = `
    UPDATE fss_tran_oepl_tb_batches
    SET is_loaded = 1
    WHERE id = $1
  `;

  await this.sequelize.query(updateQuery, {
    bind: [batch_id],
    type: Sequelize.QueryTypes.UPDATE
  });

    console.log(`✅ Processed batch_id ${batch_id} successfully.`);
  }
*/


async insertGLsAndValuesFromBatchId({ batch_id, entity_id, organisation_id, period_id }) {
  try {
    const { tmp_tblname, location_id } = await this.getBatchMetadata(batch_id);

    if (!tmp_tblname) {
      throw new Error(`No temp table found for batch_id: ${batch_id}`);
    }

    await this.insertNewGLsIfNotExist({ tmp_tblname, entity_id, organisation_id });

    await this.insertGLValuesFromTmpTable({ tmp_tblname, entity_id, organisation_id, location_id, period_id , batch_id});

    const updateQuery = `
      UPDATE fss_tran_oepl_tb_batches
      SET is_loaded = 1
      WHERE id = $1
    `;

    await this.sequelize.query(updateQuery, {
      bind: [batch_id],
      type: Sequelize.QueryTypes.UPDATE
    });

    console.log(`✅ Processed batch_id ${batch_id} successfully.`);
  } catch (err) {
    console.error(`❌ Failed to process batch_id ${batch_id}:`, err);
    throw err; // rethrow for outer catch
  }
}


async unLoadBatch({ batch_id, entity_id, organisation_id, period_id }) {
  try {
   

    const deleteValuesQuery = `
  DELETE FROM fss_tran_oepl_tb_values
  WHERE batch_id = $1::INTEGER
    AND entity_id = $2::INTEGER
    AND organisation_id = $3::INTEGER
`;

await this.sequelize.query(deleteValuesQuery, {
  bind: [
    Number(batch_id),
    Number(entity_id),
    Number(organisation_id)
  ],
  type: Sequelize.QueryTypes.DELETE,
  logging: console.log
});

console.log("🗑️ Deleted entries from fss_tran_oepl_tb_values for given batch, entity, and organisation.");


const updateQuery = `
      UPDATE fss_tran_oepl_tb_batches
      SET is_loaded = 0
      WHERE id = $1
    `;

    await this.sequelize.query(updateQuery, {
      bind: [batch_id],
      type: Sequelize.QueryTypes.UPDATE,
      logging: console.log
    });

    console.log(`✅ Processed Updating batch_id ${batch_id} successfully.`);
  } catch (err) {
    console.error(`❌ Failed to process batch_id ${batch_id}:`, err);
    throw err; // rethrow for outer catch
  }
}

  /**
   * Insert missing GLs from temp table into fss_param_oe_mapping_gl_fsli
   */
  async insertNewGLsIfNotExist({ tmp_tblname, entity_id, organisation_id }) {
  

    const insertGLQuery = `
  INSERT INTO fss_param_oe_mapping_gl_fsli (gl_name, entity_id, organisation_id)
  SELECT DISTINCT t.gl_name, $1::INTEGER, $2::INTEGER
  FROM "${tmp_tblname}" t
  WHERE NOT EXISTS (
    SELECT 1
    FROM fss_param_oe_mapping_gl_fsli g
    WHERE g.gl_name = t.gl_name AND g.entity_id = $1::INTEGER AND g.organisation_id = $2::INTEGER
  )
`;

await this.sequelize.query(insertGLQuery, {
  bind: [Number(entity_id), Number(organisation_id)],
  type: Sequelize.QueryTypes.INSERT
});

console.log("✅ New GLs inserted where necessary.");



  }

  /**
   * Insert GL values using temp table mapped to gl_id from fss_param_oe_mapping_gl_fsli
   */
  async insertGLValuesFromTmpTable({ tmp_tblname, entity_id, organisation_id, location_id, period_id,batch_id }) {
  

    const insertValuesQuery = `
  INSERT INTO fss_tran_oepl_tb_values (
    gl_id, opening_amount, debit_amount, credit_amount, net_amount,
    entity_id, location_id, period_id, organisation_id, batch_id
  )
  SELECT
    g.id AS gl_id,
    COALESCE(t.OB, 0),
    COALESCE(t.Debit, 0),
    COALESCE(t.Credit, 0),
    COALESCE(t.CB, 0),
    $1::INTEGER AS entity_id,
    $2::INTEGER AS location_id,
    $3::INTEGER AS period_id,
    $4::INTEGER AS organisation_id,
    $5::INTEGER AS batch_id
  FROM "${tmp_tblname}" t
  JOIN fss_param_oe_mapping_gl_fsli g
    ON g.gl_name = t.gl_name AND g.entity_id = $1::INTEGER AND g.organisation_id = $4::INTEGER
`;

await this.sequelize.query(insertValuesQuery, {
  bind: [
    Number(entity_id),
    Number(location_id),
    Number(period_id),
    Number(organisation_id),
    Number(batch_id) // 👈 Add this
  ],
  type: Sequelize.QueryTypes.INSERT
});

console.log("✅ GL values inserted into fss_tran_oepl_tb_values.");


  }






};





module.exports = dataTbDbRaw;
