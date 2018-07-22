const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const requestUtils = require('../utils/requestUtils');

/**
 * Get the playlists for the given user.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Object} Spotify playlists.  
 */
router.get('/me', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getUserPlaylists()
    .then((response) => {
        const playlists = { playlists: response.body.items };
        res.status(200).json(playlists);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

/**
 * Get the playlists for a specific spotify user id.
 * 
 * Headers: 
 *      REQUIRED: Authorization: Bearer <SPOTIFY ACCESS TOKEN>
 * 
 * @returns {Object} Spotify playlists.  
 */
router.get('/:userId', (req, res) => {
    const spotify = new SpotifyWebApi({
        accessToken: requestUtils.getAccessTokenFromHeader(req.get('Authorization'))
    });
    spotify.getUserPlaylists(req.params.userId)
    .then((response) => {
        const playlists = { playlists: response.body.items };
        res.status(200).json(playlists);
    })
    .catch((error) => {
        res.status(error.statusCode).send(error.message);
    });
});

module.exports = router;