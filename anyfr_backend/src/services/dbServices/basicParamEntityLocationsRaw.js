const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicParamEntityLocationsRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new entity location (RAW SQL)
  async create({ entity_id, location_name, location_type, address, city, state, pincode }) {
    const query = `
      INSERT INTO basic_param_entity_locations (entity_id, location_name, location_type, address, city, state, pincode)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

    const replacements = [entity_id, location_name, location_type, address, city, state, pincode];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT
    });

    return result;
  }

  // Edit entity location details
  async edit(id, { location_name, location_type, address, city, state, pincode }) {
    const query = `
      UPDATE basic_param_entity_locations
      SET location_name = $1, location_type = $2, address = $3, city = $4, state = $5, pincode = $6
      WHERE id = $7
      RETURNING *`;

    const replacements = [location_name, location_type, address, city, state, pincode, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE
    });

    return result;
  }

  // Delete entity location
  async delete(id) {
    const query = `
      DELETE FROM basic_param_entity_locations
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE
    });

    return result;
  }

  // Get all entity locations for a specific entity (Paginated)
  async getAll(entity_id, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, location_name, location_type, address, city, state, pincode
      FROM basic_param_entity_locations
      WHERE entity_id = $1
      ORDER BY id DESC
      LIMIT $2 OFFSET $3`;

    const replacements = [entity_id, limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }

  // Search entity locations by name or city
  async search(searchTerm) {
    const query = `
      SELECT id, location_name, location_type, address, city, state, pincode
      FROM basic_param_entity_locations
      WHERE location_name ILIKE $1 OR city ILIKE $1 OR state ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
    });
  }
}

module.exports = BasicParamEntityLocationsRaw;
