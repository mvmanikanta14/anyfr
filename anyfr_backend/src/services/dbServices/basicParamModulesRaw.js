const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

const BasicParamModules = require('../../models/basicParamModulesOrm');

class BasicParamModulesRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);

        this.initializeModel();
    }

    async initializeModel() {
        try {
            this.BasicParamModules = await BasicParamModules(this.sequelize);
        } catch (error) {
            console.error('Model initialization error:', error);
        }
    }

    async create({ module_id, entity_id, created_by }) {

        try {
            // Query to fetch paginated data
            const dataQuery = `
                SELECT * FROM public.basic_param_modules
                where module_id = $1 and entity_id = $2
            `;

            const data = await this.sequelize.query(dataQuery, {
                bind: [entity_id, module_id],
                type: Sequelize.QueryTypes.SELECT
            });


            // console.log('Fetched data:', module_id, entity_id, created_by);

            if (data && data.length > 0) {
                // If record exists, return the existing record
                console.log('Record already exists:', data);
                return data;
            }
            const record = await this.BasicParamModules.build({ module_id, entity_id, created_by });


            console.log('Record created:', record);

            await record.validate();

            // Save the reporting period after validation
            const savedrecord = await record.save();
            return savedrecord;


            // const query = `
            // INSERT INTO basic_param_modules (module_id, entity_id, created_by)
            // VALUES ($1, $2, $3)
            // RETURNING *`;

            // const replacements = [module_id, entity_id, created_by];

            // const [result] = await this.sequelize.query(query, {
            //     bind: replacements,
            //     type: Sequelize.QueryTypes.INSERT
            // });

            // console.log('Record created:', result);


            // return result;

        } catch (error) {
            return { status: 500, error: 'Insert Failed', details: error.message };
        }
    }

    async edit(id, { entity_id, module_id }) {
        try {

            console.log('Editing record with ID:', id);
            console.log('New values:', { entity_id, module_id });
            const record = await this.BasicParamModules.findByPk(id);
            if (!record) {
                return { status: 404, error: 'Not Found', details: `Module ID ${id} not found` };
            }

            if (entity_id) record.name = entity_id;
            if (module_id) record.module_id = module_id;
            await record.save();
            return record;
        } catch (error) {
            return { status: 500, error: 'Update Failed', details: error.message };
        }
    }



    async softDelete(id) {
        const query = `
        DELETE FROM basic_param_modules
        WHERE id = $1
        RETURNING *`;


        const replacements = [id];

        const [result] = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.UPDATE
        });

        return result;
    }


    async getAll(page = 1, limit = 10, entity_id) {
        const offset = (page - 1) * limit;


        try {
            // Query to get total count
            const countQuery = `SELECT COUNT(*) AS total FROM basic_param_modules WHERE is_active = TRUE`;
            const countResult = await this.sequelize.query(countQuery, {
                type: Sequelize.QueryTypes.SELECT
            });

            const total = countResult?.[0]?.total ?? 0;

            // Query to fetch paginated data
            const dataQuery = `
                SELECT a.*,c.entity_name, b.module_name
                FROM basic_param_modules a
                LEFT JOIN basic_mast_modules b ON a.module_id = b.id
                Left join basic_param_entities c on a.entity_id = c.id
                WHERE a.is_active = TRUE and a.entity_id = $1
                ORDER BY a.id DESC
              
            `;

            const data = await this.sequelize.query(dataQuery, {
                bind: [entity_id],
                type: Sequelize.QueryTypes.SELECT
            });

            return { total, page, limit, data };
        } catch (error) {
            console.error("Error in getAll:", error);
            throw new Error("Database query failed");
        }
    }


    async getById(module_id) {
        const query = `SELECT a.* , b.module_name FROM basic_param_modules a left join basic_mast_modules b on a.module_id = b.id WHERE id = $1`;
        const result = await this.sequelize.query(query, {
            bind: [module_id],
            type: Sequelize.QueryTypes.SELECT
        });
        return result.length ? result[0] : null;
    }
}

module.exports = BasicParamModulesRaw;
