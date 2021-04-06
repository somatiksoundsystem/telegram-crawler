const {TelegramClient} = require("telegram");
const {StringSession} = require("telegram/sessions");
const API = require('telegram/tl');

require('dotenv').config();
const API_ID = process.env.API_ID;
const API_HASH = process.env.API_HASH;
const PHONE = process.env.PHONE;
// noinspection JSUnusedLocalSymbols
const BOT_AUTH_TOKEN = process.env.BOT_AUTH_TOKEN;

(async () => {
  console.log('Loading interactive example...');
  // put your api id here [for example 123456789]
  // put your api hash here [for example '123456abcfghe']
  const client = new TelegramClient(new StringSession(''), API_ID, API_HASH, {
    connectionRetries: 3,
  });

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await client.start({
    // botAuthToken: BOT_AUTH_TOKEN,
    phoneNumber: PHONE,
    phoneCode: (codeFromApp) => {
      return new Promise((resolve) => {
        readline.question(`Give me your code ${codeFromApp ? `(from app)` : ``}:`, code => {
          console.log(`Hey there ${code}!`);
          readline.close();
          resolve(code);
        });
      });
    },
    onError: (err) => console.error(err)
  });
  // client.signInUser()
  console.log('You should now be connected.');
  console.log(await client.getMe());
  // USE THIS STRING TO AVOID RELOGGING EACH TIME
  console.log(await client.session.save());
  const request = client.invoke(new API.Api.channels.JoinChannel({channel: new API.Api.InputChannel({id: 'somatik'})}));
  console.log(await request);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
