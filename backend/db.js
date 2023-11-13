// database.js (or a similar name for your database module)

const mongoose = require('mongoose');

function connectToDatabase() {
  const mongoString = process.env.DATABASE_URL;
  return mongoose.connect(mongoString);
}

function setupDatabaseConnectionHandlers() {
  const database = mongoose.connection;

  database.on('error', (error) => {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  });

  database.once('connected', () => {
    console.log('Database Connected');
  });
}

module.exports = {
  connectToDatabase,
  setupDatabaseConnectionHandlers,
};