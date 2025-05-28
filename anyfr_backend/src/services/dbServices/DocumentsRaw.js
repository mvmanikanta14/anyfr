const { Sequelize } = require("sequelize");
const { getSequelizeInstance } = require("../../config/database"); // Adjust path as needed

class DocumentsRaw {
  constructor(subdomain) {
    this.sequelize = getSequelizeInstance(subdomain);
  }

  // Create a new document record
  async create({ document_type,document_name, document_path, user_id}) {
    const query = `
      INSERT INTO documents (document_type, document_name,document_path, user_id, created_on)
      VALUES ($1, $2, $3,$4, NOW())
      RETURNING *`;

    const replacements = [document_type,document_name, document_path, user_id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT,
    });

    return result;
  }

  // Create a new document record
  async uploadyoutubelink({ document_type,document_name, document_path, user_id}) {
    const query = `
      INSERT INTO documents (document_type, document_name,document_path, user_id, created_on)
      VALUES ($1, $2, $3,$4, NOW())
      RETURNING *`;

    const replacements = [document_type,document_name, document_path, user_id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.INSERT,
    });

    return result;
  }
// ✅ Get User by login_id (for login)
async getLatestPdf(login_id) {
  const query = `
      SELECT *
      FROM documents
      WHERE document_type='pdf' and user_id = $1  order by id desc LIMIT 1`;

  const replacements = [login_id];

  const result = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
  });

  return result[0]; // Return single user
}
// ✅ Get User by login_id (for login)
async getlatestaudio(login_id) {
  const query = `
      SELECT *
      FROM documents
      WHERE document_type='audio' and user_id = $1  order by id desc LIMIT 1`;

  const replacements = [login_id];

  const result = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
  });

  return result[0]; // Return single user
}
async getlatestvideo(login_id) {
  const query = `
      SELECT *
      FROM documents
      WHERE document_type='video' and user_id = $1  order by id desc LIMIT 1`;

  const replacements = [login_id];

  const result = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
  });

  return result[0]; // Return single user
}
async getlatestyoutube(login_id) {
  const query = `
      SELECT *
      FROM documents
      WHERE document_type='youtube' and user_id = $1  order by id desc LIMIT 1`;

  const replacements = [login_id];

  const result = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT
  });

  return result[0]; // Return single user
}
  // Edit an existing document record
  /*
  async edit(id, { document_type, document_path,document_name, user_id }) {
    const query = `
      UPDATE documents
      SET document_type = $1, document_path = $2, user_id = $3,document_name=$4
      WHERE id = $5
      RETURNING *`;

    const replacements = [document_type, document_path, user_id, id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.UPDATE,
    });

    return result;
  }
  async upload(id, { display_picture }) {
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

  // Delete a document record
  async delete(id) {
    const query = `
      DELETE FROM documents
      WHERE id = $1
      RETURNING *`;

    const replacements = [id];

    const [result] = await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.DELETE,
    });

    return result;
  }

  // Get all document records (Paginated)
  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, document_type, document_path, user_id, created_on,document_name
      FROM documents
      ORDER BY id DESC
      LIMIT $1 OFFSET $2`;

    const replacements = [limit, offset];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT,
    });
  }

  // Search documents by type
  async search(searchTerm) {
    const query = `
      SELECT id, document_type, document_path, user_id, created_on,document_name
      FROM documents
      WHERE document_type ILIKE $1`;

    const replacements = [`%${searchTerm}%`];

    return await this.sequelize.query(query, {
      bind: replacements,
      type: Sequelize.QueryTypes.SELECT,
    });
  }
    */
   
}

module.exports = DocumentsRaw;
