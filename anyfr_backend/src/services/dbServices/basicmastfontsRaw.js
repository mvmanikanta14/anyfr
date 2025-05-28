const { DataTypes, QueryTypes } = require('sequelize');

class BasicMasterFontRaw {
    constructor(subdomain) {
        this.sequelize = require('../../config/database').getSequelizeInstance(subdomain);
    }

    async create(fontData) {
        try {
            const query = `
                INSERT INTO basic_mast_fonts (font_name, is_active)
                VALUES (:font_name, :is_active)
                RETURNING *;
            `;
            const [result] = await this.sequelize.query(query, {
                replacements: {
                    font_name: fontData.font_name,
                    is_active: fontData.is_active !== undefined ? fontData.is_active : true
                },
                type: QueryTypes.INSERT
            });
            return result;
        } catch (error) {
            console.error('Error in creating font:', error);
            throw error;
        }
    }

    async update(id, fontData) {
        try {
            const query = `
                UPDATE basic_mast_fonts
                SET font_name = :font_name, is_active = :is_active
                WHERE id = :id
                RETURNING *;
            `;
            const [result] = await this.sequelize.query(query, {
                replacements: {
                    id,
                    font_name: fontData.font_name,
                    is_active: fontData.is_active
                },
                type: QueryTypes.UPDATE
            });
            return result;
        } catch (error) {
            console.error('Error in updating font:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const query = `
                DELETE FROM basic_mast_fonts
                WHERE id = :id
                RETURNING *;
            `;
            const [result] = await this.sequelize.query(query, {
                replacements: { id },
                type: QueryTypes.DELETE
            });
            return result;
        } catch (error) {
            console.error('Error in deleting font:', error);
            throw error;
        }
    }

    async getAll() {
        try {
            const query = `
                SELECT id, font_name, is_active
                FROM basic_mast_fonts
                ORDER BY font_name;
            `;
            const result = await this.sequelize.query(query, { type: QueryTypes.SELECT });
            return result;
        } catch (error) {
            console.error('Error in fetching all fonts:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const query = `
                SELECT id, font_name, is_active
                FROM basic_mast_fonts
                WHERE id = :id;
            `;
            const [result] = await this.sequelize.query(query, {
                replacements: { id },
                type: QueryTypes.SELECT
            });
            return result;
        } catch (error) {
            console.error('Error in fetching font by ID:', error);
            throw error;
        }
    }
}

module.exports = BasicMasterFontRaw;
