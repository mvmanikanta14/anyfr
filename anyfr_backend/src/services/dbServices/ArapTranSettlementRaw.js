// models/raw/arapTranSettlementRaw.js
const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require('../../config/database');

class ArapTranSettlementRaw {
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
  
    // sortable columns mapping (you can add invoice_number or invoice_date here if needed)
    const columnsMap = {
      id: 'a.id',
      settlement_date: 'a.settlement_date',
      amount_settled: 'a.amount_settled',
      mode_of_settlement: 'a.mode_of_settlement',
      reference_module: 'a.reference_module',
      reference_number: 'a.reference_number',
      party_name: 'p.party_name',
      created_on: 'a.created_on'
    };
    const sortColumn = columnsMap[sortOn] || 'a.id';
    const direction = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  
    // build filters
    const whereClauses = [
      'a.is_active = TRUE',
      'a.entity_id = $1',
      'a.organisation_id = $2'
    ];
    const replacements = [entity_id, organisation_id];
    if (key && value) {
      const placeholder = `$${replacements.length + 1}`;
      if (key === 'party_name') {
        whereClauses.push(`p.party_name ILIKE ${placeholder}`);
      } else {
        whereClauses.push(`CAST(a.${key} AS TEXT) ILIKE ${placeholder}`);
      }
      replacements.push(`%${value}%`);
    }
    const whereSQL = whereClauses.length
      ? 'WHERE ' + whereClauses.join(' AND ')
      : '';
  
    // count query (no need to join invoices for count)
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM arap_tran_settlement a
      LEFT JOIN fss_param_entity_parties p
        ON a.party_id = p.id
      ${whereSQL}
    `;
    const countResult = await this.sequelize.query(countQuery, {
      bind: replacements,
      type: this.sequelize.QueryTypes.SELECT
    });
    const total = parseInt(countResult[0].total, 10) || 0;
  
    // data query with conditional joins to invoice tables
    const dataQuery = `
      SELECT
        a.*,
        p.party_name,
        -- pick the invoice_number & date from whichever table matches
        COALESCE(ap.invoice_number, ar.invoice_number, advr.invoice_number, advp.invoice_number) AS invoice_number,
        COALESCE(ap.invoice_date,   ar.invoice_date,   advr.invoice_date,   advp.invoice_date)   AS invoice_date
      FROM arap_tran_settlement a
      LEFT JOIN fss_param_entity_parties p
        ON a.party_id = p.id
  
      LEFT JOIN arap_ap_tran_invoices    ap
        ON a.reference_module = 'AP'
        AND a.reference_id     = ap.id
        AND a.organisation_id  = ap.organisation_id
        AND a.entity_id        = ap.entity_id
  
      LEFT JOIN arap_ar_tran_invoices    ar
        ON a.reference_module = 'AR'
        AND a.reference_id     = ar.id
        AND a.organisation_id  = ar.organisation_id
        AND a.entity_id        = ar.entity_id
  
      LEFT JOIN arap_advr_tran_invoices  advr
        ON a.reference_module = 'ADVR'
        AND a.reference_id     = advr.id
        AND a.organisation_id  = advr.organisation_id
        AND a.entity_id        = advr.entity_id
  
      LEFT JOIN arap_advp_tran_invoices  advp
        ON a.reference_module = 'ADVP'
        AND a.reference_id     = advp.id
        AND a.organisation_id  = advp.organisation_id
        AND a.entity_id        = advp.entity_id
  
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
    period_id,
    settlement_date,
    amount_settled,
    mode_of_settlement ,
    reference_module,
    reference_id,
    reference_number = null,
    party_id,
    remarks = null,
    is_active = true,
    created_by
  }) {
    const query = `
      INSERT INTO arap_tran_settlement (
        organisation_id, entity_id, period_id,
        settlement_date, amount_settled, mode_of_settlement,
        reference_module, reference_id, reference_number,
        party_id, remarks, is_active, created_by, created_on
      ) VALUES (
        $1, $2, $3,
        $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12, $13, NOW()
      ) RETURNING *;
    `;
    const replacements = [
      organisation_id, entity_id, period_id,
      settlement_date, amount_settled, mode_of_settlement,
      reference_module, reference_id, reference_number,
      party_id, remarks, is_active, created_by
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
    period_id,
    settlement_date,
    amount_settled,
    mode_of_settlement = null,
    reference_module,
    reference_id,
    reference_number = null,
    party_id,
    remarks = null,
    is_active = true,
    updated_by
  }) {
    if (!id) throw new Error('`id` is required for update');
    const query = `
      UPDATE arap_tran_settlement
      SET
        organisation_id   = $1,
        entity_id         = $2,
        period_id         = $3,
        settlement_date   = $4,
        amount_settled    = $5,
        mode_of_settlement= $6,
        reference_module  = $7,
        reference_id      = $8,
        reference_number  = $9,
        party_id          = $10,
        remarks           = $11,
        is_active         = $12,
        updated_by        = $13,
        updated_on        = NOW()
      WHERE id = $14
      RETURNING *;
    `;
    const replacements = [
      organisation_id, entity_id, period_id,
      settlement_date, amount_settled, mode_of_settlement,
      reference_module, reference_id, reference_number,
      party_id, remarks, is_active, updated_by, id
    ];
    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });
    return result;
  }

  async softDelete(id) {
    const query = `
      UPDATE arap_tran_settlement
      SET is_active = FALSE
      WHERE id = $1 RETURNING *;
    `;
    const [result] = await this.sequelize.query(query, {
      bind: [id],
      type: Sequelize.QueryTypes.UPDATE
    });
    return result;
  }


  async getallmodules(moduleCode,  entity_id, organisation_id) {
    let table;
    switch (moduleCode) {
      case 'AP':
        table = 'arap_ap_tran_invoices';
        break;
      case 'AR':
        table = 'arap_ar_tran_invoices';
        break;
      case 'ADVR':
        table = 'arap_advr_tran_invoices';
        break;
      case 'ADVP':
        table = 'arap_advp_tran_invoices';
        break;
      default:
        throw new Error(`Unknown module code: ${moduleCode}`);
    }

    const sql = `
      SELECT
      id,
        invoice_number,
        invoice_date,
        amount
      FROM public.${table}
      WHERE
         organisation_id = $1
        AND entity_id = $2
      AND is_active = TRUE
    `;
    const data = await this.sequelize.query(sql, {
      bind: [ organisation_id, entity_id],
      type: Sequelize.QueryTypes.SELECT,
    });
    return {data};
  }

}

module.exports = ArapTranSettlementRaw;