const { Sequelize } = require('sequelize'); 
const { getSequelizeInstance } = require("../../config/database"); // Ensure correct path

class BasicMasterUsersRaw {
    constructor(subdomain) {
      console.log("IN CONSTRUCTOR")
        if (!subdomain) throw new Error("❌ Subdomain is required to initialize DB connection.");
        this.sequelize = getSequelizeInstance(subdomain);
    }



     // ✅ Get User by login_id (for login)
    async getUserByLoginId(login_id, organisation_id) {

        console.log("organisation_id", organisation_id)
        const query = `
            SELECT a.id, a.login_id, a.password, a.email, a.organisation_id, a.is_active ,a.display_picture , b.organisation_name , b.id as org_id
            FROM 
                basic_mast_users a
            LEFT JOIN 
                basic_mast_organisation b 
                ON b.organisation_id = a.organisation_id::text
            WHERE a.login_id = $1 and a.organisation_id = $2  LIMIT 1`;

        const replacements = [login_id, organisation_id];

        const result = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        return result[0]; // Return single user
    }

     // ✅ Get User by login_id (for login)
     async getUserById(login_id) {
        const query = `
            SELECT id, login_id, password, email, organisation_id , is_active ,display_picture
            FROM basic_mast_users
            WHERE id = $1 LIMIT 1`;

        const replacements = [login_id];

        const result = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.SELECT
        });

        return result[0]; // Return single user
    }

    // ✅ Create a new user (RAW SQL)
   
    async create({ name, login_id, password, phone, email, secret_question, secret_answer, display_picture, is_active, created_by }) {
        console.log("INSERT TABLE DEBUG: Creating new user..."); 

        const query = `
            INSERT INTO basic_mast_users 
            (name, login_id, password, phone, email, secret_question, secret_answer, display_picture, is_active,organisation_id, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *`;

        const replacements = [name, login_id, password, phone, email, secret_question, secret_answer, display_picture, is_active,organisation_id, created_by];

        const [result] = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.INSERT
        });

        return result; // ✅ Returning inserted row
    }


    async uploadimage(id, { display_picture }) {
        const query = `
            UPDATE basic_mast_users
            SET display_picture = COALESCE($1, display_picture)
            WHERE id = $2
            RETURNING *`;

        const replacements = [ display_picture, id];

        const result = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.UPDATE
        });

        return result[0]; // Returning updated row
    }

    

    // ✅ Edit user details
    async edit(id, { name, phone, email, secret_question, secret_answer, display_picture }) {
        const query = `
            UPDATE basic_mast_users
            SET name = $1, phone = $2, email = $3, secret_question = $4, secret_answer = $5, display_picture = $6
            WHERE id = $7
            RETURNING *`;

        const replacements = [name, phone, email, secret_question, secret_answer, display_picture, id];

        const result = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.UPDATE
        });

        return result[0]; // Returning only updated row
    }

    // ✅ Soft delete user
    async softDelete(id) {
        const query = `
            UPDATE basic_mast_users
            SET is_active = FALSE
            WHERE id = $1
            RETURNING *`;

        const replacements = [id];

        const result = await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.UPDATE
        });

        return result[0]; // Returning only updated row
    }

    // ✅ Get all users (Paginated)
    async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const query = `
            SELECT 'dummy' as dummy, id, name, login_id, phone, email, is_active
            FROM basic_mast_users
            ORDER BY created_on DESC
            LIMIT $1 OFFSET $2`;

        const replacements = [limit, offset];

        return await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.SELECT
        });
    }

    // ✅ Search users
    async search(searchTerm) {
        console.log("fetching all records")
        const query = `
            SELECT  id, name, login_id, phone, email, is_active
            FROM basic_mast_users
            WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1`;

        const replacements = [`%${searchTerm}%`];

        return await this.sequelize.query(query, {
            bind: replacements,
            type: Sequelize.QueryTypes.SELECT
        });
    }
}

module.exports = BasicMasterUsersRaw;
