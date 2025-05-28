// const express = require('express');
// const router = express.Router();
// const { initModels } = require('../models');
// const { getSubdomain } = require('../../subdomainHelper') // Ensure correct path
// /**
//  * Function to extract subdomain from request
//  * - `localhost:3000/migrate` → defaults to `demo`
//  * - `demo.anyfin.com/migrate` → extracts `demo`
//  */


// // **Migration API**
// router.get('/apply-migration', async (req, res) => {
//     try {
//         const subdomain = getSubdomain(req);
//         console.log(subdomain)
//         if (!subdomain) {
//             return res.status(400).json({ message: "❌ No subdomain found." });
//         }

//         console.log(`🔄 Running migrations for subdomain: ${subdomain}`);
//         //await initModels(subdomain, true); // Run migrations for this subdomain
//         res.json({ message: `✅ Migrations completed for subdomain: ${subdomain}` });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { initModels } = require('../models');
const { getSequelizeInstance } = require('../config/database'); // Ensure correct path
const { getSubdomain } = require('../../subdomainHelper'); // Ensure correct path

// **Migration API**
router.get('/apply-migration', async (req, res) => {
    try {
        const subdomain = "demo";  
        console.log(subdomain);

        if (!subdomain) {
            return res.status(400).json({ message: "❌ No subdomain found." });
        }

        console.log(`🔄 Running migrations for subdomain: ${subdomain}`);

        // Get the Sequelize instance for the specific subdomain
        const sequelize = getSequelizeInstance(subdomain);

        // Run migrations explicitly for this subdomain (alter tables)
        await sequelize.sync({ alter: true });  // This will apply the necessary migrations
        console.log(`✅ Migrations completed for ${subdomain}`);

        // Initialize models after applying migrations
        const models = await initModels(subdomain, true);  // runMigration = true

        // If models are successfully initialized, cache them and attach to the request
        if (!models || Object.keys(models).length === 0) {
            throw new Error(`❌ Model initialization failed for subdomain: ${subdomain}`);
        }

        // // Cache the models
        // modelCache[subdomain] = models;
        // req.models = models;  // Attach models to the request object

        res.json({ message: `✅ Migrations and model initialization completed for subdomain: ${subdomain}` });
    } catch (err) {
        console.error(`❌ Migration failed for ${subdomain}:`, err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
