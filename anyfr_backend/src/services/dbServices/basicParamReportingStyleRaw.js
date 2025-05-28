const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicParamReportingStyleRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new reporting style record (RAW SQL)
  async create({
    entity_reporting_id, entity_id, reporting_period_id, rounding_off, decimals,
    comma_style, current_year_position, font_family_id, font_size,
    note_level_1, note_level_2, note_level_3, note_level_4,
    footnote_style, border_style
  }) {
    const query = `
      INSERT INTO basic_param_reporting_style (
        entity_reporting_id, entity_id, reporting_period_id, rounding_off, decimals,
        comma_style, current_year_position, font_family_id, font_size,
        note_level_1, note_level_2, note_level_3, note_level_4,
        footnote_style, border_style
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`;

    const replacements = [
      entity_reporting_id, entity_id, reporting_period_id, rounding_off, decimals,
      comma_style, current_year_position, font_family_id, font_size,
      note_level_1, note_level_2, note_level_3, note_level_4,
      footnote_style, border_style
    ];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit reporting style details
  async edit(id, {
    rounding_off, decimals, comma_style, current_year_position, font_family_id,
    font_size, note_level_1, note_level_2, note_level_3, note_level_4,
    footnote_style, border_style, entity_id
  }) {
    const query = `
      UPDATE basic_param_reporting_style
      SET rounding_off = $1, decimals = $2, comma_style = $3, current_year_position = $4, 
          font_family_id = $5, font_size = $6, note_level_1 = $7, note_level_2 = $8,
          note_level_3 = $9, note_level_4 = $10, footnote_style = $11, border_style = $12,
          entity_id = $13
      WHERE id = $14
      RETURNING *`;

    const replacements = [
      rounding_off, decimals, comma_style, current_year_position, font_family_id,
      font_size, note_level_1, note_level_2, note_level_3, note_level_4,
      footnote_style, border_style, entity_id, id
    ];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Delete reporting style record
  async delete(id) {
    const query = `
      DELETE FROM basic_param_reporting_style
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE
    });

    return result;
  }

  // Get all reporting style records (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT * FROM basic_param_reporting_style
      ORDER BY id DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}


module.exports = BasicParamReportingStyleRaw;
