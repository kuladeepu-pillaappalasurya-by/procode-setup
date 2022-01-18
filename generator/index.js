const express = require("express");
const app = express();
const fs = require("fs-extra");

const port = 3000;

const delay = (cb) =>
  new Promise((resolve) => setTimeout(() => resolve(cb), 2000));

app.get("/", async (req, res) => {
  // await delay();
  try {
    fs.writeFile(
      "../basic/index.js",
      `console.log('BASIC: Generated at - ${new Date()}')`
    );
    res.send("Generation Successful!\n");
  } catch (error) {
    res.send("Generation Failed!\n");
  }
});

app.listen(port, () => {
  console.log("GENERATOR: Hello World!");
  console.log(`Example app listening at http://localhost:${port}`);
});
