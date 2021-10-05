var express = require("express");
var router = express.Router();
const { getAuthenticatedOctokit } = require("../auth");
const {
  owner,
  repo,
  path,
  committer,
  author,
  branch,
} = require("../config.js");

const {
  validateToken,
  decodeData,
  encodeData,
  insertNewToken,
} = require("../utils.js");

/* GET users listing. */
router.post("/add-token", async (req, res, next) => {
  try {
    const token = req.body;
    const validToken = validateToken(token);
    console.log("validToken -->", validToken);
    const message = `New Token Added: $${validToken.symbol} via token-list-manager-bot`;

    const octokit = await getAuthenticatedOctokit();

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      branch,
      path,
    });

    const oldContent = decodeData(data.content);
    const content = encodeData(insertNewToken(validToken, oldContent));

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      branch,
      path,
      content,
      message,
      committer,
      author,
      sha: data.sha,
    });
    res.status(200).send("token added to repo");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
