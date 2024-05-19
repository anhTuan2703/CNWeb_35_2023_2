//require('./migration/migration.js')
// Import the Nodemailer library
const cors = require('cors');
const express = require('express');
const morgan = require('morgan')
const middleError = require("./middlewares/errors");
const app = express();
const port = 3001;

app.use(cors());
app.use(morgan('dev'));

app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json({
  limit: '2mb'
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const orderRoute = require("./routes/order");
app.use("/api/v1", require("./routes/router"))
app.use("/api/v1", orderRoute);

app.use(middleError);


