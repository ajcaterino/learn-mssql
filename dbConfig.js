const dbConfig = {
    driver: 'msnodesqlv8',
    server: 'MEDIASERVER',
    database: 'AdventureWorks2017',
    port: 1433,
    options: {
        trustedConnection: true
    }
};

module.exports = dbConfig;