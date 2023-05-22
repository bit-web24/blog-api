const express = require('express');
const app = express();
const connectToDB = require('./db/db');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.json());

// Import your routes
const routes = require('./routes/routes');

connectToDB()
  .then((client) => {
    // Use the routes
    app.use('/', routes);

    // Start the server
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
