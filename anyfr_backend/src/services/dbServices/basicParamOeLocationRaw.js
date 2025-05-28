const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require('../../config/database');
const BasicParamOeLocation = require('../../models/basicParamOeLocationOrm');


class BasicParamOeLocationRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
        this.initializeModels();
    }

    async initializeModels() {
        try {
            this.BasicParamOeLocation = await BasicParamOeLocation(this.sequelize);

            console.log('BasicParamOeLocationRaw models initialized.');
        } catch (err) {
            console.error('Error initializing BasicParamOeLocationRaw models:', err);
        }
    }

    async create({ entity_id, location_name, address, city, state, pincode, organisation_id, is_active = true, is_approved = true, created_by }) {
        try {
            // Build and validate


            const dataQuery = `
                SELECT * FROM public.basic_param_oe_locations
                where entity_id = $1 and location_name = $2
            `;

            const data = await this.sequelize.query(dataQuery, {
                bind: [entity_id, location_name],
                type: Sequelize.QueryTypes.SELECT
            });

            if (data && data.length > 0) {
 
                return { status: 400, error: 'validation error', details: 'Record already exists' };
            }

            const loc = this.BasicParamOeLocation.build({ entity_id, location_name, address, city, state, pincode, organisation_id, is_active, is_approved, created_by });
            await loc.validate();


            return await loc.save();
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const details = error.errors.map(e => ({ column: e.path, message: e.message, value: e.value }));
                console.error('Validation error on create:', details);
                return { status: 400, error: 'Validation Error', details };
            }
            console.error('Error in create:', error);
            return { status: 500, error: 'Internal Server Error', details: error.message };
        }
    }

    async edit(id, data) {
        try {
            const loc = await this.BasicParamOeLocation.findByPk(id);
            if (!loc) {
                return { status: 404, error: 'Not Found', details: `Location with ID ${id} not found` };
            }

            await loc.update(data);
            return loc;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const details = error.errors.map(e => ({ column: e.path, message: e.message, value: e.value }));
                return { status: 400, error: 'Validation Error', details };
            }
            console.error('Error in edit:', error);
            return { status: 500, error: 'Internal Server Error', details: error.message };
        }
    }

    async softDelete(id) {
        try {
            const query = `
        UPDATE basic_param_oe_locations SET is_active = FALSE WHERE id = $1 RETURNING *
      `;
            const [result] = await this.sequelize.query(query, {
                bind: [id],
                type: Sequelize.QueryTypes.UPDATE
            });
            return result;
        } catch (error) {
            console.error('Error in softDelete:', error);
            throw error;
        }
    }

    async getAll(page = 1, limit = 10, entity_id) {
        const offset = (page - 1) * limit;
        try {
            const countRes = await this.sequelize.query(`SELECT COUNT(*) AS total FROM basic_param_oe_locations WHERE is_active = TRUE and entity_id = $1`, { bind: [entity_id], type: Sequelize.QueryTypes.SELECT });
            const total = parseInt(countRes[0].total, 10);
            const data = await this.sequelize.query(
                `SELECT l.*, e.entity_name FROM basic_param_oe_locations l
         LEFT JOIN basic_param_entities e ON l.entity_id = e.id
         WHERE l.is_active = TRUE and e.id = $1 
         ORDER BY l.id DESC LIMIT $2 OFFSET $3`,
                { bind: [entity_id, limit, offset], type: Sequelize.QueryTypes.SELECT }
            );
            return { total, page, limit, data };
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    }

    async getAllInactive(page = 1, limit = 10, entity_id) {
        const offset = (page - 1) * limit;
        try {
            const countRes = await this.sequelize.query(`SELECT COUNT(*) AS total FROM basic_param_oe_locations WHERE is_active = False and entity_id = $1`, { bind: [entity_id], type: Sequelize.QueryTypes.SELECT });
            const total = parseInt(countRes[0].total, 10);
            const data = await this.sequelize.query(
                `SELECT l.*, e.entity_name FROM basic_param_oe_locations l
         LEFT JOIN basic_param_entities e ON l.entity_id = e.id
         WHERE l.is_active = False and e.id = $1 
         ORDER BY l.id DESC LIMIT $2 OFFSET $3`,
                { bind: [entity_id, limit, offset], type: Sequelize.QueryTypes.SELECT }
            );
            return { total, page, limit, data };
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    }


    async getById(id) {
        try {
            const res = await this.sequelize.query(
                `SELECT l.*, e.entity_name FROM basic_param_oe_locations l
         LEFT JOIN basic_param_entities e ON l.entity_id = e.id
         WHERE l.id = $1 AND l.is_active = TRUE LIMIT 1`,
                { bind: [id], type: Sequelize.QueryTypes.SELECT }
            );
            return res[0] || null;
        } catch (error) {
            console.error('Error in getById:', error);
            throw error;
        }
    }
}

module.exports = BasicParamOeLocationRaw;
