const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicParamEntitiesRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new entity (RAW SQL)
  async create({ entity_name, reporting_frequency, financial_year_style, financial_framework_id,  is_cfs_applicable,is_active,organisation_id, created_by,  reporting_period }) {
    const query = `
      INSERT INTO basic_param_entities (entity_name, reporting_frequency, financial_year_style, financial_framework_id, is_cfs_applicable,is_active,organisation_id, created_by, reporting_period)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;

    const replacements = [entity_name, reporting_frequency, financial_year_style, financial_framework_id,  is_cfs_applicable,is_active,organisation_id, created_by , reporting_period];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit entity details
  async edit(id, {  entity_name, reporting_frequency, financial_year_style, financial_framework_id,  is_cfs_applicable,is_active, created_by , reporting_period}) {
    const query = `
      UPDATE basic_param_entities
      SET entity_name = $1, reporting_frequency = $2, financial_year_style = $3, financial_framework_id = $4, is_cfs_applicable = $5, is_active = $6, created_by = $7 , reporting_period = $8
      WHERE id = $9
      RETURNING *`;

    const replacements = [ entity_name, reporting_frequency, financial_year_style, financial_framework_id,  is_cfs_applicable,is_active, created_by ,reporting_period,  id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Edit entity details
  async addTan(id, {  entity_tan ,entity_cin , financial_framework_id,entity_pan }) {
    const query = `
      UPDATE basic_param_entities
      SET entity_tan = $1, entity_cin = $2, financial_framework_id = $3, entity_pan = $4
      WHERE id = $5
      RETURNING *`;

    const replacements = [ entity_tan , entity_cin , financial_framework_id,entity_pan,  id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Soft delete entity
  async softDelete(id) {
    const query = `
      UPDATE basic_param_entities
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

  async softDeleteRemove(id) {
    const query = `
      UPDATE basic_param_entities
      SET is_active = True
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Get all entities (Paginated)
//   async getAll(page = 1, limit = 10) {
//     const offset = (page - 1) * limit;

//     try {
//         // Query to get total count of records
//         const countQuery = `SELECT COUNT(*) AS total FROM basic_param_entities WHERE is_active = TRUE`;
//         const countResult = await this.sequelize.query(countQuery, {
//             type: Sequelize.QueryTypes.SELECT
//         });

//         // Ensure countResult is not wrapped in an extra array
//         const total = countResult?.[0]?.total ?? 0;

//         // Query to fetch paginated results
//         const dataQuery = `
//           SELECT b.framework_name ,b.id as fid, a.id,a.reporting_period, a.entity_name, a.entity_pan,a.entity_tan,a.entity_cin, a.reporting_frequency, a.financial_year_style, a.is_active
//           FROM basic_param_entities a left join fss_mast_frameworks b on a.financial_framework_id = b.id
//           WHERE a.is_active = TRUE
//           ORDER BY a.id DESC
//           LIMIT $1 OFFSET $2`;

//         const data = await this.sequelize.query(dataQuery, {
//             bind: [limit, offset],
//             type: Sequelize.QueryTypes.SELECT
//         });

//         return { total, page, limit, data };
//     } catch (error) {
//         console.error("Error in getAll:", error);
//         throw new Error("Database query failed");
//     }
// }


async getAll(
  page        = 1,
  limit       = 10,
  key         = '',        
  value       = '',
  sortOn      = 'id', 
  sortDir     = 'DESC'
) {
  // 1. Pagination math
  const offset = (page - 1) * limit;

   

  // 2. Whitelist sortable columns (with table aliases)
  const columnsMap = {
    id:                   'a.id',
    entity_name:          'a.entity_name',
    reporting_period:     'a.reporting_period',
    entity_pan:           'a.entity_pan',
    entity_tan:           'a.entity_tan',
    entity_cin:           'a.entity_cin',
    reporting_frequency:  'a.reporting_frequency',
    financial_year_style: 'a.financial_year_style',
    is_active:            'a.is_active',
    framework_name:       'b.framework_name'
  };
  const sortColumn = columnsMap[sortOn] || 'a.id';
  const direction  = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  // 3. Build WHERE clause & bind parameters
  const whereClauses = ['a.is_active = TRUE'];
  const replacements = [];

  if (key && value && columnsMap[key]) {
    const placeholder = `$${replacements.length + 1}`;
    // text‐search with ILIKE; cast non‐text if needed
    whereClauses.push(`CAST(${columnsMap[key]} AS TEXT) ILIKE ${placeholder}`);
    replacements.push(`%${value}%`);
  }
  const whereSQL = whereClauses.length
    ? 'WHERE ' + whereClauses.join(' AND ')
    : '';

  // 4. Count total matching rows
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM basic_param_entities a
    LEFT JOIN fss_mast_frameworks b
      ON a.financial_framework_id = b.id
    ${whereSQL}
  `;
  const countResult = await this.sequelize.query(countQuery, {
    bind: replacements,
    type: Sequelize.QueryTypes.SELECT
  });
  const total = parseInt(countResult[0].total, 10) || 0;

  // 5. Fetch page of data
  // add LIMIT and OFFSET placeholders at the end
  const dataQuery = `
    SELECT
      b.framework_name,
      b.id AS fid,
      a.id,
      a.reporting_period,
      a.entity_name,
      a.entity_pan,
      a.entity_tan,
      a.entity_cin,
      a.reporting_frequency,
      a.financial_year_style,
      a.is_active
    FROM basic_param_entities a
    LEFT JOIN fss_mast_frameworks b
      ON a.financial_framework_id = b.id
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


async getAllMaster() {
  try {
     
      const dataQuery = `
         SELECT * FROM public.fss_mast_frameworks where is_active = True
          ORDER BY id ASC `;

      const data = await this.sequelize.query(dataQuery, {
          type: Sequelize.QueryTypes.SELECT
      });

      return { data };
  } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
  }
}



async getAlldropdown() {
  try {
      const dataQuery = `
        SELECT b.framework_name, b.id as fid, a.id, a.reporting_period, a.entity_name, a.entity_pan,
               a.entity_tan, a.entity_cin, a.reporting_frequency, a.financial_year_style, a.is_active
        FROM basic_param_entities a
        LEFT JOIN fss_mast_frameworks b ON a.financial_framework_id = b.id
        WHERE a.is_active = TRUE
        ORDER BY a.id DESC
      `;

      const data = await this.sequelize.query(dataQuery, {
          type: Sequelize.QueryTypes.SELECT
      });

      return { total: data.length, data };
  } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
  }
}


async getAllInactive(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  try {
      // Query to get total count of records
      const countQuery = `SELECT COUNT(*) AS total FROM basic_param_entities WHERE is_active = False`;
      const countResult = await this.sequelize.query(countQuery, {
          type: Sequelize.QueryTypes.SELECT
      });

      // Ensure countResult is not wrapped in an extra array
      const total = countResult?.[0]?.total ?? 0;

      // Query to fetch paginated results
      const dataQuery = `
        SELECT b.framework_name ,b.id as fid, a.id,a.reporting_period, a.entity_name, a.entity_pan,a.entity_tan,a.entity_cin, a.reporting_frequency, a.financial_year_style, a.is_active
        FROM basic_param_entities a left join fss_mast_frameworks b on a.financial_framework_id = b.id
        WHERE a.is_active = False
        ORDER BY a.id DESC
        LIMIT $1 OFFSET $2`;

      const data = await this.sequelize.query(dataQuery, {
          bind: [limit, offset],
          type: Sequelize.QueryTypes.SELECT
      });

      return { total, page, limit, data };
  } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
  }
}


async getModule(entity_id) {
 
  try {
      const dataQuery = `
        SELECT
        a.*,
        CASE
          WHEN b.module_id IS NULL THEN 'Not Configured'
          ELSE 'Configured'
        END AS status
      FROM basic_mast_modules a
      LEFT JOIN basic_param_modules b
        ON b.module_id = a.id
        AND b.entity_id = $1
        order by id asc;    
         `;

      const data = await this.sequelize.query(dataQuery, {
          bind: [entity_id],
          type: Sequelize.QueryTypes.SELECT
      });

      return {data };
  } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
  }
}



async getById(id) {
  try {
      const query = `
         SELECT b.framework_name ,b.id as fid, a.id,a.reporting_period, a.entity_name, a.entity_pan, a.reporting_frequency, a.financial_year_style,a.entity_tan,a.entity_cin, a.is_active
          FROM basic_param_entities a left join fss_mast_frameworks b on a.financial_framework_id = b.id
        WHERE a.id = $1
        LIMIT 1`;

      const replacements = [id];

      const result = await this.sequelize.query(query, {
          bind: replacements,
          type: Sequelize.QueryTypes.SELECT
      });

      return result.length > 0 ? result[0] : null;
  } catch (error) {
      console.error("Error in getById:", error);
      throw new Error("Database query failed");
  }
}



  // Search entities
  async search(searchTerm) {
    const query = `
      SELECT id, entity_name, entity_pan, reporting_frequency,reporting_period financial_year_style, is_active
      FROM basic_param_entities
      WHERE entity_name ILIKE $1 OR entity_pan ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicParamEntitiesRaw;
