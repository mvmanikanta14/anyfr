const { Sequelize } = require('sequelize');
const { getSequelizeInstance } = require("../../config/database");


class ShareTranOeRegisterRaw {
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
        // 1. Pagination math
        const offset = (page - 1) * limit;

        // 2. Whitelist sortable columns
        const columnsMap = {
            id: 'a.id',
            period: 'a.period',
            date: 'a.date',
            type_of_share_name: 'b.type_of_share_name',
            class_of_share_name: 'c.class_of_share_name',
            mode_of_issue_name: 'd.mode_of_issue_name',
            type_of_consideration_name: 'e.type_of_consideration_name',
            type_of_shareholder_name: 'f.type_of_shareholder_name',
            no_of_shares: 'a.no_of_shares',
            issue_value: 'a.issue_value',
            for_value_per_shares: 'a.for_value_per_shares',
            party_name: 'g.party_name',
            created_on: 'a.created_on'
        };
        const sortColumn = columnsMap[sortOn] || 'a.id';
        const direction = sortDir.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        // 3. Build WHERE + bindings
        const whereClauses = [
            'a.is_active = TRUE',
            'a.entity_id = $1',
            'a.organisation_id = $2'
        ];
        const replacements = [entity_id, organisation_id];

        // 3a. Map filterable keys to their join-alias
        const aliasMap = {
            type_of_share_name: 'b',
            class_of_share_name: 'c',
            mode_of_issue_name: 'd',
            type_of_consideration_name: 'e',
            type_of_shareholder_name: 'f',
            party_name: 'g'
        };

        if (key && value) {
            const placeholder = `$${replacements.length + 1}`;
            const alias = aliasMap[key] || 'a';
            whereClauses.push(`CAST(${alias}.${key} AS TEXT) ILIKE ${placeholder}`);
            replacements.push(`%${value}%`);
        }

        const whereSQL = whereClauses.length
            ? 'WHERE ' + whereClauses.join(' AND ')
            : '';

        // 4. Count total matching rows
        const countQuery = `
          SELECT COUNT(*) AS total
          FROM shares_tran_oe_register a
          LEFT JOIN share_mast_type_of_share           b ON a.type_share_id                 = b.id
          LEFT JOIN share_param_class_of_share         c ON a.class_of_share                = c.id
          LEFT JOIN share_mast_mode_of_issues          d ON a.mode_of_issues                = d.id
          LEFT JOIN share_mast_type_of_consideration   e ON a.type_of_consideration         = e.id
          LEFT JOIN share_mast_type_of_shareholder     f ON a.type_of_share_holder_id       = f.id
          LEFT JOIN fss_param_entity_parties           g ON a.share_holder_id               = g.id
          ${whereSQL}
        `;
        const countResult = await this.sequelize.query(countQuery, {
            bind: replacements,
            type: this.sequelize.QueryTypes.SELECT
        });
        const total = parseInt(countResult[0].total, 10) || 0;

        // 5. Fetch paginated data
        const dataQuery = `
          SELECT
            a.*,
            b.type_of_share_name,
            c.class_of_share_name,
            d.mode_of_issue_name,
            e.type_of_consideration_name,
            f.type_of_shareholder_name,
            g.party_name
          FROM shares_tran_oe_register a
          LEFT JOIN share_mast_type_of_share           b ON a.type_share_id                 = b.id
          LEFT JOIN share_param_class_of_share         c ON a.class_of_share                = c.id
          LEFT JOIN share_mast_mode_of_issues          d ON a.mode_of_issues                = d.id
          LEFT JOIN share_mast_type_of_consideration   e ON a.type_of_consideration         = e.id
          LEFT JOIN share_mast_type_of_shareholder     f ON a.type_of_share_holder_id       = f.id
          LEFT JOIN fss_param_entity_parties           g ON a.share_holder_id               = g.id
          ${whereSQL}
          ORDER BY ${sortColumn} ${direction}
          LIMIT $${replacements.length + 1}
          OFFSET $${replacements.length + 2}
        `;
        const data = await this.sequelize.query(dataQuery, {
            bind: [...replacements, limit, offset],
            type: this.sequelize.QueryTypes.SELECT
        });

        // 6. Return paginated result
        return { total, page, limit, data };
    }



    async create({
        organisation_id,
        entity_id,
        period = 0,
        date,
        type_share_id,
        class_of_share,
        mode_of_issues,
        type_of_consideration,
        type_of_share_holder_id,
        share_holder_id,
        no_of_shares,
        issue_value,
        for_value_per_shares,
        is_active = true,
        created_by
    }) {
        if (!date) {
            date = new Date();
        }

        const query = `
          INSERT INTO shares_tran_oe_register
            (organisation_id,
             entity_id,
             period,
             date,
             type_share_id,
             class_of_share,
             mode_of_issues,
             type_of_consideration,
             type_of_share_holder_id,
             share_holder_id,
             no_of_shares,
             issue_value,
             for_value_per_shares,
             is_active, 
             created_by,
             created_on)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7,
             $8, $9, $10, $11, $12, $13,
             $14, $15, NOW())
          RETURNING *;
        `;

        const replacements = [
            organisation_id,
            entity_id,
            period,
            date,
            type_share_id,
            class_of_share,
            mode_of_issues,
            type_of_consideration,
            type_of_share_holder_id,
            share_holder_id,
            no_of_shares,
            issue_value,
            for_value_per_shares,
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
        period = 0,
        date,
        type_share_id,
        class_of_share,
        mode_of_issues,
        type_of_consideration,
        type_of_share_holder_id,
        share_holder_id,
        no_of_shares,
        issue_value,
        for_value_per_shares,
        is_active = true,
        updated_by
    }) {
        if (!id) {
            throw new Error("Record `id` is required for update");
        }

         if (!date) {
            date = new Date();
        }

        const query = `
          UPDATE shares_tran_oe_register
          SET
            organisation_id          = $1,
            entity_id                = $2,
            period                   = $3,
            date                     = $4,
            type_share_id            = $5,
            class_of_share           = $6,
            mode_of_issues           = $7,
            type_of_consideration    = $8,
            type_of_share_holder_id  = $9,
            share_holder_id          = $10,
            no_of_shares             = $11,
            issue_value              = $12,
            for_value_per_shares     = $13,
            is_active                = $14,
            updated_by               = $15,
            updated_on               = NOW()
          WHERE id = $16
          RETURNING *;
        `;

        const replacements = [
            organisation_id,
            entity_id,
            period,
            date,
            type_share_id,
            class_of_share,
            mode_of_issues,
            type_of_consideration,
            type_of_share_holder_id,
            share_holder_id,
            no_of_shares,
            issue_value,
            for_value_per_shares,
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
          UPDATE shares_tran_oe_register
          SET is_active = FALSE
          WHERE id = $1
          RETURNING *`;
        const replacements = [id];
    
        const [result] = await this.sequelize.query(query, {
          bind: replacements,
          type: Sequelize.QueryTypes.UPDATE
        });
    
        return result;
      }


    async getAllTypeOfshare() {

        const dataQuery = `
        SELECT
        * from share_mast_type_of_share
        ORDER BY id DESC
        `;
        const data = await this.sequelize.query(dataQuery, {

            type: Sequelize.QueryTypes.SELECT
        });

        return { data };
    }



    async getAllClassOfShare(entity_id, organisation_id) {

        const dataQuery = `
              SELECT
        * from share_param_class_of_share a  
        WHERE a.is_active = True AND a.entity_id = $1 AND a.organisation_id = $2
        ORDER BY a.id DESC
          `;
        const data = await this.sequelize.query(dataQuery, {
            bind: [entity_id, organisation_id],
            type: Sequelize.QueryTypes.SELECT
        });


        return { data };
    }



    async getAllModeOfIssues() {

        const dataQuery = `
        SELECT
        * from share_mast_mode_of_issues
        ORDER BY id DESC
        `;
        const data = await this.sequelize.query(dataQuery, {

            type: Sequelize.QueryTypes.SELECT
        });

        return { data };
    }

    async getAllTypeofConsider() {

        const dataQuery = `
        SELECT
        * from share_mast_type_of_consideration
        ORDER BY id DESC
        `;
        const data = await this.sequelize.query(dataQuery, {

            type: Sequelize.QueryTypes.SELECT
        });

        return { data };
    }


    async getAlltypeofshareholder() {

        const dataQuery = `
        SELECT
        * from share_mast_type_of_shareholder
        ORDER BY id DESC
        `;
        const data = await this.sequelize.query(dataQuery, {

            type: Sequelize.QueryTypes.SELECT
        });

        return { data };
    }


    async getAllParties(entity_id, organisation_id) {

        const dataQuery = `
              SELECT
        * from fss_param_entity_parties a  
        WHERE a.is_active = True AND a.entity_id = $1 AND a.organisation_id = $2
        ORDER BY a.id DESC
          `;
        const data = await this.sequelize.query(dataQuery, {
            bind: [entity_id, organisation_id],
            type: Sequelize.QueryTypes.SELECT
        });


        return { data };
    }

}
module.exports = ShareTranOeRegisterRaw;