const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require('../../config/database');

class ArapArTranInvoicesRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

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
    const offset = (page - 1) * limit;

    // Whitelist sortable columns
    const columnsMap = {
      id: 'a.id',
      invoice_date: 'a.invoice_date',
      invoice_number: 'a.invoice_number',
      amount: 'a.amount',
      performance_date: 'a.performance_date',
      due_date: 'a.due_date',
      party_name: 'p.party_name',
      created_on: 'a.created_on'
    };
    const sortColumn = columnsMap[sortOn] || 'a.id';
    const direction = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Build WHERE clauses
    const whereClauses = [
      'a.is_active = TRUE',
      'a.entity_id = $1',
      'a.organisation_id = $2'
    ];
    const replacements = [entity_id, organisation_id];

    // Allow filtering on invoice_number or party_name
    if (key && value) {
      const placeholder = `$${replacements.length + 1}`;
      if (key === 'party_name') {
        whereClauses.push(`p.party_name ILIKE ${placeholder}`);
      } else {
        whereClauses.push(`CAST(a.${key} AS TEXT) ILIKE ${placeholder}`);
      }
      replacements.push(`%${value}%`);
    }

    const whereSQL = whereClauses.length ? 'WHERE ' + whereClauses.join(' AND ') : '';

    // Count total rows
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM arap_ar_tran_invoices a
      LEFT JOIN fss_param_entity_parties p
        ON a.party_id = p.id
      ${whereSQL}
    `;
    const countResult = await this.sequelize.query(countQuery, {
      bind: replacements,
      type: this.sequelize.QueryTypes.SELECT
    });
    const total = parseInt(countResult[0].total, 10) || 0;

    // Fetch paginated data
    const dataQuery = `
      SELECT
        a.*, p.party_name
      FROM arap_ar_tran_invoices a
      LEFT JOIN fss_param_entity_parties p
        ON a.party_id = p.id
      ${whereSQL}
      ORDER BY ${sortColumn} ${direction}
      LIMIT $${replacements.length + 1}
      OFFSET $${replacements.length + 2}
    `;
    const data = await this.sequelize.query(dataQuery, {
      bind: [...replacements, limit, offset],
      type: this.sequelize.QueryTypes.SELECT
    });

    return { total, page, limit, data };
  }

  async create({
    organisation_id,
    entity_id,
    invoice_date,
    invoice_number,
    amount,
    performance_date = null,
    credit_period = null,
    due_date = null,
    party_id,
    narration = null,
    is_active = true,
    created_by
  }) {
    const query = `
      INSERT INTO arap_ar_tran_invoices (
        organisation_id,
        entity_id,
        invoice_date,
        invoice_number,
        amount,
        performance_date,
        credit_period,
        due_date,
        party_id,
        narration,
        is_active,
        created_by,
        created_on
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, NOW()
      )
      RETURNING *;
    `;

    const replacements = [
      organisation_id,
      entity_id,
      invoice_date,
      invoice_number,
      amount,
      performance_date,
      credit_period,
      due_date,
      party_id,
      narration,
      is_active,
      created_by
    ];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });
    return result;
  }

  async update({
    id,
    organisation_id,
    entity_id,
    invoice_date,
    invoice_number,
    amount,
    performance_date = null,
    credit_period = null,
    due_date = null,
    party_id,
    narration = null,
    is_active = true,
    updated_by
  }) {
    if (!id) throw new Error('`id` is required for update');

    const query = `
      UPDATE arap_ar_tran_invoices
      SET
        organisation_id   = $1,
        entity_id         = $2,
        invoice_date      = $3,
        invoice_number    = $4,
        amount            = $5,
        performance_date  = $6,
        credit_period     = $7,
        due_date          = $8,
        party_id          = $9,
        narration         = $10,
        is_active         = $11,
        updated_by        = $12,
        updated_on        = NOW()
      WHERE id = $13
      RETURNING *;
    `;

    const replacements = [
      organisation_id,
      entity_id,
      invoice_date,
      invoice_number,
      amount,
      performance_date,
      credit_period,
      due_date,
      party_id,
      narration,
      is_active,
      updated_by,
      id
    ];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });
    return result;
  }

  async softDelete(id) {
    const query = `
      UPDATE arap_ar_tran_invoices
      SET is_active = FALSE
      WHERE id = $1
      RETURNING *;
    `;
    const [result] = await this.sequelize.query(query, {
      bind: [id],
      type: Sequelize.QueryTypes.UPDATE
    });
    return result;
  }
}

module.exports = ArapArTranInvoicesRaw;
