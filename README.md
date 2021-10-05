install dependencies:
`npm install`

run the app:
`DEBUG=token-list-manager-bot:* npm start`

### to deploy

1. create an env file with the following you need to deploy:

`heroku config:set APP_ID=[APP_ID] INSTALLATION_ID=[INSTALLATION_ID] PRIVATE_KEY=[PRIVATE_KEY]`
