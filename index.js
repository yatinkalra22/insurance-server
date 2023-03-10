const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const riskApis = require("./routes/api/risk/index");
const error = require("./middleware/error");
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use((err, req, res, next) => {
  next(error(err, req, res, next));
});

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);

app.use("/api/risk/", riskApis);

module.exports = app;
