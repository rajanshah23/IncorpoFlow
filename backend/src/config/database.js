require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./sequelize-config');

const env = process.env.NODE_ENV || 'development';
const isDocker = process.env.DOCKER_ENV === 'true';
 const dbConfig = isDocker ? config.docker : config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: Number(dbConfig.port),  
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: {
      timestamps: true,
      underscored: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    // Run migrations automatically in development
    // if (process.env.NODE_ENV === "development") {
    //   console.log("🔄 Running migrations...");
    //   const { exec } = require("child_process");
    //   exec("npm run migrate", (error, stdout) => {
    //     if (error) {
    //       console.error("❌ Migration error:", error);
    //       return;
    //     }
    //     console.log("✅ Migrations completed");
    //     if (stdout) console.log(stdout);
    //   });
    // }
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

module.exports = sequelize;