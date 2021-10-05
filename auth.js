const {createAppAuth} = require('@octokit/auth-app');
const {Octokit} = require('@octokit/rest');

const {owner, repo} = require('./config.js');

const getOctokit = async () => {
  try {
    const auth = createAppAuth({
      appId: process.env.APP_ID,
      privateKey: process.env.PRIVATE_KEY,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    const {token} = await auth({
      type: 'app',
    });

    return new Octokit({
      auth: token,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAuthenticatedOctokit = async () => {
  try {
    const appOctokit = await getOctokit();

    const {data} = await appOctokit.apps.getRepoInstallation({
      owner,
      repo,
    });
    const installationId = data.id;

    const auth = createAppAuth({
      appId: process.env.APP_ID,
      privateKey: process.env.PRIVATE_KEY,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    const {token} = await auth({
      type: 'installation',
      installationId,
    });

    return new Octokit({
      auth: token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {getOctokit, getAuthenticatedOctokit};
