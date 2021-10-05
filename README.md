### How it works
1. Make a POST request with token data in json format on the url: `/token-list-manager/add-token` (optionally via the form at https://solana-tools.herokuapp.com)

### How To Deploy

1. Create new app on Github from here: https://github.com/settings/apps/new
2. Get `read & write` permission for `Single file`, set it to `src/tokens/solana.tokenlist.json`
3. Generate and note the `CLIENT_ID`, `CLIENT_SECRET`
4. Generate and download `.pem` file
7. Rename `.pem` file to `private-key.pem` and save it to the root folder
8. Login and create `nodejs` app on heroku
9. Run `heroku config:set APP_ID=[APP_ID] CLIENT_ID=[CLIENT_ID] CLIENT_SECRET=[CLIENT_SECRET]`
10. Run `git push heroku master`


### How To Develop

1. Run `npm install`
2. Create an `.env` file from `.env.example`
3. Run `npm run dev`
