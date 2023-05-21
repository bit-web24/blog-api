const express = require('express');
const app = express();

// Import your routes
const routes = require('./routes/routes');

// Use the routes
app.use('/', routes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
