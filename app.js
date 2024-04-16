const express = require('express');
const middleError = require("./middlewares/errors");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const orderRoute = require("./routes/order");
app.use("/api/v1", orderRoute);

app.use(middleError);