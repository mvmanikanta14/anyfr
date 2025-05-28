const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database"); // Adjust path if needed

class FssParanEntityPartyRelationsRaw {
    constructor(subdomain) {
        this.sequelize = getSequelizeInstance(subdomain);
    }

    async create({ entity_id, party_id, relationship_type_id, relation_start_date, relation_end_date, remarks, is_active, created_by }) {
        const query = `
            INSERT INTO fss_paran_entity_party_relations (entity_id, party_id, relationship_type_id, relation_start_date, relation_end_date, remarks, is_active, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`;
        
        return await this.sequelize.query(query, { bind: [entity_id, party_id, relationship_type_id, relation_start_date, relation_end_date, remarks, is_active, created_by], type: Sequelize.QueryTypes.INSERT });
    }

    async edit(id, { relation_end_date, remarks, is_active }) {
        const query = `
            UPDATE fss_paran_entity_party_relations
            SET relation_end_date = $1, remarks = $2, is_active = $3
            WHERE id = $4
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [relation_end_date, remarks, is_active, id], type: Sequelize.QueryTypes.UPDATE });
    }

    async softDelete(id) {
        const query = `
            UPDATE fss_paran_entity_party_relations
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        return await this.sequelize.query(query, { bind: [id], type: Sequelize.QueryTypes.UPDATE });
    }

    async getAll(page = 1, limit = 100) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT a.*,b.party_name,c.relationship_name FROM fss_paran_entity_party_relations a left join fss_param_entity_parties b on a.party_id = b.id left join fss_mast_party_relationship_types c on a.relationship_type_id = c.id
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        return await this.sequelize.query(query, { bind: [limit, offset], type: Sequelize.QueryTypes.SELECT });
    }

    async search(searchTerm) {
        const query = `
            SELECT * FROM fss_paran_entity_party_relations
            WHERE remarks ILIKE $1`;

        return await this.sequelize.query(query, { bind: [`%${searchTerm}%`], type: Sequelize.QueryTypes.SELECT });
    }

    async truncateData() {
        const query = `TRUNCATE TABLE fss_paran_entity_party_relations RESTART IDENTITY CASCADE;`;
        return await this.sequelize.query(query, { type: Sequelize.QueryTypes.RAW });
    }
}

module.exports = FssParanEntityPartyRelationsRaw;
