const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicParamReportingPrintRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new reporting print record (RAW SQL)
  async create({ entity_reporting_id, entity_print_name, address, place, print_date, notice_date, board_meeting_date, agm_date, shorter_notice, audit_report_udin, icofar_udin, it_audit_udin, ca_signatories, entity_signatories }) {
    const query = `
      INSERT INTO basic_param_reporting_print (entity_reporting_id, entity_print_name, address, place, print_date, notice_date, board_meeting_date, agm_date, shorter_notice, audit_report_udin, icofar_udin, it_audit_udin, ca_signatories, entity_signatories)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`;

    const replacements = [entity_reporting_id, entity_print_name, address, place, print_date, notice_date, board_meeting_date, agm_date, shorter_notice, audit_report_udin, icofar_udin, it_audit_udin, JSON.stringify(ca_signatories), JSON.stringify(entity_signatories)];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit reporting print details
  async edit(id, { entity_print_name, address, place, print_date, notice_date, board_meeting_date, agm_date, shorter_notice, audit_report_udin, icofar_udin, it_audit_udin, ca_signatories, entity_signatories }) {
    const query = `
      UPDATE basic_param_reporting_print
      SET entity_print_name = $1, address = $2, place = $3, print_date = $4, notice_date = $5, board_meeting_date = $6, agm_date = $7, shorter_notice = $8, audit_report_udin = $9, icofar_udin = $10, it_audit_udin = $11, ca_signatories = $12, entity_signatories = $13
      WHERE id = $14
      RETURNING *`;

    const replacements = [entity_print_name, address, place, print_date, notice_date, board_meeting_date, agm_date, shorter_notice, audit_report_udin, icofar_udin, it_audit_udin, JSON.stringify(ca_signatories), JSON.stringify(entity_signatories), id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Delete reporting print record
  async delete(id) {
    const query = `
      DELETE FROM basic_param_reporting_print
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE
    });

    return result;
  }

  // Get all reporting print records for a specific entity reporting (Paginated)
  async getAll(entity_reporting_id, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, entity_print_name, address, place, print_date, notice_date, board_meeting_date, agm_date, shorter_notice, audit_report_udin, icofar_udin, it_audit_udin, ca_signatories, entity_signatories
      FROM basic_param_reporting_print
      WHERE entity_reporting_id = $1
      ORDER BY id DESC
      LIMIT $2 OFFSET $3`;

    const replacements = [entity_reporting_id, limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search reporting print records by name or place
  async search(searchTerm) {
    const query = `
      SELECT id, entity_print_name, address, place, print_date, notice_date, board_meeting_date, agm_date, shorter_notice, audit_report_udin, icofar_udin, it_audit_udin, ca_signatories, entity_signatories
      FROM basic_param_reporting_print
      WHERE entity_print_name ILIKE $1 OR place ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicParamReportingPrintRaw;
