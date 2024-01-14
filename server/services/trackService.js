const {Track} = require ("../models")
const uuid = require ("uuid")
const path = require("path");

class trackService {
    async createTrack({genreID, artistID, albumID, name, duration, fileName}) {
        let fileStorageName = uuid.v4() + '.mp3'
        fileName.mv(path.resolve(__dirname, '..', 'MP3Tracks',  fileStorageName))
        const track = await Track.create({genreID, artistID, albumID, name, duration, fileName: fileStorageName})
        return track
    }
    async getAllTrack() {
        const tracks = await Track.findAll()
        return tracks
    }

    async getOneTrack({id}) {
        const track = await Track.findOne({where: {id}})
        return track
    }

}

module.exports = new trackService()
