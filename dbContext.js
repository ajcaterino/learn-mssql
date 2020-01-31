const sql = require('mssql/msnodesqlv8');
const dbConfig = require('./dbConfig');

let connPoolPromise = null;

const getConnPoolPromise = () => {
    // If the connection pool exists, return it...
    if (connPoolPromise) {
        return connPoolPromise;
    }

    // Create the connection pool...
    connPoolPromise = new Promise((resolve, reject) => {
        // Initialize the connection pool with the dbConfig...
        const conn = new sql.ConnectionPool(dbConfig);

        // When the connection pool is closed, set the
        // object to null...
        conn.on('close', () => connPoolPromise = null);

        // Connect to the database...
        conn.connect()
            .then(connPool => resolve(connPool))
            .catch(err => {
                connPoolPromise = null;
                return reject(err);
            });
    });

    return connPoolPromise;
};

const query = (sqlQuery, callback) => {
    if (!callback) {
        console.log('dbContext callback function is not defined!');
        return;
    }

    if (!sqlQuery) {
        callback(new Error('SQL statement is a required parameter.'));
    }

    getConnPoolPromise()
        .then(connPool => connPool.request().query(sqlQuery))
        .then(result => callback(null, result))
        .catch(err => callback(err));
};

// Fetch data using callback...
module.exports = { query: query };