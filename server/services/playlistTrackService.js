const {PlaylistTrack} = require ("../models")

class playlistTrackService {
    async createPlaylistTrack({trackID, playlistID}) {
        const playlistTrack = await PlaylistTrack.create({trackID, playlistID})
        return playlistTrack
    }
    async getAllPlaylistTrack() {
        const playlistTracks = await PlaylistTrack.findAll()
        return playlistTracks
    }

    async deletePlaylistTrack({id}) {
        const playlistTrack = await PlaylistTrack.destroy({where: {id}})
        return playlistTrack
    }
}

module.exports = new playlistTrackService()
