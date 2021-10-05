### How it works
1. Make a POST request with token data in json format on the url: `/token-list-manager/add-token`

### How To Deploy

1. Run `heroku config:set APP_ID=[APP_ID] CLIENT_ID=[CLIENT_ID] CLIENT_SECRET=[CLIENT_SECRET]`
2. Download `.pem` file from github.com
3. Rename `.pem` file to `private-key.pem` and save it to the root folder
4. Deploy on heroku


### How To Develop

1. Run `npm install`
2. Create an `.env` file from `.env.example`
3. Run `npm run dev`
