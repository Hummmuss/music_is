const {Track} = require ("../models")
const uuid = require ("uuid")
const path = require("path");

class trackController {
    async create(req, res) {
        const {genreID, artistID, albumID, name, duration} = req.body
        const {fileName} = req.files
        let fileStorageName = uuid.v4() + '.mp3'
        fileName.mv(path.resolve(__dirname, '..', 'MP3Tracks',  fileStorageName))
        const track = await Track.create({genreID, artistID, albumID, name, duration, fileName: fileStorageName})
        return res.json(track)
    }
    async getAll(req, res) {
        const tracks = await Track.findAll()
        return res.json(tracks)
    }

    async getOne(req, res) {
        const {id} = req.params
        const track = await Track.findOne({where: {id}})
        return res.json(track)
    }

}

module.exports = new trackController()
