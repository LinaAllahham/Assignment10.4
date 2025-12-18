// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false, // Required for Render's SSL
//     },
// });
// module.exports = pool;


const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use the connection string from environment variables (more secure)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Required for Render's SSL
    }
  },
  logging: false // Set to console.log to see SQL queries, false for production
});

// Export the sequelize instance
module.exports = sequelize;


module.exports.sequelize = sequelize;
