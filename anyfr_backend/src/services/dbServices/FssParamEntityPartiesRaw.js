const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssParamEntityPartiesRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    // async create({ entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by }) {
    //     const query = `
    //         INSERT INTO fss_param_entity_parties (entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by)
    //         VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9)
    //         RETURNING *`;
        
    //     return await this.sequelize.query(query, { bind: [entity_id, party_name, is_gl, gl_id, JSON.stringify(party_types), is_msme, is_related, is_active, created_by], type: Sequelize.QueryTypes.INSERT });
    // }

    async create({ entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by }) {
        const query = `
            INSERT INTO fss_param_entity_parties (entity_id, party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active, created_by)
            VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9)
            RETURNING *`;
    
        return await this.sequelize.query(query, {
            bind: [
                entity_id,
                party_name,
                is_gl,
                is_gl ? gl_id : null,  // 👈 Pass `undefined` when gl_id is NULL
                JSON.stringify(party_types),
                is_msme,
                is_related,
                is_active,
                created_by
            ],
            type: Sequelize.QueryTypes.INSERT
        });
    }
    

    // async edit(id, { party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active }) {
    //     const query = `
    //         UPDATE fss_param_entity_parties
    //         SET party_name = $1, is_gl = $2, gl_id = $3, party_types = $4::jsonb, is_msme = $5, is_related = $6, is_active = $7
    //         WHERE id = $8
    //         RETURNING *`;

    //     return await this.sequelize.query(query, { bind: [party_name, is_gl, gl_id, JSON.stringify(party_types), is_msme, is_related, is_active, id], type: Sequelize.QueryTypes.UPDATE });
    // }

    async edit(id, { party_name, is_gl, gl_id, party_types, is_msme, is_related, is_active }) {
        const query = `
            UPDATE fss_param_entity_parties
            SET party_name = $1, is_gl = $2, gl_id = $3, party_types = $4::jsonb, is_msme = $5, is_related = $6, is_active = $7
            WHERE id = $8
            RETURNING *`;
    
        return await this.sequelize.query(query, {
            bind: [
                party_name,
                is_gl,
                is_gl ? gl_id : null,  // 👈 Pass `undefined` when gl_id is NULL
                JSON.stringify(party_types),
                is_msme,
                is_related,
                is_active,
                id
            ],
            type: Sequelize.QueryTypes.UPDATE
        });
    }
    

    async softDelete(id) {
        const query = `
            UPDATE fss_param_entity_parties
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    // async getAll(page = 1, limit = 100) {
    //     const offset = (page - 1) * limit;
    //     // const query = `
    //     //       SELECT a.*,b.gl_name,b.gl_code, c.party_type_name FROM fss_param_entity_parties a left join fss_param_entity_gls b on a.gl_id = b.id left join fss_mast_party_types c on a.party_types @> jsonb_build_array(c.id)
    //     //     ORDER BY created_on DESC
    //     //     LIMIT $1 OFFSET $2`;

    //     const query = `SELECT 
    //                     a.*, 
    //                     b.gl_name, 
    //                     b.gl_code, 
    //                     STRING_AGG(c.party_type_name, ', ') AS party_type_names
    //                 FROM fss_param_entity_parties a
    //                 LEFT JOIN fss_param_entity_gls b ON a.gl_id = b.id
    //                 LEFT JOIN LATERAL jsonb_array_elements(a.party_types) AS party_id ON true
    //                 LEFT JOIN fss_mast_party_types c ON c.id = (party_id::text)::int
    //                 GROUP BY a.id, b.gl_name, b.gl_code`;

    //     return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    // }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
    
        const query = `SELECT 
                        a.*, 
                        b.gl_name, 
                        b.gl_code, 
                        STRING_AGG(c.party_type_name, ', ') AS party_type_names
                    FROM fss_param_entity_parties a
                    LEFT JOIN fss_param_entity_gls b ON a.gl_id = b.id
                    LEFT JOIN LATERAL jsonb_array_elements(a.party_types) AS party_id ON true
                    LEFT JOIN fss_mast_party_types c ON c.id = (party_id::text)::int
                    GROUP BY a.id, b.gl_name, b.gl_code
                    LIMIT $1 OFFSET $2`;   
        return await this.sequelize.query(query, { 
            bind: [limit, offset], 
            type: Sequelize.QueryTypes.SELECT 
        });
    }
    

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_param_entity_parties
            WHERE party_name ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_param_entity_parties RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssParamEntityPartiesRaw;
