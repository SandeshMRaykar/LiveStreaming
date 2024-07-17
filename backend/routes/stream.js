const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; // Add auth token if not already included
const apiKey = process.env.TWILIO_API_KEY_SID;
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const twilioClient = twilio(accountSid, authToken); // Ensure correct initialization

/**
 * Start a new livestream with a Video Room
 */
router.post('/start', async (req, res) => {
    console.log('Received request to start stream:', req.body);  // Log each request
    const { streamName } = req.body;

    try {
        // Create the WebRTC Go video room
        const room = await twilioClient.video.v1.rooms.create({
            uniqueName: streamName,
            type: 'go'
        });
        console.log('Room created:', room);

        // Return the room details
        return res.status(200).send({
            roomId: room.sid,
            streamName: streamName
        });

    } catch (error) {
        console.error('Error creating livestream components:', error);
        return res.status(400).send({
            message: 'Unable to create livestream',
            error
        });
    }
});

/**
 * Generate a token for the streamer
 */
router.post('/streamerToken', (req, res) => {
    const { identity, room } = req.body;

    const videoGrant = new VideoGrant({ room });

    const token = new AccessToken(
        accountSid,
        apiKey,
        apiKeySecret,
        { identity }
    );

    token.addGrant(videoGrant);

    res.json({ token: token.toJwt() });
});

/**
 * End a live stream
 */
router.post('/end', async (req, res) => {
    const { streamDetails } = req.body;
    try {
        console.log('Stream Details:', streamDetails); // Add debugging to check streamDetails
        if (!streamDetails || !streamDetails.roomId) {
            return res.status(400).send({ message: 'Invalid stream details' });
        }

        await twilioClient.video.v1.rooms(streamDetails.roomId).update({ status: 'completed' });
        res.json({ msg: 'Stream ended' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


/**
 * Generate a token for the viewer
 */
router.post('/viewerToken', (req, res) => {
    const { identity, room } = req.body;

    const videoGrant = new VideoGrant({ room });

    const token = new AccessToken(
        accountSid,
        apiKey,
        apiKeySecret,
        { identity }
    );

    token.addGrant(videoGrant);

    res.json({ token: token.toJwt() });
});


module.exports = router;
