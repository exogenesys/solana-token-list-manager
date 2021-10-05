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

function encodeData(data) {
  return Buffer.from(JSON.stringify(data, null, 2), "utf8").toString("base64");
}

function decodeData(data) {
  return JSON.parse(Buffer.from(data, "base64").toString("utf8"));
}

function insertNewToken(newToken, json) {
  let tokenArray = json.tokens;
  tokenArray.push(newToken);
  json.tokens = tokenArray;
  return json;
}

/* GET users listing. */
router.post("/form-submit", async (req, res, next) => {
  try {
    const message = "TOKEN: new token added";

    const newToken = {
      chainId: 101,
      address: "8z55xQupEQcjAQTJy3BwZJX24pmtCJDo8MEe9Ub7a3Yv",
      symbol: "HARSH",
      name: "HarshGautam",
      decimals: 9,
      logoURI:
        "https://raw.githubusercontent.com/dyor-market/token-list/main/assets/mainnet/8z55xQupEQcjAQTJy3BwZJX24pmtCJDo8MEe9Ub7a3Yv/logo.svg",
      tags: [],
      extensions: {
        website: "https://shakudo.io/",
      },
    };

    const octokit = await getAuthenticatedOctokit();

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      branch,
      path,
    });

    console.log("sha -> ", data.sha, typeof data.sha);

    const oldContent = decodeData(data.content);
    const content = encodeData(insertNewToken(newToken, oldContent));

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
