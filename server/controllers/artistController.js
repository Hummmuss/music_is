const {Artist} = require ("../models")
const uuid = require('uuid')
const path = require("path");

class artistController {
    async create(req, res) {
        const {name} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + '.jpg'
        image.mv(path.resolve(__dirname, '..', 'artistPhotos',  fileName))
        const artist = await Artist.create({name, image: fileName})
        return res.json(artist)
    }
    async getAll(req, res) {
        const artists = await Artist.findAll()
        return res.json(artists)
    }
}

module.exports = new artistController()
