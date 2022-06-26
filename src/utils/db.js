const mongoose = require('mongoose');
const databaseLocal = `mongodb://${process.env.DB_SERVICE}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(databaseLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true 
});

mongoose.connection.on('connected', () => {
    console.log(`${databaseLocal}: Connected...`);
});
