import express from "express";
const app = express();
import fs from "fs-extra";
import simpleGit from "simple-git";

// or split out the baseDir, supported for backward compatibility
const git = simpleGit("../", { binary: "git" });

const port = 3000;

const delay = (cb) =>
  new Promise((resolve) => setTimeout(() => resolve(cb), 2000));

app.get("/", async (req, res) => {
  // await delay();
  const status = await git.status()
  console.log(status);


  try {
    await fs.writeFile(
      "../basic/index.js",
      `console.log('BASIC: Generated at - ${new Date()}')`
    );
    await git.add('.')
    await git.commit('Test simple-git commit')
    await git.push('origin', 'main')
    res.send("Generation Successful!\n");
  } catch (error) {
    res.send("Generation Failed!\n");
  }
});

app.listen(port, () => {
  console.log("GENERATOR: Hello World!");
  console.log(`Example app listening at http://localhost:${port}`);
});
