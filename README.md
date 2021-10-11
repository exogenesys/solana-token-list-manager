### Motivation
- Manually adding a bot is a notoriously tough process than one would think. Read more: https://github.com/solana-labs/token-list/issues/852#issuecomment-934584948

### How it works
1. Make a POST request with token data in json format on the url: `/token-list-manager/add-token` (optionally via the form at https://solana-tools.herokuapp.com)

### How To Deploy

1. Create new app on Github from here: https://github.com/settings/apps/new
2. Get `read & write` permission for `Single file`, set it to `src/tokens/solana.tokenlist.json`
3. Update the correct `repo` and `owner` in `config.js`
4. Generate and note the `CLIENT_ID`, `CLIENT_SECRET`, `APP_ID`
5. Generate and download `.pem` file
7. Rename `.pem` file to `private-key.pem` and save it to the root folder
8. Create app and install on a repository
9. Login and create `nodejs` app on heroku
10. Run `heroku config:set APP_ID=[APP_ID] CLIENT_ID=[CLIENT_ID] CLIENT_SECRET=[CLIENT_SECRET]`
11. Run `git push heroku master`


### How To Develop

1. Run `npm install`
2. Generate and note the `CLIENT_ID`, `CLIENT_SECRET`, `APP_ID`
3. Generate and download `.pem` file
4. Rename `.pem` file to `private-key.pem` and save it to the root folder
5. Create an `.env` file from `.env.example`
6. Run `npm run dev`
