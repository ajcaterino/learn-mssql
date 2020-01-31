const dbContext = require('./dbContext');

dbContext.query('select * from [Person].[Person]', (err, recordsets) => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log(recordsets);
});