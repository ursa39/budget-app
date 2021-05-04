const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const port = 3010;

const { DateTime } = require("luxon");

// CORSを許可する
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", jsonParser, (req, res) => {
  const date = DateTime.local().toFormat('yyyyMMddHHmmss');
  const recordsDirectory = path.resolve(__dirname, 'records');

  // recordsディレクトリが存在しなければ作成し、jsonを保存する
  if (!fs.existsSync(recordsDirectory)) fs.mkdirSync(recordsDirectory);
  fs.writeFile(path.resolve(__dirname, `records/${date}.json`), JSON.stringify(req.body), function (err) {
    if (err) throw err;
    console.log(`${date}.jsonが作成されました`);
  });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
