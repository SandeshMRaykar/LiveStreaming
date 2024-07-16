const express = require('express');
const { jwt } = require('twilio');
const app = express();
const port = process.env.PORT || 5000;

const accountSid = 'process.env.TWILIO_ACCOUNT_SID;'; // Twilio Account SID
const authToken = 'process.env.TWILIO_AUTH_TOKEN;'; // Twilio Auth Token
const apiKeySid = 'process.env.TWILIO_API_KEY_SID;'; // Twilio API Key SID
const apiKeySecret = 'process.env.TWILIO_API_KEY_SECRET;'; // Twilio API Key Secret

app.use(express.json());

app.post('/token', (req, res) => {
  const { identity, room } = req.body;

  const videoGrant = new jwt.AccessToken.VideoGrant({
    room: room,
  });

  const token = new jwt.AccessToken(accountSid, apiKeySid, apiKeySecret, {
    identity: identity,
  });

  token.addGrant(videoGrant);

  res.send({
    identity: identity,
    token: token.toJwt(),
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
