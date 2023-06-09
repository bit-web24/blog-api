const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectToDB = () => {
  try {
    const uri = process.env.ATLAS_KEY;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to MongoDB Atlas
    client.connect();
    console.log('Connected to MongoDB Atlas');

    // Return the connected client for reuse in other parts of the application
    return client;
  } catch (error) {
    throw error;
  }
};

module.exports = connectToDB;
