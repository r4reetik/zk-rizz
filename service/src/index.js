const { Pool } = require('pg');
const cron = require('node-cron');

// PostgreSQL database connection
const pool = new Pool({
    user: 'your-username',
    host: 'your-database-host',
    database: 'your-database-name',
    password: 'your-password',
    port: 5432, // Default PostgreSQL port
});

// Function to fetch and process data
function fetchData() {
    pool.query('SELECT * FROM your_table', (err, res) => {
        if (err) {
            console.error('Error fetching data', err);
            return;
        }
        console.log('Data fetched successfully');
        // Process the data here
        processResponse(res.rows);
    });
}

// Function to process the response
function processResponse(data) {
    // Implement your data processing logic here
    console.log(data);
}

// Schedule the task to run every 10 minutes
cron.schedule('*/10 * * * *', fetchData);
