const nodemailer = require("nodemailer");
const googleapis = require("googleapis");

const CLIENT_ID = `123684304081-1ev5egvpctmrpp3jd2uvoa9qfpqisbcr.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//04S5gL4nVmjSuCgYIARAAGAQSNwF-L9Ir-Df2DwFQXngrxoP98dLAkCyADS-D-nh9F5sOjOXxmvUU41Au7IZikMDQl0ILVrTwrrg`;
const REDIRECT_URI = `https://developers.google.com/oauthplayground`;

const authClient = new googleapis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
authClient.setCredentials({refresh_token: REFRESH_TOKEN});

async function mailer(receiver, id, key){
    try{
        const ACCESS_TOKEN = await authClient.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "harshu8545@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            }
        })
        const details = {
            from: "Harsh Sharma<harshu8545@gmail.com>",
            to: receiver,
            subject: "helllllllllllyyoooo",
            text: "kuchh kuchhh kuchhhhh",
            html: `hey you can recover your account by clicking following link localhost:3000/forgot/${id}/${key}`
        }

        const result = await transport.sendMail(details);
        return result;
    }
    catch(err){
        return err;
    }
}

module.exports = mailer;