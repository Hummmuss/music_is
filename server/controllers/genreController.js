const {Genre} = require ("../models")

class genreController {
    async create(req, res) {
        const {name} = req.body
        const genre = await Genre.create({name})
        return res.json(genre)
    }
    async getAll(req, res) {
        const genres = await Genre.findAll()
        return res.json(genres)
    }
}

module.exports = new genreController()
