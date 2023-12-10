const knex = require("knex");

require("dotenv").config();

const pg = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false,
        },
    },
    pool: {
        min: 1,
        max: 5,
    },
});

module.exports = { pg };
