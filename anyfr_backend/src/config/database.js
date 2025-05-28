const { Sequelize } = require("sequelize");
const { getConfig } = require("./config");

const connectionCache = {};

const getSequelizeInstance = (subdomain) => {
    if (connectionCache[subdomain]) {
        return connectionCache[subdomain];
    }

    const dbConfig = getConfig(subdomain);
    if (!dbConfig) {
        throw new Error(`INVALID SUBDOMAIN: ${subdomain}`);
    }

    const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    connectionCache[subdomain] = sequelize;
    return sequelize;
};

const databaseMiddleware = (req, res, next) => {
    try {
        const subdomain = req.get('host').split('.')[0];

        if (!subdomain) {
            return res.status(400).json({ message: "❌ No subdomain found in request." });
        }

        req.sequelize = getSequelizeInstance(subdomain);
        next();
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        res.status(500).json({ message: "❌ Database connection error." });
    }
};

module.exports = {
    getSequelizeInstance,
    databaseMiddleware
};


// const { Sequelize } = require("sequelize");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");
//
// const HOME_DIR = os.homedir();
// const DEV_CONFIG_PATHS = path.join(HOME_DIR, "anyfinconfig");
// const DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinconfig", "demo.json");
// // const PROD_CONFIG_DIR = "/usr/local/anyfinconfig/";
// const connectionCache = {};
//
// const PROD_CONFIG_DIR = os.platform() === "win32" ? DEV_CONFIG_PATHS : "/usr/local/anyfinconfig/";
//
//
// const getDBConfig = (subdomain) => {
//     // let configPath = subdomain === "localhost:3000" ? DEV_CONFIG_PATH : path.join(PROD_CONFIG_DIR, `${subdomain}.json`);
//     let configPath = subdomain === "localhost:3000" ? DEV_CONFIG_PATH : path.join(PROD_CONFIG_DIR, `demo.json`);
//     if (!fs.existsSync(configPath)) {
//         console.error(`❌ Database config file not found: ${configPath}`);
//         return null;
//     }
//     return JSON.parse(fs.readFileSync(configPath, "utf-8"));
// };
//
// const getSequelizeInstance = (subdomain) => {
//     if (connectionCache[subdomain]) {
//         return connectionCache[subdomain];
//     }
//
//     const dbConfig = getDBConfig(subdomain);
//     if (!dbConfig) {
//         throw new Error(`INVALID SUBDOMAIN: ${subdomain}`);
//     }
//
//     const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
//         host: dbConfig.host,
//         dialect: dbConfig.dialect,
//         logging: false,
//     });
//
//     connectionCache[subdomain] = sequelize;
//     return sequelize;
// };
//
// module.exports = { getSequelizeInstance };
//


/*const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const os = require("os");

const HOME_DIR = os.homedir();
const DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinconfig", "demo.json");
const DEV_CONFIG_PATH_MAIN = path.join(HOME_DIR, "anyfinconfig", "main.json");
const PROD_CONFIG_DIR = "/usr/local/anyfinconfig/";
const PROD_CONFIG_DIR_MAIN = "/usr/local/anyfinconfig/";
const connectionCache = {}; // 🔥 Store active DB connections

/**
 * Load database configuration based on subdomain
 */
/*
const getDBConfig = (subdomain) => {
  console.log(`🌍 Getting DB config for subdomain: ${subdomain}`);

  let configPath = subdomain === "localhost:3000" ? DEV_CONFIG_PATH : path.join(PROD_CONFIG_DIR, `${subdomain}.json`);

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Database config file not found: ${configPath}`);
    return null;
  }

  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
};


/**
 * Load database configuration based on subdomain
 */
/*
const getDBConfigMain = (subdomain) => {
  console.log(`🌍 Getting DB config for subdomain: ${subdomain}`);

  let configPath = subdomain === "localhost:3000" ? DEV_CONFIG_PATH : path.join(PROD_CONFIG_DIR, 'main.json');

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Database config file not found: ${configPath}`);
    return null;
  }

  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
};



/**
 * Get or create Sequelize instance per subdomain
 */
/*const getSequelizeInstance = (subdomain) => {
  if (connectionCache[subdomain]) {
    console.log(`✅ Using cached DB connection for: ${subdomain}`);
    return connectionCache[subdomain];
  }

  const dbConfig = getDBConfig(subdomain);
  if (!dbConfig) {
    throw new Error(`❌ No DB config found for subdomain: ${subdomain}`);
  }

  console.log(`🔌 Connecting to DB: ${dbConfig.database} for subdomain: ${subdomain}`);

  const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
      max: 10, // 🏎️ Optimize connection pool size
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  // Cache the connection
  connectionCache[subdomain] = sequelize;

  return sequelize;
};




/**
 * Get or create Sequelize instance per MAIN

const getSequelizeInstanceMain = (subdomain) => {
  if (connectionCache[subdomain]) {
    console.log(`✅ Using cached DB connection for: ${subdomain}`);
    return connectionCache[subdomain];
  }

  const dbConfig = getDBConfigMain(subdomain);
  if (!dbConfig) {
    throw new Error(`❌ No DB config found for subdomain: ${subdomain}`);
  }

  console.log(`🔌 Connecting to DB: ${dbConfig.database} for subdomain: ${subdomain}`);

  const sequelizemain = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
      max: 10, // 🏎️ Optimize connection pool size
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  // Cache the connection
  connectionCache[subdomain] = sequelizemain;

  return sequelizemain;
};

/**
 * Middleware to attach the correct DB connection to `req`

const databaseMiddleware = (req, res, next) => {
  try {
    const subdomain = req.get('host').split('.')[0]; // Extract subdomain

    if (!subdomain) {
      return res.status(400).json({ message: "❌ No subdomain found in request." });
    }

    req.sequelize = getSequelizeInstance(subdomain); // Attach to request object

    next();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    res.status(500).json({ message: "❌ Database connection error." });
  }
};

module.exports = {
  getSequelizeInstance, // Export function instead of single instance
  getSequelizeInstanceMain,
  databaseMiddleware,
};
*/

