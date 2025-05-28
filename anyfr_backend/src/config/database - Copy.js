const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Get home directory dynamically
const HOME_DIR = os.homedir();

const DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinconfig", "demo.json"); // Development config file
const PROD_CONFIG_DIR = "/usr/local/anyfinconfig/"; // Production config directory
//const globalData = require('../../global');

//const clientUrl = globalData.getRequestInfo().url || 'No URL Available';
//console.log("Client URL in database.js:", clientUrl);

console.log("Client Full URL:", global.requestInfo.clientUrl); // http://demo.mydomain.com/login
console.log("Subdomain:", global.requestInfo.subdomain); // demo


// Extract subdomain from the request host
/*
const getSubdomain = (host) => {
  if (!host || host.includes("localhost")) {
    return "demo"; // Default for localhost
  }

  const parts = host.split(".");
  return parts.length >= 3 ? parts[0] : "default"; // Extract subdomain
};
*/

//const url = process.env.CLIENT_URL || 'URL_NOT_AVAILABLE';
//console.log("Client URL in database.js:", url);


// Middleware to attach subdomain to request object
/*const subdomainMiddleware = (req, res, next) => {
  console.log("Incoming Host:", req.headers.host); // Log actual Host header
  req.subdomain = getSubdomain(req.headers.host); // Attach subdomain to request
  next();
};
*/

/*const subdomainMiddleware = (req, res, next) => {
  console.log("Incoming Host Header:", req.headers.host); // Debugging
  req.subdomain = getSubdomain(req.headers.host);
  console.log("Assigned Subdomain:", req.subdomain); // Debugging
  next();
};
*/

url = global.requestInfo.subdomain;

// Function to get database configuration dynamically
const getDBConfig = (url) => {
  console.log(" Subdomain URL:", url);
  if(url == 'localhost:3000' || url == undefined )
  {
    subdomain = "demo";
  }
  else
  {
    subdomain = url;
  }
  
  if (subdomain === "demo") {
    try {
      console.log("Connected to DEV DB");
      if (!fs.existsSync(DEV_CONFIG_PATH)) {
        throw new Error(`Development config file not found: ${DEV_CONFIG_PATH}`);
      }
      const rawData = fs.readFileSync(DEV_CONFIG_PATH, "utf-8");
      return JSON.parse(rawData);
    } catch (error) {
      console.error("❌ Error loading development DB config:", error.message);
      return null;
    }
  }

  try {
    console.log("Connected to PROD DB");
    const configPath = path.join(PROD_CONFIG_DIR, `${subdomain}.json`);
    if (!fs.existsSync(configPath)) {
      throw new Error(`Database config not found for subdomain: ${subdomain}`);
    }

    const rawData = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("❌ Error loading production DB config:", error.message);
    return null;
  }
};

// Default subdomain for initialization
//const defaultSubdomain = getSubdomain(process.env.HOST || "localhost");

// Initialize Sequelize with default DB configuration
const dbConfig = getDBConfig(url);

if (!dbConfig) {
  throw new Error("Database configuration is missing. Server cannot start.");
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false, // Disable logging for cleaner output
});

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

//module.exports = { sequelize, subdomainMiddleware };
module.exports = { sequelize };
