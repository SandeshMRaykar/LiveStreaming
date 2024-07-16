const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const PlaybackGrant = AccessToken.PlaybackGrant;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY_SID;
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const twilioClient = twilio(apiKey, apiKeySecret, { accountSid: accountSid });

/**
 * Start a new livestream with a Video Room, PlayerStreamer, and MediaProcessor
 */
router.post('/start', async (req, res) => {
    console.log('Received request to start stream:', req.body);
    const { streamName } = req.body;

    try {
        // Create the WebRTC Go video room
        const room = await twilioClient.video.v1.rooms.create({
            uniqueName: streamName,
            type: 'go'
        });
        console.log('Room created:', room);

        // Create the PlayerStreamer
        console.log('Twilio client', twilioClient)
        console.log('Twilio client media', twilioClient.media)
        const playerStreamer = await twilioClient.media.playerStreamer.create();
        console.log('PlayerStreamer created:', playerStreamer);

        // Create the MediaProcessor
        const mediaProcessor = await twilioClient.media.mediaProcessor.create({
            extension: 'video-composer-v1',
            extensionContext: JSON.stringify({
                identity: 'video-composer-v1',
                room: {
                    name: room.sid
                },
                outputs: [
                    playerStreamer.sid
                ],
            })
        });
        console.log('MediaProcessor created:', mediaProcessor);

        return res.status(200).send({
            roomId: room.sid,
            streamName: streamName,
            playerStreamerId: playerStreamer.sid,
            mediaProcessorId: mediaProcessor.sid
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

module.exports = router;
