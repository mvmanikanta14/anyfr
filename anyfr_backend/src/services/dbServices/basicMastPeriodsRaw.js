const { Sequelize, Op } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class BasicMastPeriods {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  async getAll() {  // No limit or offset parameters
    try {
      const dataQuery = `
        SELECT *
        FROM basic_mast_periods`;  // Removed pagination clauses

      const data = await this.sequelize.query(dataQuery, {
        type: Sequelize.QueryTypes.SELECT
      });

      return { data };
    } catch (error) {
      console.error("Error in getAll:", error);
      throw new Error("Database query failed");
    }
  }
}

module.exports = BasicMastPeriods;
