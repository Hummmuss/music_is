const {Genre} = require ("../models")

class genreService {
    async createGenre({name}) {
        const genre = await Genre.create({name})
        return genre;
    }
    async getAllGenres() {
        const genres = await Genre.findAll()
        return genres
    }
}

module.exports = new genreService()
