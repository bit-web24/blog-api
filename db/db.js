const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectToDB = async () => {
  try {
    const uri = process.env.ATLAS_KEY;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to MongoDB Atlas
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Return the connected client for reuse in other parts of the application
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
};

module.exports = connectToDB;
