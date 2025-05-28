// Get all investments
const getAllInvestments = async (req, res) => {
    try {
        console.log("Hello User")
        const { Investment } = req.models; // Get dynamic User model
        // const Investment = getInvestmentModel(req);  // Get the User model dynamically
        const investments = await Investment.findAll();
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create new investment
const createInvestment = async (req, res) => {
    try {
        //const investment = await Investment.create(req.body);
        const userId = req.user.id; // Get user ID from token
        // const Investment = getInvestmentModel(req);  // Get the User model dynamically
        const { Investment } = req.models; // Get dynamic User model
        const investment = await Investment.create({ ...req.body, created_by: userId });
        res.status(201).json({ message: 'Investment created', investment });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update investment by ID
const updateInvestment = async (req, res) => {
    try {
        //const Investment = getInvestmentModel(req);  // Get the User model dynamically
        const { Investment } = req.models; // Get dynamic User model
        const [updated] = await Investment.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ message: 'Investment not found' });
        res.json({ message: 'Investment updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete investment by ID
const deleteInvestment = async (req, res) => {
    try {
        //const Investment = getInvestmentModel(req);  // Get the User model dynamically
        const { Investment } = req.models; // Get dynamic User model
        const deleted = await Investment.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: 'Investment not found' });
        res.json({ message: 'Investment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


const getDynamicColumns  = async (req) => {
    try {
        // Get the correct Sequelize instance based on subdomain
        const subdomain = req.get('host').split('.')[0];  // Extract subdomain
        const sequelize = getSequelizeInstance(subdomain);
        const [columns] = await sequelize.query(`
            SELECT GROUP_CONCAT(DISTINCT name ORDER BY name ASC SEPARATOR ', ') AS column_names
            FROM investment_group;
        `);

        return columns[0]?.column_names ? columns[0].column_names.split(', ') : [];
    } catch (error) {
        console.error("Error fetching dynamic columns:", error);
        return [];
    }
};



// API endpoint to fetch investment summary
/*
router.get("/groupsummary", authenticateToken, async (req, res) => {
    try {
        const [results, metadata] = await sequelize.query(`
            SELECT
                trade_or_other,
                nature_of_property,
                association_type,
                quoted_unquoted,
                SUM(current_year_amount) AS total_amount,
                SUM(value_of_acquisition) AS total_acquisition_value
            FROM investments
            WHERE 1
            GROUP BY trade_or_other, nature_of_property, association_type, quoted_unquoted
            ORDER BY trade_or_other, nature_of_property, association_type, quoted_unquoted;
        `);
        // DATE(createdAt) = DATE(NOW() - INTERVAL 1 DAY)

        res.json(results);
       //res.json({ message: 'oops' });
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Database query failed" });
    }
});
*/
// API endpoint to fetch investment summary with dynamic columns
// API endpoint to fetch investment summary
const getInvestmentSummary = async (req, res) => {
    try {
        // 🔹 Fetch dynamic column names first
        const dynamicColumns = await getDynamicColumns(req);

        if (dynamicColumns.length === 0) {
            return res.status(400).json({ error: "No dynamic columns found" });
        }

        // 🔹 Convert array to SQL format: `COALESCE(\`column1\`, '') AS \`column1\`, ...`
        const dynamicColumnSQL = dynamicColumns
            .map(col => `COALESCE(\`${col}\`, '') AS \`${col}\``)
            .join(", ");

        // 🔹 Construct the main query (without JOIN)
        const query = `
            SELECT 
                ${dynamicColumnSQL}, 
                SUM(current_year_amount) AS total_amount, 
                SUM(value_of_acquisition) AS total_acquisition_value
            FROM investments
            GROUP BY ${dynamicColumns.map(col => `\`${col}\``).join(", ")}
            ORDER BY ${dynamicColumns.map(col => `\`${col}\``).join(", ")};
        `;

        // 🔹 Execute the dynamic query
        // Get the correct Sequelize instance based on subdomain
        const subdomain = req.get('host').split('.')[0];  // Extract subdomain
        const sequelize = getSequelizeInstance(subdomain);
        const [results] = await sequelize.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

// Get single investment by ID
const getSingleInvestment = async (req, res) => {
    try {
        const investment = await Investment.findByPk(req.params.id);
        if (!investment) return res.status(404).json({ message: 'Investment not found' });
        res.json(investment);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getAllInvestments,
    createInvestment,
    updateInvestment,
    deleteInvestment,
    getInvestmentSummary,
    getSingleInvestment
}