const fs = require("fs");
const path = require("path");
const os = require("os");

const HOME_DIR = os.homedir();

const PLATFORM = os.platform();

const DEV_CONFIG_PATHS = path.join(HOME_DIR, "anyfinconfig");
const DEV_CONFIG_PATH = path.join(HOME_DIR, "anyfinconfig", "demo.json");

let PROD_CONFIG_DIR;

if (PLATFORM === "win32") {
    PROD_CONFIG_DIR = DEV_CONFIG_PATHS;
} else if (PLATFORM === "darwin") { // macOS
    PROD_CONFIG_DIR = DEV_CONFIG_PATHS;
} else { // Linux and other UNIX-like OS
    PROD_CONFIG_DIR = "/usr/local/anyfinconfig/";
}

// const PROD_CONFIG_DIR = os.platform() === "win32" ? DEV_CONFIG_PATHS : "/usr/local/anyfinconfig/";

const getConfig = (subdomain) => {
    let configPath = subdomain === "localhost:3000"
        ? DEV_CONFIG_PATH
        : path.join(PROD_CONFIG_DIR, `demo.json`);

    if (!fs.existsSync(configPath)) {
        console.error(`❌ Config file not found: ${configPath}`);
        return null;
    }
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
};

module.exports = { getConfig };
