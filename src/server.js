require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./routes');

const app = express();

const { PORT: port } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(Router);

app.listen(port, err => {
  if (err) {
    console.log('Error on initializing the server', err);
    return process.exit(1);
  }

  console.log(`Server running on port ${port}`);
});
