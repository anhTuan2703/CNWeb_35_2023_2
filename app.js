const express = require('express');
const {query} = require("./database/database.js")
const app_config = require('./configs/app.config')
const app = express();
const router = require('./routes/router');
const e = require('express');

const port = app_config.port || 3000;

app.use(express.json({
  limit: '2mb'
}));

app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.use('/api/v1', router);

(async () => {
  try {
    const results = await query('SELECT * FROM Profile');
    console.log("data length: " + results.length);
  } catch (error) {
    console.error('Error:', error);
  }
})();