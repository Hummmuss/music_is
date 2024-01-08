const {Album} = require ("../models")
const uuid = require('uuid')
const path = require("path");

class albumController {
    async create(req, res) {
        const {name, year, artistID} = req.body
        const {image} = req.files
        let fileName = uuid.v4() + '.jpg'
        image.mv(path.resolve(__dirname, '..', 'albumCovers',  fileName))
        const album = await Album.create({name, year, artistID, image: fileName})
        return res.json(album)
    }
    async getAll(req, res) {
        const albums = await Album.findAll()
        return res.json(albums)
    }

    async getOne(req, res) {
        const {id} = req.params
        const album = await Album.findOne({where: {id}})
        return res.json(album)
    }
}

module.exports = new albumController()