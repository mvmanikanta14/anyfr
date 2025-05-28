module.exports = {
    apps: [
      {
        name: "nodebackend",
        script: "index.js",
        instances: "max", // Runs on multiple CPU cores
        exec_mode: "cluster",
        env: {
          NODE_ENV: "development",
          PORT: 3000,
          HOST: "localhost",
        },
        env_production: {
          NODE_ENV: "production",
          PORT: 3000,
          
        },
      },
    ],
  };
  