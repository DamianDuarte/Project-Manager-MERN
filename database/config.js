const mongoose = require ('mongoose');

const dbConnection = async () => {
    try {
        
        const db = await mongoose.connect(process.env.DB_CONNECTION);

        const url = `${db.connection.host}:${db.connection.port}`

        console.log(`<<<<<<< MongoDB conected in ${url} >>>>>>>>`);

    } catch (error) {
        console.log(`error: ${error.message}`); // Error: Database connection failed
    }

}

module.exports = dbConnection;