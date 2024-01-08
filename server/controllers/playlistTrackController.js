const {PlaylistTrack, Album} = require ("../models")

class playlistTrackController {
    async create(req, res) {
        const {trackID, playlistID} = req.body
        const playlistTrack = await PlaylistTrack.create({trackID, playlistID})
        return res.json(playlistTrack)
    }
    async getAll(req, res) {
        const playlistTracks = await PlaylistTrack.findAll()
        return res.json(playlistTracks)
    }

    async delete(req, res) {
        const {id} = req.params
        const playlistTrack = await PlaylistTrack.destroy({where: {id}})
        return res.json(playlistTrack)
    }
}

module.exports = new playlistTrackController()
