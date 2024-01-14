const ApiError = require("../error/ApiError");
const genreService = require("../services/genreService")
class genreController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const genre = await genreService.createGenre({name})
            return res.json(genre)
        }
        catch (error) {
            return next(ApiError.internal("Internal error"))
        }
    }
    async getAll(req, res, next) {
        try {
            const genres = await genreService.getAllGenres()
            return res.json(genres)
        }
        catch(error)
        {
            return next(ApiError.internal("Internal error"))
        }
    }
}

module.exports = new genreController()
