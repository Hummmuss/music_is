const {Playlist} = require ("../models")

class playlistController {
    async create(req, res) {
        const {name, userID} = req.body
        const playlist = await Playlist.create({name, userID})
        return res.json(playlist)
    }
    async getAll(req, res) {
        const playlists = await Playlist.findAll()
        return res.json(playlists)
    }

    async delete(req, res) {
        const {id} = req.params
        const playlist = await Playlist.destroy({where: {id}})
        return res.json(playlist)
    }
}

module.exports = new playlistController()
