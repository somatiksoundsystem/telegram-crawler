import {Airgram, Auth, prompt} from 'airgram';

const airgram = new Airgram({
    apiId: Number(process.env.APP_ID!),
    apiHash: process.env.APP_HASH!,
});

const auth = new Auth(airgram);

auth.use({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`),
});

// Call Telegram method
airgram.api.getMe().then((response: any) => {
    console.info(response);
});

// Getting all updates
airgram.updates.use(({update}: any, next: any) => {
    if (update) {
        console.log(`"${update._}" ${JSON.stringify(update)}`);
    }
    return next();
});

// Get only new message updates
airgram.updates.on(`updateNewMessage`, ({update}: any, next: any) => {
    console.info(update);
    return next;
});
